"use client";

import ScrollAnimation from "./ScrollAnimation";
import { FaApple, FaGooglePlay } from "react-icons/fa";

// Store links for the mobile apps
const APP_STORE_URL = "https://apps.apple.com/us/app/levelup-learn-play/id6773067123";
const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.supersheldon.levelup";

export default function MiddleCTASection() {
  return (
    <section className="py-16 px-6 relative overflow-hidden">
      <ScrollAnimation direction="fade" delay={0.2}>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
            Ready to Join the Smartest Arena?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Download the app now to get your exclusive early access invitation.
          </p>

          {/* App Store & Google Play badges */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-6 py-3 bg-black text-white rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
            >
              <FaApple className="w-8 h-8" />
              <span className="flex flex-col leading-none text-left">
                <span className="text-xs opacity-80">Download on the</span>
                <span className="text-lg font-semibold">App Store</span>
              </span>
            </a>

            <a
              href={PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-6 py-3 bg-black text-white rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
            >
              <FaGooglePlay className="w-7 h-7" />
              <span className="flex flex-col leading-none text-left">
                <span className="text-xs opacity-80">GET IT ON</span>
                <span className="text-lg font-semibold">Google Play</span>
              </span>
            </a>
          </div>

        </div>
      </ScrollAnimation>
      {/* Decorative Circle */}

    </section>
  );
}
