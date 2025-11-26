"use client";

import HeroSection from "@/components/dashboard/HeroSection";
import GameDescriptionSection from "@/components/dashboard/GameDescriptionSection";
import HowToCompeteSection from "@/components/dashboard/HowToCompeteSection";
import KeyFeaturesSection from "@/components/dashboard/KeyFeaturesSection";
import FAQSection from "@/components/dashboard/FAQSection";
import MiddleCTASection from "@/components/dashboard/MiddleCTASection";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <main className="relative">
        <HeroSection />
        <GameDescriptionSection />
        <HowToCompeteSection />
        <KeyFeaturesSection />
        <FAQSection />
        <MiddleCTASection />
      </main>
    </div>
  );
}
