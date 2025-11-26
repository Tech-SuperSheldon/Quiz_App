"use client";
import ScrollAnimation from "./ScrollAnimation";

export default function HowToCompeteSection() {
  const steps = [
    {
      title: "Join an Arena",
      description:
        "Quickly join an open room or create a private one to challenge your friends in your favorite category.",
      visual: (
        <div className="bg-white rounded-lg p-4 shadow-md border-2 border-orange-500">
          <div className="text-sm font-semibold mb-2">Game</div>
          <div className="flex items-center gap-2">
            <div className="px-3 py-1 bg-orange-500 text-white rounded-full text-xs font-medium">
              Biology Game
            </div>
            <span className="text-orange-500">→</span>
            <div className="px-3 py-1 bg-gray-200 rounded-full text-xs">
              Sports G.
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Answer Smart & Fast",
      description:
        "Face challenging questions where your speed and accuracy are key to dominating the match.",
      visual: (
        <div className="bg-white rounded-lg p-4 shadow-md flex items-center justify-center gap-4">
          <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold">
            P1
          </div>
          <span className="text-orange-500 font-bold text-xl">VS</span>
          <div className="w-12 h-12 rounded-full bg-gray-400 flex items-center justify-center text-white font-bold">
            P2
          </div>
        </div>
      ),
    },
    {
      title: "Climb the Leaderboard",
      description:
        "See your results instantly and watch your name rise on the global and friends leaderboards.",
      visual: (
        <div className="bg-white rounded-lg p-4 shadow-md space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <span className="font-bold">1</span>
            <span className="font-semibold">32 Point</span>
            <span className="text-orange-500">Roshdy</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="font-bold">2</span>
            <span className="font-semibold">24 Point</span>
            <span className="text-orange-500">Phoenix</span>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section id="how-it-works" className="py-16 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <ScrollAnimation direction="up" delay={0.1}>
          <h2 className="text-4xl font-bold text-black mb-12 text-center">
            How to Compete
          </h2>
        </ScrollAnimation>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <ScrollAnimation key={index} direction="up" delay={0.2 + index * 0.1}>
            <div
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition"
            >
              <div className="mb-4">{step.visual}</div>
              <h3 className="text-xl font-bold text-black mb-3">
                Step {index + 1}: {step.title}
              </h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  );
}

