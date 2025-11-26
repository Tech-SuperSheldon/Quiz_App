"use client";
import ScrollAnimation from "./ScrollAnimation";

export default function KeyFeaturesSection() {
  const features = [
    {
      title: "Smart Matching",
      description:
        "Our algorithm pairs you with opponents at your skill level, ensuring every match is a fair and engaging challenge.",
      visual: (
        <div className="flex items-center justify-center gap-4">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold mb-2">
              P1
            </div>
            <div className="text-xs text-gray-600">2434</div>
          </div>
          <span className="text-orange-500 font-bold text-2xl">VS</span>
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-gray-400 flex items-center justify-center text-white font-bold mb-2">
              P2
            </div>
            <div className="text-xs text-gray-600">2435</div>
          </div>
        </div>
      ),
    },
    {
      title: "Expert-Crafted Questions",
      description:
        "Our questions are developed by experts to be insightful and genuinely challenging, not just random trivia.",
      visual: (
        <div className="space-y-3">
          <div className="px-4 py-2 bg-orange-500 text-white rounded-full flex items-center justify-between">
            <span className="font-medium">Question 1</span>
            <span className="text-green-500">✓</span>
          </div>
          <div className="px-4 py-2 bg-gray-200 rounded-full flex items-center justify-between">
            <span className="font-medium text-gray-700">Question 2</span>
            <span className="text-gray-500 text-sm">1:34</span>
          </div>
        </div>
      ),
    },
    {
      title: "Fast-Paced Rounds",
      description:
        "Each match is just two minutes long. A perfect mental workout for your coffee break or downtime.",
      visual: (
        <div className="flex items-center justify-center">
          <div className="w-24 h-24 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-2xl shadow-lg">
            2:00
          </div>
        </div>
      ),
    },
  ];

  return (
    <section id="key-features" className="py-16 px-6 max-w-7xl mx-auto">
      <ScrollAnimation direction="up" delay={0.1}>
        <h2 className="text-4xl font-bold text-black mb-12 text-center">
          Key Features
        </h2>
      </ScrollAnimation>
      <div className="space-y-8">
        {features.map((feature, index) => (
          <ScrollAnimation key={index} direction={index % 2 === 0 ? "left" : "right"} delay={0.2 + index * 0.15}>
          <div
            className={`flex flex-col ${
              index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
            } items-center gap-8 bg-white rounded-2xl p-8 shadow-lg`}
          >
            <div className="flex-1">{feature.visual}</div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-black mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                {feature.description}
              </p>
            </div>
          </div>
          </ScrollAnimation>
        ))}
      </div>
    </section>
  );
}

