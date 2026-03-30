import Link from "next/link";
import Container from "@/components/ui/Container";
import styles from "./not-found.module.scss";

export default function NotFound() {
  return (
    <div className={styles.page}>
      <Container>
        <div className={styles.inner}>
          <p className={styles.code}>404</p>
          <h1 className={styles.title}>Page not found</h1>
          <p className={styles.description}>
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <div className={styles.actions}>
            <Link href="/" className={styles.primaryLink}>
              Go home
            </Link>
            <Link href="/portfolio" className={styles.secondaryLink}>
              View portfolio
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
