import { SITE } from "./site";
import type { Vehicle } from "./vehicles";

export const SITE_URL = "https://vickyrentcar.id";

// ─── LocalBusiness ────────────────────────────────────────────────────────────

export function buildLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/#localbusiness`,
    name: SITE.brand,
    legalName: SITE.company,
    description:
      "Penyedia layanan rental mobil Jakarta dengan Toyota Alphard, Innova Zenix, Innova Reborn, dan Hiace Premio. Unit bersih, supir ramah & berpengalaman, siap melayani 24 jam.",
    url: SITE_URL,
    logo: `${SITE_URL}/icon/icon-512.png`,
    image: `${SITE_URL}/og-image.jpg`,
    telephone: SITE.phone,
    email: SITE.email,
    openingHours: "Mo-Su 00:00-24:00",
    currenciesAccepted: "IDR",
    paymentAccepted: "Cash, Bank Transfer, QRIS",
    areaServed: "Jakarta, Tangerang, Bekasi, Depok, Bogor",
    address: {
      "@type": "PostalAddress",
      streetAddress: "SCBD Lot 28, Senayan",
      addressLocality: "Jakarta Selatan",
      addressRegion: "DKI Jakarta",
      postalCode: "12190",
      addressCountry: "ID",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -6.2235,
      longitude: 106.8069,
    },
    sameAs: [
      "https://www.instagram.com/vickyrentcar_jakarta",
    ],
    hasMap: `https://maps.google.com/?q=${encodeURIComponent(SITE.address)}`,
  };
}

// ─── WebSite ──────────────────────────────────────────────────────────────────

export function buildWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE.brand,
    description: "Rental mobil Jakarta dengan supir berpengalaman — Alphard, Zenix, Reborn, Hiace Premio.",
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/armada?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

// ─── Vehicle ──────────────────────────────────────────────────────────────────

export function buildVehicleSchema(vehicle: Vehicle) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: vehicle.name,
    description: vehicle.description,
    image: `${SITE_URL}${vehicle.image}`,
    brand: {
      "@type": "Brand",
      name: "Toyota",
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "IDR",
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: SITE.brand,
      },
      description: vehicle.priceNote,
    },
    additionalProperty: [
      { "@type": "PropertyValue", name: "Kapasitas", value: vehicle.capacity },
      { "@type": "PropertyValue", name: "Bagasi", value: vehicle.luggage },
      { "@type": "PropertyValue", name: "Transmisi", value: vehicle.transmission },
      { "@type": "PropertyValue", name: "Bahan Bakar", value: vehicle.fuel },
      { "@type": "PropertyValue", name: "Kategori", value: vehicle.category },
    ],
  };
}

// ─── BreadcrumbList ───────────────────────────────────────────────────────────

export function buildBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────

export function buildFAQSchema() {
  const faqs = [
    {
      q: "Apakah sewa mobil Vicky Rentcar tersedia 24 jam?",
      a: "Ya, layanan reservasi dan penjemputan Vicky Rentcar Jakarta tersedia 24 jam setiap hari termasuk hari libur nasional.",
    },
    {
      q: "Berapa kapasitas penumpang Toyota Alphard yang disewakan?",
      a: "Toyota Alphard yang kami sediakan berkapasitas 4–6 penumpang dengan captain seat yang luas dan nyaman.",
    },
    {
      q: "Apakah harga sewa sudah termasuk supir?",
      a: "Ya, semua paket sewa kami sudah termasuk supir profesional yang berpengalaman dan ramah.",
    },
    {
      q: "Apakah bisa sewa untuk perjalanan luar kota?",
      a: "Ya, kami melayani perjalanan luar kota seperti Bandung, Bogor, Semarang, dan kota lainnya dengan supir berpengalaman.",
    },
    {
      q: "Apakah Vicky Rentcar Jakarta melayani antar jemput bandara?",
      a: "Ya, kami melayani antar jemput di Bandara Soekarno-Hatta (Terminal 1, 2, 3) dan Bandara Halim Perdanakusuma dengan pemantauan jadwal terbang.",
    },
    {
      q: "Bagaimana cara melakukan reservasi?",
      a: "Reservasi bisa dilakukan melalui formulir di website ini yang akan langsung membuka WhatsApp dengan pesan terstruktur, atau menghubungi hotline kami langsung.",
    },
  ];

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
}

// ─── Serialize helper ─────────────────────────────────────────────────────────

export function serializeSchema(schema: object): string {
  return JSON.stringify(schema);
}
