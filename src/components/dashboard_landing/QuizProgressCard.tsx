"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/uinew/card";
import { Loader2, BarChart2 } from "lucide-react";
import { BASE_BACKEND_URL } from "@/config";

interface HistoryItem {
  submittedAt: string;
}

interface MonthlyData {
  label: string;
  value: number;
}

export default function QuizProgressCard() {
  const [chartData, setChartData] = useState<MonthlyData[]>([]);
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

          // Initialize Jan-Dec Array with 0
          const months = [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
          ];
          const dataMap = new Array(12).fill(0);
          const currentYear = new Date().getFullYear();

          // Aggregate Data
          history.forEach(item => {
            const date = new Date(item.submittedAt);
            // Only count for current year
            if (date.getFullYear() === currentYear) {
              const monthIndex = date.getMonth(); // 0 = Jan, 11 = Dec
              dataMap[monthIndex] += 1;
            }
          });

          // Format for Chart
          const formattedData = months.map((label, index) => ({
            label,
            value: dataMap[index]
          }));

          setChartData(formattedData);
        }
      } catch (error) {
        console.error("Failed to fetch progress:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Calculate max value for bar scaling (avoid divide by zero)
  const maxValue = Math.max(...chartData.map((item) => item.value), 1);

  return (
    <Card className="w-full border-slate-100/80 bg-white/90 shadow-md shadow-slate-200/80">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-lg font-semibold text-slate-900 flex items-center gap-2">
          <BarChart2 className="w-5 h-5 text-indigo-600" />
          Quiz Progress (2025)
        </CardTitle>
        <div className="flex items-center gap-2 bg-slate-50 p-1 rounded-full border border-slate-100">
          {/* <button
            onClick={() => setViewMode("completed")}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
              viewMode === "completed"
                ? "bg-white shadow-sm text-slate-900"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            Completed
          </button> */}
          {/* <button
            onClick={() => setViewMode("average")}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
              viewMode === "average"
                ? "bg-white shadow-sm text-slate-900"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            Average Score
          </button> */}
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        {/* Chart Area */}
        <div className="h-56 w-full flex items-end justify-between gap-1 sm:gap-2">
          {loading ? (
             // Loading Skeleton
             Array(12).fill(0).map((_, index) => (
                <div key={index} className="flex flex-col items-center gap-2 flex-1 h-full justify-end">
                  <div className="w-full bg-slate-100 rounded-t-md h-full animate-pulse"></div>
                  <div className="h-3 w-6 bg-slate-100 rounded"></div>
                </div>
             ))
          ) : (
            chartData.map((item, index) => {
              // Calculate height percentage
              const heightPercent = item.value === 0 ? 2 : (item.value / maxValue) * 100;

              return (
                <div
                  key={index}
                  className="flex flex-col items-center gap-2 flex-1 h-full justify-end group relative"
                >
                  {/* Tooltip on Hover */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-8 bg-slate-800 text-white text-[10px] py-1 px-2 rounded z-10 pointer-events-none whitespace-nowrap shadow-lg">
                    {item.value} Quizzes
                  </div>

                  {/* Bar Background Track */}
                  <div className="relative w-full h-48 bg-slate-50 rounded-t-sm sm:rounded-t-md flex items-end overflow-hidden hover:bg-slate-100 transition-colors">
                    {/* Actual Data Bar */}
                    <div
                      className={`w-full transition-all duration-700 ease-out rounded-t-sm sm:rounded-t-md bg-gradient-to-t from-indigo-600 to-indigo-400 group-hover:from-indigo-700 group-hover:to-indigo-500`}
                      style={{ height: `${heightPercent}%` }}
                    ></div>
                  </div>

                  {/* X-Axis Labels */}
                  <span className="text-[10px] sm:text-xs font-medium text-slate-400 group-hover:text-indigo-600 transition-colors uppercase">
                    {item.label}
                  </span>
                </div>
              );
            })
          )}
        </div>
      </CardContent>
    </Card>
  );
}