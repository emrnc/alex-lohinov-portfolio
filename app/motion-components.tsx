"use client";

import { motion, useAnimationControls, useReducedMotion } from "motion/react";
import { useEffect } from "react";
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
  const controls = useAnimationControls();
  const MotionElement = motion[as];

  useEffect(() => {
    if (shouldReduceMotion) {
      controls.set({ y: 0, filter: "blur(0px)" });
      return;
    }

    controls.set({ y: 8, filter: "blur(6px)" });
    void controls.start({
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.56,
        delay: stagger * 0.06,
        ease: [0.23, 1, 0.32, 1],
      },
    });
  }, [controls, shouldReduceMotion, stagger]);

  return (
    <MotionElement
      className={["animate-enter", className].filter(Boolean).join(" ")}
      aria-label={ariaLabel}
      data-project={dataProject}
      initial={false}
      animate={controls}
    >
      {children}
    </MotionElement>
  );
}
