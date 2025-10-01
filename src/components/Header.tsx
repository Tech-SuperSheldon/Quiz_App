"use client";
import Link from "next/link";
import { useState } from "react";
import GlossyButton from "./GlossyButton";

export default function Header() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <header className="w-full bg-white shadow-md">
      <nav className="container mx-auto flex items-center justify-between p-4">
        <Link href="/" className="text-xl font-bold">
          Supersheldon
        </Link>
        {loggedIn ? (
          <Link href="/dashboard" className="rounded-full bg-gray-200 px-4 py-2">
            Profile
          </Link>
        ) : (
          <Link href="/auth/login">
            <GlossyButton>Get Started</GlossyButton>
            
          </Link>
        )}
      </nav>
    </header>
  );
}
