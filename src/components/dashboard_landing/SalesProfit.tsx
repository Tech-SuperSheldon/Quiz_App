"use client";
export default function SalesProfit() {
  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-slate-900">Quiz Progress</h3>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1 rounded-full bg-slate-100 text-sm">Completed</button>
          <button className="px-3 py-1 rounded-full text-sm">Average Score</button>
        </div>
      </div>

      {/* Placeholder for chart: quizzes completed per month, average score trend */}
      <div className="h-56 bg-gradient-to-b from-blue-50 to-white rounded-lg border border-slate-100 flex items-center justify-center text-slate-400">
        (Quiz Progress Chart)
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div>
          <div className="text-sm text-slate-500">Quizzes Completed This Year</div>
          <div className="text-lg font-semibold text-slate-900">22 <span className="text-green-600 text-sm">+8%</span></div>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-full">View Details</button>
      </div>
    </div>
  );
}
