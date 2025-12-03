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

  // User Data State
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [userPic, setUserPic] = useState<string | null>(null);

  const [scrolling, setScrolling] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // 1. Identify if we are on Dashboard or Quiz Page
  const isMinimalHeader = pathname.startsWith("/dashboard") || pathname.startsWith("/quizpage");

  // ✅ Load user data from "auth-client" JSON
  useEffect(() => {
    const clientCookie = Cookies.get("auth-client");

    if (clientCookie) {
      try {
        const data = JSON.parse(clientCookie);

        // CHECK: If the JSON object contains a 'token', the user is logged in.
        if (data.token) {
          setUserName(data.name || "User");   // Shreyansh Kushwaha
          setUserEmail(data.email || "");     // shreyanshkushwaha23336@gmail.com
          setUserPic(data.picture || null);   // If no pic in JSON, this becomes null (shows Icon)
        } else {
          handleLogoutCleanup();
        }
      } catch (err) {
        console.error("Error parsing auth-client cookie:", err);
        handleLogoutCleanup();
      }
    } else {
      handleLogoutCleanup();
    }
  }, [pathname]);

  // Helper to clear state
  const handleLogoutCleanup = () => {
    setUserEmail(null);
    setUserName(null);
    setUserPic(null);
  };

  // ✅ Logout Function
  const handleLogout = () => {
    Cookies.remove("auth-client");
    Cookies.remove("token");
    Cookies.remove("user_id");
    handleLogoutCleanup();
    setDropdownOpen(false);
    router.push("/");
  };

  // ✅ Scroll listener
  const handleScroll = () => {
    setScrolling(window.scrollY > 50);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.2 } },
    exit: { opacity: 0, y: -10, scale: 0.95, transition: { duration: 0.15 } },
  };

  const handleContactWhatsApp = () => {
    const phoneNumber = "917974695618";
    const message = "Hello, I need some help regarding the quiz app.";
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, "_blank");
  };

  // Helper to determine header classes
  const getHeaderClasses = () => {
    let classes = "top-0 left-0 right-0 mx-auto z-50 transition-all duration-500 ";

    // IF Dashboard or Quiz Page: Use ABSOLUTE so it scrolls away with the page
    if (isMinimalHeader) {
      classes += "absolute w-full bg-white/80 backdrop-blur-xl shadow-md border-b border-white/30";
    } 
    // ELSE (Homepage): Use FIXED so it stays on screen
    else {
      classes += "fixed "; 
      classes += scrolling
        ? "w-10/12 bg-gradient-to-r from-white/80 via-white/50 to-white/80 backdrop-blur-xl shadow-2xl border border-white/30 rounded-xl"
        : "w-full backdrop-blur-lg shadow-md rounded-xl";
    }
    return classes;
  };

  return (
    <header className={getHeaderClasses()}>
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

        {/* Navigation Links: Hidden on Dashboard/Quiz */}
        {!isMinimalHeader && (
          <div
            className={`flex space-x-8 justify-center flex-grow transition-all duration-500
            ${scrolling ? "backdrop-blur-xl px-4" : "backdrop-blur-md px-6"}`}
          >
            <Link href="/" className="text-gray-800 hover:text-orange-600 transition-colors duration-300">Home</Link>
            <Link href="/dashboard" className="text-gray-800 hover:text-orange-600 transition-colors duration-300">Dashboard</Link>
            <Link href="#contact" onClick={(e) => { e.preventDefault(); handleContactWhatsApp(); }} className="text-gray-800 hover:text-orange-600 transition-colors duration-300">Contact Us</Link>
          </div>
        )}

        {/* User Profile / Auth Buttons */}
        {userName ? (
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
                    className="rounded-full border-2 border-orange-400 group-hover:border-orange-500 transition-colors duration-300"
                  />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-gradient-to-r from-orange-400 to-orange-600 flex items-center justify-center">
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
                  <div className="fixed inset-0 z-40" onClick={() => setDropdownOpen(false)} />
                  <motion.div
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="absolute right-0 mt-2 min-w-[220px] bg-white/95 backdrop-blur-xl border border-gray-200/50 rounded-2xl shadow-2xl z-50 overflow-hidden"
                  >
                    <div className="px-4 py-3 border-b border-gray-200/50">
                      <p className="text-sm font-semibold text-gray-900 truncate">
                        {userName}
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
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Link href="/auth/login">
              <motion.button
                className="px-4 py-2 rounded-xl border border-orange-500 text-orange-600 font-medium bg-orange-50/80 hover:bg-orange-100 shadow-sm hover:shadow-md transition-all duration-300"
                style={{ backdropFilter: "blur(10px)", background: "linear-gradient(90deg, rgba(255,165,0,0.10) 0%, rgba(255,140,0,0.10) 100%)" }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Log in
              </motion.button>
            </Link>
            <Link href="/auth/register">
              <motion.button
                className="px-4 py-2 font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-white bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-600 hover:to-orange-500 border border-orange-500"
                style={{ backdropFilter: "blur(10px)", background: "linear-gradient(90deg, rgba(255,140,0,0.92) 0%, rgba(255,165,0,0.92) 100%)" }}
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