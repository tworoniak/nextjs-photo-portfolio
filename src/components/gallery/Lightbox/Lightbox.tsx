"use client";

import { useEffect, useCallback, useRef } from "react";
import { CldImage } from "next-cloudinary";
import type { GalleryImage } from "@/types/image";
import styles from "./Lightbox.module.scss";

interface LightboxProps {
  images: GalleryImage[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  /** Ref to the trigger element so focus can be restored on close */
  triggerRef?: React.RefObject<HTMLButtonElement | null>;
}

export default function Lightbox({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNext,
  onPrev,
  triggerRef,
}: LightboxProps) {
  const current = images[currentIndex];
  const hasMultiple = images.length > 1;

  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const prevButtonRef = useRef<HTMLButtonElement>(null);
  const nextButtonRef = useRef<HTMLButtonElement>(null);

  // Arrow key + Escape navigation
  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    },
    [isOpen, onClose, onNext, onPrev]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  // Focus the close button when the lightbox opens
  useEffect(() => {
    if (!isOpen) return;
    closeButtonRef.current?.focus();
  }, [isOpen]);

  // Restore focus to the trigger when closed
  useEffect(() => {
    if (isOpen) return;
    triggerRef?.current?.focus();
  }, [isOpen, triggerRef]);

  // Tab trap: cycle only within the three interactive buttons
  useEffect(() => {
    if (!isOpen) return;

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const focusable = [closeButtonRef, prevButtonRef, nextButtonRef]
        .map((r) => r.current)
        .filter(Boolean) as HTMLButtonElement[];
      if (focusable.length === 0) return;

      const idx = focusable.indexOf(document.activeElement as HTMLButtonElement);
      e.preventDefault();
      if (e.shiftKey) {
        focusable[(idx - 1 + focusable.length) % focusable.length].focus();
      } else {
        focusable[(idx + 1) % focusable.length].focus();
      }
    };

    window.addEventListener("keydown", handleTab);
    return () => window.removeEventListener("keydown", handleTab);
  }, [isOpen]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen || !current) return null;

  return (
    <div
      className={styles.overlay}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="lightbox-title"
    >
      {/* Dynamic label: announced by screen readers on open and on navigation */}
      <h2 id="lightbox-title" className={styles.srOnly}>
        {current.alt || `Image ${currentIndex + 1} of ${images.length}`}
      </h2>

      <div className={styles.inner} onClick={(e) => e.stopPropagation()}>
        <button
          ref={closeButtonRef}
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close lightbox"
        >
          <CloseIcon />
        </button>

        <div className={styles.imageWrapper}>
          <CldImage
            key={current.publicId}
            src={current.publicId}
            alt={current.alt}
            fill
            sizes="100vw"
            className={styles.image}
            quality="auto"
          />
        </div>

        {hasMultiple && (
          <>
            <button
              ref={prevButtonRef}
              className={`${styles.navButton} ${styles.prev}`}
              onClick={onPrev}
              aria-label="Previous image"
            >
              <ChevronIcon direction="left" />
            </button>
            <button
              ref={nextButtonRef}
              className={`${styles.navButton} ${styles.next}`}
              onClick={onNext}
              aria-label="Next image"
            >
              <ChevronIcon direction="right" />
            </button>
          </>
        )}

        <div className={styles.footer}>
          {current.caption && (
            <p className={styles.caption}>{current.caption}</p>
          )}
          {hasMultiple && (
            <span className={styles.counter}>
              {currentIndex + 1} / {images.length}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M2 2L18 18M18 2L2 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function ChevronIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      {direction === "left" ? (
        <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      ) : (
        <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      )}
    </svg>
  );
}
