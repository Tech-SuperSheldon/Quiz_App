"use client";
import React, { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { BASE_BACKEND_URL } from "@/config";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/uinew/card";

// Define the shape of the data we expect from the API
interface DashboardStats {
  xp: number;
  accuracy: number;
  avg_score: number;
  streak: number;
  total_quizzes: number;
}

export default function QuizStatCards() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchStats = async () => {
      let token = null;
      try {
        const storedAuthData = localStorage.getItem('authData');
        if (storedAuthData) {
          const parsedData = JSON.parse(storedAuthData);
          token = parsedData.token;
        }

        if (!token) {
            setLoading(false);
            return;
        }

        const response = await fetch(`${BASE_BACKEND_URL}/api/exams/stats`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          setStats(data);
        }
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <Card className="w-full h-32 flex items-center justify-center border-slate-100/80 bg-white/90 shadow-md shadow-slate-200/80">
        <Loader2 className="w-6 h-6 animate-spin text-indigo-600" />
        <span className="ml-2 text-slate-500">Loading your progress...</span>
      </Card>
    );
  }

  // Fallback if data failed to load
  const data = stats || { xp: 0, accuracy: 0, avg_score: 0, streak: 0, total_quizzes: 0 };

  // Prepare the display cards dynamically
  const statCards = [
    { 
        title: "Total XP", 
        value: data.xp.toLocaleString(), 
        change: `${data.total_quizzes} quizzes played`, 
        color: "bg-blue-50 text-blue-600" 
    },
    { 
        title: "Accuracy", 
        value: `${data.accuracy}%`, 
        change: "Overall Average", 
        color: "bg-green-50 text-green-600" 
    },
    { 
        title: "Average Score", 
        value: `${data.avg_score}%`, 
        change: "Performance", 
        color: "bg-yellow-50 text-yellow-600" 
    },
    { 
        title: "Current Streak", 
        value: `${data.streak} Days`, 
        change: "Keep it up!", 
        color: "bg-purple-50 text-purple-600" 
    },
  ];

  return (
    <> 
      {/* FIX: Reverted to Fragment (<>...</>) instead of <div className="grid...">.
         This allows the PARENT component to control the spacing/gap, 
         exactly like your original hardcoded version. 
      */}
      {statCards.map((s) => (
        <Card
          key={s.title}
          className="transition-all hover:shadow-md border-slate-100/80 bg-white/90 shadow-md shadow-slate-200/80"
        >
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-slate-500 font-medium">
              {s.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 flex items-center justify-between">
            <div className="text-2xl font-bold text-slate-900">
              {s.value}
            </div>
            <div
              className={`px-3 py-1 rounded-full text-xs font-semibold ${s.color} border border-opacity-10`}
            >
              {s.change}
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
}