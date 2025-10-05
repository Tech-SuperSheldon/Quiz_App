"use client";

import { ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import Sidebar from "@/components/Sidebar";
// import Header from "@/components/Header";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
        animate: { 
          opacity: 1, 
          y: 0, 
          transition: { 
            duration: 0.5, 
            ease: (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t // easeInOut
          } 
        },
        exit: { 
          opacity: 0, 
          y: -10, 
          transition: { 
            duration: 0.3, 
            ease: (t: number) => t * t // easeIn
          } 
        }
  };

  return (
    <div className="flex mt-22 min-h-screen bg-white/95 dark:bg-slate-900 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-32 w-80 h-80 bg-purple-300/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-blue-300/20 rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-300/10 rounded-full blur-3xl animate-pulse-slow delay-500"></div>
      </div>

      {/* Sidebar - Full Height */}
      <div className="flex-shrink-0 min-h-screen sticky top-0">
        <Sidebar />
      </div>

      {/* Main Content - Full Height */}
      <div className="flex flex-col flex-1 relative z-10 min-h-screen">
        {/* <Header /> */}

        <main className="flex-1 px-4 lg:px-6 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="h-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-white/50 dark:border-slate-700/50 shadow-xl p-4 lg:p-6 w-full hover:shadow-xl transition-all duration-500"
            >
              {/* Content Container with Scroll - Full Height */}
              <div className="h-full overflow-y-auto custom-scrollbar">
                {children}
              </div>
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}