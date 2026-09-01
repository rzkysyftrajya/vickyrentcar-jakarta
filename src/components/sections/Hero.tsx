/**
 * Hero Section — Scroll-driven Canvas Image Sequence (Premium / Cinematic)
 *
 * 46 frame WebP menampilkan konvoi Toyota Alphard, Hiace Premio, dan
 * Innova Zenix yang bergerak mendekati kamera secara sinematik saat
 * pengguna melakukan scroll — terinspirasi hero section Apple / Mercedes-Benz.
 *
 * Alur narasi:
 *   0%–28%   → Headline, deskripsi, dan CTA tampil penuh.
 *   28%–42%  → Teks perlahan fade out sambil armada mendekat.
 *   42%–100% → Canvas sepenuhnya menjadi fokus (teks tersembunyi).
 *
 * Teknis:
 *   - Frame di-generate otomatis (tidak hardcode), frame yang hilang di-skip
 *     tanpa error (fallback ke frame terdekat yang berhasil dimuat).
 *   - Interpolasi frame halus (lerp) via requestAnimationFrame, bukan
 *     perpindahan kasar — terasa seperti video, bukan slideshow.
 *   - Frame pertama preload duluan lalu ditampilkan; sisanya preload di
 *     background agar scroll berikutnya sudah instan.
 *   - Tidak ada redraw untuk frame yang sama; render sepenuhnya di canvas.
 */
import { motion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState, useCallback } from "react";
import { WhatsAppIcon } from "@/components/BrandIcons";
import { SITE, waLink } from "@/lib/site";

// ─── Generator frame otomatis (tidak hardcode) ───
const TOTAL = 46;
const FRAME_PATHS = Array.from({ length: TOTAL }, (_, i) => {
  const num = String(i + 1).padStart(3, "0");
  return `/hero-section/frame_${num}.webp`;
});

const LERP_FACTOR = 0.15;
const SETTLE_EPSILON = 0.02;

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Gambar yang berhasil dimuat (null = belum/gagal dimuat, di-skip saat draw)
  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL).fill(null));
  const lastDrawnFrameRef = useRef<number>(-1);
  const lastGoodFrameRef = useRef<number>(0); // fallback jika frame target hilang
  const rafIdRef = useRef<number | null>(null);
  const targetFrameRef = useRef(0);
  const smoothFrameRef = useRef(0);
  const canvasSizeRef = useRef({ width: 0, height: 0, dpr: 1 });

  const [firstLoaded, setFirstLoaded] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // ── Teks intro (headline/desc/CTA awal): fade out saat kamera mulai mendekat ──
  const introOpacity = useTransform(scrollYProgress, [0, 0.28, 0.42], [1, 1, 0]);
  const introY = useTransform(scrollYProgress, [0.28, 0.42], [0, -28]);
  const introPointerEvents = useTransform(scrollYProgress, (v) => (v > 0.4 ? "none" : "auto"));

  // ── Overlay gelap sinematik: ringan di tengah (canvas jadi fokus), lebih gelap di ujung (readability teks) ──
  const overlayOpacity = useTransform(
    scrollYProgress,
    [0, 0.1, 0.45, 0.85, 1],
    [0.7, 0.45, 0.2, 0.2, 0.55],
  );

  // ─── Resize canvas mengikuti device pixel ratio, cover full-bleed ───
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = container.getBoundingClientRect();
    const width = Math.round(window.innerWidth);
    const height = Math.round(window.innerHeight);

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    canvasSizeRef.current = { width, height, dpr };
    lastDrawnFrameRef.current = -1; // paksa redraw setelah resize
  }, []);

  // ─── Menggambar satu frame ke canvas dengan efek "cover" (object-fit: cover) ───
  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const clamped = Math.min(Math.max(index, 0), TOTAL - 1);
    let img = imagesRef.current[clamped];

    // Frame hilang/belum siap → skip tanpa error, pakai frame valid terdekat
    if (!img) {
      img = imagesRef.current[lastGoodFrameRef.current];
      if (!img) return; // belum ada satu pun frame siap
    } else {
      lastGoodFrameRef.current = clamped;
    }

    if (lastDrawnFrameRef.current === clamped) return; // hindari redraw identik

    const { width, height, dpr } = canvasSizeRef.current;
    if (!width || !height) return;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, width, height);

    const canvasRatio = width / height;
    const imgRatio = img.naturalWidth / img.naturalHeight;

    let drawWidth = width;
    let drawHeight = height;
    let offsetX = 0;
    let offsetY = 0;

    if (imgRatio > canvasRatio) {
      drawHeight = height;
      drawWidth = height * imgRatio;
      offsetX = (width - drawWidth) / 2;
    } else {
      drawWidth = width;
      drawHeight = width / imgRatio;
      offsetY = (height - drawHeight) / 2;
    }

    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    lastDrawnFrameRef.current = clamped;
  }, []);

  // ─── Loop animasi: interpolasi halus menuju target frame (lerp, bukan jump) ───
  const tick = useCallback(() => {
    const target = targetFrameRef.current;
    const current = smoothFrameRef.current;
    const diff = target - current;

    if (Math.abs(diff) > SETTLE_EPSILON) {
      smoothFrameRef.current = current + diff * LERP_FACTOR;
    } else {
      smoothFrameRef.current = target;
    }

    drawFrame(Math.round(smoothFrameRef.current));
    rafIdRef.current = requestAnimationFrame(tick);
  }, [drawFrame]);

  // ─── Preload: frame pertama duluan → tampil → sisanya di background ───
  useEffect(() => {
    let cancelled = false;

    const loadImage = (index: number) =>
      new Promise<void>((resolve) => {
        const img = new Image();
        img.decoding = "async";
        img.onload = () => {
          if (!cancelled) imagesRef.current[index] = img;
          resolve();
        };
        img.onerror = () => {
          // Frame hilang → skip tanpa error, tetap resolve agar tidak memblokir
          resolve();
        };
        const src = FRAME_PATHS[index];
        if (src) img.src = src;
        else resolve();
      });

    (async () => {
      resizeCanvas();
      await loadImage(0);
      if (cancelled) return;
      drawFrame(0);
      setFirstLoaded(true);

      // Preload sisa frame secara background, tanpa memblokir interaksi
      for (let i = 1; i < TOTAL; i++) {
        if (cancelled) return;
        await loadImage(i);
      }
    })();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ─── Resize listener ───
  useEffect(() => {
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, [resizeCanvas]);

  // ─── Mulai/hentikan rAF loop sekali saja ───
  useEffect(() => {
    rafIdRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafIdRef.current !== null) cancelAnimationFrame(rafIdRef.current);
    };
  }, [tick]);

  // ─── Update target frame dari scroll progress (tanpa trigger re-render React) ───
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (progress) => {
      targetFrameRef.current = Math.round(progress * (TOTAL - 1));
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <section
      ref={containerRef}
      className="relative h-[400vh] bg-black"
      aria-label="Hero — konvoi armada premium"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* ─── Layer 1: Canvas image sequence ─── */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full"
          style={{ opacity: firstLoaded ? 1 : 0, transition: "opacity 0.4s ease" }}
        />

        {/* ─── Layer 2: Skeleton gelap sebelum frame pertama siap ─── */}
        {!firstLoaded && (
          <div className="absolute inset-0 bg-linear-to-b from-black via-neutral-950 to-black" />
        )}

        {/* ─── Layer 3: Overlay cinematic (gradient gelap untuk keterbacaan teks) ─── */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-linear-to-t from-black via-black/40 to-black/70"
          style={{ opacity: overlayOpacity }}
        />

        {/* ─── Layer 4: HERO INTRO — headline, deskripsi, CTA (0%–42%) ─── */}
        <motion.div
          style={{ opacity: introOpacity, y: introY, pointerEvents: introPointerEvents }}
          className="absolute inset-x-0 bottom-0 z-10 px-5 pb-24 sm:px-8 sm:pb-28 lg:px-14"
        >
          <div className="mx-auto max-w-3xl">
            <h1 className="text-3xl font-light leading-[1.1] text-white sm:text-5xl lg:text-6xl">
              Armada Premium untuk Setiap Perjalanan
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
              Toyota Alphard, Hiace Premio, dan Innova Zenix — siap mengantar Anda dengan kenyamanan
              dan ketepatan waktu kelas atas.
            </p>
            <div className="mt-8">
              <a
                href={waLink("Halo, saya ingin menyewa armada premium.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-medium text-black transition-transform duration-200 hover:scale-[1.03]"
              >
                <WhatsAppIcon className="h-4 w-4" />
                Chat via WhatsApp
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
