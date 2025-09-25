"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";

// Import types
import {
  Question,
  Quiz,
  QuizResult,
  QuizData,
  UserQuizStats,
} from './types';

// Import data and utilities
import { baseQuizzes, bondBasicsQuestions } from './quizData';
import {
  getQuizDataFromStorage,
  saveQuizDataToStorage,
  calculateUserStats
} from './quizStorage';

// Import components
import { QuizStatistics } from './QuizStatistics';
import { QuizList } from './QuizList';
import { Leaderboard } from './Leaderboard';
import { AILearningAnalysis } from './AILearningAnalysis';
import { QuizTaking } from './QuizTaking';
import { QuizResults } from './QuizResults';


export function QuizSystem() {
  const [selectedQuiz, setSelectedQuiz] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: string]: number }>({});
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [currentQuestions, setCurrentQuestions] = useState<Question[]>([]);
  const [quizData, setQuizData] = useState<{ [key: string]: QuizData }>({});
  const [userStats, setUserStats] = useState<UserQuizStats>({
    totalQuizzes: 2,
    averageScore: 89,
    totalPoints: 308,
    rank: 5,
    totalParticipants: 2847
  });



  // Load quiz data on component mount and calculate stats
  useEffect(() => {
    const storedData = getQuizDataFromStorage();
    setQuizData(storedData);

    // Calculate dynamic stats based on stored data + static fallbacks
    const dynamicStats = calculateUserStats(storedData, baseQuizzes);
    setUserStats(dynamicStats);

  }, []);

  // Merge base quizzes with stored data
  const quizzes: Quiz[] = baseQuizzes.map(quiz => ({
    ...quiz,
    attempts: quizData[quiz.id]?.attempts ?? quiz.attempts,
    bestScore: quizData[quiz.id]?.bestScore ?? quiz.bestScore
  }));

  const startQuiz = (quizId: string) => {
    setSelectedQuiz(quizId);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setQuizCompleted(false);
    setShowResults(false);
    setScore(0);

    // Set questions based on quiz type
    if (quizId === "basics") {
      setCurrentQuestions(bondBasicsQuestions);
    } else {
      // For other quizzes, use empty array (placeholder)
      setCurrentQuestions([]);
    }
  };

  const handleAnswerSelect = (questionId: string, answerIndex: number) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: answerIndex
    });
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < currentQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      completeQuiz();
    }
  };

  const completeQuiz = () => {
    // Calculate score
    let correctAnswers = 0;
    currentQuestions.forEach(question => {
      if (selectedAnswers[question.id] === question.correctAnswer) {
        correctAnswers++;
      }
    });
    const calculatedScore = Math.round((correctAnswers / currentQuestions.length) * 100);
    setScore(calculatedScore);

    // Save quiz result to localStorage
    if (selectedQuiz) {
      const newResult: QuizResult = {
        quizId: selectedQuiz,
        score: calculatedScore,
        correctAnswers,
        totalQuestions: currentQuestions.length,
        completedAt: new Date().toISOString()
      };

      const currentData = getQuizDataFromStorage();
      const quizSpecificData = currentData[selectedQuiz] || { attempts: 0, results: [] };

      quizSpecificData.attempts += 1;
      quizSpecificData.results.push(newResult);
      quizSpecificData.bestScore = Math.max(quizSpecificData.bestScore || 0, calculatedScore);

      const updatedData = {
        ...currentData,
        [selectedQuiz]: quizSpecificData
      };

      saveQuizDataToStorage(updatedData);
      setQuizData(updatedData);

      // Recalculate user stats with new data
      const newStats = calculateUserStats(updatedData, baseQuizzes);
      setUserStats(newStats);
    }

    setQuizCompleted(true);
    setShowResults(true);
  };

  const restartQuiz = () => {
    setSelectedQuiz(null);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setQuizCompleted(false);
    setShowResults(false);
    setScore(0);
    setCurrentQuestions([]);
  };

  if (selectedQuiz && !quizCompleted) {
    const currentQuestion = currentQuestions[currentQuestionIndex];
    const quiz = quizzes.find(q => q.id === selectedQuiz);

    // If no questions available for this quiz, show a placeholder
    if (currentQuestions.length === 0) {
      return (
        <div className="min-h-screen bg-gray-50">
          <div className="container mx-auto px-4 py-8 max-w-4xl">
            <Card className="text-center">
              <div className="pt-8 pb-8">
                <h2 className="text-2xl font-bold mb-4">Quiz Coming Soon</h2>
                <p className="text-gray-600 mb-4">
                  The {quiz?.title} quiz is currently being prepared. Please try the Bond Basics Assessment instead.
                </p>
                <button onClick={restartQuiz}>Back to Quiz Selection</button>
              </div>
            </Card>
          </div>
        </div>
      );
    }

    return (
      <QuizTaking
        quiz={quiz}
        currentQuestion={currentQuestion}
        currentQuestionIndex={currentQuestionIndex}
        totalQuestions={currentQuestions.length}
        selectedAnswers={selectedAnswers}
        onAnswerSelect={handleAnswerSelect}
        onNextQuestion={nextQuestion}
        onPreviousQuestion={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
        onExitQuiz={restartQuiz}
      />
    );
  }

  if (showResults) {
    const quiz = quizzes.find(q => q.id === selectedQuiz);
    const correctAnswers = currentQuestions.filter(q => selectedAnswers[q.id] === q.correctAnswer).length;

    return (
      <QuizResults
        quiz={quiz}
        score={score}
        correctAnswers={correctAnswers}
        currentQuestions={currentQuestions}
        selectedAnswers={selectedAnswers}
        onRestartQuiz={restartQuiz}
        onRetakeQuiz={() => startQuiz(selectedQuiz!)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2">Knowledge Quiz Center</h1>
          <p className="text-gray-600">
            Test your bond market knowledge, earn points, and compete with fellow learners
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* User Stats */}
            <QuizStatistics userStats={userStats} />

            {/* Available Quizzes */}
            <QuizList quizzes={quizzes} onStartQuiz={startQuiz} />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Leaderboard */}
            <Leaderboard userStats={userStats} />

            {/* AI Summary */}
            <AILearningAnalysis userStats={userStats} quizData={quizData} />
          </div>
        </div>
      </div>
    </div>
  );
}
