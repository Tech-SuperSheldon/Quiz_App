
// "use client";

// import ScrollAnimation from "./ScrollAnimation";

// type ArrowProps = { className?: string };

// // =======================
// //   INLINE SVG ARROWS
// // =======================

// const ArrowBlack = ({ className }: ArrowProps) => (
//   <svg className={className} viewBox="0 0 70 70">
//     <path
//       d="M35 12C36 12 36.9 12.5 37.5 13.3L54.5 36.3C56.2 38.6 54.6 42 51.5 42H18.5C15.4 42 13.8 38.6 15.5 36.3L32.5 13.3C33.1 12.5 34 12 35 12Z"
//       fill="#111"
//       stroke="white"
//       strokeWidth="6"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     />
//   </svg>
// );

// const ArrowOutlineOrange = ({ className }: ArrowProps) => (
//   <svg className={className} viewBox="0 0 70 70">
//     <path
//       d="M35 12C36 12 36.9 12.5 37.5 13.3L54.5 36.3C56.2 38.6 54.6 42 51.5 42H18.5C15.4 42 13.8 38.6 15.5 36.3L32.5 13.3C33.1 12.5 34 12 35 12Z"
//       fill="white"
//       stroke="#FF8A00"
//       strokeWidth="6"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     />
//   </svg>
// );

// const ArrowSolidOrange = ({ className }: ArrowProps) => (
//   <svg className={className} viewBox="0 0 70 70">
//     <path
//       d="M35 12C36 12 36.9 12.5 37.5 13.3L54.5 36.3C56.2 38.6 54.6 42 51.5 42H18.5C15.4 42 13.8 38.6 15.5 36.3L32.5 13.3C33.1 12.5 34 12 35 12Z"
//       fill="#FF8A00"
//       stroke="white"
//       strokeWidth="6"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     />
//   </svg>
// );


// // =======================
// //     HERO SECTION
// // =======================

// export default function HeroSection() {
//   return (
//     <section className="relative pt-24 md:pt-32 pb-20 px-4 md:px-6 max-w-7xl mx-auto overflow-visible">

//       {/* SIMPLE, ROBUST CIRCULAR GRID */}
//       <div className="absolute inset-0 -z-10 flex items-center justify-center pointer-events-none">
//         <div className="w-[120%] max-w-[900px] aspect-square rounded-full overflow-hidden opacity-40">
//           <div
//             className="w-full h-full"
//             style={{
//               backgroundImage:
//                 "linear-gradient(to right, rgba(0,0,0,0.18) 2px, transparent 2px), linear-gradient(to bottom, rgba(0,0,0,0.18) 2px, transparent 2px)",
//               backgroundSize: "80px 80px",
//             }}
//           />
//         </div>
//       </div>

//       {/* CONTENT */}
//       <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-20 items-center">

//         {/* LEFT SIDE */}
//         <ScrollAnimation direction="right" delay={0.2}>
//           <div className="space-y-10 w-full text-center lg:text-left">

//             {/* TITLE */}
//             <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black leading-tight">
//               Enter the LevelUp Zone — Where Every Quiz Is a Battle!
//             </h1>

//             {/* SUBTEXT */}
//             <p className="text-base md:text-lg text-black/70 max-w-xl mx-auto lg:mx-0">
//               Join a live quiz battle with others and prove your brainpower.
//             </p>

//             {/* PLAY SECTION (CENTERED) */}
//             <div className="flex flex-col items-center gap-8">

//               {/* PLAY NOW BUTTON */}
//               <button
//                 className="
//                   px-16 md:px-20 py-5 md:py-6
//                   bg-gradient-to-b from-orange-400 to-orange-600
//                   text-white font-extrabold text-2xl md:text-3xl rounded-full tracking-wide
//                   shadow-[0_14px_30px_rgba(0,0,0,0.3)]
//                   transition-all duration-200
//                   hover:scale-105 hover:shadow-[0_22px_45px_rgba(0,0,0,0.45)]
//                   active:scale-95
//                 "
//               >
//                 PLAY NOW
//               </button>

//               {/* ARROWS */}
//               <div className="grid grid-cols-3 gap-12 md:gap-20 items-center">
//                 <ArrowBlack className="w-14 h-14 md:w-20 md:h-20 rotate-45 mx-auto drop-shadow-lg" />
//                 <ArrowOutlineOrange className="w-16 h-16 md:w-24 md:h-24 -rotate-10 mx-auto drop-shadow-lg" />
//                 <ArrowSolidOrange className="w-14 h-14 md:w-20 md:h-20 -rotate-45 mx-auto drop-shadow-lg" />
//               </div>

//               {/* NAME PILLS */}
//               <div className="grid grid-cols-3 gap-6 md:gap-20">
//                 <div className="px-4 py-2 md:px-6 md:py-2 rounded-full border-2 border-white bg-black text-white text-sm md:text-base">
//                   Roshdy
//                 </div>
//                 <div className="px-4 py-2 md:px-6 md:py-2 rounded-full border-2 border-orange-500 bg-white text-orange-500 text-sm md:text-base">
//                   Mohaimen
//                 </div>
//                 <div className="px-4 py-2 md:px-6 md:py-2 rounded-full border-2 border-white bg-orange-500 text-white text-sm md:text-base">
//                   Phoenix
//                 </div>
//               </div>

//             </div>
//           </div>
//         </ScrollAnimation>

//         {/* RIGHT SIDE */}
//         <ScrollAnimation direction="left" delay={0.3}>
//           <div className="space-y-6 md:space-y-8">

//             {/* CARD 1 */}
//             <div className="bg-gradient-to-r from-orange-500 to-orange-400 rounded-3xl px-10 md:px-14 py-6 flex items-center gap-6 md:gap-8 shadow-2xl">
//               <div className="text-center">
//                 <div className="text-white text-2xl md:text-3xl font-bold">1</div>
//                 <div className="text-green-300 text-lg md:text-2xl mt-1">▲</div>
//               </div>

//               <img
//                 className="w-12 h-12 md:w-16 md:h-16 rounded-full"
//                 src="https://api.dicebear.com/8.x/notionists/svg?seed=Roshdy"
//                 alt=""
//               />

//               <div className="flex-1">
//                 <div className="text-white font-semibold text-lg md:text-xl">Roshdy</div>
//               </div>

//               <div className="px-3 py-1 md:px-4 md:py-2 bg-white/30 text-white font-bold rounded-full shadow-md text-sm md:text-base">
//                 32
//               </div>
//             </div>

//             {/* CARD 2 */}
//             <div className="bg-white/90 rounded-3xl px-10 md:px-14 py-6 flex items-center gap-6 md:gap-8 shadow-xl backdrop-blur-md">
//               <div className="text-center">
//                 <div className="text-black text-2xl md:text-3xl font-bold">2</div>
//                 <div className="text-red-500 text-lg md:text-2xl mt-1">▼</div>
//               </div>

//               <img
//                 className="w-12 h-12 md:w-16 md:h-16 rounded-full"
//                 src="https://api.dicebear.com/8.x/notionists/svg?seed=Phoenix"
//                 alt=""
//               />

//               <div className="flex-1">
//                 <div className="text-black font-semibold text-lg md:text-xl">Phoenix</div>
//               </div>

//               <div className="px-3 py-1 md:px-4 md:py-2 bg-orange-500 text-white font-bold rounded-full shadow-md text-sm md:text-base">
//                 24
//               </div>
//             </div>

//             {/* CARD 3 */}
//             <div className="relative rounded-3xl px-10 md:px-14 py-6 flex items-center gap-6 md:gap-8 shadow-xl bg-white/85 backdrop-blur-md overflow-hidden h-32 md:h-40">
//               <div className="text-center">
//                 <div className="text-gray-700 text-2xl md:text-3xl font-bold">3</div>
//                 <div className="text-red-500 text-lg md:text-2xl mt-1">▼</div>
//               </div>

//               <img
//                 className="w-12 h-12 md:w-16 md:h-16 rounded-full"
//                 src="https://api.dicebear.com/8.x/notionists/svg?seed=Mohaimen"
//                 alt=""
//               />

//               <div className="flex-1">
//                 <div className="text-gray-700 font-semibold text-lg md:text-xl">Mohaimen</div>
//               </div>

//               <div className="px-3 py-1 md:px-4 md:py-2 bg-gray-600 text-white font-bold rounded-full shadow-md text-sm md:text-base">
//                 13
//               </div>

//               <div className="absolute bottom-0 left-0 right-0 h-20 md:h-28 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none" />
//             </div>

//           </div>
//         </ScrollAnimation>

//       </div>
//     </section>
//   );
// }








"use client";

import ScrollAnimation from "./ScrollAnimation";

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
//     HERO SECTION
// =======================

export default function HeroSection() {
  return (
    <section className="relative pt-24 md:pt-32 pb-20 px-4 md:px-6 max-w-7xl mx-auto overflow-visible">

      {/* ====================================================== */}
      {/*           CIRCULAR GRID THAT ALWAYS SHOWS             */}
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

              {/* PLAY NOW BUTTON */}
              <button
                className="
                  px-16 md:px-20 py-5 md:py-6
                  bg-gradient-to-b from-orange-400 to-orange-600
                  text-white font-extrabold text-2xl md:text-3xl rounded-full tracking-wide
                  shadow-[0_14px_30px_rgba(0,0,0,0.3)]
                  transition-all duration-200
                  hover:scale-105 hover:shadow-[0_22px_45px_rgba(0,0,0,0.45)]
                  active:scale-95
                "
              >
                PLAY NOW
              </button>

              {/* ARROWS */}
              <div className="grid grid-cols-3 gap-12 md:gap-20 items-center">
                <ArrowBlack className="w-14 h-14 md:w-20 md:h-20 rotate-45 mx-auto drop-shadow-lg" />
                <ArrowOutlineOrange className="w-16 h-16 md:w-24 md:h-24 -rotate-10 mx-auto drop-shadow-lg" />
                <ArrowSolidOrange className="w-14 h-14 md:w-20 md:h-20 -rotate-45 mx-auto drop-shadow-lg" />
              </div>

              {/* NAME PILLS WITH SHADOW */}
              <div className="grid grid-cols-3 gap-6 md:gap-20">
                <div className="px-4 py-2 md:px-6 md:py-2 rounded-full border-2 border-white bg-black text-white text-sm md:text-base shadow-lg shadow-black/30">
                  Roshdy
                </div>
                <div className="px-4 py-2 md:px-6 md:py-2 rounded-full border-2 border-orange-500 bg-white text-orange-500 text-sm md:text-base shadow-lg shadow-orange-500/30">
                  Mohaimen
                </div>
                <div className="px-4 py-2 md:px-6 md:py-2 rounded-full border-2 border-white bg-orange-500 text-white text-sm md:text-base shadow-lg shadow-orange-500/40">
                  Phoenix
                </div>
              </div>

            </div>
          </div>
        </ScrollAnimation>

        {/* RIGHT SIDE — LEADERBOARD */}
        <ScrollAnimation direction="left" delay={0.3}>
          <div className="space-y-6 md:space-y-8">

            {/* CARD 1 */}
            <div className="bg-gradient-to-r from-orange-500 to-orange-400 rounded-3xl px-10 md:px-14 py-6 flex items-center gap-6 md:gap-8 shadow-2xl">
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
            </div>

            {/* CARD 2 */}
            <div className="bg-white/90 rounded-3xl px-10 md:px-14 py-6 flex items-center gap-6 md:gap-8 shadow-xl backdrop-blur-md">
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
            </div>

            {/* CARD 3 */}
            <div className="relative rounded-3xl px-10 md:px-14 py-6 flex items-center gap-6 md:gap-8 shadow-xl bg-white/85 backdrop-blur-md overflow-hidden h-32 md:h-40">

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
            </div>

          </div>
        </ScrollAnimation>

      </div>
    </section>
  );
}
