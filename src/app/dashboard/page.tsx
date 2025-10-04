"use client";

import { motion } from "framer-motion";
import {
  BookOpenIcon,
  TrophyIcon,
  AcademicCapIcon,
} from "@heroicons/react/24/outline";

export default function DashboardPage() {
  const sections = [
    {
      title: "Quizzes",
      icon: AcademicCapIcon,
      color: "from-blue-500 to-cyan-500",
      items: ["5 Active", "12 Completed", "85% Avg"],
    },
    {
      title: "Leaderboard",
      icon: TrophyIcon,
      color: "from-amber-500 to-orange-500",
      items: ["Rank #8", "Top 10%", "+2 Positions"],
    },
    {
      title: "Courses",
      icon: BookOpenIcon,
      color: "from-purple-500 to-pink-500",
      items: ["3 Enrolled", "2 Completed", "78% Progress"],
    },
  ];

  return (
    <div className="h-full p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Super Sheldon</h1>
        <p className="text-gray-500">Learn • Compete • Grow</p>
      </motion.div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {sections.map((section, index) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl p-4 shadow-md border"
          >
            <div
              className={`inline-flex p-2 rounded-lg bg-gradient-to-r ${section.color} mb-3`}
            >
              <section.icon className="h-5 w-5 text-white" />
            </div>

            <h3 className="font-bold text-gray-800 text-lg mb-3">
              {section.title}
            </h3>

            <div className="space-y-1">
              {section.items.map((item, itemIndex) => (
                <div key={itemIndex} className="text-sm text-gray-600">
                  • {item}
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Status */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl p-4 text-white text-center mt-4"
      >
        <div className="text-sm font-medium">Ready to learn? Start a quiz!</div>
      </motion.div>
    </div>
  );
}
