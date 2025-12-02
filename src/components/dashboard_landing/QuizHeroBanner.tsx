"use client";
import React, { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

export default function QuizHeroBanner() {
	const [userName, setUserName] = useState("Student");
	const [quizCount, setQuizCount] = useState(0);
	const [avgScore, setAvgScore] = useState(0); // Using Accuracy as the second metric
	const [loading, setLoading] = useState(true);

	// Backend URL
	const BASE_BACKEND_URL = "https://92c52865-c657-478a-b2e0-625fc822f55b-00-23crg2t5cyi67.pike.replit.dev:5000";

	useEffect(() => {
		const fetchData = async () => {
			let token = null;

			try {
				// 1. Get User Details from Local Storage
				const storedAuthData = localStorage.getItem('authData');
				if (storedAuthData) {
					const parsedData = JSON.parse(storedAuthData);

					// Set Token
					token = parsedData.token;

					// Set Name (if available)
					if (parsedData.user && parsedData.user.name) {
						setUserName(parsedData.user.name);
					}
				}

				if (!token) {
						setLoading(false);
						return;
				}

				// 2. Fetch Quiz Stats from API
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
					setAvgScore(data.accuracy); // reusing accuracy for the second box
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
			{/* Overlay for better text readability */}
			<div className="absolute inset-0 bg-black/30 rounded-2xl"></div>

			<div className="flex items-start gap-4 relative z-10">
				<div className="w-20 h-20 rounded-lg bg-white/90 flex items-center justify-center flex-shrink-0">
					<span className="text-3xl">🎓</span>
				</div>
				<div>
					{/* Dynamic User Name */}
					<h2 className="text-2xl font-bold text-white drop-shadow-lg">
						Welcome, {userName}!
					</h2>
					<p className="text-sm text-white/90 drop-shadow">Track your quiz journey and achievements</p>

					<div className="mt-4 flex gap-4">
						<div className="bg-white/20 backdrop-blur-sm p-3 rounded-lg text-center min-w-[100px] border border-white/30">
							<div className="text-sm text-white/90">Quizzes Taken</div>
							<div className="text-xl font-semibold text-white">
								{loading ? <Loader2 className="w-5 h-5 animate-spin mx-auto"/> : quizCount}
							</div>
						</div>

						{/* I mapped "Completion Rate" to "Avg Accuracy" as it's real data we have */}
						<div className="bg-white/20 backdrop-blur-sm p-3 rounded-lg text-center min-w-[100px] border border-white/30">
							<div className="text-sm text-white/90">Avg. Score</div>
							<div className="text-xl font-semibold text-white">
								 {loading ? <Loader2 className="w-5 h-5 animate-spin mx-auto"/> : `${avgScore}%`}
							</div>
						</div>
					</div>
				</div>
			</div>
			{/* <div className="hidden md:block">
				<img alt="hero" src="/1.png" className="w-50 h-50 object-cover -mb-6" />
			</div> */}
		</div>
	);
}