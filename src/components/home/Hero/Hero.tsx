"use client";

import Link from "next/link";
import { CldImage } from "next-cloudinary";
import { siteConfig } from "@/data/site";
import styles from "./Hero.module.scss";

interface HeroProps {
  imageSrc: string;
  imageAlt?: string;
}

export default function Hero({ imageSrc, imageAlt = "Hero image" }: HeroProps) {
  return (
    <section className={styles.hero} aria-label="Introduction">
      <div className={styles.imageWrapper}>
        <CldImage
          src={imageSrc}
          alt={imageAlt}
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
        <div className={styles.inner}>
          <p className={styles.eyebrow}>{siteConfig.name}</p>
          <h1 className={styles.headline}>
            Concert &amp; Editorial
            <br />
            Photography
          </h1>
          <p className={styles.subline}>
            Live music, artist portraits, and event coverage.
          </p>
          <div className={styles.actions}>
            <Link href="/portfolio" className={styles.primaryAction}>
              View portfolio
            </Link>
            <Link href="/contact" className={styles.secondaryAction}>
              Book a shoot
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
