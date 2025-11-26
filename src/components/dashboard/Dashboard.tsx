"use client";
import Header from "./Header";
import HeroSection from "./HeroSection";
import GameDescriptionSection from "./GameDescriptionSection";
import HowToCompeteSection from "./HowToCompeteSection";
import KeyFeaturesSection from "./KeyFeaturesSection";
import FAQSection from "./FAQSection";
import MiddleCTASection from "./MiddleCTASection";
import Footer from "./Footer";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Header />
      <main className="relative">
        <HeroSection />
        <GameDescriptionSection />
        <HowToCompeteSection />
        <KeyFeaturesSection />
        <FAQSection />
        <MiddleCTASection />
      </main>
      <Footer />
    </div>
  );
}

