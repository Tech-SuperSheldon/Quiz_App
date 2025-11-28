"use client";
import ScrollAnimation from "./ScrollAnimation";

export default function MiddleCTASection() {
  return (
    <section className="py-16 px-6 relative overflow-hidden">
      <ScrollAnimation direction="fade" delay={0.2}>
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
          Ready to Join the Smartest Arena?
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          Sign up now to get your exclusive early access invitation.
        </p>
        <button className="px-8 py-4 bg-orange-500 text-white font-bold text-lg rounded-full shadow-lg hover:bg-orange-600 transition-all transform hover:scale-105">
          Sign up
        </button>
      </div>
      </ScrollAnimation>
      {/* Decorative Circle */}
      
    </section>
  );
}

