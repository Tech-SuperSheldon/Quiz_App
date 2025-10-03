"use client";

import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function DashboardHeader() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();

  const userEmail = Cookies.get("student_email") || "student@example.com"; // get from cookie

  const handleLogout = () => {
    // Clear cookies on logout
    Cookies.remove("token");
    Cookies.remove("student_name");
    Cookies.remove("student_email");
    Cookies.remove("student_class");
    router.push("/auth/login");
  };

  return (
    <header className="w-full bg-white shadow flex items-center justify-between px-6 py-4">
      <h1 className="text-xl font-bold">Dashboard</h1>

      {/* Profile Section */}
      <div className="relative">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center gap-2 focus:outline-none"
        >
          <FaUserCircle className="text-3xl text-gray-700 hover:text-indigo-600 transition" />
        </button>

        {/* Dropdown Menu */}
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-50">
            <div className="px-4 py-2 border-b text-gray-700 font-medium">
              {userEmail}
            </div>
            <button
              onClick={() => router.push("/dashboard/settings")}
              className="w-full text-left px-4 py-2 hover:bg-gray-100 transition"
            >
              Settings
            </button>
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 transition"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
