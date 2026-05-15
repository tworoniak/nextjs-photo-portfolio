"use client";

import Link from "next/link";
import Container from "@/components/ui/Container";
import styles from "@/app/error.module.scss";

export default function GalleryError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className={styles.page}>
      <Container>
        <div className={styles.inner}>
          <p className={styles.code}>Error</p>
          <h1 className={styles.title}>Gallery unavailable</h1>
          <p className={styles.description}>
            This gallery could not be loaded. It may be temporarily unavailable.
          </p>
          <div className={styles.actions}>
            <button onClick={reset} className={styles.primaryAction}>
              Try again
            </button>
            <Link href="/portfolio" className={styles.secondaryLink}>
              View portfolio
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
