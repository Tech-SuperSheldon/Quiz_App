"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  HomeIcon,
  BookOpenIcon,
  AcademicCapIcon,
  TrophyIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
  Cog6ToothIcon
} from "@heroicons/react/24/outline";
import { SettingsIcon } from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: HomeIcon },
    { href: "/dashboard/courses", label: "Courses", icon: BookOpenIcon },
    { href: "/dashboard/quizzes", label: "Quizzes", icon: AcademicCapIcon },
    { href: "/dashboard/leaderboard", label: "Leaderboard", icon: TrophyIcon },
    { href: "/dashboard/settings", label: "Settings", icon: SettingsIcon },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  // Check if we're on a quiz page for thin sidebar
  const isQuizPage = pathname.includes('/quizzes/');

  if (isQuizPage) {
    return (
      <div className="h-full bg-gradient-to-b from-purple-700 via-indigo-700 to-blue-800 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 shadow-2xl flex flex-col relative overflow-hidden w-16">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/5 rounded-full blur-xl"></div>
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-blue-400/10 rounded-full blur-xl"></div>
        </div>

        {/* Header - Fixed Height */}
        <div className="relative z-10 p-4 pb-3 text-center border-b border-white/10 flex-shrink-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="p-1.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg shadow-lg">
              <AcademicCapIcon className="h-4 w-4 text-white" />
            </div>
          </motion.div>
        </div>

        {/* Navigation - Flexible Height with Scroll */}
        <nav className="flex-1 py-3 relative z-10 overflow-y-auto custom-scrollbar">
          <div className="space-y-1 px-2">
            {navItems.map(({ href, label, icon: Icon }) => {
              const isActive = pathname === href || (href !== "/dashboard" && pathname.startsWith(href));

              return (
                <motion.div
                  key={href}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link
                    href={href}
                    className={`
                      flex items-center justify-center p-2 rounded-lg transition-all duration-300 group relative
                      ${
                        isActive
                          ? "bg-white/20 text-white shadow-lg backdrop-blur-sm"
                          : "text-blue-100 hover:bg-white/15 hover:text-white hover:shadow-md"
                      }
                    `}
                    title={label}
                  >
                    {/* Active Indicator */}
                    {isActive && (
                      <motion.div
                        className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-pink-400 to-purple-400 rounded-r shadow-lg"
                        layoutId="activeIndicator"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}

                    <Icon
                      className={`h-5 w-5 transition-transform duration-300 ${
                        isActive ? "text-white scale-110" : "text-blue-200 group-hover:scale-110 group-hover:text-white"
                      }`}
                    />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </nav>

        {/* Footer - Fixed Height */}
        <div className="relative z-10 p-2 border-t border-white/10 space-y-1 flex-shrink-0">
         
          {/* Logout Button */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href="/auth/login"
              className="flex items-center justify-center p-2 rounded-lg text-blue-100 hover:bg-red-500/30 hover:text-white transition-all duration-300 group"
              title="Logout"
            >
              <ArrowRightOnRectangleIcon className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  // Regular Sidebar for non-quiz pages
  return (
    <div className="h-full bg-gradient-to-b from-purple-700 via-indigo-700 to-blue-800 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 shadow-2xl flex flex-col relative overflow-hidden w-64">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/5 rounded-full blur-xl"></div>
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-blue-400/10 rounded-full blur-xl"></div>
      </div>

      {/* Header - Fixed Height */}
      <div className="relative z-10 p-6 pb-4 text-center border-b border-white/10 flex-shrink-0">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-center gap-2"
        >
          <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg shadow-lg">
            <AcademicCapIcon className="h-5 w-5 text-white" />
          </div>
         
        </motion.div>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 48 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="w-12 h-1 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full mx-auto mt-2 shadow-lg"
        ></motion.div>
      </div>

      {/* Navigation - Flexible Height with Scroll */}
      <nav className="flex-1 px-4 py-4 relative z-10 overflow-y-auto custom-scrollbar">
        <motion.ul
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-1"
        >
          {navItems.map(({ href, label, icon: Icon }) => {
            const isActive =
              pathname === href || (href !== "/dashboard" && pathname.startsWith(href));

            return (
              <motion.li
                key={href}
                variants={itemVariants}
                whileHover={{ 
                  x: 3,
                  transition: { duration: 0.2 }
                }}
              >
                <Link
                  href={href}
                  className={`flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-semibold transition-all duration-300 group relative overflow-hidden ${
                    isActive
                      ? "bg-white/20 text-white shadow-lg backdrop-blur-sm"
                      : "text-blue-100 hover:bg-white/15 hover:text-white hover:shadow-md"
                  }`}
                >
                  {/* Active Indicator */}
                  {isActive && (
                    <motion.div
                      className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-pink-400 to-purple-400 rounded-r shadow-lg"
                      layoutId="activeIndicator"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}

                  {/* Animated Icon */}
                  <div className={`p-1.5 rounded-md transition-all duration-300 ${
                    isActive 
                      ? "bg-white/20 shadow-inner" 
                      : "bg-white/5 group-hover:bg-white/10"
                  }`}>
                    <Icon
                      className={`h-4 w-4 transition-transform duration-300 ${
                        isActive ? "text-white scale-110" : "text-blue-200 group-hover:scale-110 group-hover:text-white"
                      }`}
                    />
                  </div>

                  <span className="relative text-sm">
                    {label}
                  </span>

                  {/* Hover Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                </Link>
              </motion.li>
            );
          })}
        </motion.ul>
      </nav>

      {/* Footer - Fixed Height */}
      <div className="relative z-10 p-4 border-t border-white/10 space-y-2 flex-shrink-0">
       

        {/* Logout Button */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
        >
          <Link
            href="/auth/login"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-blue-100 hover:bg-red-500/30 hover:text-white transition-all duration-300 group border border-white/10 hover:border-red-400/30"
          >
            <ArrowRightOnRectangleIcon className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
            <span className="font-semibold text-sm">Logout</span>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}