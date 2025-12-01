"use client";
export default function QuizHeroBanner() {
	return (
		<div className="bg-white rounded-2xl shadow p-6 flex items-center justify-between">
			<div className="flex items-start gap-4">
				<div className="w-20 h-20 rounded-lg bg-blue-100 flex items-center justify-center">
					<span className="text-3xl">🎓</span>
				</div>
				<div>
					<h2 className="text-2xl font-bold text-slate-900">Welcome, Student!</h2>
					<p className="text-sm text-slate-600">Track your quiz journey and achievements</p>
					<div className="mt-4 flex gap-4">
						<div className="bg-slate-50 p-3 rounded-lg text-center">
							<div className="text-sm text-slate-500">Quizzes Taken</div>
							<div className="text-xl font-semibold text-slate-900">24</div>
						</div>
						<div className="bg-slate-50 p-3 rounded-lg text-center">
							<div className="text-sm text-slate-500">Completion Rate</div>
							<div className="text-xl font-semibold text-slate-900">92%</div>
						</div>
					</div>
				</div>
			</div>
			<div className="hidden md:block">
				<img alt="hero" src="/1.png" className="w-50 h-50 object-cover -mb-6" />
			</div>
		</div>
	);
}
