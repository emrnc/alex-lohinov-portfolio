"use client";

import Image from "next/image";
import { Maximize2, X } from "lucide-react";
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

export function ProjectLightbox({ title, image, darkImage }: ProjectLightboxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const titleId = useId();
  const closeLightbox = useCallback(() => {
    setIsOpen(false);
  }, []);
  const isMounted = useIsMounted();
  const resolvedTheme = useResolvedTheme();
  const isImageVisible = useLightboxLifecycle(isOpen, closeLightbox);
  const activeImage = resolvedTheme === "dark" && darkImage ? darkImage : image;

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
          width={previewImageSize.width}
          height={previewImageSize.height}
          className="project-image"
          sizes="(max-width: 680px) 335px, 900px"
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
          onMouseDown={closeLightbox}
        >
          <div className="lightbox-panel" onMouseDown={(event) => event.stopPropagation()}>
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
                  width={previewImageSize.width}
                  height={previewImageSize.height}
                  className="lightbox-image"
                  sizes="(max-width: 1148px) calc(100vw - 48px), 1100px"
                />
              ) : (
                <div className="lightbox-image lightbox-image-placeholder" aria-hidden="true" />
              )}
            </div>
          </div>
        </div>,
          document.body,
        )
        : null}
    </>
  );
}
