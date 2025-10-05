"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Cookies from "js-cookie";
import Image from "next/image";
import {
  FaUserCircle,
  FaCog,
  FaSignOutAlt,
  FaChevronDown,
} from "react-icons/fa";

export default function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userPic, setUserPic] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/dashboard");

  // ✅ Load user data from "auth-client" cookie
  useEffect(() => {
    const clientCookie = Cookies.get("auth-client");
    console.log("Header - auth-client cookie:", clientCookie); // Debug log
    if (clientCookie) {
      try {
        const user = JSON.parse(clientCookie);
        console.log("Header - parsed user data:", user); // Debug log
        setUserEmail(user.email || null);
        setUserName(user.name || null);
        setUserPic(user.picture || null);
        console.log("Header - set user picture:", user.picture); // Debug log
      } catch (err) {
        console.error("Error parsing auth-client cookie:", err);
      }
    } else {
      setUserEmail(null);
      setUserName(null);
      setUserPic(null);
    }
  }, [pathname]);

  // ✅ Logout clears both frontend & backend cookies
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

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.2, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      y: -10,
      scale: 0.95,
      transition: { duration: 0.15, ease: "easeIn" },
    },
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 w-full mx-auto z-50 transition-all duration-300
        ${
          isDashboard
            ? "bg-gradient-to-r from-white/70 via-white/50 to-white/70 dark:from-slate-900/80 dark:to-slate-800/80 backdrop-blur-xl shadow-2xl border border-white/30"
            : "bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-md"
        }`}
    >
      <nav className="flex items-center justify-between px-6 py-3">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/Final-Logo-bg-removed.png"
            alt="Super Sheldon Quiz"
            width={100}
            height={100}
            className="w-full object-contain"
            priority
          />
        </Link>

        {userEmail ? (
          <div className="relative">
            <motion.button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 px-2 py-1 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg border border-gray-200/50 dark:border-slate-700/50 shadow-lg hover:shadow-xl transition-all duration-300 group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Profile Picture */}
              <div className="relative">
                {userPic ? (
                  <Image
                    src={userPic}
                    alt="Profile"
                    width={36}
                    height={36}
                    className="rounded-full border-2 border-purple-400 group-hover:border-pink-400 transition-colors duration-300"
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
                  <div className="w-9 h-9 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                    <FaUserCircle className="text-white text-lg" />
                  </div>
                )}
              </div>

              {/* Dropdown Arrow */}
              <motion.div
                animate={{ rotate: dropdownOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300"
              >
                <FaChevronDown className="w-3 h-3" />
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
                    className="absolute right-0 mt-2 min-w-[220px] bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl border border-gray-200/50 dark:border-slate-700/50 rounded-2xl shadow-2xl z-50 overflow-hidden"
                  >
                    <div className="px-4 py-3 border-b border-gray-200/50 dark:border-slate-700/50">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                        {userName || "User"}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate mt-1">
                        {userEmail}
                      </p>
                    </div>

                    <div className="p-2">
                      <motion.button
                        onClick={() => {
                          router.push("/dashboard/settings");
                          setDropdownOpen(false);
                        }}
                        className="flex items-center gap-3 w-full px-3 py-2.5 text-sm text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700/50 transition-all duration-200 group"
                        whileHover={{ x: 2 }}
                      >
                        <FaCog className="text-gray-500 group-hover:text-indigo-500 transition-colors" />
                        <span>Settings</span>
                      </motion.button>

                      <motion.button
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full px-3 py-2.5 text-sm text-red-600 dark:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200 group"
                        whileHover={{ x: 2 }}
                      >
                        <FaSignOutAlt className="group-hover:scale-110 transition-transform" />
                        <span>Logout</span>
                      </motion.button>
                    </div>

                    <div className="px-4 py-3 border-t border-gray-200/50 dark:border-slate-700/50 bg-gray-50/50 dark:bg-slate-700/30">
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
              className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:from-indigo-700 hover:to-purple-700"
              whileHover={{ scale: 1.05 }}
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
