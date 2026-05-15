"use client";

import { Check, Copy } from "lucide-react";
import type { CSSProperties } from "react";
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
      className={`action-link action-link-primary copy-email-button ${copied ? "is-copied" : ""}`}
      onClick={handleCopy}
      aria-live="polite"
    >
      <span className="copy-email-button__confetti" aria-hidden="true">
        {confetti.map((piece) => (
          <span
            key={piece.id}
            className="copy-email-button__confetti-piece"
            style={
              {
                "--confetti-x": `${piece.x}px`,
                "--confetti-y": `${piece.y}px`,
                "--confetti-rotation": `${piece.rotation}deg`,
                "--confetti-delay": `${piece.delay}ms`,
              } as CSSProperties
            }
          >
            {piece.emoji}
          </span>
        ))}
      </span>
      <span className="copy-email-button__inner">
        {copied ? (
          <span className="copy-email-button__state copy-email-button__state-success">
            <Check aria-hidden="true" />
            <span>Copied</span>
          </span>
        ) : (
          <span className="copy-email-button__state copy-email-button__state-default">
            <Copy aria-hidden="true" />
            <span>Copy Email</span>
          </span>
        )}
      </span>
    </button>
  );
}
