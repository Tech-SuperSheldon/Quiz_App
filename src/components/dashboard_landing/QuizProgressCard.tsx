"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/uinew/card";

export default function QuizProgressCard() {
  const [viewMode, setViewMode] = useState<"completed" | "average">("completed");

  // Data for completed quizzes
  const completedData = [
    { label: "Jan", value: 0 },
    { label: "Feb", value: 0 },
    { label: "Mar", value: 0 },
    { label: "Apr", value: 0 },
    { label: "May", value: 0 },
    { label: "Jun", value: 0 },
    { label: "Jul", value: 0 },
    { label: "Aug", value: 0 },
    { label: "Sep", value: 0 },
    { label: "Oct", value: 0 },
    { label: "Nov", value: 0 },
    { label: "Dec", value: 1 },
  ];

  // Data for average scores (percentage)
  const averageScoreData = [
    { label: "Jan", value: 0 },
    { label: "Feb", value: 0 },
    { label: "Mar", value: 0 },
    { label: "Apr", value: 0 },
    { label: "May", value: 0 },
    { label: "Jun", value: 0 },
    { label: "Jul", value: 0 },
    { label: "Aug", value: 0 },
    { label: "Sep", value: 0 },
    { label: "Oct", value: 0 },
    { label: "Nov", value: 0 },
    { label: "Dec", value: 5 },
  ];

  const progressData = viewMode === "completed" ? completedData : averageScoreData;
  const maxValue = Math.max(...progressData.map((item) => item.value), 1);

  return (
    <Card className="w-full border-slate-100/80 bg-white/90 shadow-md shadow-slate-200/80">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-lg font-semibold text-slate-900">
          Quiz Progress
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
          {progressData.map((item, index) => {
            const heightPercent = item.value === 0 ? 0 : (item.value / maxValue) * 100;
            const displayValue = viewMode === "completed" ? item.value : `${item.value}%`;

            return (
              <div
                key={index}
                className="flex flex-col items-center gap-2 flex-1 h-full justify-end group relative"
              >
                {/* Tooltip on Hover */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-6 bg-slate-800 text-white text-[10px] py-1 px-2 rounded z-10 pointer-events-none whitespace-nowrap">
                  {displayValue}
                </div>

                {/* Bar Background Track */}
                <div className="relative w-full h-40 bg-slate-50 rounded-t-sm sm:rounded-t-md flex items-end overflow-hidden">
                  {/* Actual Data Bar */}
                  <div
                    className={`w-full transition-all duration-500 ease-out rounded-t-sm sm:rounded-t-md ${
                      viewMode === "completed"
                        ? "bg-blue-600 hover:bg-blue-700"
                        : "bg-indigo-600 hover:bg-indigo-700"
                    }`}
                    style={{ height: `${heightPercent}%` }}
                  ></div>
                </div>

                {/* X-Axis Labels */}
                <span className="text-[10px] sm:text-xs font-medium text-slate-400 group-hover:text-blue-600 transition-colors uppercase">
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>
      </CardContent>
 
    </Card>
  );
}