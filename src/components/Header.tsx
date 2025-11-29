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

  // ✅ Load user data from "auth-client" cookie
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

  // ✅ Scroll listener to shrink header on scroll
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
    hidden: { opacity: 0, y: -10, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.2 },
    },
    exit: {
      opacity: 0,
      y: -10,
      scale: 0.95,
      transition: { duration: 0.15 },
    },
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 mx-auto z-50 transition-all duration-500
        ${scrolling
          ? "w-10/12 bg-gradient-to-r from-white/80 via-white/50 to-white/80 backdrop-blur-xl shadow-2xl border border-white/30 rounded-xl"
          : "w-full backdrop-blur-lg shadow-md rounded-xl"
        }`}
    >
      <nav className="flex items-center justify-between px-6 py-3 transition-all duration-500">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/Final-Logo-bg-removed.png"
            alt="Super Sheldon Quiz"
            width={70}
            height={70}
            className="w-full object-contain"
            priority
          />
        </Link>

        {/* Navbar Links Container with Blur Effect */}
        <div
          className={`flex space-x-8 justify-center flex-grow transition-all duration-500
            ${scrolling ? "backdrop-blur-xl px-4" : "backdrop-blur-md px-6"}`}
        >
          <Link
            href="/"
            className="text-gray-800 hover:text-purple-600 transition-colors duration-300"
          >
            Home
          </Link>
          <Link
            href="/dashboard"
            className="text-gray-800 hover:text-purple-600 transition-colors duration-300"
          >
            Dashboard
          </Link>
          <Link
            href="#contact"
            className="text-gray-800 hover:text-purple-600 transition-colors duration-300"
          >
            Contact Us
          </Link>
        </div>

        {/* User Profile or Auth CTA Buttons */}
        {userEmail ? (
          <div className="relative">
            <motion.button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 px-2 py-1 rounded-full backdrop-blur-lg border border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-300 group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
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
            <motion.div
                animate={{ rotate: dropdownOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="text-gray-400 group-hover:text-gray-600"
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
                    className="absolute right-0 mt-2 min-w-[220px] bg-white/95 backdrop-blur-xl border border-gray-200/50 rounded-2xl shadow-2xl z-50 overflow-hidden"
                  >
                    <div className="px-4 py-3 border-b border-gray-200/50">
                      <p className="text-sm font-semibold text-gray-900 truncate">
                        {userName || "User"}
                      </p>
                      <p className="text-xs text-gray-500 truncate mt-1">
                        {userEmail}
                      </p>
                    </div>

                    <div className="p-2">
                      <motion.button
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full px-3 py-2.5 text-sm text-red-600 rounded-lg hover:bg-red-50 transition-all duration-200 group"
                        whileHover={{ x: 2 }}
                      >
                        <FaSignOutAlt className="group-hover:scale-110 transition-transform" />
                        <span>Logout</span>
                      </motion.button>
                    </div>

                    <div className="px-4 py-3 border-t border-gray-200/50 bg-gray-50/50">
                      <div className="flex justify-between text-xs text-gray-500">
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
          <div className="flex items-center gap-3">
            <Link href="/auth/login">
              <motion.button
                className="px-4 py-2 rounded-xl border border-indigo-600 text-indigo-600 font-medium bg-white/80 hover:bg-indigo-50 shadow-sm hover:shadow-md transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Log in
              </motion.button>
            </Link>
            <Link href="/auth/register">
              <motion.button
                className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:from-indigo-700 hover:to-purple-700"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Sign up
              </motion.button>
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
