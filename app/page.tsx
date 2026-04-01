import { AboutIntro } from "@/components/sections/about-intro";
import { Faq } from "@/components/sections/faq";
import { Hero } from "@/components/sections/hero";
import { HomeContactCta } from "@/components/sections/home-contact-cta";
import { HomeSchedule } from "@/components/sections/home-schedule";
import { ServiceHighlights } from "@/components/sections/service-highlights";
import { Services } from "@/components/sections/services";
import { TrustSection } from "@/components/sections/trust";
import { WhyUs } from "@/components/sections/why-us";

/**
 * Single-page marketing site: each block maps to a nav anchor for smooth scrolling.
 */
export default function HomePage() {
  return (
    <main>
      <Hero />
      <ServiceHighlights />
      <AboutIntro />
      <Services />
      <TrustSection />
      <WhyUs />
      <Faq />
      <HomeSchedule />
      <HomeContactCta />
    </main>
  );
}
