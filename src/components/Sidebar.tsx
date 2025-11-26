"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  HomeIcon,
  BookOpenIcon,
  AcademicCapIcon,
  TrophyIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";

export default function Sidebar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userPic, setUserPic] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [scrolling, setScrolling] = useState(false);
  const [collapsed, setCollapsed] = useState(false); // State to control sidebar collapse
  const pathname = usePathname();

  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: HomeIcon },  
    { href: "/dashboard/quizzes", label: "Quizzes", icon: AcademicCapIcon },
      ];

  // Handle scrolling for dynamic header size (optional)
  const handleScroll = () => {
    if (window.scrollY > 50) {
      setScrolling(true);
    } else {
      setScrolling(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  // Toggle sidebar collapse
  const toggleSidebar = () => {
    setCollapsed((prev) => !prev);
  };

  // Sidebar shrink for quiz page
  const isQuizPage = pathname.includes("/quizzes/");

  return (
    <div
      className={`h-full bg-gradient-to-b from-purple-700 via-indigo-700 to-blue-800 shadow-2xl flex flex-col relative transition-all duration-500 ${
        collapsed ? "w-16" : "w-64"
      }`}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/5 rounded-full blur-xl"></div>
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-blue-400/10 rounded-full blur-xl"></div>
      </div>

      {/* Sidebar Header */}
      <div
        className={`relative z-10 p-4 pb-3 text-center border-b border-white/10 flex-shrink-0 transition-all duration-500 ${
          collapsed ? "p-2" : "p-4"
        }`}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div
            className={`${
              collapsed ? "w-8 h-8" : "w-12 h-12"
            } p-1.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg shadow-lg`}
          >
            <AcademicCapIcon className="h-4 w-4 text-white" />
          </div>
        </motion.div>
      </div>

      {/* Toggle Sidebar Button */}
      <button
        className="absolute top-4 right-4 p-2 bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-full shadow-md transition-all duration-300 hover:scale-110"
        onClick={toggleSidebar}
      >
        <ArrowRightOnRectangleIcon className="h-5 w-5" />
      </button>

      {/* Sidebar Navigation */}
      <nav className="flex-1 py-3 relative z-10 overflow-y-auto custom-scrollbar">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-1 px-2"
        >
          {navItems.map(({ href, label, icon: Icon }) => {
            const isActive =
              pathname === href || (href !== "/dashboard" && pathname.startsWith(href));

            return (
              <motion.div key={href} variants={itemVariants}>
                <Link
                  href={href}
                  className={`flex items-center gap-3 p-3 rounded-lg text-sm font-semibold transition-all duration-300 group relative overflow-hidden ${
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
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  )}

                  {/* Animated Icon */}
                  <div
                    className={`${
                      collapsed ? "p-1" : "p-2"
                    } rounded-md transition-all duration-300 ${
                      isActive
                        ? "bg-white/20 shadow-inner"
                        : "bg-white/5 group-hover:bg-white/10"
                    }`}
                  >
                    <Icon
                      className={`h-4 w-4 transition-transform duration-300 ${
                        isActive
                          ? "text-white scale-110"
                          : "text-blue-200 group-hover:scale-110 group-hover:text-white"
                      }`}
                    />
                  </div>

                  {/* Label */}
                  {!collapsed && <span className="relative">{label}</span>}

                  {/* Hover Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </nav>

      {/* Sidebar Footer */}
      <div className="relative z-10 p-4 border-t border-white/10 space-y-2 flex-shrink-0">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link
            href="/auth/login"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-blue-100 hover:bg-red-500/30 hover:text-white transition-all duration-300 group border border-white/10 hover:border-red-400/30"
          >
            <ArrowRightOnRectangleIcon className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
            {!collapsed && <span className="font-semibold text-sm">Logout</span>}
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
