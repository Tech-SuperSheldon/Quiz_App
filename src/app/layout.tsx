// app/layout.tsx
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";
import { Quicksand } from "next/font/google";
import LandingPage from "@/components/LandingPage";

// Load Quicksand font globally
const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-quicksand",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${quicksand.variable} font-sans`}>
      <body className="flex flex-col min-h-screen bg-white/95 text-gray-900">
        <Header />
        <main className="flex-1 container mx-auto">{children}
          <LandingPage/>
        </main>
        
        <Footer />
      </body>
    </html>
  );
}
