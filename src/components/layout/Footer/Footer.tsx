import Link from "next/link";
import { navLinks, siteConfig } from "@/data/site";
import styles from "./Footer.module.scss";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <Link href="/" className={styles.wordmark}>
            {siteConfig.name}
          </Link>

          <nav aria-label="Footer navigation">
            <ul className={styles.navList}>
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={styles.navLink}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>
            &copy; {year} {siteConfig.name}. All rights reserved.
          </p>
          <Link href="/contact" className={styles.ctaLink}>
            Book a shoot &rarr;
          </Link>
        </div>
      </div>
    </footer>
  );
}
