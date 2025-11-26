"use client";

import { motion } from "framer-motion";
import {
  AcademicCapIcon,
  TrophyIcon,
  BookOpenIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";

export default function DashboardPage() {
  const sections = [
    {
      title: "Quizzes",
      icon: AcademicCapIcon,
      color: "from-indigo-500 to-blue-500",
      gradient: "bg-gradient-to-br from-indigo-500 to-blue-500",
      stats: ["5 Active", "12 Completed", "85% Avg"],
      progress: 85,
    },
    {
      title: "Leaderboard",
      icon: TrophyIcon,
      color: "from-amber-500 to-orange-500",
      gradient: "bg-gradient-to-br from-amber-500 to-orange-500",
      stats: ["Rank #8", "Top 10%", "+2 Positions"],
      progress: 90,
    },
    {
      title: "Courses",
      icon: BookOpenIcon,
      color: "from-purple-500 to-pink-500",
      gradient: "bg-gradient-to-br from-purple-500 to-pink-500",
      stats: ["3 Enrolled", "2 Completed", "78% Progress"],
      progress: 78,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: (t: number) => 1 - Math.pow(1 - t, 2), // easeOut
      },
    },
  };

  return (
    <div className="space-y-6">
      {" "}
      {/* Reduced from space-y-8 */}
      {/* Header Section - Smaller Text */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-left relative"
      >
        <div className="flex items-center gap-2 mb-1">
          {" "}
          {/* Reduced gap and margin */}
          <SparklesIcon className="h-6 w-6 text-yellow-500 animate-pulse" />{" "}
          {/* Smaller icon */}
          <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Welcome Back 👋
          </h1>
        </div>
        <p className="text-sm text-gray-600 max-w-2xl">
          {" "}
          {/* Smaller text */}
          Continue your learning journey with personalized quizzes and
          interactive lessons tailored just for you.
        </p>
      </motion.div>
      {/* Cards Section */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6"
      >
        {sections.map((section, i) => (
          <motion.div
            key={section.title}
            variants={itemVariants}
            whileHover={{
              scale: 1.02, // Reduced hover scale
              y: -2,
              transition: { duration: 0.2 },
            }}
            className="group relative overflow-hidden rounded-2xl"
          >
            {/* Background Glow Effect */}
            <div
              className={`absolute inset-0 ${section.gradient} opacity-0 group-hover:opacity-5 blur-xl transition-opacity duration-500`}
            ></div>

            <div className="relative p-4 rounded-xl bg-white/90 backdrop-blur-lg border border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-500">
              {/* Header with Icon */}
              <div className="flex items-center justify-between mb-3">
                <div
                  className={`p-2 rounded-lg bg-gradient-to-r ${section.color} shadow-md`}
                >
                  {" "}
                  {/* Smaller padding */}
                  <section.icon className="h-5 w-5 text-white" />{" "}
                  {/* Smaller icon */}
                </div>
                <div className="text-right">
                  <span className="text-lg font-bold text-gray-800">
                    {" "}
                    {/* Smaller text */}
                    {section.progress}%
                  </span>
                  <div className="w-12 h-1 bg-gray-200 rounded-full mt-1 overflow-hidden">
                    {" "}
                    {/* Smaller progress bar */}
                    <div
                      className={`h-full bg-gradient-to-r ${section.color} rounded-full transition-all duration-1000`}
                      style={{ width: `${section.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Title */}
              <h3 className="text-base font-bold mb-2 text-gray-800 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-indigo-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-300">
                {section.title}
              </h3>

              {/* Stats List */}
              <ul className="space-y-1">
                {" "}
                {/* Reduced spacing */}
                {section.stats.map((s, j) => (
                  <motion.li
                    key={j}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 + j * 0.1 }}
                    className="flex items-center gap-2 text-xs text-gray-600 hover:text-gray-800 transition-colors duration-200"
                  >
                    <div
                      className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${section.color}`}
                    ></div>
                    {s}
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </motion.div>
      {/* CTA Section - Smaller */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        whileHover={{
          scale: 1.01, // Reduced hover effect
          transition: { duration: 0.2 },
        }}
        className="relative overflow-hidden group"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-500 group-hover:from-indigo-500 group-hover:to-purple-400 transition-all duration-500"></div>

        <div className="relative bg-gradient-to-r from-indigo-600 to-purple-500 text-white py-4 px-6 rounded-xl text-center font-semibold shadow-xl">
          {" "}
          {/* Smaller padding */}
          <div className="flex items-center justify-center gap-2">
            <SparklesIcon className="h-5 w-5 animate-bounce" />{" "}
            {/* Smaller icons */}
            <span className="text-base">
              Ready to learn? Start a quiz now!
            </span>{" "}
            {/* Smaller text */}
            <SparklesIcon className="h-5 w-5 animate-bounce delay-150" />
          </div>
          <p className="text-indigo-100 mt-1 text-xs font-normal">
            {" "}
            {/* Smaller text */}
            Explore new challenges and track your progress
          </p>
        </div>
      </motion.div>
    </div>
  );
}
