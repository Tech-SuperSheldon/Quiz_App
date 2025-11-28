"use client";
export default function QuizActivityCard() {
  const quizActivity = [2, 3, 1, 4, 5, 2, 3];
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  return (
    <div className="bg-white rounded-2xl shadow p-4">
      <h4 className="text-base font-semibold text-slate-900 mb-3">Quiz Activity</h4>
      <div className="text-2xl font-bold text-slate-900">20 <span className="text-sm text-green-500">+10%</span></div>
      <div className="mt-3 flex items-center gap-3">
        {quizActivity.map((count, i) => (
          <div key={days[i]} className="flex flex-col items-center flex-1">
            <div className="h-8 w-6 bg-blue-100 rounded mb-1 flex items-end">
              <div style={{height: `${count * 10 + 10}px`}} className="w-full bg-blue-500 rounded-b"></div>
            </div>
            <span className="text-xs text-slate-400">{days[i]}</span>
          </div>
        ))}
      </div>
      <div className="mt-3 text-sm text-slate-500">Quizzes taken per day (last 7 days)</div>
    </div>
  );
}