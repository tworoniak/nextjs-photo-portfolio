"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks, siteConfig } from "@/data/site";
import MobileNav from "@/components/layout/MobileNav";
import styles from "./Header.module.scss";
import clsx from "clsx";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header className={clsx(styles.header, scrolled && styles.scrolled)}>
        <div className={styles.inner}>
          <Link href="/" className={styles.wordmark} aria-label={siteConfig.name}>
            {siteConfig.name}
          </Link>

          <nav className={styles.desktopNav} aria-label="Main navigation">
            <ul className={styles.navList}>
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={clsx(
                      styles.navLink,
                      pathname.startsWith(link.href) && styles.active
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <button
            className={styles.menuButton}
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            <span className={clsx(styles.bar, menuOpen && styles.barOpen)} />
            <span className={clsx(styles.bar, menuOpen && styles.barOpen)} />
            <span className={clsx(styles.bar, menuOpen && styles.barOpen)} />
          </button>
        </div>
      </header>

      <MobileNav isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
