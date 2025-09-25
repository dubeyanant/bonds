import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Target,
  Clock,
  Star,
  Play
} from "lucide-react";
import { Quiz } from './types';

interface QuizListProps {
  quizzes: Quiz[];
  onStartQuiz: (quizId: string) => void;
}

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case "Beginner": case "Easy": return "bg-green-100 text-green-800 hover:bg-green-200";
    case "Intermediate": case "Medium": return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200";
    case "Advanced": case "Hard": return "bg-red-100 text-red-800 hover:bg-red-200";
    default: return "bg-gray-100 text-gray-800 hover:bg-gray-200";
  }
};

export function QuizList({ quizzes, onStartQuiz }: QuizListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Available Quizzes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {quizzes.map((quiz) => (
            <div key={quiz.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-medium">{quiz.title}</h3>
                    <Badge className={getDifficultyColor(quiz.difficulty)}>
                      {quiz.difficulty}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{quiz.description}</p>

                  <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-3">
                    <div className="flex items-center gap-1">
                      <Target className="h-4 w-4" />
                      {quiz.questionCount} questions
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {quiz.estimatedTime}
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4" />
                      {quiz.points} points
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-3">
                    {quiz.topics.map((topic, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {topic}
                      </Badge>
                    ))}
                  </div>

                  {quiz.bestScore && (
                    <div className="text-sm text-green-600">
                      Best Score: {quiz.bestScore}% ({quiz.attempts} attempts)
                    </div>
                  )}
                </div>
              </div>

              <Button
                onClick={() => onStartQuiz(quiz.id)}
                className="w-full sm:w-auto"
              >
                <Play className="h-4 w-4 mr-2" />
                {quiz.attempts > 0 ? 'Retake Quiz' : 'Start Quiz'}
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
