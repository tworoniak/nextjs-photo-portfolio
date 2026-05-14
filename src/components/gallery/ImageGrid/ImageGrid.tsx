"use client";

import { useState, useRef } from "react";
import { CldImage } from "next-cloudinary";
import type { GalleryImage } from "@/types/image";
import Lightbox from "@/components/gallery/Lightbox";
import styles from "./ImageGrid.module.scss";

interface ImageGridProps {
  images: GalleryImage[];
}

export default function ImageGrid({ images }: ImageGridProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const isOpen = lightboxIndex !== null;
  const currentIndex = lightboxIndex ?? 0;

  function handleNext() {
    setLightboxIndex((i) => ((i ?? 0) + 1) % images.length);
  }

  function handlePrev() {
    setLightboxIndex((i) => ((i ?? 0) - 1 + images.length) % images.length);
  }

  if (images.length === 0) {
    return (
      <div className={styles.empty}>
        <p>No images in this gallery yet.</p>
      </div>
    );
  }

  return (
    <>
      <ul className={styles.grid}>
        {images.map((image, index) => (
          <li key={image.publicId}>
            <button
              className={styles.item}
              onClick={(e) => { triggerRef.current = e.currentTarget; setLightboxIndex(index); }}
              aria-label={`View ${image.alt || `image ${index + 1}`}`}
            >
              <CldImage
                src={image.publicId}
                alt={image.alt}
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                className={styles.image}
                crop="fill"
                gravity="auto"
                quality="auto"
              />
            </button>
          </li>
        ))}
      </ul>

      <Lightbox
        images={images}
        currentIndex={currentIndex}
        isOpen={isOpen}
        onClose={() => setLightboxIndex(null)}
        onNext={handleNext}
        onPrev={handlePrev}
        triggerRef={triggerRef}
      />
    </>
  );
}
