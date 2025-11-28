"use client";
import QuizHeroBanner from "./QuizHeroBanner";
import QuizStatCards from "./QuizStatCards";
import QuizProgressCard from "./QuizProgressCard";
import QuizCategoryCard from "./QuizCategoryCard";
import QuizSourceCard from "./QuizSourceCard";
import QuizActivityCard from "./QuizActivityCard";
import QuizYearlySummaryCard from "./QuizYearlySummaryCard";
import TopQuizzesCard from "./TopQuizzesCard";
import RecentQuizActivityCard from "./RecentQuizActivityCard";

export default function DashboardLanding() {
  return (
    <section className="space-y-6">
      <QuizHeroBanner />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <QuizStatCards />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 space-y-4">
          <QuizProgressCard />
          <TopQuizzesCard />
        </div>
        <div className="space-y-4">
          <QuizCategoryCard />
          <QuizSourceCard />
          <QuizActivityCard />
          <QuizYearlySummaryCard />
        </div>
      </div>
      <RecentQuizActivityCard />
    </section>
  );
}
