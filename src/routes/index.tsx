import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { WhatsAppFab } from "@/components/WhatsAppFab";
import { Hero } from "@/components/sections/Hero";
import { Showcase } from "@/components/sections/Showcase";
import { Fleet } from "@/components/sections/Fleet";
import { Services } from "@/components/sections/Services";
import { WhyUs } from "@/components/sections/WhyUs";
import { LegalTrust } from "@/components/sections/LegalTrust";
import { Clients } from "@/components/sections/Clients";
import { Testimonials } from "@/components/sections/Testimonials";
import { GalleryTestimonials } from "@/components/sections/GalleryTestimonials";
import { CTA } from "@/components/sections/CTA";
import {
  SITE_URL,
  serializeSchema,
  buildLocalBusinessSchema,
  buildWebSiteSchema,
} from "@/lib/schema";

const TITLE = "Sewa Mobil Jakarta dengan Driver | Vicky Rentcar";
const DESCRIPTION =
  "Sewa mobil Jakarta dengan driver untuk bandara, bisnis, keluarga, dan luar kota. Pilih Alphard, Innova Zenix, Reborn, atau Hiace. Reservasi 24 jam via WhatsApp.";
const OG_IMAGE = `${SITE_URL}/og-image.jpg`;

export const Route = createFileRoute("/")({
  head: () => ({
    links: [{ rel: "canonical", href: SITE_URL }],
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
      <Nav />
      <main>
        <Hero />
        <Showcase />
        <Fleet />
        <Services />
        <WhyUs />
        <LegalTrust />
        <Clients />
        <Testimonials />
        <GalleryTestimonials />
        <CTA />
      </main>
      <Footer />
      <WhatsAppFab />
    </div>
  );
}
