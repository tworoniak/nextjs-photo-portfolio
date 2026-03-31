import Hero from "@/components/home/Hero";
import FeaturedWorkSection from "@/components/home/FeaturedWorkSection";
import ServicesPreview from "@/components/home/ServicesPreview";
import PublishedInSection from "@/components/home/PublishedInSection";
import JournalPreview from "@/components/home/JournalPreview";
import CTASection from "@/components/home/CTASection";
import Container from "@/components/ui/Container";
import { getFeaturedGalleries } from "@/data/galleries";
import { getAllJournalPosts } from "@/lib/mdx/journal";
import styles from "./page.module.scss";

// The hero image public ID — swap this for any Cloudinary image you want as the homepage hero
const HERO_IMAGE = "_TPW5805-DxO_DeepPRIME_XD2s_swr4ok";

export default function HomePage() {
  const featuredGalleries = getFeaturedGalleries();
  const recentPosts = getAllJournalPosts().slice(0, 3);

  return (
    <div className={styles.page}>
      <Hero imageSrc={HERO_IMAGE} imageAlt="Concert photography hero" />

      <div className={styles.sections}>
        <Container>
          <FeaturedWorkSection galleries={featuredGalleries} />
        </Container>

        <Container>
          <PublishedInSection />
        </Container>

        <Container>
          <ServicesPreview />
        </Container>

        <Container>
          <JournalPreview posts={recentPosts} />
        </Container>
      </div>

      <CTASection />
    </div>
  );
}
