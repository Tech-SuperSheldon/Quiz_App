"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/uinew/card";
import { Loader2 } from "lucide-react";
import Image from "next/image";

// --- Types ---
interface LeaderboardUser {
  userId: string;
  name: string;
  email: string;
  avatar: string;
  points: number;
  courses: number;
  streak: string;
  badge: string;
  rank: number;
}

// Keep Quiz Types static as they are part of the UI structure
const quizTypes = [
  { name: "General Exam", duration: "30 mins", questions: "10 Qs", difficulty: "Easy", color: "from-indigo-500 to-purple-500" },
  { name: "Math Challenge", duration: "45 mins", questions: "20 Qs", difficulty: "Medium", color: "from-emerald-500 to-teal-500" },
  { name: "Science Sprint", duration: "25 mins", questions: "15 Qs", difficulty: "Hard", color: "from-rose-500 to-orange-500" },
];

export default function LeaderboardPage() {
  // State for live data
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardUser[]>([]);
  const [currentUserEmail, setCurrentUserEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const BASE_BACKEND_URL = "https://92c52865-c657-478a-b2e0-625fc822f55b-00-23crg2t5cyi67.pike.replit.dev:5000";

  useEffect(() => {
    // 1. Identify "You"
    const storedAuth = localStorage.getItem("authData");
    if (storedAuth) {
      const parsed = JSON.parse(storedAuth);
      if (parsed.user && parsed.user.email) {
        setCurrentUserEmail(parsed.user.email);
      }
    }

    // 2. Fetch Live Data
    const fetchLeaderboard = async () => {
      try {
        const res = await fetch(`${BASE_BACKEND_URL}/api/exams/leaderboard`);
        if (res.ok) {
          const data = await res.json();
          setLeaderboardData(data);
        }
      } catch (error) {
        console.error("Failed to fetch leaderboard", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  // Get Top 3 for the cards
  const topThree = leaderboardData.slice(0, 3);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  return (
    <div className="space-y-4 pb-2">
      {/* Hero image */}
      <div className="rounded-lg overflow-hidden shadow-xl">
        <Image
          src="/leaderhead.png"
          alt="Leaderboard hero"
          width={1200}
          height={320}
          className="w-full h-auto object-cover"
        />
      </div>

      {/* Top Cards (Live Data) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {topThree.map((user, index) => (
          <Card
            key={user.userId}
            className="border-slate-100/80 bg-white/90 shadow-md shadow-slate-200/80"
          >
            <CardContent className="pt-5 flex items-center gap-4">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 text-indigo-700 text-lg font-semibold">
                {user.avatar}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-slate-900">
                    {user.email === currentUserEmail ? "You" : user.name}
                  </p>
                  <span className="text-xs text-slate-500">
                    #{user.rank}
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
        {/* Fallback if data is empty */}
        {topThree.length === 0 && (
           <div className="col-span-3 text-center py-4 text-slate-500 text-sm">
             No leaderboard data available yet.
           </div>
        )}
      </div>

      {/* Quiz Types / Modes (Static) */}
      {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
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
      </div> */}

      {/* Leaderboard Table (Live Data) */}
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
                {leaderboardData.map((row) => (
                  <tr
                    key={row.userId}
                    className={`border-b border-slate-50 hover:bg-slate-50/60 transition-colors ${
                      row.email === currentUserEmail ? "bg-indigo-50/60" : ""
                    }`}
                  >
                    <td className="py-3 text-slate-700 font-semibold">
                      {row.rank}
                    </td>
                    <td className="py-3 text-slate-800 font-medium">
                      {row.email === currentUserEmail ? "You" : row.name}
                    </td>
                    <td className="py-3 text-slate-600">
                      {row.courses} quizzes
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