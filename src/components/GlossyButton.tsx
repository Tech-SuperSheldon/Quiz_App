"use client";

import React from "react";

interface GlossyButtonProps {
  children?: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}

const GlossyButton: React.FC<GlossyButtonProps> = ({
  children = "Book A Free Math Class",
  onClick,
  className = "",
}) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(e);
  };

  return (
    <button
      onClick={handleClick}
      className={`relative overflow-hidden animate-pulse-glow
      bg-gradient-to-r from-[#7021ef] via-[#a224ec] to-[#ab3eea] 
      text-white font-semibold px-6 py-2 rounded-full 
      border border-white/20 
      shadow-[0_4px_15px_rgba(123,47,247,0.4)] 
      hover:shadow-[0_0_25px_rgba(201,111,255,0.6)]
      hover:scale-[1.05]
      active:scale-[0.98]
      transition-all duration-300 ease-out
      backdrop-blur-[2px]
      before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/25 before:to-transparent before:opacity-40 before:rounded-full
      ${className}`}
    >
      <span className="relative z-10">{children}</span>

      {/* Glossy streak animation */}
      <div className="absolute top-0 left-[-150%] w-[250%] h-full z-20 animate-shine">
        <div className="w-full h-full bg-gradient-to-r from-transparent via-white/60 to-transparent blur-[2px] skew-x-[20deg] opacity-70"></div>
      </div>

      {/* Inner reflection overlay */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-t from-black/10 to-white/10 opacity-40 mix-blend-overlay pointer-events-none"></div>
    </button>
  );
};

export default GlossyButton;
