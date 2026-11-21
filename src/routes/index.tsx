import { createFileRoute } from "@tanstack/react-router";

import { Hero } from "@/components/site/Hero";
import { WorkSection } from "@/components/site/WorkSection";
import { AboutSection } from "@/components/site/AboutSection";
import { StackSection } from "@/components/site/StackSection";
import { ServicesSection } from "@/components/site/ServicesSection";
import { ProcessSection } from "@/components/site/ProcessSection";
import { AchievementsSection, JourneySection, TestimonialsSection } from "@/components/site/JourneySection";
import { ContactSection } from "@/components/site/ContactSection";

const title = "Sanket Rajbhar — Full-Stack Web Developer Portfolio";
const description =
  "Selected work, services and process of Sanket Rajbhar — websites, web applications, SaaS products, dashboards and automation tools.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Hero />
      <WorkSection />
      <AchievementsSection />
      <AboutSection />
      <StackSection />
      <ServicesSection />
      <ProcessSection />
      <JourneySection />
      <TestimonialsSection />
      <ContactSection />
    </>
  );
}
