"use client";

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/uinew/card";

export default function QuizzesCompletedCard() {
  return (
    <Card className="w-full border-slate-100/80 bg-white/90 shadow-md shadow-slate-200/80">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold text-slate-900">
          Quizzes Completed This Year
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0 pb-6">
        <div className="flex items-baseline gap-3">
          <span className="text-5xl font-bold text-slate-900">0</span>
          <span className="text-slate-500 bg-slate-50 px-3 py-1.5 rounded-full text-sm font-semibold border border-slate-100">
            0%
          </span>
        </div>
        <p className="text-sm text-slate-500 mt-3">Keep practicing to improve your score!</p>
      </CardContent>
      {/* <CardFooter className="pt-4 border-t border-slate-100">
        <button className="bg-slate-900 hover:bg-slate-800 transition-colors text-white px-5 py-2.5 rounded-xl text-sm font-medium w-full shadow-sm">
          View Details
        </button>
      </CardFooter> */}
    </Card>
  );
}

