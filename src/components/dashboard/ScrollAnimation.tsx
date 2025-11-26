"use client";
import { useRef, useEffect, ReactNode } from "react";
import { motion, useInView, useAnimation, type Variants, type BezierDefinition } from "framer-motion";

interface ScrollAnimationProps {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "fade";
  className?: string;
}

export default function ScrollAnimation({
  children,
  delay = 0,
  direction = "up",
  className = "",
}: ScrollAnimationProps) {
  const ref = useRef(null);
  // Reduce margin on mobile for earlier trigger
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const easing: BezierDefinition = [0.25, 0.25, 0, 1];

  const variants: Variants = {
    hidden: {
      opacity: direction === "fade" ? 0 : 0,
      y: direction === "up" ? 50 : direction === "down" ? -50 : direction === "fade" ? 0 : 0,
      x: direction === "left" ? 50 : direction === "right" ? -50 : direction === "fade" ? 0 : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration: 0.5,
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

