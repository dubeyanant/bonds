import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";
import { LeaderboardEntry, UserQuizStats } from './types';

interface LeaderboardProps {
  userStats: UserQuizStats;
}

export function Leaderboard({ userStats }: LeaderboardProps) {
  const leaderboard: LeaderboardEntry[] = [
    { name: "Ankit Thosani", score: 525 },
    { name: "Himanshu Kakwani", score: 500 },
    { name: "Tanishka Kothari", score: 471 },
    { name: "Shubham Auti", score: 420 },
    { name: "You", score: userStats.totalPoints }
  ];

  return (
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
  );
}
