"use client";

export default function QuizProgressCard() {
  // Hardcoded data for the full year (All scores set to 0)
  const progressData = [
    { label: "Jan", score: 0 },
    { label: "Feb", score: 0 },
    { label: "Mar", score: 0 },
    { label: "Apr", score: 0 },
    { label: "May", score: 0 },
    { label: "Jun", score: 0 },
    { label: "Jul", score: 0 },
    { label: "Aug", score: 0 },
    { label: "Sep", score: 0 },
    { label: "Oct", score: 0 },
    { label: "Nov", score: 0 },
    { label: "Dec", score: 1 },
  ];

  return (
    <div className="bg-white rounded-2xl shadow p-6 w-full max-w-2xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-slate-900">Quiz Progress</h3>
        <div className="flex items-center gap-2 bg-slate-50 p-1 rounded-full border border-slate-100">
          <button className="px-3 py-1 rounded-full bg-white shadow-sm text-xs font-medium text-slate-700">
            Completed
          </button>
          <button className="px-3 py-1 rounded-full text-xs font-medium text-slate-500 hover:text-slate-700">
            Average Score
          </button>
        </div>
      </div>

      {/* Hardcoded Chart Area */}
      <div className="h-56 w-full flex items-end justify-between gap-1 sm:gap-2">
        {progressData.map((item, index) => (
          <div key={index} className="flex flex-col items-center gap-2 flex-1 h-full justify-end group">
            {/* Tooltip on Hover */}
            <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -mt-8 bg-slate-800 text-white text-[10px] py-1 px-2 rounded mb-1 bottom-[calc(100%+5px)] z-10 pointer-events-none">
              {item.score}%
            </div>

            {/* Bar Background Track */}
            <div className="relative w-full h-40 bg-slate-50 rounded-t-sm sm:rounded-t-md flex items-end overflow-hidden">
              {/* Actual Data Bar */}
              <div
                className="w-full bg-blue-600 hover:bg-blue-700 transition-all duration-500 ease-out rounded-t-sm sm:rounded-t-md"
                style={{ height: `${item.score}%` }}
              ></div>
            </div>

            {/* X-Axis Labels */}
            <span className="text-[10px] sm:text-xs font-medium text-slate-400 group-hover:text-blue-600 transition-colors uppercase">
              {item.label}
            </span>
          </div>
        ))}
      </div>

      {/* Footer / Summary */}
      <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
        <div>
          <div className="text-sm text-slate-500 font-medium">Quizzes Completed This Year</div>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-bold text-slate-900">0</span>
            <span className="text-slate-400 bg-slate-50 px-2 py-0.5 rounded-full text-xs font-semibold">
              0%
            </span>
          </div>
        </div>
        <button className="bg-slate-900 hover:bg-slate-800 transition-colors text-white px-5 py-2.5 rounded-xl text-sm font-medium">
          View Details
        </button>
      </div>
    </div>
  );
}