"use client";

import Link from "next/link";
import { CldImage } from "next-cloudinary";
import type { Gallery } from "@/types/gallery";
import { formatDateShort } from "@/lib/utils/formatDate";
import styles from "./GalleryCard.module.scss";

interface GalleryCardProps {
  gallery: Gallery;
}

export default function GalleryCard({ gallery }: GalleryCardProps) {
  const location = [gallery.venue, gallery.city].filter(Boolean).join(" · ");

  return (
    <Link href={`/gallery/${gallery.slug}`} className={styles.card}>
      <div className={styles.imageWrapper}>
        <CldImage
          src={gallery.coverImage}
          alt={gallery.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={styles.image}
          crop="fill"
          gravity="auto"
        />
        <div className={styles.overlay} />
      </div>

      <div className={styles.meta}>
        <h3 className={styles.title}>{gallery.title}</h3>
        <div className={styles.details}>
          {location && <span className={styles.location}>{location}</span>}
          <span className={styles.date}>{formatDateShort(gallery.date)}</span>
        </div>
      </div>
    </Link>
  );
}
