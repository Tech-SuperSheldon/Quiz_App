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
  ArrowRightOnRectangleIcon
} from "@heroicons/react/24/outline";

interface NavItem {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

export default function Sidebar() {
  const pathname = usePathname();

  const navItems: NavItem[] = [
    { href: "/dashboard", label: "Dashboard", icon: HomeIcon },
    { href: "/dashboard/courses", label: "Courses", icon: BookOpenIcon },
    { href: "/dashboard/quizzes", label: "Quizzes", icon: AcademicCapIcon },
    { href: "/dashboard/leaderboard", label: "Leaderboard", icon: TrophyIcon },
    { href: "/dashboard/profile", label: "Profile", icon: UserCircleIcon },
  ];

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { 
        duration: 0.4,
        ease: "easeOut"
      } 
    }
  };

  return (
    <div className="h-full bg-gradient-to-b from-indigo-600 via-purple-600 to-blue-700 shadow-2xl flex flex-col">
      {/* Header */}
      <div className="p-8 pb-6">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent mb-2">
            EduHub
          </h1>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-300 to-purple-300 rounded-full mx-auto"></div>
        </motion.div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-6">
        <motion.ul 
          className="space-y-3"
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: 0.1 }}
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || 
              (item.href !== "/dashboard" && pathname.startsWith(item.href));

            return (
              <motion.li key={item.href} variants={itemVariants}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-4 px-4 py-4 rounded-2xl text-lg font-semibold transition-all duration-300 group relative overflow-hidden
                    ${isActive 
                      ? "bg-white/20 text-white shadow-lg backdrop-blur-sm" 
                      : "text-blue-100 hover:bg-white/10 hover:text-white hover:shadow-md"
                    }`}
                >
                  {/* Active indicator */}
                  {isActive && (
                    <motion.div
                      className="absolute left-0 top-0 h-full w-1 bg-white rounded-r"
                      layoutId="activeIndicator"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  
                  <Icon className={`h-6 w-6 transition-transform duration-300 ${
                    isActive ? "text-white scale-110" : "text-blue-200 group-hover:scale-110"
                  }`} />
                  
                  <span className="relative z-10">{item.label}</span>
                </Link>
              </motion.li>
            );
          })}
        </motion.ul>
      </nav>

      {/* User & Logout */}
      <div className="p-6 border-t border-white/20">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="space-y-4"
        >
          {/* User Info */}
          <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/10 backdrop-blur-sm">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">JD</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-semibold text-sm truncate">John Doe</p>
              <p className="text-blue-200 text-xs">Premium Member</p>
            </div>
          </div>

          {/* Logout */}
          <Link
            href="/auth/login"
            className="flex items-center gap-4 px-4 py-3 rounded-2xl text-blue-100 hover:bg-red-500/20 hover:text-white transition-all duration-300 group"
          >
            <ArrowRightOnRectangleIcon className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
            <span className="font-semibold">Logout</span>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}