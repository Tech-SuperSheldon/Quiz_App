"use client";
import { useState, useEffect } from "react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "mx-4 mt-4 rounded-full shadow-lg"
          : "mx-0 mt-0 rounded-none"
      }`}
      style={{
        background: isScrolled
          ? "linear-gradient(90deg, rgba(255,165,0,0.18) 0%, rgba(255,140,0,0.18) 100%)"
          : "linear-gradient(90deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      <nav
        className={`flex items-center justify-between px-6 py-4 ${
          isScrolled ? "px-8" : "px-6"
        }`}
      >
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div
            className={`w-8 h-8 border-2 rounded flex items-center justify-center transition-colors duration-200 ${
              isScrolled
                ? "border-white bg-white/10"
                : "border-orange-500 bg-transparent"
            }`}
          >
            <span className={`${isScrolled ? "text-white" : "text-orange-500"} text-lg`}>🏠</span>
          </div>
          <span className={`font-bold text-xl ${isScrolled ? "text-white" : "text-orange-600"}`}>
            ROOM
          </span>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="#what-is-room"
            className="px-4 py-2 bg-orange-500 text-white rounded-full text-sm font-medium hover:bg-orange-600 transition"
          >
            What is Room
          </a>
          <a
            href="#how-it-works"
            className="px-4 py-2 bg-orange-500 text-white rounded-full text-sm font-medium hover:bg-orange-600 transition"
          >
            How It Works
          </a>
          <a
            href="#key-features"
            className="px-4 py-2 bg-orange-500 text-white rounded-full text-sm font-medium hover:bg-orange-600 transition"
          >
            Key Features
          </a>
          <a
            href="#faq"
            className="px-4 py-2 bg-orange-500 text-white rounded-full text-sm font-medium hover:bg-orange-600 transition"
          >
            FAQ
          </a>
        </div>

        {/* User Actions */}
        <div className="flex items-center gap-4">
          <a
            href="/login"
            className="px-4 py-2 bg-orange-500 text-white rounded-full text-sm font-medium hover:bg-orange-600 transition shadow-md"
            style={{
              boxShadow: "0 2px 8px 0 rgba(255, 140, 0, 0.10)",
              border: "1px solid rgba(255, 140, 0, 0.18)"
            }}
          >
            Log in
          </a>
          <a
            href="/signup"
            className="px-4 py-2 bg-orange-500 text-white rounded-full text-sm font-medium hover:bg-orange-600 transition shadow-md"
            style={{
              boxShadow: "0 2px 8px 0 rgba(255, 140, 0, 0.10)",
              border: "1px solid rgba(255, 140, 0, 0.18)"
            }}
          >
            Sign up
          </a>
        </div>
      </nav>
    </header>
  );
}

