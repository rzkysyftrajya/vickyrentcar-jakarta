const CLIENT_LOGOS = [
  { src: "/clients/bpkh.webp", alt: "BPKH" },
  { src: "/clients/edelweis-tour&travel.webp", alt: "Edelweis Tour & Travel" },
  { src: "/clients/kementerian-pertanian.webp", alt: "Kementerian Pertanian" },
  { src: "/clients/kpu.webp", alt: "KPU" },
  { src: "/clients/medika-plaza-indonesia.webp", alt: "Medika Plaza Indonesia" },
  { src: "/clients/pt.agrinas.webp", alt: "PT Agrinas" },
  { src: "/clients/pt.interbat.webp", alt: "PT Interbat" },
  { src: "/clients/pt.nai.webp", alt: "PT NAI" },
  { src: "/clients/pt.pdc.webp", alt: "PT PDC" },
  { src: "/clients/pt.pempem.webp", alt: "PT Pempem" },
  { src: "/clients/pt.propelanspace.webp", alt: "PT Propelanspace" },
];

export function Clients() {
  return (
    <section
      className="clients-logo-viewport overflow-hidden border-y border-gold/10 py-10 sm:py-12"
      aria-label="Logo klien"
    >
      <div className="mx-auto mb-8 max-w-7xl px-5 text-center sm:mb-10 sm:px-8">
        <h2 className="font-display text-2xl font-medium tracking-[0.12em] text-gold sm:text-3xl">
          Our Clients
        </h2>
        <div className="mx-auto mt-3 h-px w-12 bg-gold/60" aria-hidden="true" />
      </div>
      <div className="clients-logo-track animate-marquee-smooth items-center">
        {[0, 1].map((copy) => (
          <div
            key={copy}
            className="flex shrink-0 items-center gap-12 pr-12 sm:gap-20 sm:pr-20"
            aria-hidden={copy === 1}
          >
            {CLIENT_LOGOS.map((logo) => (
              <div
                key={logo.src}
                className="flex h-16 w-36 shrink-0 items-center justify-center sm:w-44"
              >
                <img
                  src={logo.src}
                  alt={copy === 0 ? logo.alt : ""}
                  className="max-h-full max-w-full object-contain"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
