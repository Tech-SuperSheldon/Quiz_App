"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";
import LandingPage from "./LandingPage";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const noLayoutPages = ["/auth/login", "/auth/signup"];
  const showLayout = !noLayoutPages.includes(pathname);

  return (
    <>
      {showLayout && <Header />}
      <main className={`flex-1 container mx-auto ${!showLayout ? "flex items-center justify-center gap-4" : ""}`}>
        {pathname === "/" && <LandingPage />}
        {children}
      </main>
      {showLayout && <Footer />}
    </>
  );
}
