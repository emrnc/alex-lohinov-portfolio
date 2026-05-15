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
  const style = { "--stagger": stagger } as CSSProperties;
  const props = {
    className: ["animate-enter", className].filter(Boolean).join(" "),
    style,
    "aria-label": ariaLabel,
    "data-project": dataProject,
  } as const;

  if (as === "header") {
    return <header {...props}>{children}</header>;
  }

  if (as === "nav") {
    return <nav {...props}>{children}</nav>;
  }

  if (as === "section") {
    return <section {...props}>{children}</section>;
  }

  return (
    <div {...props}>
      {children}
    </div>
  );
}
