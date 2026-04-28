"use client";

import Image from "next/image";
import { Maximize2, X } from "lucide-react";
import { useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";

type ProjectLightboxProps = {
  title: string;
  image: string;
  darkImage?: string;
};

export function ProjectLightbox({ title, image, darkImage }: ProjectLightboxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const titleId = useId();
  const activeImage = isDarkTheme && darkImage ? darkImage : image;
  const activeImageSize = { width: 1440, height: 900 };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const syncTheme = () => {
      setIsDarkTheme(document.body.dataset.theme === "dark");
    };

    syncTheme();

    const observer = new MutationObserver(syncTheme);
    observer.observe(document.body, { attributes: true, attributeFilter: ["data-theme"] });

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        className="project-frame"
        onClick={() => setIsOpen(true)}
        aria-label={`Open ${title} preview`}
      >
        <Image
          src={activeImage}
          alt={`${title} interface preview`}
          width={activeImageSize.width}
          height={activeImageSize.height}
          className="project-image"
        />
        <span className="project-frame-action" aria-hidden="true">
          <Maximize2 />
        </span>
      </button>

      {isOpen && isMounted
        ? createPortal(
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          onMouseDown={() => setIsOpen(false)}
        >
          <div className="lightbox-panel" onMouseDown={(event) => event.stopPropagation()}>
            <div className="lightbox-header">
              <h2 id={titleId}>{title}</h2>
              <button
                type="button"
                className="lightbox-close"
                onClick={() => setIsOpen(false)}
                aria-label="Close preview"
              >
                <X aria-hidden="true" />
              </button>
            </div>
            <div className="lightbox-image-wrap">
              <Image
                src={activeImage}
                alt={`${title} interface preview`}
                width={activeImageSize.width}
                height={activeImageSize.height}
                className="lightbox-image"
                priority
              />
            </div>
          </div>
        </div>,
          document.body,
        )
        : null}
    </>
  );
}
