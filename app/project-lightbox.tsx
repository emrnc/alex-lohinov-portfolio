"use client";

import Image from "next/image";
import { Maximize2, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";
import {
  getStoredTheme,
  resolveTheme,
  subscribeToSystemThemeChange,
  subscribeToThemeChange,
  type ResolvedTheme,
} from "./theme";

type ProjectLightboxProps = {
  title: string;
  image: string;
  darkImage?: string;
  width?: number;
  height?: number;
  priority?: boolean;
};

const previewImageSize = { width: 1440, height: 900 };

function useIsMounted() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return isMounted;
}

function useResolvedTheme() {
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>("light");

  useEffect(() => {
    const syncTheme = () => {
      setResolvedTheme(resolveTheme(getStoredTheme()));
    };

    syncTheme();
    const unsubscribeFromSystemTheme = subscribeToSystemThemeChange(syncTheme);
    const unsubscribeFromTheme = subscribeToThemeChange(syncTheme);

    return () => {
      unsubscribeFromSystemTheme();
      unsubscribeFromTheme();
    };
  }, []);

  return resolvedTheme;
}

function useLightboxLifecycle(isOpen: boolean, onClose: () => void) {
  const [isImageVisible, setIsImageVisible] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setIsImageVisible(false);
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    const imageFrame = window.requestAnimationFrame(() => {
      setIsImageVisible(true);
    });
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.cancelAnimationFrame(imageFrame);
      setIsImageVisible(false);
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, onClose]);

  return isImageVisible;
}

export function ProjectLightbox({
  title,
  image,
  darkImage,
  width,
  height,
  priority = false,
}: ProjectLightboxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const titleId = useId();
  const closeLightbox = useCallback(() => {
    setIsOpen(false);
  }, []);
  const isMounted = useIsMounted();
  const resolvedTheme = useResolvedTheme();
  const isImageVisible = useLightboxLifecycle(isOpen, closeLightbox);
  const prefersReducedMotion = useReducedMotion();
  const activeImage = resolvedTheme === "dark" && darkImage ? darkImage : image;
  const imageWidth = width ?? previewImageSize.width;
  const imageHeight = height ?? previewImageSize.height;

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
          width={imageWidth}
          height={imageHeight}
          className="project-image border-overlay"
          sizes="(max-width: 680px) 335px, 800px"
          loading={priority ? "eager" : "lazy"}
        />
        <span className="project-frame-action" aria-hidden="true">
          <Maximize2 />
        </span>
      </button>

      {isMounted
        ? createPortal(
          <AnimatePresence>
            {isOpen ? (
              <motion.div
                className="lightbox"
                role="dialog"
                aria-modal="true"
                aria-labelledby={titleId}
                onMouseDown={closeLightbox}
                initial={prefersReducedMotion ? false : { opacity: 0 }}
                animate={prefersReducedMotion ? undefined : { opacity: 1 }}
                exit={prefersReducedMotion ? undefined : { opacity: 0 }}
                transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
              >
                <motion.div
                  className="lightbox-panel"
                  onMouseDown={(event) => event.stopPropagation()}
                  initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.98, y: 8 }}
                  animate={prefersReducedMotion ? undefined : { opacity: 1, scale: 1, y: 0 }}
                  exit={prefersReducedMotion ? undefined : { opacity: 0, scale: 0.98, y: 8 }}
                  transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
                >
                  <div className="lightbox-header">
                    <h2 id={titleId}>{title}</h2>
                    <button
                      type="button"
                      className="lightbox-close"
                      onClick={closeLightbox}
                      aria-label="Close preview"
                    >
                      <X aria-hidden="true" />
                    </button>
                  </div>
                  <div className="lightbox-image-wrap">
                    {isImageVisible ? (
                      <Image
                        src={activeImage}
                        alt={`${title} interface preview`}
                        width={imageWidth}
                        height={imageHeight}
                        className="lightbox-image border-overlay"
                        sizes="(max-width: 1148px) calc(100vw - 48px), 1100px"
                      />
                    ) : (
                      <div className="lightbox-image lightbox-image-placeholder border-overlay" aria-hidden="true" />
                    )}
                  </div>
                </motion.div>
              </motion.div>
            ) : null}
          </AnimatePresence>,
          document.body,
        )
        : null}
    </>
  );
}
