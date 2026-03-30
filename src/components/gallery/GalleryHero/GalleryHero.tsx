"use client";

import { CldImage } from "next-cloudinary";
import type { Gallery } from "@/types/gallery";
import styles from "./GalleryHero.module.scss";

interface GalleryHeroProps {
  gallery: Gallery;
}

export default function GalleryHero({ gallery }: GalleryHeroProps) {
  return (
    <div className={styles.hero}>
      <div className={styles.imageWrapper}>
        <CldImage
          src={gallery.coverImage}
          alt={gallery.title}
          fill
          priority
          sizes="100vw"
          className={styles.image}
          crop="fill"
          gravity="auto"
          quality="auto"
        />
        <div className={styles.gradient} />
      </div>

      <div className={styles.content}>
        <p className={styles.eyebrow}>
          {gallery.city}
          {gallery.venue ? ` · ${gallery.venue}` : ""}
        </p>
        <h1 className={styles.title}>{gallery.title}</h1>
      </div>
    </div>
  );
}
