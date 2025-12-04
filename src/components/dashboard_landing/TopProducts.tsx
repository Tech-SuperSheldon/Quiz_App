//this file is not used in the project

"use client";
export default function TopProducts() {
  const items = [
    { name: 'Math Mastery Quiz', subject: 'Math', attempts: '120', bestScore: '98%' },
    { name: 'Science Challenge', subject: 'Science', attempts: '9', bestScore: '95%' },
    { name: 'World History Quiz', subject: 'History', attempts: '7', bestScore: '92%' },
  ];

  return (
    <div className="bg-white rounded-2xl shadow p-4">
      <h4 className="text-base font-semibold text-slate-900 mb-4">Top Quizzes Attempted</h4>

      <table className="w-full text-sm text-left">
        <thead>
          <tr className="text-slate-500">
            <th className="pb-2">Quiz Name</th>
            <th className="pb-2">Subject</th>
            <th className="pb-2">Attempts</th>
            <th className="pb-2">Best Score</th>
          </tr>
        </thead>
        <tbody>
          {items.map((it) => (
            <tr key={it.name} className="border-t">
              <td className="py-3 text-slate-700">{it.name}</td>
              <td className="py-3 text-sm text-slate-500">{it.subject}</td>
              <td className="py-3 text-sm text-slate-700">{it.attempts}</td>
              <td className="py-3 text-sm text-slate-700">{it.bestScore}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}