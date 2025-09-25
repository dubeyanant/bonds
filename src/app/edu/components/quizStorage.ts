import { QuizData, UserQuizStats, Quiz } from './types';

export const getQuizDataFromStorage = (): { [key: string]: QuizData } => {
  try {
    const stored = localStorage.getItem('bondQuizData');
    return stored ? JSON.parse(stored) : {};
  } catch (error) {
    console.error('Error reading quiz data from localStorage:', error);
    return {};
  }
};

export const saveQuizDataToStorage = (data: { [key: string]: QuizData }) => {
  try {
    localStorage.setItem('bondQuizData', JSON.stringify(data));
  } catch (error) {
    console.error('Error saving quiz data to localStorage:', error);
  }
};

export const calculateUserStats = (
  quizData: { [key: string]: QuizData }, 
  staticQuizzes: Quiz[]
): UserQuizStats => {
  let totalQuizzes = 0;
  let totalScore = 0;
  let totalPoints = 0;
  
  // Iterate through all static quizzes and merge with localStorage data
  staticQuizzes.forEach(quiz => {
    // Get localStorage data for this quiz (if any)
    const storedData = quizData[quiz.id];
    
    // Determine final attempts and bestScore (localStorage takes priority)
    const finalAttempts = storedData?.attempts ?? quiz.attempts;
    const finalBestScore = storedData?.bestScore ?? quiz.bestScore;
    
    // Only count quizzes that have been attempted (attempts > 0)
    if (finalAttempts > 0 && finalBestScore) {
      totalQuizzes += 1;
      totalScore += finalBestScore;
      
      // Calculate points: (quiz points * best score) / 100
      totalPoints += Math.floor((quiz.points * finalBestScore) / 100);
    }
  });
  
  // If no quizzes taken, return zeros but keep rank at 5
  if (totalQuizzes === 0) {
    return {
      totalQuizzes: 0,
      averageScore: 0,
      totalPoints: 0,
      rank: 5,
      totalParticipants: 2847
    };
  }
  
  // Average score: (summation of scores) / number of quiz taken, rounded
  const averageScore = Math.round(totalScore / totalQuizzes);
  
  // Fixed rank at 5 (as requested)
  const rank = 5;
  
  return {
    totalQuizzes,
    averageScore,
    totalPoints,
    rank,
    totalParticipants: 2847
  };
};
