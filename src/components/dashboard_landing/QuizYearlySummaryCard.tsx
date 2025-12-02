"use client";
export default function QuizYearlySummaryCard() {
  return (
    <div className="bg-white rounded-2xl shadow p-4">
      <h4 className="text-base font-semibold text-slate-900 mb-3">Yearly Quiz Summary</h4>
      <div className="bg-slate-50 rounded p-3 mb-3">
        <div className="text-sm text-slate-500">Completion Rate</div>
        <div className="text-2xl font-bold text-slate-900">100%</div>
      </div>
      <div className="text-sm text-slate-600">Quizzes Started <span className="float-right font-semibold">2 <span className="text-green-600">+15%</span></span></div>
      <div className="mt-2 text-sm text-slate-600">Quizzes Finished <span className="float-right font-semibold">1 <span className="text-blue-600">+12%</span></span></div>
    </div>
  );
}