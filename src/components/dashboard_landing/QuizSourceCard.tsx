"use client";
export default function QuizSourceCard() {
  return (
    <div className="bg-white rounded-2xl shadow p-4">
      <h4 className="text-base font-semibold text-slate-900 mb-3">Quiz Sources</h4>
      <div className="flex items-start gap-4">
        <div className="flex-1">
          <div className="text-sm text-slate-500">Practice Quizzes</div>
          <div className="text-lg font-bold text-slate-900">+12</div>
          <div className="text-sm text-slate-500 mt-2">Assignments: <span className="font-bold text-slate-900">+5</span></div>
          <div className="text-sm text-slate-500">Challenges: <span className="font-bold text-slate-900">+7</span></div>
        </div>
        <div className="w-28 h-28 bg-slate-50 rounded-full flex items-center justify-center text-sky-500 font-bold">24</div>
      </div>
      <div className="mt-4 bg-slate-50 p-3 rounded flex items-center justify-between">
        <input className="flex-1 bg-transparent outline-none text-sm" placeholder="Search for quiz topics..." />
        <button className="ml-3 bg-blue-600 text-white px-3 py-2 rounded-full">▶</button>
      </div>
    </div>
  );
}