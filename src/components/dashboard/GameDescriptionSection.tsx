// "use client";
// import ScrollAnimation from "./ScrollAnimation";
// import { motion } from "framer-motion";
// import { useRef } from "react";
// import { useInView } from "framer-motion";

// const examTypes = [
//   "GCSE Exam",
//   "A-Level Exam",
//   "ICAS Exam",
//   "NAPLAN Exam",
//   "Selective School Exam",
//   "11+ Grammar Exam",
//   "Allwell Assessment",
//   "SAT Exam",
//   "PSAT Exam",
//   "Olympiad Exam",
//   "Year 7 Entrance Exam",
//   "Scholarship Exam",
// ];

// const examColors = [
//   "bg-purple-500",
//   "bg-green-500",
//   "bg-pink-500",
//   "bg-blue-500",
//   "bg-yellow-500",
//   "bg-indigo-500",
//   "bg-teal-500",
//   "bg-red-500",
//   "bg-cyan-500",
//   "bg-amber-500",
//   "bg-emerald-500",
//   "bg-violet-500",
// ];

// export default function GameDescriptionSection() {
//   const gridRef = useRef(null);
//   const isInView = useInView(gridRef, { once: true, margin: "-50px" });

//   return (
//     <section id="what-is-room" className="py-16 px-6 max-w-7xl mx-auto">
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
//         {/* Left Side - Description */}
//         <ScrollAnimation direction="right" delay={0.1}>
//           <div>
//             <p className="text-lg text-black leading-relaxed">
//               <span className="text-orange-500 font-semibold">LEVEL UP</span>{" "}
//               is a competitive learning arena built for students who want to
//               challenge themselves and rise above the ordinary. Here, every quiz
//               is a real-time battle where you face other players, test your
//               skills, and push your limits. Earn XP, track accuracy, improve
//               your speed, and become the smartest student in your year — whether
//               you&apos;re preparing for NAPLAN, Selective Exam, ICAS, 11+, GCSE,
//               or A-Level.
//               <br />
//               It&apos;s more than a quiz. It&apos;s your training ground for
//               academic mastery.
//             </p>
//           </div>
//         </ScrollAnimation>

//         {/* Right Side - Exam Types Grid */}
//         <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-3 gap-3">
//           {examTypes.map((exam, index) => (
//             <motion.button
//               key={index}
//               initial={{ opacity: 0, scale: 0.8, y: 20 }}
//               animate={
//                 isInView
//                   ? { opacity: 1, scale: 1, y: 0 }
//                   : { opacity: 0, scale: 0.8, y: 20 }
//               }
//               transition={{
//                 duration: 0.4,
//                 delay: index * 0.05,
//                 ease: [0.25, 0.25, 0, 1],
//               }}
//               className={`${examColors[index % examColors.length]} text-white px-4 py-3 rounded-full text-sm font-medium hover:opacity-90 transition shadow-md hover:shadow-lg hover:scale-105`}
//             >
//               {exam}
//             </motion.button>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }







"use client";

import ScrollAnimation from "./ScrollAnimation";
import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";

const examTypes = [
  "GCSE Exam",
  "A-Level Exam",
  "ICAS Exam",
  "NAPLAN Exam",
  "Selective School Exam",
  "11+ Grammar Exam",
  "Allwell Assessment",
  "SAT Exam",
  "PSAT Exam",
  "Olympiad Exam",
  "Year 7 Entrance Exam",
  "Scholarship Exam",
];

const examColors = [
  "bg-purple-500",
  "bg-green-500",
  "bg-pink-500",
  "bg-blue-500",
  "bg-yellow-500",
  "bg-indigo-500",
  "bg-teal-500",
  "bg-red-500",
  "bg-cyan-500",
  "bg-amber-500",
  "bg-emerald-500",
  "bg-violet-500",
];

export default function GameDescriptionSection() {
  const gridRef = useRef(null);
  const isInView = useInView(gridRef, { once: true, margin: "-50px" });

  return (
    <section
      id="what-is-room"
      className="py-16 md:py-20 px-4 md:px-6 max-w-7xl mx-auto"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* LEFT SIDE */}
        <ScrollAnimation direction="right" delay={0.1}>
          <div className="space-y-6 text-center lg:text-left">
            <h2 className="text-3xl md:text-4xl font-extrabold text-black leading-tight">
              What is <span className="text-orange-500">LEVEL UP</span>?
            </h2>

            <p className="text-base md:text-lg text-black/80 leading-relaxed md:pr-10">
              <span className="text-orange-500 font-semibold">LEVEL UP</span> is a
              competitive learning arena built for students seeking a challenge.
              Every quiz becomes a real-time battle where you face other players,
              test your speed, sharpen your accuracy, and build academic mastery.
              Whether you're preparing for NAPLAN, Selective School, ICAS, SAT,
              GCSE, A-Level or more — Level Up pushes you beyond ordinary study.
              <br /><br />
              Rise through ranks. Track your strengths. Unlock your potential.
            </p>
          </div>
        </ScrollAnimation>

        {/* RIGHT SIDE — Flex-Wrap Pill Wall (NO OVERLAP) */}
        <div
          ref={gridRef}
          className="
            flex flex-wrap 
            gap-3 sm:gap-4 md:gap-5
          "
        >
          {examTypes.map((exam, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.85, y: 30 }}
              animate={
                isInView
                  ? { opacity: 1, scale: 1, y: 0 }
                  : { opacity: 0, scale: 0.85, y: 30 }
              }
              transition={{
                duration: 0.45,
                delay: index * 0.05,
                ease: [0.25, 0.25, 0, 1],
              }}
            >
              <button
                className={`
                  ${examColors[index % examColors.length]}
                  text-white 
                  rounded-full 
                  font-semibold 
                  text-xs sm:text-sm md:text-base
                  
                  px-4 sm:px-5 md:px-6
                  py-2 sm:py-2.5 md:py-3

                  shadow-md hover:shadow-xl 
                  hover:scale-105 
                  transition

                  whitespace-nowrap
                `}
              >
                {exam}
              </button>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

