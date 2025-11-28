// "use client";
// import ScrollAnimation from "./ScrollAnimation";

// export default function KeyFeaturesSection() {
//   const features = [
//     {
//       title: "Smart Matching",
//       description:
//         "Our algorithm pairs you with opponents at your skill level, ensuring every match is a fair and engaging challenge.",
//       visual: (
//         <div className="flex items-center justify-center gap-4">
//           <div className="text-center">
//             <div className="w-16 h-16 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold mb-2">
//               P1
//             </div>
//             <div className="text-xs text-gray-600">2434</div>
//           </div>
//           <span className="text-orange-500 font-bold text-2xl">VS</span>
//           <div className="text-center">
//             <div className="w-16 h-16 rounded-full bg-gray-400 flex items-center justify-center text-white font-bold mb-2">
//               P2
//             </div>
//             <div className="text-xs text-gray-600">2435</div>
//           </div>
//         </div>
//       ),
//     },
//     {
//       title: "Expert-Crafted Questions",
//       description:
//         "Our questions are developed by experts to be insightful and genuinely challenging, not just random trivia.",
//       visual: (
//         <div className="space-y-3">
//           <div className="px-4 py-2 bg-orange-500 text-white rounded-full flex items-center justify-between">
//             <span className="font-medium">Question 1</span>
//             <span className="text-green-500">✓</span>
//           </div>
//           <div className="px-4 py-2 bg-gray-200 rounded-full flex items-center justify-between">
//             <span className="font-medium text-gray-700">Question 2</span>
//             <span className="text-gray-500 text-sm">1:34</span>
//           </div>
//         </div>
//       ),
//     },
//     {
//       title: "Fast-Paced Rounds",
//       description:
//         "Each match is just two minutes long. A perfect mental workout for your coffee break or downtime.",
//       visual: (
//         <div className="flex items-center justify-center">
//           <div className="w-24 h-24 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-2xl shadow-lg">
//             2:00
//           </div>
//         </div>
//       ),
//     },
//   ];

//   return (
//     <section id="key-features" className="py-16 px-6 max-w-7xl mx-auto">
//       <ScrollAnimation direction="up" delay={0.1}>
//         <h2 className="text-4xl font-bold text-black mb-12 text-center">
//           Key Features
//         </h2>
//       </ScrollAnimation>
//       <div className="space-y-8">
//         {features.map((feature, index) => (
//           <ScrollAnimation key={index} direction={index % 2 === 0 ? "left" : "right"} delay={0.2 + index * 0.15}>
//           <div
//             className={`flex flex-col ${
//               index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
//             } items-center gap-8 bg-white rounded-2xl p-8 shadow-lg`}
//           >
//             <div className="flex-1">{feature.visual}</div>
//             <div className="flex-1">
//               <h3 className="text-2xl font-bold text-black mb-4">
//                 {feature.title}
//               </h3>
//               <p className="text-gray-600 text-lg leading-relaxed">
//                 {feature.description}
//               </p>
//             </div>
//           </div>
//           </ScrollAnimation>
//         ))}
//       </div>
//     </section>
//   );
// }









"use client";

import ScrollAnimation from "./ScrollAnimation";

export default function KeyFeaturesSection() {
  return (
    <section id="key-features" className="py-20 px-6 max-w-7xl mx-auto">

      {/* Title */}
      <ScrollAnimation direction="up" delay={0.1}>
        <h2 className="text-4xl font-bold text-black mb-12 text-left md:text-left">
          Key Features
        </h2>
      </ScrollAnimation>

      {/* FIRST ROW — Smart Matching */}
      <ScrollAnimation direction="up" delay={0.2}>
        <div className="
          bg-white rounded-3xl p-10 shadow-[0_12px_40px_rgba(0,0,0,0.06)]
          flex flex-col md:flex-row items-center justify-between gap-10
          relative overflow-hidden
        ">
          {/* Fade */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/80 pointer-events-none" />

          {/* VS Visual */}
          <div className="flex flex-col md:flex-row items-center gap-6 flex-1">
            {/* Player 1 */}
            <div className="text-center">
              <img
                src="https://api.dicebear.com/8.x/notionists/svg?seed=Roshdy"
                className="w-20 h-20 rounded-full mb-2"
                alt=""
              />
              <div className="text-gray-700 font-semibold">2434</div>
            </div>

            <span className="text-orange-500 font-bold text-3xl">VS</span>

            {/* Player 2 */}
            <div className="text-center">
              <img
                src="https://api.dicebear.com/8.x/notionists/svg?seed=Mohaimen"
                className="w-20 h-20 rounded-full mb-2"
                alt=""
              />
              <div className="text-gray-700 font-semibold">2435</div>
            </div>
          </div>

          {/* Text */}
          <div className="flex-1 text-center md:text-right">
            <h3 className="text-2xl font-bold text-black mb-3">Smart Matching</h3>
            <p className="text-gray-600 text-lg leading-relaxed">
              Our algorithm pairs you with opponents at your skill level,
              ensuring every match is a fair and engaging challenge.
            </p>
          </div>
        </div>
      </ScrollAnimation>

      {/* SECOND ROW — Questions + Timer */}
      <div className="
        grid grid-cols-1 md:grid-cols-2 gap-10 mt-10
      ">

        {/* Expert-Crafted Questions */}
        <ScrollAnimation direction="left" delay={0.3}>
          <div className="
            bg-white rounded-3xl p-10 shadow-[0_12px_40px_rgba(0,0,0,0.06)]
            relative overflow-hidden flex flex-col gap-8
          ">
            {/* Fade */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/80 pointer-events-none" />

            {/* Visual */}
            <div className="space-y-4">
              <div className="
                bg-gradient-to-r from-orange-500 to-orange-600 text-white
                px-6 py-3 rounded-full flex items-center justify-between shadow-lg
              ">
                <span className="font-semibold">Question 1</span>
                <span className="text-white text-lg">✓</span>
              </div>

              <div className="
                bg-white px-6 py-3 rounded-full flex items-center justify-between
                shadow-md border border-gray-100
              ">
                <span className="font-semibold text-gray-700">Question 2</span>
                <span className="text-gray-500 text-sm">1:34</span>
              </div>
            </div>

            {/* Text */}
            <div>
              <h3 className="text-2xl font-bold text-black mb-3">
                Expert-Crafted Questions
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Our questions are developed by experts to be insightful and
                genuinely challenging, not just random trivia.
              </p>
            </div>
          </div>
        </ScrollAnimation>

        {/* Fast-Paced Rounds */}
        <ScrollAnimation direction="right" delay={0.35}>
          <div className="
            bg-white rounded-3xl p-10 shadow-[0_12px_40px_rgba(0,0,0,0.06)]
            relative overflow-hidden flex flex-col gap-8
          ">
            {/* Fade */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/80 pointer-events-none" />

            {/* Visual */}
            <div className="flex justify-center">
              <div className="
                w-28 h-28 rounded-full bg-gradient-to-r from-orange-500 to-orange-600
                flex items-center justify-center text-white font-bold text-3xl shadow-xl
              ">
                2:00
              </div>
            </div>

            {/* Text */}
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold text-black mb-3">
                Fast-Paced Rounds
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Each match is just two minutes long. A perfect mental workout for
                your coffee break or downtime.
              </p>
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
}
