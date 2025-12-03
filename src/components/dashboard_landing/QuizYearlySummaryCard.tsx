"use client";

import React, { useEffect, useState } from "react";
import { Loader2, TrendingUp } from "lucide-react";
import { BASE_BACKEND_URL } from "@/config";

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
    <div className="bg-white rounded-2xl shadow p-4 h-full">
      <h4 className="text-base font-semibold text-slate-900 mb-3">Yearly Quiz Summary</h4>

      {/* Completion Rate Box */}
      <div className="bg-slate-50 rounded-xl p-4 mb-4 border border-slate-100">
        <div className="text-sm text-slate-500 font-medium mb-1">Completion Rate</div>
        <div className="flex items-end gap-2">
          <div className="text-3xl font-bold text-slate-900">
            {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : `${stats.completionRate}%`}
          </div>
          {!loading && stats.completionRate === 100 && (
            <div className="text-xs text-green-600 font-semibold mb-1 flex items-center">
              <TrendingUp className="w-3 h-3 mr-0.5" /> Excellent
            </div>
          )}
        </div>
      </div>

      {/* Stats List */}
      <div className="space-y-3">
        <div className="flex justify-between items-center text-sm p-2 hover:bg-slate-50 rounded-lg transition-colors">
          <span className="text-slate-600">Quizzes Started</span>
          <span className="font-bold text-slate-900">
            {loading ? "..." : stats.started}
          </span>
        </div>

        <div className="flex justify-between items-center text-sm p-2 hover:bg-slate-50 rounded-lg transition-colors border-t border-slate-100 pt-3">
          <span className="text-slate-600">Quizzes Finished</span>
          <span className="font-bold text-indigo-600">
            {loading ? "..." : stats.finished}
          </span>
        </div>
      </div>
    </div>
  );
}