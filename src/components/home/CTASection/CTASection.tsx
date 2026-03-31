import Link from "next/link";
import styles from "./CTASection.module.scss";

export default function CTASection() {
  return (
    <section className={styles.section} aria-label="Call to action">
      <div className={styles.inner}>
        <p className={styles.eyebrow}>Ready to work together?</p>
        <h2 className={styles.heading}>
          Let&apos;s make something worth shooting.
        </h2>
        <div className={styles.actions}>
          <Link href="/contact" className={styles.primaryLink}>
            Get in touch
          </Link>
          <Link href="/portfolio" className={styles.secondaryLink}>
            View portfolio
          </Link>
        </div>
      </div>
    </section>
  );
}
