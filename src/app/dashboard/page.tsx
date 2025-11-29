"use client";

import { motion } from "framer-motion";
import {
  AcademicCapIcon,
  TrophyIcon,
  BookOpenIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import { DashboardLanding } from "../../components/dashboard_landing";

export default function DashboardPage() {

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: (t: number) => 1 - Math.pow(1 - t, 2), // easeOut
      },
    },
  };

  return (
    <div className="space-y-6">
      {/* New landing UI (light theme) */}
      <div className="pt-2">
        <DashboardLanding />
      </div>
    </div>
  );
}
