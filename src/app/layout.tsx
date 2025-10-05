// app/layout.tsx
import { Quicksand } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "@/components/LayoutWrapper";
import Header from "@/components/Header";

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-quicksand",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${quicksand.variable} font-sans`}>
      <body className="flex flex-col min-h-screen bg-white/95 text-gray-900">
        {/* Client wrapper will adjust layout after hydration */}
        <LayoutWrapper>
           {children}
         </LayoutWrapper>
        
      </body>
    </html>
  );
}
