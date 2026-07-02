"use client";
import { useRef, useEffect, ReactNode } from "react";
import { motion, useInView, useAnimation, type Variants, type BezierDefinition } from "framer-motion";

type Direction = "up" | "down" | "left" | "right" | "fade" | "zoom";

interface ScrollAnimationProps {
  children: ReactNode;
  delay?: number;
  direction?: Direction;
  className?: string;
  /** Distance (px) the element travels while revealing. */
  distance?: number;
  /** Reveal duration in seconds. */
  duration?: number;
  /** Adds a subtle blur-in (Framer style). Defaults to true. */
  blur?: boolean;
}

// Framer-like "ease out expo" curve — quick start, soft landing.
const easing: BezierDefinition = [0.16, 1, 0.3, 1];

export default function ScrollAnimation({
  children,
  delay = 0,
  direction = "up",
  className = "",
  distance = 60,
  duration = 0.7,
  blur = true,
}: ScrollAnimationProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const offsetX =
    direction === "left" ? distance : direction === "right" ? -distance : 0;
  const offsetY =
    direction === "up" ? distance : direction === "down" ? -distance : 0;

  const variants: Variants = {
    hidden: {
      opacity: 0,
      x: offsetX,
      y: offsetY,
      scale: direction === "zoom" ? 0.92 : 1,
      filter: blur ? "blur(10px)" : "blur(0px)",
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration,
        delay,
        ease: easing,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}
