"use client";

import { useEffect } from "react";
import Link from "next/link";
import { navLinks } from "@/data/site";
import styles from "./MobileNav.module.scss";
import clsx from "clsx";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileNav({ isOpen, onClose }: MobileNavProps) {
  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close on Escape — only register listener while nav is open
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  return (
    <>
      <div
        className={clsx(styles.overlay, isOpen && styles.overlayVisible)}
        onClick={onClose}
        aria-hidden="true"
      />
      <nav
        className={clsx(styles.nav, isOpen && styles.navOpen)}
        aria-label="Mobile navigation"
        aria-hidden={!isOpen}
      >
        <ul className={styles.list}>
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={styles.link}
                onClick={onClose}
                tabIndex={isOpen ? 0 : -1}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
