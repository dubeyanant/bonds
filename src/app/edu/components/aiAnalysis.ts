import { AIAnalysis, QuizData, UserQuizStats } from './types';
import { baseQuizzes, learningModules } from './quizData';

export const analysisSteps = [
  "Analyzing your learning patterns...",
  "Compiling quiz performance data...",
  "Identifying knowledge strengths...",
  "Detecting improvement opportunities...",
  "Recommending personalized modules...",
  "Generating learning insights..."
];

// Cache for AI analysis results
const analysisCache = new Map<string, AIAnalysis>();

// Function to clear the analysis cache
export const clearAnalysisCache = () => {
  analysisCache.clear();
  console.log('AI analysis cache cleared');
};

export const generateAIAnalysis = async (
  quizData: { [key: string]: QuizData },
  userStats: UserQuizStats,
  setCurrentAnalysisStep: (step: number | ((prev: number) => number)) => void
): Promise<AIAnalysis> => {
  // Start animation and API call simultaneously
  const stepInterval = setInterval(() => {
    setCurrentAnalysisStep(prev => {
      if (prev >= analysisSteps.length - 1) {
        clearInterval(stepInterval);
        return prev;
      }
      return prev + 1;
    });
  }, 800);

  // Start API call immediately (runs parallel to animation)
  const apiCallPromise = (async () => {
    // Generate cache key based on user performance data
    const cacheKey = JSON.stringify({
      quizData: Object.keys(quizData).sort(),
      userStats: userStats,
      timestamp: Math.floor(Date.now() / (1000 * 60 * 60)) // Cache for 1 hour
    });
    
    // Check if we already have a cached result
    if (analysisCache.has(cacheKey)) {
      console.log('Using cached AI analysis result');
      clearInterval(stepInterval);
      return analysisCache.get(cacheKey)!;
    }
    
    // Load quiz data from localStorage if the passed quizData is empty
    let actualQuizData = quizData;
    if (Object.keys(quizData).length === 0) {
      try {
        // Try different possible keys for quiz data
        const possibleKeys = ['quizData', 'userQuizData', 'bondQuizData', 'quizResults'];
        let foundData = false;
        
        for (const key of possibleKeys) {
          const savedData = localStorage.getItem(key);
          if (savedData) {
            try {
              const parsedData = JSON.parse(savedData);
              if (parsedData && typeof parsedData === 'object' && Object.keys(parsedData).length > 0) {
                actualQuizData = parsedData;
                foundData = true;
                break;
              }
            } catch (parseError) {
            }
          }
        }
        
        if (!foundData) {
          // Log contents of all keys to help debug
          Object.keys(localStorage).forEach(key => {
            try {
              const value = localStorage.getItem(key);
              console.log(`localStorage['${key}']:`, value?.substring(0, 200) + (value && value.length > 200 ? '...' : ''));
            } catch (e) {
              console.log(`Error reading localStorage['${key}']:`, e);
            }
          });
        }
      } catch (error) {
        console.error('Error loading quiz data from localStorage:', error);
      }
    }

    // Prepare user performance data from both actualQuizData and hardcoded baseQuizzes
    const rawUserData: Array<{
      quizTitle: string;
      attempts: number;
      bestScore: number;
      difficulty: string;
      topics: string[];
    }> = [];
    
    // 1. Process data from actualQuizData (localStorage or passed parameter)
    Object.entries(actualQuizData).forEach(([quizId, data]) => {
      const quiz = baseQuizzes.find(q => q.id === quizId);
      const result = {
        quizTitle: quiz?.title || quizId,
        attempts: data.attempts,
        bestScore: data.bestScore || 0,
        difficulty: quiz?.difficulty || 'Unknown',
        topics: quiz?.topics || []
      };
      rawUserData.push(result);
    });
    
    // 2. Also check baseQuizzes for hardcoded completion data
    baseQuizzes.forEach(quiz => {
      // Check if this quiz has hardcoded attempts/scores and isn't already processed
      if (quiz.attempts && quiz.attempts > 0 && !actualQuizData[quiz.id]) {
        const result = {
          quizTitle: quiz.title,
          attempts: quiz.attempts,
          bestScore: quiz.bestScore || 0,
          difficulty: quiz.difficulty || 'Unknown',
          topics: quiz.topics || []
        };
        rawUserData.push(result);
      }
    });
    
    const userPerformanceData = rawUserData.filter(quiz => quiz.attempts > 0);

    // Generate the user performance section
    const userPerformanceSection = userPerformanceData.length > 0 
      ? userPerformanceData.map(quiz => 
          `- ${quiz.quizTitle}: ${quiz.bestScore}% (${quiz.difficulty} level)
  Topics covered: ${quiz.topics.join(', ')}`
        ).join('\n')
      : 'No quiz data available yet.';

    const prompt = `Based on the following quiz performance data, provide a personalized learning analysis for a bond trading platform user:

**User Performance Data:**
${userPerformanceSection}

**Available Learning Modules:**
${learningModules.map((module, index) => `${index + 1}. ${module}`).join('\n')}

Please provide a response in the following JSON format:
{
  "summary": "A brief 1-2 sentence analysis of the user's overall learning progress and performance patterns",
  "strongAreas": ["1 to 3 specific areas where the user excels"],
  "improvementAreas": ["1 to 3 specific areas needing improvement"],
  "recommendedModules": ["1 to 3 module names from the available modules list that would help the user most"]
}

Ensure the response is a valid JSON object that can be parsed directly.`;

    // Log the complete prompt being sent to AI
    console.log('=== AI ANALYSIS PROMPT ===');
    console.log(prompt);
    console.log('=== END PROMPT ===');

    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt })
    });

    if (response.ok) {
      const data = await response.json();
      
      // Log the complete response received from AI
      console.log('=== AI ANALYSIS RESPONSE ===');
      console.log('AI Text Content:', data.text);
      console.log('=== END RESPONSE ===');
      
      try {
        let jsonText = data.text;
        
        // Handle markdown code block format (```json {...} ```)
        if (jsonText.includes('```json') || jsonText.includes('```')) {
          
          // Find first { and last }
          const firstBrace = jsonText.indexOf('{');
          const lastBrace = jsonText.lastIndexOf('}');
          
          if (firstBrace !== -1 && lastBrace !== -1 && firstBrace < lastBrace) {
            jsonText = jsonText.substring(firstBrace, lastBrace + 1);
          }
        }
        
        // Try to parse the extracted/cleaned JSON
        const analysisData = JSON.parse(jsonText);
        
        // Cache the successful result
        analysisCache.set(cacheKey, analysisData);
        
        return analysisData;
      } catch (parseError) {
        console.error('=== AI RESPONSE PARSE ERROR ===');
        console.error('Raw text that failed to parse:', data.text);
        console.error('=== END PARSE ERROR ===');
        // Fallback to manual parsing or default data
        return {
          summary: data.text.substring(0, 200) + "...",
          strongAreas: ["Credit Risk Assessment", "Rating Analysis"],
          improvementAreas: ["Mathematical Calculations", "Bond Pricing"],
          recommendedModules: ["Understanding Bond Pricing", "Yield Calculations & Analysis"]
        };
      }
    } else {
      console.error('=== AI API REQUEST FAILED ===');
      console.error('Response status:', response.status);
      console.error('Response statusText:', response.statusText);
      try {
        const errorText = await response.text();
        console.error('Error response body:', errorText);
      } catch (e) {
        console.error('Could not read error response body:', e);
      }
      console.error('=== END API FAILURE ===');
      // Fallback data
      return {
        summary: "Based on your quiz performance, you show good understanding of bond fundamentals with room for improvement in quantitative analysis.",
        strongAreas: ["Credit Risk Assessment", "Basic Bond Concepts"],
        improvementAreas: ["Mathematical Calculations", "Advanced Pricing Models"],
        recommendedModules: ["Understanding Bond Pricing", "Yield Calculations & Analysis"]
      };
    }
  })();

  try {
    // Wait for API call to complete
    const result = await apiCallPromise;
    clearInterval(stepInterval);
    return result;
  } catch (error) {
    console.error('Error calling AI:', error);
    // Fallback data
    clearInterval(stepInterval);
    return {
      summary: "Continue your learning journey to master bond trading concepts and improve your analytical skills.",
      strongAreas: ["Basic Understanding", "Conceptual Knowledge"],
      improvementAreas: ["Practical Application", "Advanced Topics"],
      recommendedModules: ["Understanding Bond Pricing", "Duration & Risk Management"]
    };
  }
};
