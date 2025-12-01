"use client";

export default function RecentQuizActivityCard() {
  const tx = [
    { title: 'Completed "Quiz 1"', subtitle: 'Score: 95%', amount: '+10 XP' },
    { title: 'Achievement Unlocked', subtitle: '7-Day Streak', amount: '+20 XP' },
    { title: 'Completed "Quiz 2"', subtitle: 'Score: 88%', amount: '+8 XP' },
    { title: 'New High Score', subtitle: 'Quiz 2', amount: '+15 XP' },
  ];

  return (
    <div className="bg-white rounded-2xl shadow p-4">
      <h4 className="text-base font-semibold text-slate-900 mb-4">Recent Quiz Activity</h4>
      <ul className="space-y-3">
        {tx.map((t, index) => (
          // Added index to key to ensure uniqueness if titles/subtitles are identical
          <li key={index} className="flex items-center justify-between">
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