"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";
import LandingPage from "./LandingPage";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const noLayoutPages = ["/auth/login", "/auth/register"];
  const dashboardPages = pathname.startsWith("/dashboard") || pathname.startsWith("/quizpage");
  const showLayout = !noLayoutPages.includes(pathname);
  const showFooter = showLayout && !dashboardPages;

  return (
    <>
      {showLayout && <Header />}
      <main className={`flex-1  ${!showLayout ? "flex items-center justify-center gap-4" : ""}`}>
        {pathname === "/" && <LandingPage />}
        {children}
      </main>
      {showFooter && <Footer />}
    </>
  );
}
