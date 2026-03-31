import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import { services } from "@/data/services";
import styles from "./ServicesPreview.module.scss";

export default function ServicesPreview() {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <SectionHeading
          eyebrow="What I offer"
          title="Services"
          description="Available for shows, sessions, and events nationwide."
        />
      </div>

      <ul className={styles.list}>
        {services.map((service, index) => (
          <li key={service.id} className={styles.item}>
            <span className={styles.index}>
              {String(index + 1).padStart(2, "0")}
            </span>
            <div className={styles.itemContent}>
              <h3 className={styles.itemTitle}>{service.title}</h3>
              <p className={styles.itemDescription}>{service.description}</p>
            </div>
          </li>
        ))}
      </ul>

      <Link href="/services" className={styles.link}>
        See full services &rarr;
      </Link>
    </section>
  );
}
