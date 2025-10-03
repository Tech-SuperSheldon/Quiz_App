"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, Variants } from "framer-motion"; // Make sure Variants is imported
import {
  BookOpenIcon,
  AcademicCapIcon,
  UserCircleIcon, // New icon for Profile
  // ClipboardListIcon,
  // CollectionIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";

export default function Sidebar() {
  const pathname = usePathname();

  const links = [
     { href: "/dashboard/profile", label: "Profile", icon: UserCircleIcon }, // Added Profile link
 
    { href: "/dashboard/courses", label: "Courses", icon: BookOpenIcon },
    { href: "/dashboard/quizzes", label: "Quizzes", icon: AcademicCapIcon },
      // { href: "/dashboard/results", label: "Results", icon: ClipboardListIcon },
    // { href: "/dashboard/topics", label: "Topics", icon: CollectionIcon },
    { href: "/dashboard/leaderboard", label: "Leaderboard", icon: SparklesIcon },
  ];

  // Framer Motion variants for sidebar and items
  const sidebarVariants: Variants = { // Added Variants type annotation
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut",
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants: Variants = { // Added Variants type annotation
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <motion.aside
      className="w-64 bg-white shadow-xl rounded-lg p-6 h-[calc(100vh-48px)] flex flex-col justify-between"
      variants={sidebarVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Logo / Title */}
      <div>
        <div className="text-2xl font-extrabold text-gray-800 mb-8 text-center">
          EduHub
        </div>

        {/* Navigation Links */}
        <ul className="space-y-3">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = pathname.startsWith(link.href); // highlight active route
            return (
              <motion.li key={link.href} variants={itemVariants}>
                <Link
                  href={link.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ease-in-out group
                    ${
                      isActive
                        ? "bg-indigo-600 text-white shadow-md"
                        : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-700"
                    }
                  `}
                >
                  <Icon
                    className={`h-6 w-6 ${
                      isActive
                        ? "text-white"
                        : "text-gray-500 group-hover:text-indigo-600"
                    }`}
                  />
                  <span className="font-medium text-lg">{link.label}</span>
                </Link>
              </motion.li>
            );
          })}
        </ul>
      </div>

      {/* Optional: Logout link at bottom */}
      <div className="pt-6 border-t border-gray-100 mt-6">
        <Link
          href="/auth/login" // Replace with actual logout route or function
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-red-50 hover:text-red-700 transition-all duration-200 ease-in-out group"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-500 group-hover:text-red-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          <span className="font-medium text-lg">Logout</span>
        </Link>
      </div>
    </motion.aside>
  );
}
