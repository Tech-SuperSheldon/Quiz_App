"use client";

import { ReactNode, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import { Menu, X } from "lucide-react";
// import Header from "@/components/Header";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
    <div className="flex mt-22 min-h-screen bg-white/95 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-32 w-80 h-80 bg-purple-300/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-blue-300/20 rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-300/10 rounded-full blur-3xl animate-pulse-slow delay-500"></div>
      </div>

      {/* Sidebar - Hidden on mobile, shown on lg */}
      <div className="hidden lg:flex flex-shrink-0 min-h-screen sticky top-0">
        <Sidebar />
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            />
            {/* Mobile Sidebar */}
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed left-0 top-0 h-screen w-64 z-50 lg:hidden"
            >
              <Sidebar />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content - Full Height */}
      <div className="flex flex-col flex-1 relative z-10 min-h-screen">
        {/* Mobile Menu Button */}
        <div className="lg:hidden p-4 border-b border-white/10 bg-white/50 backdrop-blur-sm">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-orange-100 rounded-lg transition-colors duration-300"
          >
            {sidebarOpen ? (
              <X className="w-6 h-6 text-orange-600" />
            ) : (
              <Menu className="w-6 h-6 text-orange-600" />
            )}
          </button>
        </div>
        {/* <Header /> */}

        <main className="flex-1 px-3 lg:px-4 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="h-full bg-white/80 backdrop-blur-xl border border-white/50 shadow-xl p-3 lg:p-4 w-full hover:shadow-xl transition-all duration-500"
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