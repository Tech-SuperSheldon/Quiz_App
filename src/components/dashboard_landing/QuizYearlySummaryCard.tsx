 "use client";

import React, { useEffect, useState } from "react";
import { Loader2, TrendingUp } from "lucide-react";
import { BASE_BACKEND_URL } from "@/config";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/uinew/card";

export default function QuizYearlySummaryCard() {
  const [stats, setStats] = useState({
    started: 0,
    finished: 0,
    completionRate: 0
  });
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    const fetchStats = async () => {
      try {
        // 1. Get Token
        const storedAuthData = localStorage.getItem('authData');
        if (!storedAuthData) {
          setLoading(false);
          return;
        }
        const { token } = JSON.parse(storedAuthData);

        // 2. Fetch Stats
        const response = await fetch(`${BASE_BACKEND_URL}/api/exams/stats`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();

          // Since the database only stores submitted quizzes, 
          // Started equals Finished, and Completion Rate is effectively 100% for tracked items.
          const total = data.total_quizzes || 0;

          setStats({
            started: total,
            finished: total,
            completionRate: total > 0 ? 100 : 0
          });
        }
      } catch (error) {
        console.error("Failed to fetch summary stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <Card className="h-full border-slate-100/80 bg-white/90 shadow-md shadow-slate-200/80">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold text-slate-900">
          Monthly Quiz Summary
        </CardTitle>
      </CardHeader>

      <CardContent className="pt-0 space-y-4">
        {/* Completion Rate Box */}
        <div className="bg-gradient-to-br from-slate-50 to-slate-100/50 rounded-xl p-5 border border-slate-200/50 shadow-sm">
          <div className="text-sm text-slate-500 font-medium mb-2">
            Completion Rate
          </div>
          <div className="flex items-end gap-2">
            <div className="text-4xl font-bold text-slate-900">
              {loading ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                `${stats.completionRate}%`
              )}
            </div>
            {!loading && stats.completionRate === 100 && (
              <div className="text-xs text-green-600 font-semibold mb-1 flex items-center">
                <TrendingUp className="w-3 h-3 mr-0.5" /> Excellent
              </div>
            )}
          </div>
        </div>

        {/* Stats List */}
        <div className="space-y-2 pt-2">
          <div className="flex justify-between items-center text-sm p-3 hover:bg-slate-50 rounded-lg transition-colors border border-transparent hover:border-slate-100">
            <span className="text-slate-600 font-medium">Quizzes Started</span>
            <span className="font-bold text-slate-900 text-base">
              {loading ? "..." : stats.started}
            </span>
          </div>

          <div className="flex justify-between items-center text-sm p-3 hover:bg-slate-50 rounded-lg transition-colors border border-transparent hover:border-slate-100">
            <span className="text-slate-600 font-medium">Quizzes Finished</span>
            <span className="font-bold text-indigo-600 text-base">
              {loading ? "..." : stats.finished}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}