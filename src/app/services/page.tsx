import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { services } from "@/data/services";
import { buildMetadata } from "@/lib/seo/metadata";
import styles from "./page.module.scss";

export const metadata: Metadata = buildMetadata({
  title: "Services",
  description:
    "Concert, editorial, event photography and image licensing. Available for shows, sessions, and publications nationwide.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <div className={styles.page}>
      <Container>
        <div className={styles.header}>
          <SectionHeading
            eyebrow="What I offer"
            title="Services"
            description="Concert, editorial, and event photography for venues, bands, promoters, and publications."
          />
        </div>

        <ul className={styles.grid}>
          {services.map((service) => (
            <li key={service.id} className={styles.card}>
              <h2 className={styles.cardTitle}>{service.title}</h2>
              <p className={styles.cardDescription}>{service.description}</p>
              <ul className={styles.highlights}>
                {service.highlights.map((item) => (
                  <li key={item} className={styles.highlight}>
                    <span className={styles.bullet} aria-hidden="true">—</span>
                    {item}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>

        <div className={styles.cta}>
          <p className={styles.ctaText}>
            Ready to work together, or have a question about a specific project?
          </p>
          <Link href="/contact" className={styles.ctaLink}>
            Get in touch &rarr;
          </Link>
        </div>
      </Container>
    </div>
  );
}
