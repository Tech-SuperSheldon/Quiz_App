"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/uinew/card";

const topUsers = [
  { name: "AlexR_21", avatar: "A", points: 1520, courses: 12, streak: "15 days", badge: "Monthly Champ" },
  { name: "LearnWithMira", avatar: "M", points: 1340, courses: 10, streak: "18 days", badge: "Top Designer" },
  { name: "CodeJunkie", avatar: "C", points: 1120, courses: 10, streak: "15 days", badge: "Quiz Master" },
];

const leaderboardRows = [
  { rank: 1, user: "DesignGuru", completed: 16, streak: "8 days", badge: "Top Designer", points: 980 },
  { rank: 2, user: "MathMaster", completed: 15, streak: "7 days", badge: "Quiz Master", points: 890 },
  { rank: 3, user: "GrowthHacker", completed: 14, streak: "10 days", badge: "Growth Hacker", points: 832 },
  { rank: 4, user: "DevWizard", completed: 12, streak: "7 days", badge: "Code Streak", points: 791 },
  { rank: 5, user: "You", completed: 11, streak: "4 days", badge: "Fast Learner", points: 790 },
];

const quizTypes = [
  { name: "General Exam", duration: "30 mins", questions: "10 Qs", difficulty: "Easy", color: "from-indigo-500 to-purple-500" },
  { name: "Math Challenge", duration: "45 mins", questions: "20 Qs", difficulty: "Medium", color: "from-emerald-500 to-teal-500" },
  { name: "Science Sprint", duration: "25 mins", questions: "15 Qs", difficulty: "Hard", color: "from-rose-500 to-orange-500" },
];

export default function LeaderboardPage() {
  return (
    <div className="space-y-4 pb-2">
      {/* Hero / Highlight Card */}
      <Card className="border-slate-100/80 bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-500 text-white shadow-xl">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl md:text-2xl font-bold">
            You&apos;re closer than you think!
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="text-sm md:text-base text-indigo-50 max-w-xl">
            Earn more XP by completing quizzes and improving your accuracy to climb the leaderboard.
          </p>
          <button className="inline-flex items-center justify-center px-5 py-2 rounded-full bg-white text-indigo-700 text-sm font-semibold shadow-md hover:bg-indigo-50 transition-colors">
            Continue Learning
          </button>
        </CardContent>
      </Card>

      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {topUsers.map((user, index) => (
          <Card
            key={user.name}
            className="border-slate-100/80 bg-white/90 shadow-md shadow-slate-200/80"
          >
            <CardContent className="pt-5 flex items-center gap-4">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 text-indigo-700 text-lg font-semibold">
                {user.avatar}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-slate-900">{user.name}</p>
                  <span className="text-xs text-slate-500">
                    #{index + 1}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  {user.courses} quizzes completed • {user.streak} streak
                </p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-sm font-bold text-indigo-600">
                    {user.points} XP
                  </span>
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold bg-indigo-50 text-indigo-700">
                    {user.badge}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quiz Types / Modes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {quizTypes.map((quiz) => (
          <Card
            key={quiz.name}
            className="overflow-hidden border-slate-100/80 bg-white/90 shadow-md shadow-slate-200/80"
          >
            <div className={`h-2 w-full bg-gradient-to-r ${quiz.color}`} />
            <CardContent className="pt-4 space-y-2">
              <p className="text-sm font-semibold text-slate-900">
                {quiz.name}
              </p>
              <p className="text-xs text-slate-500">
                {quiz.duration} • {quiz.questions} • {quiz.difficulty} level
              </p>
              <button className="mt-3 inline-flex items-center justify-center px-4 py-2 rounded-full bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors">
                Start Quiz
              </button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Leaderboard Table */}
      <Card className="border-slate-100/80 bg-white/90 shadow-md shadow-slate-200/80">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold text-slate-900">
            Leaderboard
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-slate-500 text-xs">
                  <th className="py-3 text-left font-semibold">Rank</th>
                  <th className="py-3 text-left font-semibold">User</th>
                  <th className="py-3 text-left font-semibold">Quizzes Completed</th>
                  <th className="py-3 text-left font-semibold">Streak</th>
                  <th className="py-3 text-left font-semibold">Badge</th>
                  <th className="py-3 text-right font-semibold">XP</th>
                </tr>
              </thead>
              <tbody>
                {leaderboardRows.map((row) => (
                  <tr
                    key={row.rank}
                    className={`border-b border-slate-50 hover:bg-slate-50/60 transition-colors ${
                      row.user === "You" ? "bg-indigo-50/60" : ""
                    }`}
                  >
                    <td className="py-3 text-slate-700 font-semibold">
                      {row.rank}
                    </td>
                    <td className="py-3 text-slate-800 font-medium">
                      {row.user}
                    </td>
                    <td className="py-3 text-slate-600">
                      {row.completed} quizzes
                    </td>
                    <td className="py-3 text-slate-600">
                      {row.streak}
                    </td>
                    <td className="py-3">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-700">
                        {row.badge}
                      </span>
                    </td>
                    <td className="py-3 text-right font-bold text-slate-900">
                      {row.points}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


