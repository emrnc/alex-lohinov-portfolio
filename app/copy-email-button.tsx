"use client";

import { Check, Copy } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

type CopyEmailButtonProps = {
  email: string;
};

type ConfettiPiece = {
  id: string;
  emoji: string;
  x: number;
  y: number;
  rotation: number;
  delay: number;
};

const confettiEmojis = ["✨", "💫", "⭐", "🌟", "⚡", "🪩", "🎉", "✦", "✧", "☄️"];

function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function createConfettiPieces() {
  const burstId = crypto.randomUUID();

  return Array.from({ length: 16 }, (_, index) => {
    const angle = randomBetween(Math.PI * 1.05, Math.PI * 1.95);
    const distance = randomBetween(80, 140);

    return {
      id: `${burstId}-${index}`,
      emoji: confettiEmojis[Math.floor(Math.random() * confettiEmojis.length)],
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance - randomBetween(12, 36),
      rotation: randomBetween(-42, 42),
      delay: index * 10,
    };
  });
}

export function CopyEmailButton({ email }: CopyEmailButtonProps) {
  const [copied, setCopied] = useState(false);
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!copied) return;

    const timeout = window.setTimeout(() => {
      setCopied(false);
    }, 1600);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [copied]);

  useEffect(() => {
    if (confetti.length === 0) return;

    const timeout = window.setTimeout(() => {
      setConfetti([]);
    }, 1300);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [confetti]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setConfetti(createConfettiPieces());
    } catch {
      setCopied(false);
    }
  };

  return (
    <button
      type="button"
      className="action-link action-link-primary copy-email-button"
      onClick={handleCopy}
      aria-live="polite"
    >
      <span className="copy-email-button__confetti" aria-hidden="true">
        <AnimatePresence>
          {prefersReducedMotion ? null : confetti.map((piece) => (
            <motion.span
              key={piece.id}
              className="copy-email-button__confetti-piece"
              initial={{ opacity: 0, x: 0, y: 0, rotate: 0, scale: 0.6 }}
              animate={{ opacity: [0, 1, 1, 0], x: piece.x, y: piece.y, rotate: piece.rotation, scale: 1.1 }}
              transition={{ duration: 1.1, delay: piece.delay / 1000, ease: [0.23, 1, 0.32, 1] }}
            >
              {piece.emoji}
            </motion.span>
          ))}
        </AnimatePresence>
      </span>
      <span className="copy-email-button__inner">
        <AnimatePresence initial={false} mode="popLayout">
          <motion.span
            key={copied ? "check" : "copy"}
            className="copy-email-button__state"
            initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.25 }}
            animate={prefersReducedMotion ? undefined : { opacity: 1, scale: 1 }}
            exit={prefersReducedMotion ? undefined : { opacity: 0, scale: 0.25 }}
            transition={{ type: "spring", duration: 0.3, bounce: 0 }}
          >
            {copied ? (
              <>
                <Check aria-hidden="true" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy aria-hidden="true" />
                <span>Copy Email</span>
              </>
            )}
          </motion.span>
        </AnimatePresence>
      </span>
    </button>
  );
}
