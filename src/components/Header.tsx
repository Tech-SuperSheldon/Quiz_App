"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import GlossyButton from "./GlossyButton"; // Assuming GlossyButton is already fancy
import Cookies from "js-cookie";
import Image from "next/image";
import { FaUserCircle, FaCog, FaSignOutAlt, FaBars, FaTimes } from "react-icons/fa"; // Added more icons for settings/logout
import { AnimatePresence, motion } from "framer-motion"; // For animations

export default function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userPic, setUserPic] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  const isDashboard = pathname.startsWith("/dashboard");

  useEffect(() => {
    const email = Cookies.get("student_email");
    const pic = Cookies.get("student_profile_pic");
    setUserEmail(email || null);
    setUserPic(pic || null);
  }, [pathname]);

  useEffect(() => {
    // Close dropdown if clicked outside
    const handleOutsideClick = (event: MouseEvent) => {
      if (dropdownOpen && !(event.target as HTMLElement).closest(".profile-dropdown-container")) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [dropdownOpen]);

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("student_name");
    Cookies.remove("student_email");
    Cookies.remove("student_class");
    Cookies.remove("student_mobile");
    Cookies.remove("student_exam");
    Cookies.remove("student_profile_pic");
    setUserEmail(null);
    setUserPic(null);
    setDropdownOpen(false); // Close dropdown on logout
    router.push("/");
  };

  const dropdownVariants = {
    hidden: { opacity: 0, scale: 0.9, y: -10 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.2, ease: "easeOut" } },
    exit: { opacity: 0, scale: 0.9, y: -10, transition: { duration: 0.15, ease: "easeIn" } },
  };

  return (
    <header
      className={`fixed top-6 left-0 right-0 w-[98%] mx-auto z-50 transition-all duration-500 transform
        ${
          isDashboard
            ? "bg-gradient-to-r from-white/80 via-white/60 to-white/80 backdrop-filter backdrop-blur-xl shadow-fancy-light rounded-2xl border border-indigo-100/60 hover:shadow-indigo-300/60"
            : "bg-white shadow-lg rounded-xl hover:shadow-xl"
        }
      `}
    >
      <nav className="container mx-auto flex items-center justify-between px-6 py-3">
        {/* Logo / Title */}
        {isDashboard ? (
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="text-2xl font-extrabold text-gray-800 tracking-tight"
          >
            Dashboard
          </motion.h1>
        ) : (
          <Link href="/">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ scale: 1.05, rotate: -2 }}
              className="text-3xl font-extrabold cursor-pointer relative group"
            >
              <span className="bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 text-transparent bg-clip-text">
                Supersheldon
              </span>
              <span className="absolute -top-2 -right-2 text-yellow-400 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform rotate-12">
                ✨
              </span>
            </motion.div>
          </Link>
        )}

        {/* Right Side: Profile / Login */}
        {userEmail ? (
          <div className="relative profile-dropdown-container">
            <motion.button
              type="button"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 focus:outline-none ring-2 ring-transparent focus:ring-indigo-400 rounded-full transition-all duration-200"
            >
              {userPic ? (
                <Image
                  src={userPic}
                  alt="Profile"
                  width={40}
                  height={40}
                  className="rounded-full border-2 border-indigo-300 hover:border-indigo-500 transition-all duration-200 shadow-md"
                />
              ) : (
                <FaUserCircle className="text-4xl text-indigo-500 hover:text-indigo-600 transition-all duration-200" />
              )}
            </motion.button>

            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={dropdownVariants}
                  className="absolute right-0 mt-3 min-w-[240px] max-w-xs bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden"
                >
                  <div className="px-5 py-3 border-b border-gray-100 text-gray-800 font-semibold text-sm truncate bg-gray-50/50">
                    {userEmail}
                  </div>
                  <button
                    type="button"
                    onClick={() => { router.push("/dashboard/settings"); setDropdownOpen(false); }}
                    className="w-full flex items-center gap-3 px-5 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-all duration-200"
                  >
                    <FaCog className="text-lg" />
                    Settings
                  </button>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-5 py-3 text-red-500 hover:bg-red-50 hover:text-red-600 transition-all duration-200 border-t border-gray-100"
                  >
                    <FaSignOutAlt className="text-lg" />
                    Logout
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <Link href="/auth/login">
            <GlossyButton>
              <motion.span
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="inline-block"
              >
                Get Started
              </motion.span>
            </GlossyButton>
          </Link>
        )}
      </nav>
    </header>
  );
}
