/**
 * Hero Section — Scroll-driven Canvas Image Sequence
 *
 * Semua 8 frame menampilkan 3 kendaraan (Alphard, Hiace Premio, Innova Zenix)
 * dari sudut kamera yang makin dekat (dolly zoom-in effect).
 *
 * Alur narasi:
 *   0%–30%   → Teks hero intro lengkap (headline + desc + CTA)
 *   30%–60%  → Teks perlahan hilang, kamera mendekati armada
 *   60%–85%  → Canvas sepenuhnya menjadi fokus (teks hilang)
 *   85%–100% → CTA muncul kembali untuk konversi
 */
import { motion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronDown } from "lucide-react";
import { WhatsAppIcon } from "@/components/BrandIcons";
import { SITE, waLink } from "@/lib/site";

// Frame paths — sorted naturally, sesuai urutan file di public/hero-section/
const FRAME_PATHS: string[] = [
  "/hero-section/frame_001.png",
  "/hero-section/frame_002.png",
  "/hero-section/frame_003.png",
  "/hero-section/frame_004.png",
  "/hero-section/frame_005.png",
  "/hero-section/frame_006.png",
  "/hero-section/frame_007.png",
  "/hero-section/frame_008.png",
].sort((a, b) =>
  a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" })
);

const TOTAL = FRAME_PATHS.length;

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const lastDrawnFrameRef = useRef<number>(-1);
  const rafIdRef = useRef<number | null>(null);
  const isReadyRef = useRef<boolean>(false);

  const [firstLoaded, setFirstLoaded] = useState(false);
  const [currentFrame, setCurrentFrame] = useState(0);

  // Framer Motion scroll tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // ── Teks intro: muncul di awal, fade-out saat kamera mulai zoom ──
  const introOpacity = useTransform(scrollYProgress, [0, 0.28, 0.42], [1, 1, 0]);
  const introY = useTransform(scrollYProgress, [0.28, 0.42], [0, -28]);



  // ── Overlay gelap di canvas: ringan di tengah, sedikit lebih gelap di awal & akhir ──
  const overlayOpacity = useTransform(
    scrollYProgress,
    [0, 0.1, 0.45, 0.85, 1],
    [0.7, 0.45, 0.2, 0.2, 0.5]
  );

  // ── Progress bar horizontal di atas ──
  const progressScaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // ── Canvas render ──
  const drawFrame = useCallback((idx: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const clamped = Math.max(0, Math.min(TOTAL - 1, idx));

    // Cari gambar yang sudah siap, fallback ke yang terdekat
    let img: HTMLImageElement | null = imagesRef.current[clamped] ?? null;
    if (!img?.complete || !img.naturalWidth) {
      for (let i = clamped - 1; i >= 0; i--) {
        const c = imagesRef.current[i];
        if (c?.complete && c.naturalWidth) { img = c; break; }
      }
      if (!img) {
        for (let i = clamped + 1; i < TOTAL; i++) {
          const c = imagesRef.current[i];
          if (c?.complete && c.naturalWidth) { img = c; break; }
        }
      }
    }

    if (!img?.naturalWidth) return;

    // Resize canvas sesuai DPR
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    const tw = Math.round(rect.width * dpr);
    const th = Math.round(rect.height * dpr);
    if (canvas.width !== tw || canvas.height !== th) {
      canvas.width = tw;
      canvas.height = th;
    }

    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;
    if (!cw || !ch || !iw || !ih) return;

    // Object-fit: cover
    const imgR = iw / ih;
    const canR = cw / ch;
    let dw: number, dh: number, dx: number, dy: number;
    if (canR > imgR) {
      dw = cw; dh = cw / imgR; dx = 0; dy = (ch - dh) / 2;
    } else {
      dh = ch; dw = ch * imgR; dx = (cw - dw) / 2; dy = 0;
    }

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, dx, dy, dw, dh);
    lastDrawnFrameRef.current = clamped;
  }, []);

  // ── Preload images ──
  useEffect(() => {
    let cancelled = false;
    imagesRef.current = new Array(TOTAL).fill(null);

    // Frame pertama: prioritas tinggi
    const firstSrc = FRAME_PATHS[0];
    if (!firstSrc) return;

    const first = new Image();
    first.src = firstSrc;
    first.onload = () => {
      if (cancelled) return;
      imagesRef.current[0] = first;
      isReadyRef.current = true;
      setFirstLoaded(true);
      drawFrame(0);

      // Sisa frame: background preload
      for (let i = 1; i < TOTAL; i++) {
        const src = FRAME_PATHS[i];
        if (!src) continue;
        const img = new Image();
        img.src = src;
        img.onload = () => {
          if (cancelled) return;
          imagesRef.current[i] = img;
          if (lastDrawnFrameRef.current === i) drawFrame(i);
        };
        img.onerror = () => console.warn(`[Hero] Gagal load: ${src}`);
      }
    };
    first.onerror = () => console.error("[Hero] Gagal load frame pertama");

    return () => { cancelled = true; };
  }, [drawFrame]);

  // ── Scroll → update canvas + frame state ──
  useEffect(() => {
    const update = () => {
      if (!containerRef.current || !isReadyRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      const progress = scrollable > 0
        ? Math.min(1, Math.max(0, -rect.top / scrollable))
        : 0;

      const frameIdx = Math.min(TOTAL - 1, Math.max(0, Math.floor(progress * TOTAL)));
      if (frameIdx !== lastDrawnFrameRef.current) {
        drawFrame(frameIdx);
        setCurrentFrame(frameIdx);
      }
    };

    const onEvent = () => {
      if (rafIdRef.current !== null) return;
      rafIdRef.current = requestAnimationFrame(() => {
        rafIdRef.current = null;
        update();
      });
    };

    window.addEventListener("scroll", onEvent, { passive: true });
    window.addEventListener("resize", onEvent, { passive: true });
    onEvent();

    return () => {
      window.removeEventListener("scroll", onEvent);
      window.removeEventListener("resize", onEvent);
      if (rafIdRef.current !== null) cancelAnimationFrame(rafIdRef.current);
    };
  }, [drawFrame]);

  return (
    <section
      ref={containerRef}
      id="hero-section"
      className="relative h-[280vh] sm:h-[320vh] bg-background"
      aria-label="Hero Section — Vicky Rentcar Jakarta"
    >
      {/* Sticky viewport */}
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden">

        {/* ─── Layer 1: Canvas ─── */}
        <canvas
          ref={canvasRef}
          className={`absolute inset-0 h-full w-full transition-opacity duration-700 ${
            firstLoaded ? "opacity-100" : "opacity-0"
          }`}
          role="img"
          aria-label="Armada Vicky Rentcar Jakarta: Toyota Alphard, Hiace Premio, dan Innova Zenix"
        >
          Vicky Rentcar Jakarta — Toyota Alphard, Hiace Premio, Innova Zenix.
        </canvas>

        {/* ─── Layer 2: Atmospheric overlay ─── */}
        <motion.div
          style={{ opacity: overlayOpacity }}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-background"
        />

        {/* Gradients tambahan agar teks tetap terbaca */}
        {/* Atas: transisi dari nav */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-background/90 to-transparent"
        />
        {/* Bawah: transisi ke section berikutnya */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-background via-background/60 to-transparent"
        />

        {/* ─── Layer 3: Progress bar (atas) ─── */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-0 inset-x-0 z-20 h-[2px] overflow-hidden"
        >
          <motion.div
            style={{ scaleX: progressScaleX }}
            className="h-full w-full origin-left bg-[image:var(--gradient-gold)]"
          />
        </div>



        {/* ─── Layer 5: Ticks vertikal (kanan tengah) ─── */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 z-10 flex flex-col gap-[5px]"
        >
          {Array.from({ length: TOTAL }).map((_, i) => (
            <div
              key={i}
              className={`rounded-full transition-all duration-200 ${
                i === currentFrame
                  ? "h-5 w-[2px] bg-gold"
                  : i < currentFrame
                  ? "h-2 w-[1px] bg-gold/35"
                  : "h-2 w-[1px] bg-white/12"
              }`}
            />
          ))}
        </div>

        {/* ─── Layer 6: HERO INTRO — fade saat scroll ─── */}
        <motion.div
          style={{ opacity: introOpacity, y: introY }}
          className="absolute inset-x-0 bottom-0 z-10 px-5 pb-24 sm:px-8 sm:pb-28 lg:px-14"
        >
          {/* Backdrop blur card supaya teks tidak tumpang tindih dengan canvas */}
          <div className="max-w-lg">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="eyebrow mb-4"
            >
              {SITE.company}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-4xl leading-[1.06] sm:text-6xl lg:text-7xl"
            >
              Rental Mobil{" "}
              <span className="block gold-text">Nyaman Jakarta</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground sm:text-base"
            >
              Didukung armada terawat prima dan supir ramah yang siap
              melayani 24 jam — Alphard, Hiace Premio, Innova Zenix.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-7 flex flex-wrap gap-3"
            >
              <a
                href={waLink(
                  `Halo ${SITE.brand}, saya ingin menanyakan sewa mobil di Jakarta.`
                )}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2.5 rounded-full bg-[image:var(--gradient-gold)] px-7 py-3.5 text-xs tracking-[0.22em] text-primary-foreground uppercase shadow-[var(--shadow-gold)] transition-transform duration-300 hover:scale-[1.03] active:scale-95"
              >
                <WhatsAppIcon className="h-4 w-4" />
                Pesan via WhatsApp
              </a>
              <Link
                to="/armada"
                className="inline-flex items-center rounded-full border border-gold/35 px-7 py-3.5 text-xs tracking-[0.22em] text-gold uppercase transition-all duration-300 hover:bg-gold/10"
              >
                Lihat Armada
              </Link>
            </motion.div>

            {/* Stats mini */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.85 }}
              className="mt-8 flex items-center gap-6 border-t border-gold/15 pt-5"
            >
              {[
                ["24/7", "Siaga"],
                ["Jabodetabek", "Coverage"],
                ["3+ Unit VIP", "Armada"],
              ].map(([val, lbl]) => (
                <div key={lbl}>
                  <p className="font-display text-lg sm:text-xl gold-text leading-none">{val}</p>
                  <p className="mt-0.5 text-[0.55rem] tracking-[0.22em] text-muted-foreground uppercase">{lbl}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>




        {/* ─── Layer 8: Scroll prompt (chapter awal) ─── */}
        {firstLoaded && (
          <motion.div
            style={{ opacity: introOpacity }}
            className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1"
          >
            <motion.div
              animate={{ y: [0, 7, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <ChevronDown className="h-5 w-5 text-gold/50" />
            </motion.div>
          </motion.div>
        )}

      </div>
    </section>
  );
}
