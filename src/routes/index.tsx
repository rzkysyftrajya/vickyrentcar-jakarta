import { createFileRoute } from "@tanstack/react-router";
import { LuxuryIntro } from "@/components/LuxuryIntro";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { WhatsAppFab } from "@/components/WhatsAppFab";
import { Hero } from "@/components/sections/Hero";
import { Showcase } from "@/components/sections/Showcase";
import { Fleet } from "@/components/sections/Fleet";
import { Services } from "@/components/sections/Services";
import { WhyUs } from "@/components/sections/WhyUs";
import { Testimonials } from "@/components/sections/Testimonials";
import { GalleryTestimonials } from "@/components/sections/GalleryTestimonials";
import { CTA } from "@/components/sections/CTA";
import { SITE_URL, serializeSchema, buildLocalBusinessSchema, buildWebSiteSchema } from "@/lib/schema";

const TITLE = "Vicky Rentcar Jakarta — Rental Mobil Nyaman, Bersih & Terpercaya";
const DESCRIPTION =
  "Sewa mobil di Jakarta: Toyota Alphard, Innova Zenix, Innova Reborn, dan Hiace Premio. Unit bersih, supir ramah & berpengalaman, siap melayani 24 jam.";
const OG_IMAGE = `${SITE_URL}/og-image.jpg`;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE_URL },
      { property: "og:image", content: OG_IMAGE },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    scripts: [
      { type: "application/ld+json", children: serializeSchema(buildLocalBusinessSchema()) },
      { type: "application/ld+json", children: serializeSchema(buildWebSiteSchema()) },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <LuxuryIntro />
      <Nav />
      <main>
        <Hero />
        <Showcase />
        <Fleet />
        <Services />
        <WhyUs />
        <Testimonials />
        <GalleryTestimonials />
        <CTA />
      </main>
      <Footer />
      <WhatsAppFab />
    </div>
  );
}


