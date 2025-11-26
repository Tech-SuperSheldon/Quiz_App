"use client";
import ScrollAnimation from "./ScrollAnimation";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="pt-32 pb-16 px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Side - Main Content */}
        <ScrollAnimation direction="right" delay={0.2}>
        <div className="space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold text-black leading-tight">
            Think you're the smartest in the{" "}
            <span className="inline-flex items-center gap-2">
              <span className="w-8 h-8 border-2 border-orange-500 rounded flex items-center justify-center">
                <span className="text-orange-500 text-lg">🏠</span>
              </span>
              <span className="text-orange-500">Room?</span>
            </span>
          </h1>
          <p className="text-lg text-black/80">
            Join a live quiz battle with others and prove your brainpower.
          </p>
          <button className="px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold text-lg rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
            PLAY NOW
          </button>

          {/* Player Avatars */}
          <div className="flex items-center gap-4 pt-4">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center text-white font-bold">
                R
              </div>
              <span className="ml-2 text-sm font-medium">Roshdy</span>
            </div>
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold">
                M
              </div>
              <span className="ml-2 text-sm font-medium">Mohaimen</span>
            </div>
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold">
                P
              </div>
              <span className="ml-2 text-sm font-medium">Phoenix</span>
            </div>
            <div className="text-orange-500 text-2xl">→</div>
          </div>
        </div>
        </ScrollAnimation>

        {/* Right Side - Leaderboard */}
        <ScrollAnimation direction="left" delay={0.3}>
        <div className="space-y-3">
          <div className="bg-orange-500 rounded-full px-6 py-4 flex items-center gap-4 shadow-md">
            <div className="flex items-center gap-2">
              <span className="text-white font-bold text-lg">1</span>
              <span className="text-green-500">▲</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <span className="text-white font-bold">R</span>
            </div>
            <div className="flex-1">
              <div className="text-white font-semibold">Roshdy</div>
              <div className="text-white/80 text-sm">32 Point</div>
            </div>
          </div>

          <div className="bg-orange-400 rounded-full px-6 py-4 flex items-center gap-4 shadow-md">
            <div className="flex items-center gap-2">
              <span className="text-white font-bold text-lg">2</span>
              <span className="text-red-500">▼</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <span className="text-white font-bold">P</span>
            </div>
            <div className="flex-1">
              <div className="text-white font-semibold">Phoenix</div>
              <div className="text-white/80 text-sm">24 Point</div>
            </div>
          </div>

          <div className="bg-gray-300 rounded-full px-6 py-4 flex items-center gap-4 shadow-md">
            <div className="flex items-center gap-2">
              <span className="text-gray-700 font-bold text-lg">3</span>
              <span className="text-red-500">▼</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-gray-400 flex items-center justify-center">
              <span className="text-gray-700 font-bold">M</span>
            </div>
            <div className="flex-1">
              <div className="text-gray-700 font-semibold">Mohaimen</div>
              <div className="text-gray-600 text-sm">13 Point</div>
            </div>
          </div>
        </div>
        </ScrollAnimation>
      </div>
    </section>
  );
}

