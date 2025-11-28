"use client";
export default function ProductSales() {
  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <h3 className="text-lg font-semibold text-slate-900 mb-4">Quiz Categories</h3>

      <div className="flex items-center gap-4">
        <div className="w-36 h-36 rounded-full bg-gradient-to-r from-sky-400 to-teal-300 flex items-center justify-center text-white font-bold">120</div>
        <div className="flex-1">
          <div className="flex flex-col gap-2 mb-2">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-sky-400 rounded-full" />
              <span className="text-sm text-slate-600">40% Math</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-green-400 rounded-full" />
              <span className="text-sm text-slate-600">25% Science</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-yellow-400 rounded-full" />
              <span className="text-sm text-slate-600">20% History</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-purple-400 rounded-full" />
              <span className="text-sm text-slate-600">15% English</span>
            </div>
          </div>
          <div className="text-sm text-slate-500">Overview of quizzes completed by category this month</div>
        </div>
      </div>
    </div>
  );
}
