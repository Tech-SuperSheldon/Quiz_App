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
    router.push("/");
  };

  return (
    <header
      className={`fixed top-6 left-0 right-0 w-[95%] mx-auto z-50 transition-all duration-300
        ${
          isDashboard
            ? "bg-gradient-to-r from-white/70 via-white/50 to-white/70 backdrop-blur-xl shadow-2xl rounded-2xl border border-gray-300/40 hover:shadow-gray-400/50"
            : "bg-white shadow-md rounded-xl"
        }`}
    >
      <nav className="container mx-auto flex items-center justify-between px-6 py-3">
        {/* Logo / Title */}
        {isDashboard ? (
          <h1 className="text-xl font-bold">Dashboard</h1>
        ) : (
          <Link
            href="/"
            className="text-2xl font-bold hover:scale-105 transition-transform"
          >
            Supersheldon
          </Link>
        )}

        {/* Right Side: Profile / Login */}
        {userEmail ? (
          <div className="relative">
            <button
              type="button"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 focus:outline-none"
            >
              {userPic ? (
                <Image
                  src={userPic}
                  alt="Profile"
                  width={40}
                  height={40}
                  className="rounded-full border-2 border-gray-300 hover:border-indigo-500 transition"
                />
              ) : (
                <FaUserCircle className="text-3xl text-gray-700 hover:text-indigo-600 transition" />
              )}
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 min-w-[220px] max-w-xs bg-white border rounded-lg shadow-lg z-50">
                <div className="px-4 py-2 border-b text-gray-700 font-medium break-words">
                  {userEmail}
                </div>
                <button
                  type="button"
                  onClick={() => router.push("/dashboard/settings")}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 transition"
                >
                  Settings
                </button>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 transition"
                >
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
