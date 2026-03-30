import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/ui/Container";
import { buildMetadata } from "@/lib/seo/metadata";
import { siteConfig } from "@/data/site";
import styles from "./page.module.scss";

export const metadata: Metadata = buildMetadata({
  title: "About",
  description:
    "Concert, editorial, and event photographer based in Kansas City. Covering live music, artist portraits, and events.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <div className={styles.page}>
      <Container medium>
        <div className={styles.layout}>
          <div className={styles.content}>
            <p className={styles.eyebrow}>About</p>
            <h1 className={styles.name}>{siteConfig.name}</h1>

            <div className={styles.bio}>
              <p>
                I&apos;m a concert and editorial photographer based in Kansas City,
                Missouri. My work focuses on live music — primarily metal, hardcore,
                and heavy music — as well as artist portraits and event coverage.
              </p>
              <p>
                I shoot in venues of all sizes, from 200-cap clubs to amphitheaters.
                My approach is direct and documentary: I&apos;m interested in the energy
                of a performance, the light of a room, and the details that make a
                show feel like itself.
              </p>
              <p>
                I&apos;m available for concert coverage, press and promotional shoots,
                and event photography. I also license images from my archive for
                editorial, publication, and commercial use.
              </p>
            </div>

            <div className={styles.links}>
              <Link href="/portfolio" className={styles.link}>
                View portfolio &rarr;
              </Link>
              <Link href="/contact" className={styles.link}>
                Get in touch &rarr;
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
