import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Trophy,
  Award,
  Target,
  CheckCircle,
  XCircle,
  RefreshCw
} from "lucide-react";
import { Question, Quiz } from './types';

interface QuizResultsProps {
  quiz: Quiz | undefined;
  score: number;
  correctAnswers: number;
  currentQuestions: Question[];
  selectedAnswers: { [key: string]: number };
  onRestartQuiz: () => void;
  onRetakeQuiz: () => void;
}

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case "Beginner": case "Easy": return "bg-green-100 text-green-800 hover:bg-green-200";
    case "Intermediate": case "Medium": return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200";
    case "Advanced": case "Hard": return "bg-red-100 text-red-800 hover:bg-red-200";
    default: return "bg-gray-100 text-gray-800 hover:bg-gray-200";
  }
};

export function QuizResults({
  quiz,
  score,
  correctAnswers,
  currentQuestions,
  selectedAnswers,
  onRestartQuiz,
  onRetakeQuiz
}: QuizResultsProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Results Header */}
        <Card className="mb-6 text-center">
          <CardContent className="pt-8 pb-8">
            <div className="mb-4">
              {score >= 80 ? (
                <Trophy className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
              ) : score >= 60 ? (
                <Award className="h-16 w-16 text-blue-500 mx-auto mb-4" />
              ) : (
                <Target className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              )}
            </div>

            <h1 className="text-3xl font-bold mb-2">Quiz Completed!</h1>
            <div className="text-6xl font-bold text-blue-600 mb-2">{score}%</div>
            <p className="text-gray-600 mb-4">
              You got {correctAnswers} out of {currentQuestions.length} questions correct
            </p>

            {score >= 80 && (
              <Badge className="bg-yellow-100 text-yellow-800 mb-4">
                🏆 Excellent Performance!
              </Badge>
            )}

            <div className="flex justify-center gap-4">
              <Button onClick={() => {
                if (typeof window !== 'undefined') {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
                onRestartQuiz();
              }}>
                Check Analysis
              </Button>
              <Button variant="outline" onClick={onRetakeQuiz}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Retake Quiz
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Results */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-bold mb-4">Detailed Results</h2>
            <div className="space-y-4">
              {currentQuestions.map((question, index) => {
                const userAnswer = selectedAnswers[question.id];
                const isCorrect = userAnswer === question.correctAnswer;

                return (
                  <div key={question.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Q{index + 1}.</span>
                        {isCorrect ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-500" />
                        )}
                      </div>
                      <Badge className={getDifficultyColor(question.difficulty)}>
                        {question.difficulty}
                      </Badge>
                    </div>

                    <p className="mb-3">{question.question}</p>

                    <div className="space-y-2 mb-3">
                      {question.options.map((option, optionIndex) => (
                        <div
                          key={optionIndex}
                          className={`p-2 rounded text-sm ${optionIndex === question.correctAnswer
                            ? 'bg-green-100 border border-green-300'
                            : optionIndex === userAnswer && !isCorrect
                              ? 'bg-red-100 border border-red-300'
                              : 'bg-gray-50'
                            }`}
                        >
                          {option}
                          {optionIndex === question.correctAnswer && (
                            <Badge className="ml-2 bg-green-600">Correct</Badge>
                          )}
                          {optionIndex === userAnswer && !isCorrect && (
                            <Badge variant="destructive" className="ml-2">Your Answer</Badge>
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded p-3">
                      <div className="font-medium text-blue-800 text-sm mb-1">Explanation:</div>
                      <div className="text-blue-700 text-sm">{question.explanation}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
