"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Cookies from "js-cookie";
import Image from "next/image";
import { FaUserCircle, FaSignOutAlt, FaChevronDown, FaBars, FaTimes, FaApple, FaGooglePlay } from "react-icons/fa";

// Store links for the mobile apps
const APP_STORE_URL = "https://apps.apple.com/us/app/levelup-learn-play/id6773067123";
const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.supersheldon.levelup";

export default function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

        // 🟢 FIX: Check for 'token' (OTP) OR 'email' (Google Auth)
        if (data.token || data.email) {
          setUserName(data.name || "User");   
          setUserEmail(data.email || "");     
          setUserPic(data.picture || null);   
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

  // ✅ Close mobile menu whenever the route changes
  useEffect(() => {
    setMobileMenuOpen(false);
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

        {/* Navigation Links: Hidden on Dashboard/Quiz — and hidden on mobile (moved into the hamburger menu) */}
        {!isMinimalHeader && (
          <div
            className={`hidden md:flex space-x-8 justify-center flex-grow transition-all duration-500
            ${scrolling ? "backdrop-blur-xl px-4" : "backdrop-blur-md px-6"}`}
          >
            <Link href="/" className="text-gray-800 hover:text-orange-600 transition-colors duration-300">Home</Link>
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
          <div className="hidden md:flex items-center gap-3">
            {/* App Store */}
            <motion.a
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-black text-white shadow-md hover:shadow-lg transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaApple className="w-6 h-6" />
              <span className="flex flex-col leading-none text-left">
                <span className="text-[10px] opacity-80">Download on the</span>
                <span className="text-sm font-semibold">App Store</span>
              </span>
            </motion.a>
            {/* Google Play */}
            <motion.a
              href={PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-black text-white shadow-md hover:shadow-lg transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaGooglePlay className="w-5 h-5" />
              <span className="flex flex-col leading-none text-left">
                <span className="text-[10px] opacity-80">GET IT ON</span>
                <span className="text-sm font-semibold">Google Play</span>
              </span>
            </motion.a>
          </div>
        )}

        {/* Hamburger toggle: only on mobile, only when nav links exist */}
        {!isMinimalHeader && (
          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-xl border border-orange-500/60 text-orange-600 bg-orange-50/60 hover:bg-orange-100 transition-all duration-300"
          >
            {mobileMenuOpen ? <FaTimes className="w-5 h-5" /> : <FaBars className="w-5 h-5" />}
          </button>
        )}
      </nav>

      {/* Mobile Menu */}
      {!isMinimalHeader && (
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="md:hidden overflow-hidden border-t border-white/30 bg-white/90 backdrop-blur-xl rounded-b-xl"
            >
              <div className="flex flex-col px-6 py-4 gap-1">
                <Link href="/" className="py-2.5 text-gray-800 hover:text-orange-600 font-medium transition-colors duration-300">Home</Link>
                <button
                  onClick={() => { setMobileMenuOpen(false); handleContactWhatsApp(); }}
                  className="py-2.5 text-left text-gray-800 hover:text-orange-600 font-medium transition-colors duration-300"
                >
                  Contact Us
                </button>

                {!userName && (
                  <div className="flex flex-col gap-2 mt-3 pt-3 border-t border-gray-200/60">
                    <a
                      href={APP_STORE_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 w-full px-4 py-2.5 rounded-xl bg-black text-white shadow-md transition-all duration-300"
                    >
                      <FaApple className="w-6 h-6" />
                      <span className="flex flex-col leading-none text-left">
                        <span className="text-[10px] opacity-80">Download on the</span>
                        <span className="text-sm font-semibold">App Store</span>
                      </span>
                    </a>
                    <a
                      href={PLAY_STORE_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 w-full px-4 py-2.5 rounded-xl bg-black text-white shadow-md transition-all duration-300"
                    >
                      <FaGooglePlay className="w-5 h-5" />
                      <span className="flex flex-col leading-none text-left">
                        <span className="text-[10px] opacity-80">GET IT ON</span>
                        <span className="text-sm font-semibold">Google Play</span>
                      </span>
                    </a>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </header>
  );
}