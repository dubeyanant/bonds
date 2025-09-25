"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Brain,
  TrendingUp,
  Target,
  BookOpen
} from "lucide-react";
import { AIAnalysis, QuizData, UserQuizStats } from './types';
import { generateAIAnalysis, analysisSteps, clearAnalysisCache } from './aiAnalysis';

interface AILearningAnalysisProps {
  userStats: UserQuizStats;
  quizData: { [key: string]: QuizData };
  onAnalysisComplete?: (analysis: AIAnalysis) => void;
}

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case "Beginner": case "Easy": return "bg-green-100 text-green-800 hover:bg-green-200";
    case "Intermediate": case "Medium": return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200";
    case "Advanced": case "Hard": return "bg-red-100 text-red-800 hover:bg-red-200";
    default: return "bg-gray-100 text-gray-800 hover:bg-gray-200";
  }
};

export function AILearningAnalysis({ userStats, quizData, onAnalysisComplete }: AILearningAnalysisProps) {
  const router = useRouter();
  const [aiAnalysis, setAiAnalysis] = useState<AIAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentAnalysisStep, setCurrentAnalysisStep] = useState(0);
  const [hasAttemptedAnalysis, setHasAttemptedAnalysis] = useState(false);

  const handleGenerateAnalysis = async () => {
    if (isAnalyzing || hasAttemptedAnalysis) return;

    setIsAnalyzing(true);
    setCurrentAnalysisStep(0);
    setHasAttemptedAnalysis(true);

    try {
      const analysis = await generateAIAnalysis(quizData, userStats, setCurrentAnalysisStep);
      setAiAnalysis(analysis);
      onAnalysisComplete?.(analysis);
    } catch (error) {
      console.error('Failed to generate AI analysis:', error);
    } finally {
      setTimeout(() => {
        setIsAnalyzing(false);
      }, 500);
    }
  };

  // Auto-start analysis when component mounts if user has quiz data and no analysis exists
  useEffect(() => {
    if (userStats.totalQuizzes > 0 && !aiAnalysis && !isAnalyzing && !hasAttemptedAnalysis) {
      handleGenerateAnalysis();
    }
  }, [userStats.totalQuizzes, aiAnalysis, isAnalyzing, hasAttemptedAnalysis]);

  // Watch for changes in quiz completion data and re-trigger analysis
  useEffect(() => {
    // Create a stringified version of current quiz stats to detect changes
    const currentQuizState = JSON.stringify({
      totalQuizzes: userStats.totalQuizzes,
      averageScore: userStats.averageScore,
      totalPoints: userStats.totalPoints
    });

    // Store the previous state in a ref-like way using a static variable
    const storageKey = 'lastAnalyzedQuizState';
    const lastAnalyzedState = localStorage.getItem(storageKey);

    // If quiz state has changed since last analysis, trigger new analysis
    if (lastAnalyzedState && lastAnalyzedState !== currentQuizState && userStats.totalQuizzes > 0) {
      console.log('Quiz completion data changed, triggering new AI analysis...');
      
      // Reset analysis state to allow re-analysis
      setHasAttemptedAnalysis(false);
      setAiAnalysis(null);
      
      // Clear the AI analysis cache to force new API call
      clearAnalysisCache();
      
      // Trigger new analysis after a short delay to ensure state updates
      setTimeout(() => {
        handleGenerateAnalysis();
      }, 100);
    }

    // Update the stored state
    localStorage.setItem(storageKey, currentQuizState);
  }, [userStats.totalQuizzes, userStats.averageScore, userStats.totalPoints]);

  const handleStartLearning = () => {
    // Navigate to the education tab (Learn section)
    router.push('/edu?tab=education');
  };

  return (
    <>
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
          opacity: 0;
        }
      `}</style>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-purple-600" />
            AI Learning Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isAnalyzing ? (
            <div className="space-y-4">
              {/* Loading Animation */}
              <div className="flex flex-col items-center justify-center py-8">
                <div className="relative">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
                  <Brain className="h-6 w-6 text-purple-600 absolute top-3 left-3 animate-pulse" />
                </div>
                <div className="mt-4 text-center">
                  <p className="text-purple-600 font-medium animate-pulse">
                    {analysisSteps[currentAnalysisStep]}
                  </p>
                  <div className="flex justify-center mt-2">
                    {analysisSteps.map((_, index) => (
                      <div
                        key={index}
                        className={`h-1 w-4 mx-1 rounded-full transition-colors duration-300 ${index <= currentAnalysisStep ? 'bg-purple-600' : 'bg-gray-200'
                          }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : aiAnalysis ? (
            <div className="space-y-4">
              {/* AI Analysis */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 animate-fade-in">
                <h4 className="font-medium text-blue-900 text-sm mb-2 flex items-center gap-1">
                  <Brain className="h-4 w-4" />
                  Learning Summary
                </h4>
                <p className="text-blue-800 text-sm">
                  {aiAnalysis.summary}
                </p>
              </div>

              {/* Strengths */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 animate-fade-in" style={{ animationDelay: '0.1s' }}>
                <h4 className="font-medium text-green-900 text-sm mb-2 flex items-center gap-1">
                  <TrendingUp className="h-4 w-4" />
                  Strong Areas
                </h4>
                <ul className="text-green-800 text-sm space-y-1">
                  {aiAnalysis.strongAreas.map((area, index) => (
                    <li key={index}>• {area}</li>
                  ))}
                </ul>
              </div>

              {/* Weak Points */}
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <h4 className="font-medium text-orange-900 text-sm mb-2 flex items-center gap-1">
                  <Target className="h-4 w-4" />
                  Areas for Improvement
                </h4>
                <ul className="text-orange-800 text-sm space-y-1">
                  {aiAnalysis.improvementAreas.map((area, index) => (
                    <li key={index}>• {area}</li>
                  ))}
                </ul>
              </div>

              {/* Recommended Learning */}
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 animate-fade-in" style={{ animationDelay: '0.3s' }}>
                <h4 className="font-medium text-purple-900 text-sm mb-3 flex items-center gap-1">
                  <BookOpen className="h-4 w-4" />
                  Recommended Modules
                </h4>

                <div className="space-y-3">
                  <div className="space-y-1">
                    {aiAnalysis.recommendedModules.map((module, index) => {
                      const getDifficultyForModule = (moduleName: string) => {
                        if (moduleName.includes('Introduction') || moduleName.includes('Basic')) return 'Beginner';
                        if (moduleName.includes('Duration') || moduleName.includes('Advanced')) return 'Advanced';
                        return 'Intermediate';
                      };

                      const difficulty = getDifficultyForModule(module);
                      return (
                        <div key={index} className="flex items-center justify-between text-sm">
                          <span className="text-purple-700">• {module}</span>
                          <Badge className={getDifficultyColor(difficulty) + ' text-xs'}>
                            {difficulty}
                          </Badge>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <Button 
                onClick={handleStartLearning}
                className="w-full mt-3 animate-fade-in" 
                size="sm" 
                style={{ animationDelay: '0.4s' }}
              >
                <BookOpen className="h-4 w-4 mr-2" />
                Start Recommended Learning
              </Button>
            </div>
          ) : userStats.totalQuizzes === 0 ? (
            <div className="text-center py-8">
              <Brain className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 text-sm">
                Complete a quiz to get personalized AI learning recommendations!
              </p>
            </div>
          ) : (
            <div className="text-center py-8">
              <Brain className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 text-sm">
                Preparing your personalized AI analysis...
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
}
