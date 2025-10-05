"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  PlayIcon,
  RocketLaunchIcon,
  LightBulbIcon,
} from "@heroicons/react/24/outline";
import Quiz from "@/components/Quiz";

export default function QuizPage() {
  return (
    <div className="min-h-screen bg-white/95 dark:bg-slate-900 p-4">
      <Quiz />
    </div>
  );
}
