"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Cookies from "js-cookie";
import Image from "next/image";
import { FaUserCircle, FaSignOutAlt, FaChevronDown } from "react-icons/fa";

export default function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userPic, setUserPic] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [scrolling, setScrolling] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/dashboard");

  // Load user data from "auth-client" cookie
  useEffect(() => {
    const clientCookie = Cookies.get("auth-client");
    if (clientCookie) {
      try {
        const user = JSON.parse(clientCookie);
        setUserEmail(user.email || null);
        setUserName(user.name || null);
        setUserPic(user.picture || null);
      } catch (err) {
        console.error("Error parsing auth-client cookie:", err);
      }
    } else {
      setUserEmail(null);
      setUserName(null);
      setUserPic(null);
    }
  }, [pathname]);

  // Logout clears both frontend & backend cookies
  const handleLogout = () => {
    Cookies.remove("auth-client");
    Cookies.remove("token");
    Cookies.remove("auth-token");
    Cookies.remove("temp-auth");
    Cookies.remove("user_id");
    setUserEmail(null);
    setUserPic(null);
    setUserName(null);
    setDropdownOpen(false);
    router.push("/");
  };

  // Scroll listener to shrink header on scroll
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

  const dropdownVariants = {
    hidden: { opacity: 0, y: -15, scale: 0.9 }, // Slightly more pronounced initial state
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.25, ease: "easeOut" }, // Slightly longer, smoother transition
    },
    exit: {
      opacity: 0,
      y: -15, // Matches initial for symmetrical animation
      scale: 0.9,
      transition: { duration: 0.2, ease: "easeIn" },
    },
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 mx-auto z-50 transition-all duration-700 ease-in-out transform
        ${scrolling
          ? "w-[98%] bg-gradient-to-r from-white/90 via-white/70 to-white/90 dark:from-slate-900/90 dark:to-slate-800/90 backdrop-blur-3xl shadow-3xl shadow-indigo-300/40 dark:shadow-purple-900/30 border border-white/50 dark:border-slate-700/60 rounded-3xl py-1.5"
          : "w-full bg-white/98 dark:bg-slate-950/98 shadow-xl shadow-gray-300/40 dark:shadow-slate-800/40 rounded-none py-3"
        }`}
    >
      <nav className="container mx-auto flex items-center justify-between px-8 transition-all duration-700"> {/* Increased px for more breathing room */}
        <Link href="/" className="flex items-center gap-2 group">
          <Image
            src="/Final-Logo-bg-removed.png"
            alt="Super Sheldon Quiz"
            width={60} // Slightly larger logo
            height={60} // Slightly larger logo
            className="w-full object-contain group-hover:scale-105 transition-transform duration-300 ease-out"
            priority
          />
        </Link>

        {/* Navbar Links Container with Blur Effect */}
        <div
          className={`hidden md:flex space-x-10 justify-center flex-grow transition-all duration-500 font-medium
            ${scrolling ? "backdrop-blur-xl px-6 py-2 rounded-full bg-white/30 dark:bg-slate-700/30" : "backdrop-blur-none px-0 py-0"}`}
        >
          <Link
            href="/"
            className="text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300 ease-in-out text-lg"
          >
            Home
          </Link>
          <Link
            href="/dashboard"
            className="text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300 ease-in-out text-lg"
          >
            Dashboard
          </Link>
          <Link
            href="#contact"
            className="text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300 ease-in-out text-lg"
          >
            Contact Us
          </Link>
        </div>

        {/* User Profile or Get Started Button */}
        {userEmail ? (
          <div className="relative z-50">
            <motion.button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-3 px-3 py-2 rounded-full bg-gradient-to-br from-white/90 to-gray-50/90 dark:from-slate-800/90 dark:to-slate-900/90 backdrop-blur-lg border border-gray-200/60 dark:border-slate-700/60 shadow-lg hover:shadow-xl hover:bg-white/100 dark:hover:bg-slate-700/100 transition-all duration-300 ease-out group focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-900"
              whileHover={{ scale: 1.02 }} // Reduced scale slightly for subtlety
              whileTap={{ scale: 0.97 }} // Slightly more distinct tap
            >
              {/* Profile Picture */}
              <div className="relative">
                {userPic ? (
                  <Image
                    src={userPic}
                    alt="Profile"
                    width={40} // Slightly larger
                    height={40} // Slightly larger
                    className="rounded-full border-2 border-purple-500 group-hover:border-pink-500 shadow-md transition-colors duration-300 ease-in-out"
                    onError={(e) => {
                      console.error("Header - Image failed to load:", userPic);
                      console.error("Header - Error:", e);
                    }}
                    onLoad={() => {
                      console.log(
                        "Header - Image loaded successfully:",
                        userPic
                      );
                    }}
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center shadow-inner">
                    <FaUserCircle className="text-white text-xl" /> {/* Larger icon */}
                  </div>
                )}
              </div>
              {/* User Name */}
              <span className="hidden md:block text-gray-800 dark:text-gray-100 font-semibold text-base whitespace-nowrap">
                {userName || "Guest"}
              </span>

              {/* Dropdown Arrow */}
              <motion.div
                animate={{ rotate: dropdownOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="text-gray-500 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300"
              >
                <FaChevronDown className="w-3.5 h-3.5" /> {/* Slightly larger arrow */}
              </motion.div>
            </motion.button>

            {/* Dropdown Menu */}
            <AnimatePresence>
              {dropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setDropdownOpen(false)}
                  />
                  <motion.div
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="absolute right-0 mt-3 min-w-[240px] bg-white/98 dark:bg-slate-900/98 backdrop-blur-2xl border border-gray-200/60 dark:border-slate-700/60 rounded-2xl shadow-3xl shadow-purple-200/30 dark:shadow-purple-900/30 z-50 overflow-hidden"
                  >
                    <div className="px-5 py-3 border-b border-gray-200/60 dark:border-slate-700/60 bg-gradient-to-r from-purple-50 dark:from-slate-800/50 to-pink-50 dark:to-slate-800/50">
                      <p className="text-base font-bold text-gray-900 dark:text-white truncate">
                        {userName || "User Profile"}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-300 truncate mt-1">
                        {userEmail}
                      </p>
                    </div>

                    <div className="p-2">
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full px-4 py-2.5 text-base font-medium text-red-600 dark:text-red-400 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 active:scale-98 transition-all duration-200 group"
                      >
                        <FaSignOutAlt className="group-hover:scale-110 transition-transform text-xl" /> {/* Larger icon */}
                        <span>Logout</span>
                      </button>
                    </div>

                    <div className="px-5 py-3 border-t border-gray-200/60 dark:border-slate-700/60 bg-gray-100/50 dark:bg-slate-800/50">
                      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                        <span>Member since</span>
                        <span>{new Date().getFullYear()}</span>
                      </div>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <Link href="/auth/login">
            <motion.button
              className="px-8 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl shadow-lg shadow-purple-400/50 hover:shadow-xl hover:shadow-pink-400/50 transition-all duration-300 ease-in-out hover:from-purple-700 hover:to-pink-700 active:scale-95"
              whileHover={{ scale: 1.00 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started
            </motion.button>
          </Link>
        )}
      </nav>
    </header>
  );
}
