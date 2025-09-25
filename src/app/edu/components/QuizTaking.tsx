import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Question, Quiz } from './types';

interface QuizTakingProps {
  quiz: Quiz | undefined;
  currentQuestion: Question;
  currentQuestionIndex: number;
  totalQuestions: number;
  selectedAnswers: { [key: string]: number };
  onAnswerSelect: (questionId: string, answerIndex: number) => void;
  onNextQuestion: () => void;
  onPreviousQuestion: () => void;
  onExitQuiz: () => void;
}

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case "Beginner": case "Easy": return "bg-green-100 text-green-800 hover:bg-green-200";
    case "Intermediate": case "Medium": return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200";
    case "Advanced": case "Hard": return "bg-red-100 text-red-800 hover:bg-red-200";
    default: return "bg-gray-100 text-gray-800 hover:bg-gray-200";
  }
};

export function QuizTaking({
  quiz,
  currentQuestion,
  currentQuestionIndex,
  totalQuestions,
  selectedAnswers,
  onAnswerSelect,
  onNextQuestion,
  onPreviousQuestion,
  onExitQuiz
}: QuizTakingProps) {
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;
  const isFirstQuestion = currentQuestionIndex === 0;
  const hasSelectedAnswer = selectedAnswers[currentQuestion.id] !== undefined;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Quiz Header */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold">{quiz?.title}</h1>
                <p className="text-gray-600">Question {currentQuestionIndex + 1} of {totalQuestions}</p>
              </div>
              <Button variant="outline" onClick={onExitQuiz}>
                Exit Quiz
              </Button>
            </div>
            <Progress value={((currentQuestionIndex + 1) / totalQuestions) * 100} className="h-2" />
          </CardContent>
        </Card>

        {/* Question Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <Badge className={getDifficultyColor(currentQuestion.difficulty)}>
                {currentQuestion.difficulty}
              </Badge>
              <Badge variant="outline">{currentQuestion.topic}</Badge>
            </div>
            <CardTitle className="text-xl">{currentQuestion.question}</CardTitle>
          </CardHeader>

          <CardContent>
            <RadioGroup
              value={selectedAnswers[currentQuestion.id]?.toString() || ""}
              onValueChange={(value) => onAnswerSelect(currentQuestion.id, parseInt(value))}
            >
              {currentQuestion.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                  <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>

            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={onPreviousQuestion}
                disabled={isFirstQuestion}
              >
                Previous
              </Button>
              <Button
                onClick={onNextQuestion}
                disabled={!hasSelectedAnswer}
              >
                {isLastQuestion ? 'Complete Quiz' : 'Next Question'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
