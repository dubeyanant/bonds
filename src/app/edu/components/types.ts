export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: "Easy" | "Medium" | "Hard";
  topic: string;
}

export interface Quiz {
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

export interface QuizResult {
  quizId: string;
  score: number;
  correctAnswers: number;
  totalQuestions: number;
  completedAt: string;
  timeTaken?: number;
}

export interface QuizData {
  attempts: number;
  bestScore?: number;
  results: QuizResult[];
}

export interface UserQuizStats {
  totalQuizzes: number;
  averageScore: number;
  totalPoints: number;
  rank: number;
  totalParticipants: number;
}

export interface AIAnalysis {
  summary: string;
  strongAreas: string[];
  improvementAreas: string[];
  recommendedModules: string[];
}

export interface LeaderboardEntry {
  name: string;
  score: number;
}
