"use client";

import Link from "next/link";
import Container from "@/components/ui/Container";
import styles from "./error.module.scss";

export default function Error({
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
          <h1 className={styles.title}>Something went wrong</h1>
          <p className={styles.description}>
            An unexpected error occurred. Please try again.
          </p>
          <div className={styles.actions}>
            <button onClick={reset} className={styles.primaryAction}>
              Try again
            </button>
            <Link href="/" className={styles.secondaryLink}>
              Go home
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
