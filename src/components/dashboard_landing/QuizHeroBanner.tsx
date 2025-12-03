"use client";
import React, { useEffect, useState } from "react";
import { Loader2, Clock } from "lucide-react";
import { BASE_BACKEND_URL } from "@/config";

export default function QuizHeroBanner() {
	const [userName, setUserName] = useState("Student");
	const [quizCount, setQuizCount] = useState(0);
	const [avgTimeSeconds, setAvgTimeSeconds] = useState(0); // Store raw seconds
	const [loading, setLoading] = useState(true);

	

	// --- HELPER: Format Seconds to "MMm SSs" ---
	const formatTime = (totalSeconds: number) => {
		if (!totalSeconds || isNaN(totalSeconds) || totalSeconds === 0) return "0m 0s";

		const m = Math.floor(totalSeconds / 60);
		const s = Math.round(totalSeconds % 60);

		return `${m}m ${s}s`;
	};

	useEffect(() => {
		const fetchData = async () => {
			let token = null;

			try {
				// 1. Get User Details
				const storedAuthData = localStorage.getItem('authData');
				if (storedAuthData) {
					const parsedData = JSON.parse(storedAuthData);
					token = parsedData.token;
					if (parsedData.user && parsedData.user.name) {
						setUserName(parsedData.user.name);
					}
				}

				if (!token) {
					setLoading(false);
					return;
				}

				// 2. Fetch Stats
				const response = await fetch(`${BASE_BACKEND_URL}/api/exams/stats`, {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${token}`
					}
				});

				if (response.ok) {
					const data = await response.json();
					setQuizCount(data.total_quizzes);

					// Assumption: API returns time in SECONDS. 
					// If API returns milliseconds, divide by 1000 here.
					const timeValue = parseFloat(data.avg_time || data.average_time || data.time_spent || 0);
					setAvgTimeSeconds(timeValue);
				}
			} catch (error) {
				console.error("Failed to fetch banner stats:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	return (
		<div 
			className="rounded-2xl shadow p-6 flex items-center justify-between relative overflow-hidden bg-cover bg-center bg-no-repeat min-h-[250px] md:min-h-[300px]"
			style={{
				backgroundImage: "url('/banner.jpg')",
			}}
		>
			{/* Overlay */}
			<div className="absolute inset-0 bg-black/40 rounded-2xl"></div>

			<div className="flex items-start gap-4 relative z-10">
				<div className="w-20 h-20 rounded-lg bg-white/90 flex items-center justify-center flex-shrink-0 shadow-lg">
					<span className="text-3xl">🎓</span>
				</div>
				<div>
					<h2 className="text-2xl font-bold text-white drop-shadow-lg">
						Welcome, {userName}!
					</h2>
					<p className="text-sm text-white/90 drop-shadow">Track your quiz journey and achievements</p>

					<div className="mt-6 flex flex-wrap gap-4">
						{/* Box 1: Quizzes Taken */}
						<div className="bg-white/20 backdrop-blur-md p-3 px-5 rounded-xl text-center min-w-[110px] border border-white/20 shadow-inner">
							<div className="text-xs text-white/80 font-medium uppercase tracking-wider mb-1">Quizzes</div>
							<div className="text-2xl font-bold text-white">
								{loading ? <Loader2 className="w-5 h-5 animate-spin mx-auto"/> : quizCount}
							</div>
						</div>

						{/* Box 2: Avg Time (Min & Sec) */}
						<div className="bg-white/20 backdrop-blur-md p-3 px-5 rounded-xl text-center min-w-[110px] border border-white/20 shadow-inner">
							<div className="text-xs text-white/80 font-medium uppercase tracking-wider mb-1 flex items-center justify-center gap-1">
								 <Clock className="w-3 h-3" /> Avg Time
							</div>
							<div className="text-xl font-bold text-white flex items-center justify-center gap-1">
								 {loading ? (
									 <Loader2 className="w-5 h-5 animate-spin mx-auto"/> 
								 ) : (
									 formatTime(avgTimeSeconds)
								 )}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}