"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import GlossyButton from "./GlossyButton";
import Cookies from "js-cookie";
import Image from "next/image";
import { FaUserCircle } from "react-icons/fa";

export default function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userPic, setUserPic] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  const isDashboard = pathname.startsWith("/dashboard");

  // Read cookies whenever pathname changes
  useEffect(() => {
    const email = Cookies.get("student_email");
    const pic = Cookies.get("student_profile_pic");
    setUserEmail(email || null);
    setUserPic(pic || null);
  }, [pathname]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      // Check if the click is outside the dropdown and the button that toggles it
      if (
        dropdownOpen &&
        !(event.target as HTMLElement).closest(".profile-dropdown-container")
      ) {
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
    Cookies.remove("student_profile_pic"); // remove profile pic
    setUserEmail(null);
    setUserPic(null);
    setDropdownOpen(false); // Close dropdown on logout
    router.push("/");
  };

  return (
    <header
      className={`fixed top-6 left-0 right-0 w-[96%] mx-auto z-50 transition-all duration-400 ease-in-out transform
        ${
          isDashboard
            ? "bg-gradient-to-r from-white/95 via-white/80 to-white/95 backdrop-blur-xl shadow-xl shadow-indigo-200/50 rounded-2xl border border-indigo-100/70 hover:shadow-indigo-300/60"
            : "bg-white shadow-lg shadow-gray-200/50 rounded-xl hover:shadow-xl hover:shadow-gray-300/50"
        }`}
    >
      <nav className="container mx-auto flex items-center justify-between px-6 py-4"> {/* Increased py for slightly more height */}
        {/* Logo / Title */}
        {isDashboard ? (
          <h1 className="text-2xl font-extrabold text-gray-800 tracking-tight transition-colors duration-300">
            Dashboard
          </h1>
        ) : (
          <Link
            href="/"
            // No extra text, just the logo itself
            className="text-3xl font-extrabold relative block group hover:scale-105 transition-transform duration-300 ease-out"
          >
            <span className="bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 text-transparent bg-clip-text">
              Supersheldon
            </span>
            {/* Added a subtle sparkle effect on hover */}
            <span className="absolute -top-1 -right-4 text-yellow-400 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform rotate-12">
              ✨
            </span>
          </Link>
        )}

        {/* Right Side: Profile / Login */}
        {userEmail ? (
          <div className="relative profile-dropdown-container"> {/* Added class for outside click */}
            <button
              type="button"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 focus:outline-none p-1 rounded-full ring-2 ring-transparent focus:ring-indigo-400 transition-all duration-200 ease-in-out transform hover:scale-105"
            >
              {userPic ? (
                <Image
                  src={userPic}
                  alt="Profile"
                  width={44} // Slightly larger
                  height={44} // Slightly larger
                  className="rounded-full border-2 border-indigo-300 shadow-md hover:border-indigo-500 transition-all duration-200"
                />
              ) : (
                <FaUserCircle className="text-4xl text-indigo-500 hover:text-indigo-600 transition-all duration-200" /> {/* Larger icon */}
              )}
            </button>

            {dropdownOpen && (
              <div className={`absolute right-0 mt-3 min-w-[240px] max-w-xs bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden transform origin-top-right transition-all duration-300 ease-out
                ${dropdownOpen ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"}`}
              >
                <div className="px-5 py-3 border-b border-gray-100 text-gray-800 font-semibold text-sm truncate bg-gray-50/50">
                  {userEmail}
                </div>
                <button
                  type="button"
                  onClick={() => { router.push("/dashboard/settings"); setDropdownOpen(false); }}
                  className="w-full text-left flex items-center gap-3 px-5 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors duration-200"
                >
                  {/* Using FaUserCircle as a placeholder for a cog/settings icon, since no new imports */}
                  <FaUserCircle className="text-lg opacity-80" />
                  Settings
                </button>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full text-left flex items-center gap-3 px-5 py-3 text-red-500 hover:bg-red-50 hover:text-red-600 transition-colors duration-200 border-t border-gray-100"
                >
                  {/* Using FaUserCircle as a placeholder for a logout icon, since no new imports */}
                  <FaUserCircle className="text-lg opacity-80" />
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link href="/auth/login">
            <GlossyButton>Get Started</GlossyButton>
          </Link>
        )}
      </nav>
    </header>
  );
}
