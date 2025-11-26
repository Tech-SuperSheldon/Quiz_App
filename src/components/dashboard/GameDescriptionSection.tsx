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
    <section id="what-is-room" className="py-16 px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Side - Description */}
        <ScrollAnimation direction="right" delay={0.1}>
          <div>
            <p className="text-lg text-black leading-relaxed">
              <span className="text-orange-500 font-semibold">LEVEL UP</span>{" "}
              is a competitive learning arena built for students who want to
              challenge themselves and rise above the ordinary. Here, every quiz
              is a real-time battle where you face other players, test your
              skills, and push your limits. Earn XP, track accuracy, improve
              your speed, and become the smartest student in your year — whether
              you&apos;re preparing for NAPLAN, Selective Exam, ICAS, 11+, GCSE,
              or A-Level.
              <br />
              It&apos;s more than a quiz. It&apos;s your training ground for
              academic mastery.
            </p>
          </div>
        </ScrollAnimation>

        {/* Right Side - Exam Types Grid */}
        <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {examTypes.map((exam, index) => (
            <motion.button
              key={index}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={
                isInView
                  ? { opacity: 1, scale: 1, y: 0 }
                  : { opacity: 0, scale: 0.8, y: 20 }
              }
              transition={{
                duration: 0.4,
                delay: index * 0.05,
                ease: [0.25, 0.25, 0, 1],
              }}
              className={`${examColors[index % examColors.length]} text-white px-4 py-3 rounded-full text-sm font-medium hover:opacity-90 transition shadow-md hover:shadow-lg hover:scale-105`}
            >
              {exam}
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}

