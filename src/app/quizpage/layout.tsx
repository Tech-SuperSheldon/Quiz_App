"use client";

import type { ReactNode } from "react";
import DashboardLayout from "../dashboard/layout";

export default function QuizPageLayout({ children }: { children: ReactNode }) {
  // Reuse the dashboard shell (sidebar + animated background) for quiz pages
  return <DashboardLayout>{children}</DashboardLayout>;
}
