"use client";

import React, { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { BASE_BACKEND_URL } from "@/config";

interface HistoryItem {
  submittedAt: string;
}

interface DayActivity {
  dayLabel: string;
  fullDate: string;
  count: number;
}

export default function QuizActivityCard() {
  const [activityData, setActivityData] = useState<DayActivity[]>([]);
  const [totalLast7Days, setTotalLast7Days] = useState(0);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedAuthData = localStorage.getItem('authData');
        if (!storedAuthData) {
          setLoading(false);
          return;
        }
        const { token } = JSON.parse(storedAuthData);

        const response = await fetch(`${BASE_BACKEND_URL}/api/exams/history`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const history: HistoryItem[] = await response.json();

          const daysArray: DayActivity[] = [];
          for (let i = 6; i >= 0; i--) {
            const d = new Date();
            d.setDate(d.getDate() - i);
            daysArray.push({
              dayLabel: d.toLocaleDateString('en-US', { weekday: 'narrow' }),
              fullDate: d.toLocaleDateString(),
              count: 0
            });
          }

          let weekTotal = 0;
          history.forEach(item => {
            const itemDate = new Date(item.submittedAt).toLocaleDateString();
            const dayObj = daysArray.find(d => d.fullDate === itemDate);
            if (dayObj) {
              dayObj.count += 1;
              weekTotal += 1;
            }
          });

          setActivityData(daysArray);
          setTotalLast7Days(weekTotal);
        }
      } catch (error) {
        console.error("Failed to fetch activity:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const maxCount = Math.max(...activityData.map(d => d.count), 1);

  return (
    // Removed h-full to let the card shrink to content size
    <div className="bg-white rounded-2xl shadow p-4">
      <h4 className="text-base font-semibold text-slate-900 mb-3">Quiz Activity</h4>

      <div className="text-2xl font-bold text-slate-900">
        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : totalLast7Days}
      </div>

      {/* CUSTOMIZE HERE: h-20 controls the chart height */}
      <div className="mt-3 flex items-end gap-3 h-20">
        {loading ? (
          Array(7).fill(0).map((_, i) => (
            <div key={i} className="flex flex-col items-center flex-1 h-full justify-end">
              <div className="h-full w-6 bg-slate-100 rounded mb-1 animate-pulse"></div>
              <div className="h-3 w-3 bg-slate-100 rounded-full"></div>
            </div>
          ))
        ) : (
          activityData.map((data, i) => {
            const heightPercent = data.count === 0 ? 10 : (data.count / maxCount) * 100;

            return (
              <div key={i} className="flex flex-col items-center flex-1 h-full justify-end group">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] bg-slate-800 text-white px-1.5 py-0.5 rounded absolute -mt-6">
                  {data.count}
                </div>

                <div className="h-full w-6 bg-blue-100 rounded mb-1 flex items-end relative overflow-hidden">
                  <div 
                    style={{ height: `${heightPercent}%` }} 
                    className="w-full bg-blue-500 rounded-b transition-all duration-500"
                  ></div>
                </div>
                <span className="text-xs text-slate-400">{data.dayLabel}</span>
              </div>
            );
          })
        )}
      </div>

      {/* CUSTOMIZE HERE: mt-2 controls the gap above this text */}
      <div className="mt-2 text-sm text-slate-500">Quizzes taken per day (last 7 days)</div>
    </div>
  );
}