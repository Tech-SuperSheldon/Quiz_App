"use client";

import ScrollAnimation from "./ScrollAnimation";
import { motion } from "framer-motion";
import { FaApple, FaGooglePlay } from "react-icons/fa";

// Store links for the mobile apps
const APP_STORE_URL = "https://apps.apple.com/us/app/levelup-learn-play/id6773067123";
const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.supersheldon.levelup";

type ArrowProps = { className?: string };

// =======================
//   INLINE SVG ARROWS
// =======================

const ArrowBlack = ({ className }: ArrowProps) => (
  <svg className={className} viewBox="0 0 70 70">
    <path
      d="M35 12C36 12 36.9 12.5 37.5 13.3L54.5 36.3C56.2 38.6 54.6 42 51.5 42H18.5C15.4 42 13.8 38.6 15.5 36.3L32.5 13.3C33.1 12.5 34 12 35 12Z"
      fill="#111"
      stroke="white"
      strokeWidth="6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ArrowOutlineOrange = ({ className }: ArrowProps) => (
  <svg className={className} viewBox="0 0 70 70">
    <path
      d="M35 12C36 12 36.9 12.5 37.5 13.3L54.5 36.3C56.2 38.6 54.6 42 51.5 42H18.5C15.4 42 13.8 38.6 15.5 36.3L32.5 13.3C33.1 12.5 34 12 35 12Z"
      fill="white"
      stroke="#FF8A00"
      strokeWidth="6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ArrowSolidOrange = ({ className }: ArrowProps) => (
  <svg className={className} viewBox="0 0 70 70">
    <path
      d="M35 12C36 12 36.9 12.5 37.5 13.3L54.5 36.3C56.2 38.6 54.6 42 51.5 42H18.5C15.4 42 13.8 38.6 15.5 36.3L32.5 13.3C33.1 12.5 34 12 35 12Z"
      fill="#FF8A00"
      stroke="white"
      strokeWidth="6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);


// =======================
//      HERO SECTION
// =======================

export default function HeroSection() {
  return (
    <section className="relative pt-24 md:pt-32 pb-20 px-4 md:px-6 max-w-7xl mx-auto overflow-visible">

      {/* ====================================================== */}
      {/* CIRCULAR GRID THAT ALWAYS SHOWS             */}
      {/* ====================================================== */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
        <div className="relative w-[130vw] max-w-[900px] aspect-square rounded-full overflow-hidden opacity-40">

          {/* Grid */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(0,0,0,0.18) 2px, transparent 2px), linear-gradient(to bottom, rgba(0,0,0,0.18) 2px, transparent 2px)",
              backgroundSize: "80px 80px",
            }}
          />

          {/* Circular fade */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle, rgba(255,255,255,0) 40%, rgba(255,255,255,1) 90%)",
            }}
          />
        </div>
      </div>

      {/* ALL CONTENT ABOVE GRID */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-20 items-center">

        {/* LEFT SIDE */}
        <ScrollAnimation direction="right" delay={0.2}>
          <div className="space-y-10 w-full text-center lg:text-left">

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black leading-tight">
              Enter the LevelUp Zone — Where Every Quiz Is a Battle!
            </h1>

            <p className="text-base md:text-lg text-black/70 max-w-xl mx-auto lg:mx-0">
              Join a live quiz battle with others and prove your brainpower.
            </p>

            {/* PLAY STACK */}
            <div className="flex flex-col items-center gap-8">

              {/* APP STORE BADGES -> download links */}
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <motion.a
                  href={APP_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-6 py-3.5 bg-black text-white rounded-2xl shadow-lg"
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <FaApple className="w-8 h-8" />
                  <span className="flex flex-col leading-none text-left">
                    <span className="text-[11px] opacity-80">Download on the</span>
                    <span className="text-lg font-semibold">App Store</span>
                  </span>
                </motion.a>

                <motion.a
                  href={PLAY_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-6 py-3.5 bg-black text-white rounded-2xl shadow-lg"
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <FaGooglePlay className="w-7 h-7" />
                  <span className="flex flex-col leading-none text-left">
                    <span className="text-[11px] opacity-80">GET IT ON</span>
                    <span className="text-lg font-semibold">Google Play</span>
                  </span>
                </motion.a>
              </div>

              {/* ARROWS — gentle continuous float, each offset for a wave effect */}
              <div className="grid grid-cols-3 gap-12 md:gap-20 items-center">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0 }}
                >
                  <ArrowBlack className="w-14 h-14 md:w-20 md:h-20 rotate-45 mx-auto drop-shadow-lg" />
                </motion.div>
                <motion.div
                  animate={{ y: [0, -14, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
                >
                  <ArrowOutlineOrange className="w-16 h-16 md:w-24 md:h-24 -rotate-10 mx-auto drop-shadow-lg" />
                </motion.div>
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
                >
                  <ArrowSolidOrange className="w-14 h-14 md:w-20 md:h-20 -rotate-45 mx-auto drop-shadow-lg" />
                </motion.div>
              </div>

              {/* NAME PILLS WITH SHADOW — staggered pop-in */}
              <motion.div
                className="grid grid-cols-3 gap-6 md:gap-20"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                transition={{ staggerChildren: 0.15, delayChildren: 0.4 }}
              >
                {[
                  { name: "Roshdy", cls: "border-white bg-black text-white shadow-black/30" },
                  { name: "Mohaimen", cls: "border-orange-500 bg-white text-orange-500 shadow-orange-500/30" },
                  { name: "Phoenix", cls: "border-white bg-orange-500 text-white shadow-orange-500/40" },
                ].map((p) => (
                  <motion.div
                    key={p.name}
                    variants={{
                      hidden: { opacity: 0, y: 20, scale: 0.8 },
                      visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 300, damping: 18 } },
                    }}
                    whileHover={{ scale: 1.08, y: -3 }}
                    className={`px-4 py-2 md:px-6 md:py-2 rounded-full border-2 text-sm md:text-base shadow-lg cursor-default ${p.cls}`}
                  >
                    {p.name}
                  </motion.div>
                ))}
              </motion.div>

            </div>
          </div>
        </ScrollAnimation>

        {/* RIGHT SIDE — LEADERBOARD */}
        <ScrollAnimation direction="left" delay={0.3}>
          <div className="space-y-6 md:space-y-8">

            {/* CARD 1 */}
            <motion.div whileHover={{ scale: 1.03, y: -4 }} transition={{ type: "spring", stiffness: 300, damping: 20 }} className="bg-gradient-to-r from-orange-500 to-orange-400 rounded-3xl px-10 md:px-14 py-6 flex items-center gap-6 md:gap-8 shadow-2xl">
              <div className="text-center">
                <div className="text-white text-2xl md:text-3xl font-bold">1</div>
                <div className="text-green-300 text-lg md:text-2xl mt-1">▲</div>
              </div>

              <img
                className="w-12 h-12 md:w-16 md:h-16 rounded-full"
                src="https://api.dicebear.com/8.x/notionists/svg?seed=Roshdy"
                alt=""
              />

              <div className="flex-1">
                <div className="text-white font-semibold text-lg md:text-xl">Roshdy</div>
              </div>

              <div className="px-3 py-1 md:px-4 md:py-2 bg-white/30 text-white font-bold rounded-full shadow-md text-sm md:text-base">
                32
              </div>
            </motion.div>

            {/* CARD 2 */}
            <motion.div whileHover={{ scale: 1.03, y: -4 }} transition={{ type: "spring", stiffness: 300, damping: 20 }} className="bg-white/90 rounded-3xl px-10 md:px-14 py-6 flex items-center gap-6 md:gap-8 shadow-xl backdrop-blur-md">
              <div className="text-center">
                <div className="text-black text-2xl md:text-3xl font-bold">2</div>
                <div className="text-red-500 text-lg md:text-2xl mt-1">▼</div>
              </div>

              <img
                className="w-12 h-12 md:w-16 md:h-16 rounded-full"
                src="https://api.dicebear.com/8.x/notionists/svg?seed=Phoenix"
                alt=""
              />

              <div className="flex-1">
                <div className="text-black font-semibold text-lg md:text-xl">Phoenix</div>
              </div>

              <div className="px-3 py-1 md:px-4 md:py-2 bg-orange-500 text-white font-bold rounded-full shadow-md text-sm md:text-base">
                24
              </div>
            </motion.div>

            {/* CARD 3 */}
            <motion.div whileHover={{ scale: 1.03, y: -4 }} transition={{ type: "spring", stiffness: 300, damping: 20 }} className="relative rounded-3xl px-10 md:px-14 py-6 flex items-center gap-6 md:gap-8 shadow-xl bg-white/85 backdrop-blur-md overflow-hidden h-32 md:h-40">

              <div className="text-center">
                <div className="text-gray-700 text-2xl md:text-3xl font-bold">3</div>
                <div className="text-red-500 text-lg md:text-2xl mt-1">▼</div>
              </div>

              <img
                className="w-12 h-12 md:w-16 md:h-16 rounded-full"
                src="https://api.dicebear.com/8.x/notionists/svg?seed=Mohaimen"
                alt=""
              />

              <div className="flex-1">
                <div className="text-gray-700 font-semibold text-lg md:text-xl">Mohaimen</div>
              </div>

              <div className="px-3 py-1 md:px-4 md:py-2 bg-gray-600 text-white font-bold rounded-full shadow-md text-sm md:text-base">
                13
              </div>

              {/* BOTTOM FADE */}
              <div className="absolute bottom-0 left-0 right-0 h-20 md:h-28 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none" />
            </motion.div>

          </div>
        </ScrollAnimation>

      </div>
    </section>
  );
}