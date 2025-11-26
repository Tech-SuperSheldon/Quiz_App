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
        backgroundColor: isScrolled
          ? "rgba(255, 255, 255, 0.85)"
          : "rgba(255, 255, 255, 0.95)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
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
          <div className="w-8 h-8 border-2 border-orange-500 rounded flex items-center justify-center">
            <span className="text-orange-500 text-lg">🏠</span>
          </div>
          <span className="text-black font-bold text-xl">ROOM</span>
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
            className="text-black hover:text-orange-500 transition text-sm font-medium"
          >
            Log in
          </a>
          <a
            href="/signup"
            className="px-4 py-2 bg-orange-500 text-white rounded-full text-sm font-medium hover:bg-orange-600 transition"
          >
            Sign up
          </a>
        </div>
      </nav>
    </header>
  );
}

