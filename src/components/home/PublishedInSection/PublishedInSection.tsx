import { publications } from "@/data/publishedIn";
import styles from "./PublishedInSection.module.scss";

export default function PublishedInSection() {
  if (publications.length === 0) return null;

  return (
    <section className={styles.section}>
      <p className={styles.label}>As seen in</p>
      <ul className={styles.list}>
        {publications.map((pub) => (
          <li key={pub.name}>
            {pub.url ? (
              <a
                href={pub.url}
                className={styles.pubLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                {pub.name}
              </a>
            ) : (
              <span className={styles.pubName}>{pub.name}</span>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
