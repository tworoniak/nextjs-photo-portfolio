"use client";

import { useEffect, useCallback } from "react";
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
}

export default function Lightbox({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNext,
  onPrev,
}: LightboxProps) {
  const current = images[currentIndex];
  const hasMultiple = images.length > 1;

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

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen || !current) return null;

  return (
    <div className={styles.overlay} onClick={onClose} role="dialog" aria-modal="true" aria-label="Image lightbox">
      <div className={styles.inner} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose} aria-label="Close lightbox">
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
              className={`${styles.navButton} ${styles.prev}`}
              onClick={onPrev}
              aria-label="Previous image"
            >
              <ChevronIcon direction="left" />
            </button>
            <button
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
