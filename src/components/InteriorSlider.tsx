import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import type { GalleryImage } from "@/lib/vehicles";

export function InteriorSlider({
  images,
  vehicleName,
}: {
  images: GalleryImage[];
  vehicleName: string;
}) {
  const [index, setIndex] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const current = images[index]!;

  const go = (dir: number) => setIndex((i) => (i + dir + images.length) % images.length);

  return (
    <div>
      <div className="glass group relative overflow-hidden rounded-xl">
        <AnimatePresence mode="wait">
          <motion.img
            key={current.src}
            src={current.src}
            alt={`Interior ${vehicleName} — ${current.label}`}
            loading="lazy"
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => setLightbox(true)}
            className="h-[22rem] w-full cursor-zoom-in object-cover transition-transform duration-700 group-hover:scale-105 sm:h-[32rem]"
          />
        </AnimatePresence>

        <span className="pointer-events-none absolute top-4 left-4 rounded-full bg-[color-mix(in_oklab,var(--navy-deep)_75%,transparent)] px-4 py-1.5 text-[0.6rem] tracking-[0.25em] text-gold uppercase backdrop-blur">
          {current.label}
        </span>

        <div className="absolute inset-x-4 bottom-4 flex items-center justify-between">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Foto sebelumnya"
            className="glass flex h-11 w-11 items-center justify-center rounded-full text-gold transition-colors hover:bg-gold hover:text-primary-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Foto berikutnya"
            className="glass flex h-11 w-11 items-center justify-center rounded-full text-gold transition-colors hover:bg-gold hover:text-primary-foreground"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-4 gap-3">
        {images.map((img, i) => (
          <button
            key={img.src}
            type="button"
            onClick={() => setIndex(i)}
            aria-pressed={i === index}
            aria-label={img.label}
            className={`overflow-hidden rounded-lg border transition-all duration-300 ${
              i === index ? "border-gold" : "border-gold/15 opacity-60 hover:opacity-100"
            }`}
          >
            <img
              src={img.src}
              alt={`${vehicleName} ${img.label}`}
              loading="lazy"
              className="h-20 w-full object-cover sm:h-24"
            />
          </button>
        ))}
      </div>

      <AnimatePresence>
        {lightbox ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[color-mix(in_oklab,var(--navy-deep)_92%,transparent)] p-5 backdrop-blur-xl"
            role="dialog"
            aria-modal="true"
            onClick={() => setLightbox(false)}
          >
            <img
              src={current.src}
              alt={`Interior ${vehicleName} — ${current.label}`}
              className="max-h-[85vh] w-auto max-w-full rounded-xl object-contain"
            />
            <button
              type="button"
              onClick={() => setLightbox(false)}
              aria-label="Tutup"
              className="glass absolute top-6 right-6 flex h-11 w-11 items-center justify-center rounded-full text-gold"
            >
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
