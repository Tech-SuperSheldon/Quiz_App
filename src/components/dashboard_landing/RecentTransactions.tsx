"use client";
export default function RecentTransactions() {
  const tx = [
    { title: 'Completed "Math Mastery Quiz"', subtitle: 'Score: 95%', amount: '+10 XP' },
    { title: 'Achievement Unlocked', subtitle: '7-Day Streak', amount: '+20 XP' },
    { title: 'Completed "Science Challenge"', subtitle: 'Score: 88%', amount: '+8 XP' },
    { title: 'New High Score', subtitle: 'World History Quiz', amount: '+15 XP' },
  ];

  return (
    <div className="bg-white rounded-2xl shadow p-4">
      <h4 className="text-base font-semibold text-slate-900 mb-4">Recent Quiz Activity</h4>
      <ul className="space-y-3">
        {tx.map((t) => (
          <li key={t.title + t.subtitle} className="flex items-center justify-between">
            <div>
              <div className="font-medium text-slate-800">{t.title}</div>
              <div className="text-sm text-slate-500">{t.subtitle}</div>
            </div>
            <div className="text-slate-800 font-semibold">{t.amount}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
