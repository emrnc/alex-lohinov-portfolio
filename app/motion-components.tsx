"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

type PortfolioMotionProps = {
  children: ReactNode;
};

type EnterAnimationProps = {
  children: ReactNode;
  stagger: number;
  className?: string;
  as?: "div" | "header" | "nav" | "section";
  ariaLabel?: string;
  dataProject?: string;
};

export function PortfolioMotion({ children }: PortfolioMotionProps) {
  return (
    <section className="portfolio-card" aria-label="Portfolio">
      {children}
    </section>
  );
}

export function EnterAnimation({
  children,
  stagger,
  className,
  as = "div",
  ariaLabel,
  dataProject,
}: EnterAnimationProps) {
  const shouldReduceMotion = useReducedMotion();
  const MotionElement = motion[as];

  return (
    <MotionElement
      className={["animate-enter", className].filter(Boolean).join(" ")}
      aria-label={ariaLabel}
      data-project={dataProject}
      initial={shouldReduceMotion ? false : { y: 8, filter: "blur(6px)" }}
      animate={shouldReduceMotion ? undefined : { y: 0, filter: "blur(0px)" }}
      transition={{
        duration: 0.56,
        delay: stagger * 0.06,
        ease: [0.23, 1, 0.32, 1],
      }}
    >
      {children}
    </MotionElement>
  );
}
