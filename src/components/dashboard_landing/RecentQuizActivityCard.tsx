"use client";

import React, { useEffect, useState } from 'react';
import { Loader2, History } from 'lucide-react';
import { BASE_BACKEND_URL } from "@/config";

interface HistoryItem {
  _id: string;
  accuracy: number;
  score: number;
  xp: number;
  submittedAt: string;
}

interface ActivityItem {
  title: string;
  subtitle: string;
  amount: string;
}

export default function RecentQuizActivityCard() {
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    const fetchHistory = async () => {
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
          const data: HistoryItem[] = await response.json();

          // 1. Sort by date descending (Newest first)
          const sortedData = data.sort((a, b) => 
            new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
          );

          // 2. Take top 3
          const recentThree = sortedData.slice(0, 3);

          // 3. Map to UI format
          const mappedActivities: ActivityItem[] = recentThree.map((item, index) => ({
            // Naming them Quiz 1, Quiz 2 based on list order
            title: `Quiz ${index + 1} Completion`, 
            subtitle: `Score: ${item.accuracy}% • ${new Date(item.submittedAt).toLocaleDateString()}`,
            amount: `+${item.xp} XP`
          }));

          setActivities(mappedActivities);
        }
      } catch (error) {
        console.error("Failed to fetch history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow p-4 h-full flex flex-col">
      <h4 className="text-base font-semibold text-slate-900 mb-4 flex items-center gap-2">
        <History className="w-4 h-4 text-indigo-500" />
        Recent Activity
      </h4>

      {loading ? (
        <div className="flex-1 flex justify-center items-center">
          <Loader2 className="w-6 h-6 animate-spin text-indigo-500" />
        </div>
      ) : activities.length > 0 ? (
        <ul className="space-y-3">
          {activities.map((t, index) => (
            <li key={index} className="flex items-center justify-between p-2.5 hover:bg-slate-50 rounded-lg transition-colors border border-transparent hover:border-slate-100">
              <div>
                <div className="font-medium text-slate-800 text-sm">{t.title}</div>
                <div className="text-xs text-slate-500">{t.subtitle}</div>
              </div>
              <div className="text-indigo-600 font-bold text-xs bg-indigo-50 px-2 py-1 rounded-md border border-indigo-100">
                {t.amount}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center text-slate-400 text-sm py-4">
          <p>No quizzes taken yet.</p>
        </div>
      )}
    </div>
  );
}