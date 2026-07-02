"use client";
import { useRef, ReactNode } from "react";
import { motion, useInView, type Variants, type BezierDefinition } from "framer-motion";

const easing: BezierDefinition = [0.16, 1, 0.3, 1];

interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  /** Gap in seconds between each child revealing. */
  stagger?: number;
  /** Delay before the first child reveals. */
  delay?: number;
}

/**
 * Wrap a group of <StaggerItem> elements. Children reveal one after another
 * as the container scrolls into view — the classic Framer list/grid effect.
 */
export function StaggerContainer({
  children,
  className = "",
  stagger = 0.12,
  delay = 0,
}: StaggerContainerProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const container: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger, delayChildren: delay },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={container}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {children}
    </motion.div>
  );
}

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
  distance?: number;
}

export function StaggerItem({ children, className = "", distance = 40 }: StaggerItemProps) {
  const item: Variants = {
    hidden: { opacity: 0, y: distance, filter: "blur(8px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.6, ease: easing },
    },
  };

  return (
    <motion.div className={className} variants={item}>
      {children}
    </motion.div>
  );
}
