"use client";

import ScrollAnimation from "./ScrollAnimation";

const ArrowSolidOrange = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 70 70">
    <path
      d="M35 12C36 12 36.9 12.5 37.5 13.3L54.5 36.3C56.2 38.6 54.6 42 51.5 42H18.5C15.4 42 13.8 38.6 15.5 36.3L32.5 13.3C33.1 12.5 34 12 35 12Z"
      fill="#FF8A00"
      stroke="white"
      strokeWidth="6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function HowToCompeteSection() {
  return (
    <section id="how-it-works" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <ScrollAnimation direction="up" delay={0.1}>
          <h2 className="text-4xl font-bold text-black mb-12 text-center">
            How to Compete
          </h2>
        </ScrollAnimation>

        {/* Grid wrapper (forces equal box height) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-stretch">

          {/* ============ STEP 1 ============ */}
          <ScrollAnimation direction="up" delay={0.2}>
            <div className="
              h-full flex flex-col
              bg-white rounded-3xl p-8 shadow-[0_12px_40px_rgba(0,0,0,0.07)]
              relative overflow-hidden
            ">
              {/* Fade */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/80 pointer-events-none"></div>

              {/* Visual */}
              <div className="relative mb-8 flex flex-col items-center">
                {/* Tabs */}
                <div className="flex gap-4 justify-center mb-5">
                  <div className="px-6 py-2 bg-white rounded-full shadow-md text-gray-300 font-semibold text-sm">
                    Math Game
                  </div>
                  <div className="px-6 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full shadow-lg font-semibold text-sm">
                    Biology Game
                  </div>
                  <div className="px-6 py-2 bg-white rounded-full shadow-md text-gray-300 font-semibold text-sm">
                    Sports Game
                  </div>
                </div>

                {/* Arrow */}
                <ArrowSolidOrange className="w-16 h-16 drop-shadow-2xl" />
              </div>

              {/* Title & Description */}
              <div className="mt-auto text-center">
                <h3 className="text-xl font-bold text-black mb-3">
                  Step 1: Join an Arena
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Quickly join an open room or create a private one to challenge
                  your friends in your favorite category.
                </p>
              </div>
            </div>
          </ScrollAnimation>

          {/* ============ STEP 2 ============ */}
          <ScrollAnimation direction="up" delay={0.3}>
            <div className="
              h-full flex flex-col
              bg-white rounded-3xl p-8 shadow-[0_12px_40px_rgba(0,0,0,0.07)]
              relative overflow-hidden
            ">
              {/* Fade */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/80 pointer-events-none"></div>

              {/* Visual */}
              <div className="relative mb-8 flex flex-col justify-between flex-1">

                {/* Card 1 — top */}
                <div className="
                  bg-white shadow-lg rounded-2xl px-6 py-6 
                  flex items-center gap-3
                  h-1/2
                ">
                  <div className="flex gap-1 text-gray-400 text-xl">• • •</div>
                  <img
                    src="https://api.dicebear.com/8.x/notionists/svg?seed=Phoenix"
                    className="w-12 h-12 rounded-full"
                    alt=""
                  />
                </div>

                {/* Card 2 — bottom */}
                <div className="
                  bg-white shadow-lg rounded-2xl px-6 py-6 
                  flex items-center gap-3
                  h-1/2 mt-6
                ">
                  <div className="flex gap-1 text-gray-400 text-xl">• • •</div>
                  <img
                    src="https://api.dicebear.com/8.x/notionists/svg?seed=Mohaimen"
                    className="w-12 h-12 rounded-full"
                    alt=""
                  />
                </div>
              </div>

              {/* Text */}
              <div className="mt-auto text-center">
                <h3 className="text-xl font-bold text-black mb-3">
                  Step 2: Answer Smart & Fast
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Face challenging questions where your speed and accuracy are key
                  to dominating the match.
                </p>
              </div>
            </div>
          </ScrollAnimation>

          {/* ============ STEP 3 ============ */}
          <ScrollAnimation direction="up" delay={0.4}>
            <div className="
              h-full flex flex-col
              bg-white rounded-3xl p-8 shadow-[0_12px_40px_rgba(0,0,0,0.07)]
              relative overflow-hidden
            ">
              {/* Fade */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/85 pointer-events-none"></div>

              {/* Visual */}
              <div className="relative mb-8 space-y-4">

                <div className="
                  bg-gradient-to-r from-orange-500 to-orange-600
                  rounded-2xl px-6 py-4 shadow-xl flex items-center gap-4
                ">
                  <span className="text-white font-bold text-lg">1</span>
                  <span className="text-green-300 text-xl">▲</span>
                  <div className="flex-1 text-white font-semibold">
                    32 Point — Roshdy
                  </div>
                  <img
                    src="https://api.dicebear.com/8.x/notionists/svg?seed=Roshdy"
                    className="w-10 h-10 rounded-full"
                    alt=""
                  />
                </div>

                <div className="
                  bg-white rounded-2xl px-6 py-4 shadow-md flex items-center gap-4 opacity-50
                ">
                  <span className="text-gray-700 font-bold text-lg">2</span>
                  <span className="text-red-500 text-xl">▼</span>
                  <div className="flex-1 text-gray-500 font-semibold">
                    24 Point — Phoenix
                  </div>
                  <img
                    src="https://api.dicebear.com/8.x/notionists/svg?seed=Phoenix"
                    className="w-10 h-10 rounded-full opacity-60"
                    alt=""
                  />
                </div>
              </div>

              {/* Text */}
              <div className="mt-auto text-center">
                <h3 className="text-xl font-bold text-black mb-3">
                  Step 3: Climb the Leaderboard
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  See your results instantly and watch your name rise on the global
                  and friends leaderboards.
                </p>
              </div>
            </div>
          </ScrollAnimation>

        </div>
      </div>
    </section>
  );
}
