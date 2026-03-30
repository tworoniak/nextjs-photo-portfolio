import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import ContactForm from "@/components/contact/ContactForm";
import { buildMetadata } from "@/lib/seo/metadata";
import styles from "./page.module.scss";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description:
    "Get in touch to book concert, editorial, or event photography. Licensing and publication inquiries welcome.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className={styles.page}>
      <Container medium>
        <div className={styles.layout}>
          <div className={styles.intro}>
            <p className={styles.eyebrow}>Get in touch</p>
            <h1 className={styles.title}>Let&apos;s work together</h1>
            <p className={styles.description}>
              Available for concert, editorial, and event photography. I also
              license images from my archive for editorial and commercial use.
            </p>
            <div className={styles.details}>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Response time</span>
                <span className={styles.detailValue}>Within 48 hours</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Based in</span>
                <span className={styles.detailValue}>Kansas City, MO</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Available</span>
                <span className={styles.detailValue}>Nationwide</span>
              </div>
            </div>
          </div>

          <div className={styles.formWrapper}>
            <ContactForm />
          </div>
        </div>
      </Container>
    </div>
  );
}
