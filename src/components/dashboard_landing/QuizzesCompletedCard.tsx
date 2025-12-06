"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/uinew/card";
import { Loader2 } from "lucide-react";
import { BASE_BACKEND_URL } from "@/config";

export default function QuizzesCompletedCard() {
  const [stats, setStats] = useState({
    count: 0,
    accuracy: 0
  });
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchStats = async () => {
      try {
        const storedAuthData = localStorage.getItem('authData');
        if (!storedAuthData) {
          setLoading(false);
          return;
        }
        const { token } = JSON.parse(storedAuthData);

        const response = await fetch(`${BASE_BACKEND_URL}/api/exams/stats`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          setStats({
            count: data.total_quizzes || 0,
            accuracy: data.accuracy || 0
          });
        }
      } catch (error) {
        console.error("Failed to fetch completion stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <Card className="w-full border-slate-100/80 bg-white/90 shadow-md shadow-slate-200/80">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold text-slate-900">
          Quizzes Completed This Year
        </CardTitle>
      </CardHeader>

      <CardContent className="pt-0 pb-6">
        <div className="flex items-baseline gap-3">
          <span className="text-5xl font-bold text-slate-900">
            {loading ? <Loader2 className="w-10 h-10 animate-spin text-indigo-600" /> : stats.count}
          </span>

          {!loading && stats.count > 0 && (
            <span className="text-slate-600 bg-slate-50 px-3 py-1.5 rounded-full text-sm font-semibold border border-slate-100">
              {stats.accuracy}% Avg Score
            </span>
          )}
        </div>

        <p className="text-sm text-slate-500 mt-3">
          {loading 
            ? "Loading your progress..." 
            : stats.count > 0 
              ? "Great job! Keep practicing to improve your score!" 
              : "No quizzes taken yet. Start one today!"}
        </p>
      </CardContent>
    </Card>
  );
}