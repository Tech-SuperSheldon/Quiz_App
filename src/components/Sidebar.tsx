"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion"; // AnimatePresence might be useful for the toggle icon
import {
  HomeIcon,
  BookOpenIcon,
  AcademicCapIcon,
  TrophyIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";
// Import icons for toggle button
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid"; // Solid icons for toggle for better contrast

export default function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false); // New state for collapse
  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: HomeIcon },
    { href: "/dashboard/courses", label: "Courses", icon: BookOpenIcon },
    { href: "/dashboard/quizzes", label: "Quizzes", icon: AcademicCapIcon },
    { href: "/dashboard/leaderboard", label: "Leaderboard", icon: TrophyIcon },
  ];

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

  // Check if we're on a quiz page for thin sidebar
  const isQuizPage = pathname.includes("/quizzes/");

  // Determine final width based on quiz page or collapsed state
  const sidebarWidthClass = isQuizPage
    ? "w-16" // Quiz page always overrides to thin
    : isCollapsed
      ? "w-20" // Collapsed (slightly wider than quiz page thin for toggle button visibility)
      : "w-64"; // Expanded

  // General sidebar structure (applies to both quiz and regular, with overrides for quiz)
  const renderSidebarContent = (isThin: boolean) => (
    <>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/5 rounded-full blur-xl"></div>
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-blue-400/10 rounded-full blur-xl"></div>
      </div>

      {/* Header - Fixed Height */}
      <div
        className={`relative z-10 ${
          isThin ? "p-4 pb-3" : "p-6 pb-4"
        } text-center border-b border-white/10 flex-shrink-0 flex ${isThin ? 'justify-center' : 'justify-between items-center'}`}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className={`flex items-center ${isThin ? 'justify-center' : 'justify-start gap-2'} flex-grow`}
        >
          <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg shadow-lg">
            <AcademicCapIcon className={`h-5 w-5 text-white ${isThin ? 'h-4 w-4' : ''}`} />
          </div>
          {!isThin && ( // Hide text when thin/collapsed
            <>
              {/* This line was for the line, but we can animate it */}
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: isThin ? 0 : 48 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="w-12 h-1 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full mx-auto mt-2 shadow-lg hidden" // Hidden to avoid duplicate
              ></motion.div>
            </>
          )}
        </motion.div>

        {!isQuizPage && ( // Only show toggle button on non-quiz pages
          <motion.button
            onClick={toggleSidebar}
            className={`p-2 rounded-full text-white/80 hover:bg-white/20 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white/50 ${isCollapsed ? 'self-center' : ''}`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait" initial={false}>
              {isCollapsed ? (
                <motion.div
                  key="open"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Bars3Icon className="h-5 w-5" />
                </motion.div>
              ) : (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <XMarkIcon className="h-5 w-5" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        )}
      </div>

      {/* Navigation - Flexible Height with Scroll */}
      <nav className={`flex-1 ${isThin ? 'py-3 px-2' : 'px-4 py-4'} relative z-10 overflow-y-auto custom-scrollbar`}>
        <motion.ul
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-1"
        >
          {navItems.map(({ href, label, icon: Icon }) => {
            const isActive =
              pathname === href ||
              (href !== "/dashboard" && pathname.startsWith(href));

            return (
              <motion.li
                key={href}
                variants={itemVariants}
                whileHover={{
                  x: isThin ? 0 : 3, // No x-animation when thin
                  scale: isThin ? 1.05 : 1, // Only scale animation for thin
                  transition: { duration: 0.2 },
                }}
              >
                <Link
                  href={href}
                  className={`flex items-center ${isThin ? 'justify-center' : 'gap-3 px-3'} py-3 rounded-xl text-sm font-semibold transition-all duration-300 group relative overflow-hidden ${
                    isActive
                      ? "bg-white/20 text-white shadow-lg backdrop-blur-sm"
                      : "text-blue-100 hover:bg-white/15 hover:text-white hover:shadow-md"
                  }`}
                  title={isThin ? label : undefined} // Add title for accessibility when collapsed
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
                    className={`p-1.5 rounded-md transition-all duration-300 ${
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

                  {!isThin && <span className="relative text-sm">{label}</span>} {/* Hide label when thin */}

                  {/* Hover Glow Effect */}
                  {!isThin && ( // Only show glow when not thin
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                  )}
                </Link>
              </motion.li>
            );
          })}
        </motion.ul>
      </nav>

      {/* Footer - Fixed Height */}
      <div
        className={`relative z-10 ${isThin ? 'p-2' : 'p-4'} border-t border-white/10 space-y-2 flex-shrink-0`}
      >
        {/* Logout Button */}
        <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}>
          <Link
            href="/auth/login"
            className={`flex items-center ${isThin ? 'justify-center' : 'gap-3 px-3'} py-2.5 rounded-xl text-sm text-blue-100 hover:bg-red-500/30 hover:text-white transition-all duration-300 group border border-white/10 hover:border-red-400/30`}
            title={isThin ? "Logout" : undefined} // Add title for accessibility when collapsed
          >
            <ArrowRightOnRectangleIcon className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
            {!isThin && <span className="font-semibold text-sm">Logout</span>} {/* Hide label when thin */}
          </Link>
        </motion.div>
      </div>
    </>
  );


  // Main render logic
  return (
    <div
      className={`h-full bg-gradient-to-b from-purple-700 via-indigo-700 to-blue-800 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 shadow-2xl flex flex-col relative overflow-hidden transition-all duration-300 ease-in-out ${sidebarWidthClass}`}
    >
      {/* Conditionally render content based on isQuizPage or isCollapsed */}
      {renderSidebarContent(isQuizPage || isCollapsed)}
    </div>
  );
}
