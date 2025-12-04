"use client";
import QuizHeroBanner from "./QuizHeroBanner";
import QuizStatCards from "./QuizStatCards";
import QuizProgressCard from "./QuizProgressCard";
// import QuizCategoryCard from "./QuizCategoryCard";
// import QuizSourceCard from "./QuizSourceCard";
import QuizActivityCard from "./QuizActivityCard";
import QuizYearlySummaryCard from "./QuizYearlySummaryCard";
import TopQuizzesCard from "./TopQuizzesCard";
import RecentQuizActivityCard from "./RecentQuizActivityCard";
import QuizzesCompletedCard from "./QuizzesCompletedCard";

export default function DashboardLanding() {
  return (
    <section className="space-y-4 pb-2">
      <QuizHeroBanner />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <QuizStatCards />
      </div>

      {/* Top Section: Quizzes Completed and Yearly Summary side by side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        <QuizzesCompletedCard />
        <QuizYearlySummaryCard />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        {/* Left Column: Progress Card */}
        <div className="lg:col-span-2">
          <QuizProgressCard />
        </div>

        {/* Right Column */}
        <div>
          <QuizActivityCard />
        </div>
      </div>

      {/* Top Quizzes Card spans full width */}
      <TopQuizzesCard />

      <RecentQuizActivityCard />
    </section>
  );
}