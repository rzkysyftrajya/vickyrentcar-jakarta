import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";

// Total 39 foto dokumentasi & testimoni pelanggan nyata
const GALLERY_IMAGES: string[] = Array.from(
  { length: 39 },
  (_, i) => `/galeri/galeri-${i + 1}.webp`
);

const HALF = Math.ceil(GALLERY_IMAGES.length / 2);
const ROW_1: string[] = GALLERY_IMAGES.slice(0, HALF);
const ROW_2: string[] = GALLERY_IMAGES.slice(HALF);

export function GalleryTestimonials() {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  const handlePrev = useCallback(() => {
    setSelectedIdx((prev) =>
      prev !== null ? (prev - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length : null
    );
  }, []);

  const handleNext = useCallback(() => {
    setSelectedIdx((prev) =>
      prev !== null ? (prev + 1) % GALLERY_IMAGES.length : null
    );
  }, []);

  useEffect(() => {
    if (selectedIdx === null) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedIdx(null);
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", onKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [selectedIdx, handlePrev, handleNext]);

  return (
    <section
      id="galeri-testimoni"
      className="relative overflow-hidden py-16 sm:py-24"
      aria-label="Galeri Testimoni Pelanggan"
    >
      {/* Ambient background glow */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 h-[350px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/5 blur-[120px]"
        aria-hidden="true"
      />

      {/* Side gradient edge fades */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 sm:w-32 md:w-48 bg-gradient-to-r from-background via-background/80 to-transparent"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 sm:w-32 md:w-48 bg-gradient-to-l from-background via-background/80 to-transparent"
        aria-hidden="true"
      />

      <div className="flex flex-col gap-4 sm:gap-6">
        {/* Row 1: Leftward Stream */}
        <div className="flex overflow-hidden select-none">
          <div className="animate-marquee-smooth flex items-center gap-4 sm:gap-6 pr-4 sm:pr-6">
            {[...ROW_1, ...ROW_1].map((src, idx) => {
              const originalIndex = idx % ROW_1.length;
              return (
                <GalleryCard
                  key={`r1-${idx}`}
                  src={src}
                  index={originalIndex}
                  onSelect={() => setSelectedIdx(originalIndex)}
                />
              );
            })}
          </div>
        </div>

        {/* Row 2: Rightward (Reverse) Stream */}
        <div className="flex overflow-hidden select-none">
          <div className="animate-marquee-reverse-smooth flex items-center gap-4 sm:gap-6 pr-4 sm:pr-6">
            {[...ROW_2, ...ROW_2].map((src, idx) => {
              const originalIndex = HALF + (idx % ROW_2.length);
              return (
                <GalleryCard
                  key={`r2-${idx}`}
                  src={src}
                  index={originalIndex}
                  onSelect={() => setSelectedIdx(originalIndex)}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* Interactive Lightbox Modal */}
      <AnimatePresence>
        {selectedIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setSelectedIdx(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-xl"
            role="dialog"
            aria-modal="true"
            aria-label="Pratinjau Foto Testimoni"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setSelectedIdx(null)}
              className="absolute top-5 right-5 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-gold/30 bg-black/60 text-foreground backdrop-blur-md transition-all duration-300 hover:border-gold hover:bg-gold hover:text-black cursor-pointer"
              aria-label="Tutup foto"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Counter Badge */}
            <div className="absolute top-6 left-6 z-50 rounded-full border border-gold/25 bg-black/60 px-4 py-1.5 text-xs tracking-widest text-gold/90 uppercase backdrop-blur-md">
              {selectedIdx + 1} / {GALLERY_IMAGES.length}
            </div>

            {/* Prev / Next Navigation */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="absolute left-4 sm:left-8 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-gold/30 bg-black/60 text-gold backdrop-blur-md transition-all duration-300 hover:border-gold hover:bg-gold hover:text-black sm:h-14 sm:w-14 cursor-pointer"
              aria-label="Foto sebelumnya"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute right-4 sm:right-8 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-gold/30 bg-black/60 text-gold backdrop-blur-md transition-all duration-300 hover:border-gold hover:bg-gold hover:text-black sm:h-14 sm:w-14 cursor-pointer"
              aria-label="Foto selanjutnya"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            {/* Image Container */}
            <motion.div
              key={selectedIdx}
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[85vh] max-w-[90vw] overflow-hidden rounded-2xl border border-gold/30 bg-card/60 shadow-2xl"
            >
              <img
                src={GALLERY_IMAGES[selectedIdx]}
                alt={`Foto Testimoni Pelanggan Vicky Rentcar ${selectedIdx + 1}`}
                className="max-h-[85vh] max-w-[90vw] object-contain"
                loading="eager"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function GalleryCard({
  src,
  index,
  onSelect,
}: {
  src: string;
  index: number;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className="group relative h-48 w-64 sm:h-64 sm:w-80 md:h-72 md:w-96 flex-shrink-0 cursor-pointer overflow-hidden rounded-2xl border border-gold/20 bg-card/40 transition-all duration-500 hover:z-20 hover:scale-[1.03] hover:border-gold/60 hover:shadow-[0_12px_40px_-10px_rgba(212,175,55,0.35)]"
      aria-label={`Buka foto testimoni #${index + 1}`}
    >
      <img
        src={src}
        alt={`Foto Testimoni Vicky Rentcar ${index + 1}`}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-end justify-end p-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/40 bg-black/60 text-gold backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
          <Maximize2 className="h-4 w-4" />
        </div>
      </div>
    </button>
  );
}
