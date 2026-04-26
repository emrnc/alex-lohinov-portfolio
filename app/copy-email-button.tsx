"use client";

import { Check, Copy } from "lucide-react";
import { useEffect, useState } from "react";

type CopyEmailButtonProps = {
  email: string;
};

export function CopyEmailButton({ email }: CopyEmailButtonProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;

    const timeout = window.setTimeout(() => {
      setCopied(false);
    }, 1600);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [copied]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  return (
    <button
      type="button"
      className={`action-link action-link-primary copy-email-button ${copied ? "is-copied" : ""}`}
      onClick={handleCopy}
      aria-label={copied ? "Email copied" : "Copy email"}
      aria-live="polite"
    >
      <span className="copy-email-button__inner">
        <span className="copy-email-button__state copy-email-button__state-default">
          <Copy aria-hidden="true" />
          <span>Copy Email</span>
        </span>
        <span className="copy-email-button__state copy-email-button__state-success">
          <Check aria-hidden="true" />
          <span>Copied</span>
        </span>
      </span>
    </button>
  );
}
