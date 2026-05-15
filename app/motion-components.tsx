"use client";

import { motion, useReducedMotion } from "motion/react";
import type { CSSProperties, ReactNode } from "react";

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
  const prefersReducedMotion = useReducedMotion();
  const style = { "--stagger": stagger } as CSSProperties;
  const motionProps = {
    className: ["animate-enter", className].filter(Boolean).join(" "),
    style,
    initial: prefersReducedMotion ? false : { opacity: 0, y: 10 },
    animate: prefersReducedMotion ? undefined : { opacity: 1, y: 0 },
    transition: { duration: 0.72, delay: stagger * 0.07, ease: [0.23, 1, 0.32, 1] },
    "aria-label": ariaLabel,
    "data-project": dataProject,
  } as const;

  if (as === "header") {
    return <motion.header {...motionProps}>{children}</motion.header>;
  }

  if (as === "nav") {
    return <motion.nav {...motionProps}>{children}</motion.nav>;
  }

  if (as === "section") {
    return <motion.section {...motionProps}>{children}</motion.section>;
  }

  return (
    <motion.div {...motionProps}>
      {children}
    </motion.div>
  );
}
