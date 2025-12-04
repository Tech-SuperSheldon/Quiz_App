"use client";
import React from "react";

const stats = [
  { title: "Quizzes Taken", value: "2", change: "+4 this week", color: "bg-blue-50 text-blue-600" },
  { title: "Quizzes Completed", value: "1", change: "+3 this week", color: "bg-green-50 text-green-600" },
  { title: "Average Score", value: "88%", change: "+2%", color: "bg-yellow-50 text-yellow-600" },
  { title: "Current Streak", value: "1 days", change: "+1", color: "bg-purple-50 text-purple-600" },
];

export default function StatCards() {
  return (
    <>
      {stats.map((s) => (
        <div key={s.title} className="bg-white rounded-2xl shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-slate-500">{s.title}</div>
              <div className="text-xl font-bold text-slate-900">{s.value}</div>
            </div>
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${s.color} border`}>{s.change}</div>
          </div>
        </div>
      ))}
    </>
  );
}
