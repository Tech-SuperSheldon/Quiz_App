"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function LandingPage() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = Cookies.get("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleCtaClick = () => {
    if (isLoggedIn) {
      router.push("/dashboard");
    } else {
      router.push("/register");
    }
  };

  const handleGoogleSignIn = () => {
    router.push("/auth/google");
  };

  const GoogleButton = ({ text }: { text: string }) => (
    <button
      onClick={handleGoogleSignIn}
      className="mt-8 flex items-center justify-center w-full max-w-xs mx-auto gap-3 px-6 py-3 
                 bg-white border border-gray-300 text-gray-700 font-medium 
                 rounded-full shadow-md hover:bg-gray-100 hover:shadow-lg 
                 transition-all duration-300 transform hover:scale-[1.02]"
    >
      <img
        src="https://www.svgrepo.com/show/355037/google.svg"
        alt="Google"
        className="w-5 h-5"
      />
      {text}
    </button>
  );

  return (
    <div className="relative mt-20 min-h-screen bg-white/95 flex flex-col">
      <div>
        {/* Hero Section */}
        <section className="text-center py-16 px-6">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
            Test Your Knowledge
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Challenge yourself with our comprehensive quiz platform. Choose your
            topic, set your difficulty, and compete with others!
          </p>

          {/* CTA Button */}
          {isLoggedIn ? (
            <button
              onClick={handleCtaClick}
              className="mt-8 px-8 py-4 bg-indigo-600 text-white font-bold rounded-full shadow-lg hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105"
            >
              Go to Dashboard
            </button>
          ) : (
            <GoogleButton text="Sign in with Google" />
          )}
        </section>

        {/* Features */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-6 px-6 max-w-6xl mx-auto pb-16">
          {[
            {
              title: "Multiple Topics",
              desc: "Choose from a wide variety of subjects and topics to test your knowledge.",
              icon: "📖",
            },
            {
              title: "Timed Challenges",
              desc: "Set your own time limits and challenge yourself to answer quickly and accurately.",
              icon: "⏱️",
            },
            {
              title: "Leaderboards",
              desc: "Compete with other students and see how you rank on our global leaderboards.",
              icon: "🏆",
            },
            {
              title: "Progress Tracking",
              desc: "Track your progress and review your performance with detailed analytics.",
              icon: "📊",
            },
          ].map((f, i) => (
            <div
              key={i}
              className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition flex flex-col items-center text-center"
            >
              <span className="text-4xl">{f.icon}</span>
              <h3 className="mt-4 font-semibold text-black text-lg">{f.title}</h3>
              <p className="mt-2 text-gray-600 text-sm">{f.desc}</p>
            </div>
          ))}
        </section>

        {/* Final CTA */}
        <section className="bg-indigo-600 text-white text-center rounded-2xl py-12 px-12 max-w-5xl mx-auto mb-16">
          <h2 className="text-2xl md:text-3xl font-bold">
            Ready to Start Learning?
          </h2>
          <p className="mt-2 text-lg">
            Join thousands of students who are already improving their knowledge
            with our quiz platform.
          </p>
          {isLoggedIn ? (
            <button
              onClick={handleCtaClick}
              className="mt-6 px-6 py-3 bg-white text-indigo-700 font-medium rounded-xl shadow hover:bg-gray-100 transition"
            >
              Continue to Dashboard
            </button>
          ) : (
            <GoogleButton text="Sign in with Google" />
          )}
        </section>
      </div>
    </div>
  );
}
