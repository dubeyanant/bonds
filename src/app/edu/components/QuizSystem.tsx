import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Trophy,
  Star,
  Clock,
  CheckCircle,
  XCircle,
  Target,
  Brain,
  Award,
  TrendingUp,
  Users,
  Play,
  RefreshCw,
  BookOpen
} from "lucide-react";

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: "Easy" | "Medium" | "Hard";
  topic: string;
}

interface Quiz {
  id: string;
  title: string;
  description: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  questionCount: number;
  estimatedTime: string;
  topics: string[];
  points: number;
  attempts: number;
  bestScore?: number;
}

interface QuizResult {
  quizId: string;
  score: number;
  correctAnswers: number;
  totalQuestions: number;
  completedAt: string;
  timeTaken?: number;
}

interface QuizData {
  attempts: number;
  bestScore?: number;
  results: QuizResult[];
}

interface UserQuizStats {
  totalQuizzes: number;
  averageScore: number;
  totalPoints: number;
  rank: number;
  totalParticipants: number;
}

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

  // LocalStorage utility functions
  const getQuizDataFromStorage = (): { [key: string]: QuizData } => {
    try {
      const stored = localStorage.getItem('bondQuizData');
      return stored ? JSON.parse(stored) : {};
    } catch (error) {
      console.error('Error reading quiz data from localStorage:', error);
      return {};
    }
  };

  const saveQuizDataToStorage = (data: { [key: string]: QuizData }) => {
    try {
      localStorage.setItem('bondQuizData', JSON.stringify(data));
    } catch (error) {
      console.error('Error saving quiz data to localStorage:', error);
    }
  };

  const calculateUserStats = (quizData: { [key: string]: QuizData }, staticQuizzes: Quiz[]): UserQuizStats => {
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

  const baseQuizzes: Quiz[] = [
    {
      id: "basics",
      title: "Bond Basics Assessment",
      description: "Test your understanding of fundamental bond concepts",
      difficulty: "Beginner",
      questionCount: 5,
      estimatedTime: "15 min",
      topics: ["Bond Types", "Basic Terminology", "Risk Factors"],
      points: 100,
      attempts: 0,
      bestScore: undefined
    },
    {
      id: "pricing",
      title: "Bond Pricing & Valuation",
      description: "Advanced concepts in bond pricing and yield calculations",
      difficulty: "Intermediate",
      questionCount: 15,
      estimatedTime: "25 min",
      topics: ["Present Value", "YTM", "Duration", "Convexity"],
      points: 200,
      attempts: 2,
      bestScore: 85
    },
    {
      id: "ratings",
      title: "Credit Analysis & Ratings",
      description: "Deep dive into credit risk assessment and rating methodologies",
      difficulty: "Intermediate",
      questionCount: 12,
      estimatedTime: "20 min",
      topics: ["Credit Risk", "Rating Agencies", "Default Probability"],
      points: 150,
      attempts: 1,
      bestScore: 92
    },
    {
      id: "portfolio",
      title: "Bond Portfolio Management",
      description: "Strategic approach to building and managing bond portfolios",
      difficulty: "Advanced",
      questionCount: 20,
      estimatedTime: "35 min",
      topics: ["Asset Allocation", "Hedging", "Performance Measurement"],
      points: 300,
      attempts: 0,
      bestScore: undefined
    },
    {
      id: "tax",
      title: "Tax Implications Quiz",
      description: "Navigate the complex tax landscape of bond investing",
      difficulty: "Advanced",
      questionCount: 8,
      estimatedTime: "12 min",
      topics: ["Tax Treatment", "TDS", "Capital Gains"],
      points: 120,
      attempts: 0,
      bestScore: undefined
    }
  ];

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

  const bondBasicsQuestions: Question[] = [
    {
      id: "1",
      question: "What is the relationship between bond prices and interest rates?",
      options: [
        "Bond prices and interest rates move in the same direction",
        "Bond prices and interest rates move in opposite directions",
        "There is no relationship between bond prices and interest rates",
        "The relationship depends on the bond's credit rating"
      ],
      correctAnswer: 1,
      explanation: "Bond prices and interest rates have an inverse relationship. When interest rates rise, bond prices fall, and vice versa. This is because existing bonds with lower rates become less attractive when new bonds offer higher rates.",
      difficulty: "Easy",
      topic: "Basic Terminology"
    },
    {
      id: "2",
      question: "Which of the following is NOT a type of bond?",
      options: [
        "Government Securities (G-Sec)",
        "Corporate Bonds",
        "Municipal Bonds", 
        "Equity Shares"
      ],
      correctAnswer: 3,
      explanation: "Equity shares represent ownership in a company, not debt. Bonds are debt instruments where the issuer owes the holder a debt and is obliged to pay interest and/or repay the principal at maturity.",
      difficulty: "Easy",
      topic: "Bond Types"
    },
    {
      id: "3",
      question: "What does the term 'Face Value' or 'Par Value' of a bond represent?",
      options: [
        "The current market price of the bond",
        "The amount paid as interest annually",
        "The nominal value that will be repaid at maturity",
        "The price at which the bond was originally issued"
      ],
      correctAnswer: 2,
      explanation: "Face Value (or Par Value) is the nominal amount of the bond that will be repaid to the bondholder at maturity. In India, this is typically ₹1,000 per bond.",
      difficulty: "Easy",
      topic: "Basic Terminology"
    },
    {
      id: "4",
      question: "Which of the following represents the highest risk factor for bond investors?",
      options: [
        "Interest rate risk",
        "Default risk", 
        "Inflation risk",
        "Liquidity risk"
      ],
      correctAnswer: 1,
      explanation: "Default risk (credit risk) is typically considered the highest risk for bond investors as it can result in complete loss of principal and interest if the issuer fails to meet its obligations.",
      difficulty: "Medium",
      topic: "Risk Factors"
    },
    {
      id: "5",
      question: "What is the primary difference between Government Securities (G-Sec) and Corporate Bonds?",
      options: [
        "G-Sec have higher interest rates than Corporate Bonds",
        "Corporate Bonds have longer maturity periods than G-Sec",
        "G-Sec are issued by the government while Corporate Bonds are issued by companies",
        "There is no significant difference between them"
      ],
      correctAnswer: 2,
      explanation: "The primary difference is the issuer: Government Securities are issued by Central or State Governments and are considered virtually risk-free, while Corporate Bonds are issued by companies and carry higher credit risk but typically offer higher returns.",
      difficulty: "Easy",
      topic: "Bond Types"
    }
  ];

  const leaderboard = [
    { name: "Ankit Thosani", score: 525 },
    { name: "Himanshu Kakwani", score: 500 },
    { name: "Tanishka Kothari", score: 471 },
    { name: "Shubham Auti", score: 400 },
    { name: "You", score: userStats.totalPoints }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": case "Easy": return "bg-green-100 text-green-800 hover:bg-green-200";
      case "Intermediate": case "Medium": return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200";
      case "Advanced": case "Hard": return "bg-red-100 text-red-800 hover:bg-red-200";
      default: return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    }
  };

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
              <CardContent className="pt-8 pb-8">
                <h2 className="text-2xl font-bold mb-4">Quiz Coming Soon</h2>
                <p className="text-gray-600 mb-4">
                  The {quiz?.title} quiz is currently being prepared. Please try the Bond Basics Assessment instead.
                </p>
                <Button onClick={restartQuiz}>Back to Quiz Selection</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          {/* Quiz Header */}
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h1 className="text-2xl font-bold">{quiz?.title}</h1>
                  <p className="text-gray-600">Question {currentQuestionIndex + 1} of {currentQuestions.length}</p>
                </div>
                <Button variant="outline" onClick={restartQuiz}>
                  Exit Quiz
                </Button>
              </div>
              <Progress value={((currentQuestionIndex + 1) / currentQuestions.length) * 100} className="h-2" />
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
                onValueChange={(value) => handleAnswerSelect(currentQuestion.id, parseInt(value))}
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
                  onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
                  disabled={currentQuestionIndex === 0}
                >
                  Previous
                </Button>
                <Button
                  onClick={nextQuestion}
                  disabled={selectedAnswers[currentQuestion.id] === undefined}
                >
                  {currentQuestionIndex === currentQuestions.length - 1 ? 'Complete Quiz' : 'Next Question'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (showResults) {
    const quiz = quizzes.find(q => q.id === selectedQuiz);
    const correctAnswers = currentQuestions.filter(q => selectedAnswers[q.id] === q.correctAnswer).length;

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
                <Button onClick={restartQuiz}>
                  Try Another Quiz
                </Button>
                <Button variant="outline" onClick={() => startQuiz(selectedQuiz!)}>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Retake Quiz
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Detailed Results */}
          <Card>
            <CardHeader>
              <CardTitle>Detailed Results</CardTitle>
            </CardHeader>
            <CardContent>
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
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-purple-600" />
                  Your Quiz Statistics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600 mb-1">{userStats.totalQuizzes}</div>
                    <div className="text-sm text-gray-600">Quizzes Taken</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600 mb-1">{userStats.averageScore}%</div>
                    <div className="text-sm text-gray-600">Average Score</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600 mb-1">{userStats.totalPoints}</div>
                    <div className="text-sm text-gray-600">Total Points</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600 mb-1">#{userStats.rank}</div>
                    <div className="text-sm text-gray-600">Global Rank</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Available Quizzes */}
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
                        onClick={() => startQuiz(quiz.id)}
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
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Leaderboard */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-blue-600" />
                  Leaderboard
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {leaderboard.slice(0, 5).map((user, index) => (
                    <div key={index} className={`flex items-center gap-3 p-2 rounded-lg ${user.name === 'You' ? 'bg-blue-50 border border-blue-200' : ''}`}>
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${index === 0 ? 'bg-yellow-400 text-white' :
                        index === 1 ? 'bg-gray-300 text-gray-700' :
                          index === 2 ? 'bg-orange-400 text-white' :
                            'bg-gray-100 text-gray-600'
                        }`}>
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-sm">{user.name}</div>
                      </div>
                      <div className="text-xs text-gray-400">
                        {user.score} points
                      </div>
                    </div>
                  ))}
                </div>
                <div className="text-xs text-center text-gray-500 mt-3">
                  {userStats.totalParticipants.toLocaleString()} total participants
                </div>
              </CardContent>
            </Card>

            {/* AI Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-purple-600" />
                  AI Learning Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* AI Analysis */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <h4 className="font-medium text-blue-900 text-sm mb-2 flex items-center gap-1">
                      <Brain className="h-4 w-4" />
                      Learning Summary
                    </h4>
                    <p className="text-blue-800 text-sm">
                      Based on your recent quiz performance, you demonstrate excellent understanding of credit fundamentals and risk assessment concepts. However, I notice you're struggling with quantitative bond valuation methods, particularly present value calculations and yield mathematics. Your strong grasp of qualitative analysis suggests you're ready to tackle more advanced pricing models with focused practice on the mathematical components.
                    </p>
                  </div>

                  {/* Strengths */}
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <h4 className="font-medium text-green-900 text-sm mb-2 flex items-center gap-1">
                      <TrendingUp className="h-4 w-4" />
                      Strong Areas
                    </h4>
                    <ul className="text-green-800 text-sm space-y-1">
                      <li>• Credit Risk Assessment</li>
                      <li>• Rating Agencies Understanding</li>
                      <li>• Default Probability Analysis</li>
                    </ul>
                  </div>

                  {/* Weak Points */}
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                    <h4 className="font-medium text-orange-900 text-sm mb-2 flex items-center gap-1">
                      <Target className="h-4 w-4" />
                      Areas for Improvement
                    </h4>
                    <ul className="text-orange-800 text-sm space-y-1">
                      <li>• Present Value Calculations</li>
                      <li>• Duration & Convexity</li>
                      <li>• YTM Calculations</li>
                    </ul>
                  </div>

                  {/* Recommended Learning */}
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                    <h4 className="font-medium text-purple-900 text-sm mb-3 flex items-center gap-1">
                      <BookOpen className="h-4 w-4" />
                      Recommended Learning
                    </h4>

                    <div className="space-y-3">
                      {/* Learning Modules */}
                      <div>
                        <p className="text-purple-800 text-sm font-medium mb-2">📚 Recommended Modules:</p>
                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-purple-700">• Understanding Bond Pricing</span>
                            <Badge className="bg-yellow-100 text-yellow-800 text-xs hover:bg-yellow-200">Intermediate</Badge>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-purple-700">• Yield Calculations & Analysis</span>
                            <Badge className="bg-yellow-100 text-yellow-800 text-xs hover:bg-yellow-200">Intermediate</Badge>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-purple-700">• Duration & Risk Management</span>
                            <Badge className="bg-red-100 text-red-800 text-xs hover:bg-red-200">Advanced</Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <Button className="w-full mt-3" size="sm">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Start Recommended Learning
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
