 "use client";

import { BASE_BACKEND_URL } from "@/config";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/uinew/card";


export default function TopQuizzesCard() {
  const items = [
    { name: 'Math Mastery Quiz', subject: 'Math', attempts: '1', bestScore: '98%' },
    { name: 'Science Challenge', subject: 'Science', attempts: '9', bestScore: '95%' },
    { name: 'World History Quiz', subject: 'History', attempts: '7', bestScore: '92%' },
  ];
  return (
    <Card className="border-slate-100/80 bg-white/90 shadow-md shadow-slate-200/80">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold text-slate-900">
          Top Quizzes Attempted
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="pb-3 text-left font-semibold text-slate-600">Quiz Name</th>
                <th className="pb-3 text-left font-semibold text-slate-600">Subject</th>
                <th className="pb-3 text-left font-semibold text-slate-600">Attempts</th>
                <th className="pb-3 text-left font-semibold text-slate-600">Best Score</th>
              </tr>
            </thead>
            <tbody>
              {items.map((it, index) => (
                <tr 
                  key={it.name} 
                  className={`border-b border-slate-50 hover:bg-slate-50/50 transition-colors ${
                    index === items.length - 1 ? 'border-b-0' : ''
                  }`}
                >
                  <td className="py-4 font-medium text-slate-900">{it.name}</td>
                  <td className="py-4 text-slate-600">{it.subject}</td>
                  <td className="py-4 text-slate-700">{it.attempts}</td>
                  <td className="py-4">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700">
                      {it.bestScore}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}