import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain } from "lucide-react";
import { UserQuizStats } from './types';

interface QuizStatisticsProps {
  userStats: UserQuizStats;
}

export function QuizStatistics({ userStats }: QuizStatisticsProps) {
  return (
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
  );
}
