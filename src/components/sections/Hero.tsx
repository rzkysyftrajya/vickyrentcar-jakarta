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
 *     background (idle time) agar scroll berikutnya sudah instan.
 *   - Tidak ada redraw untuk frame yang sama; render sepenuhnya di canvas.
 *   - rAF loop otomatis berhenti saat section di luar viewport / tab tidak
 *     aktif (IntersectionObserver + visibilitychange), agar tidak membebani
 *     CPU/GPU HP terus-menerus.
 *   - Resize hanya dihitung ulang saat LEBAR berubah — perubahan tinggi
 *     akibat address bar browser mobile muncul/hilang saat scroll diabaikan,
 *     supaya canvas tidak di-reset di tengah scroll (penyebab utama "berat"
 *     di HP).
 */
import { motion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState, useCallback } from "react";
import { WhatsAppIcon } from "@/components/BrandIcons";
import { SITE, waLink } from "@/lib/site";
import { useLanguage } from "@/lib/i18n";

// ─── Generator frame otomatis (tidak hardcode) ───
const TOTAL = 46;
const FRAME_PATHS = Array.from({ length: TOTAL }, (_, i) => {
  const num = String(i + 1).padStart(3, "0");
  return `/hero-section/frame_${num}.webp`;
});

const LERP_FACTOR = 0.15;
const SETTLE_EPSILON = 0.02;

export function Hero() {
  const { t } = useLanguage();
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
  const lastWidthRef = useRef(0);
  const isActiveRef = useRef(true); // false saat section di luar viewport / tab hidden

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

  // ─── Resize canvas — HANYA saat lebar berubah (abaikan address bar mobile) ───
  const resizeCanvas = useCallback((force = false) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const width = Math.round(window.innerWidth);
    const height = Math.round(window.innerHeight);

    // Di mobile, address bar muncul/hilang saat scroll memicu 'resize' dengan
    // lebar TETAP tapi tinggi berubah. Abaikan supaya canvas tidak di-reset
    // di tengah scroll (penyebab utama jank/berat di HP).
    if (!force && width === lastWidthRef.current) return;
    lastWidthRef.current = width;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

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
  // Berhenti otomatis saat sudah settle DAN section tidak aktif (di luar layar / tab hidden).
  const tick = useCallback(() => {
    const target = targetFrameRef.current;
    const current = smoothFrameRef.current;
    const diff = target - current;
    const settled = Math.abs(diff) <= SETTLE_EPSILON;

    smoothFrameRef.current = settled ? target : current + diff * LERP_FACTOR;
    drawFrame(Math.round(smoothFrameRef.current));

    if (!isActiveRef.current && settled) {
      // Section tidak terlihat & frame sudah settle → hentikan loop, hemat baterai/CPU
      rafIdRef.current = null;
      return;
    }
    rafIdRef.current = requestAnimationFrame(tick);
  }, [drawFrame]);

  const ensureLoopRunning = useCallback(() => {
    if (rafIdRef.current === null) {
      rafIdRef.current = requestAnimationFrame(tick);
    }
  }, [tick]);

  // ─── Preload: frame pertama duluan → tampil → sisanya di background (idle) ───
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

    const idle = (cb: () => void) => {
      if (typeof (window as any).requestIdleCallback === "function") {
        (window as any).requestIdleCallback(cb, { timeout: 200 });
      } else {
        setTimeout(cb, 32);
      }
    };

    (async () => {
      resizeCanvas(true);
      await loadImage(0);
      if (cancelled) return;
      drawFrame(0);
      setFirstLoaded(true);

      // Preload sisa frame di background pakai idle time, tidak mengganggu
      // scroll/input yang sedang berjalan di thread utama.
      for (let i = 1; i < TOTAL; i++) {
        if (cancelled) return;
        await new Promise<void>((r) => idle(r));
        if (cancelled) return;
        await loadImage(i);
      }
    })();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ─── Resize listener (throttled via rAF; filter lebar-saja ada di resizeCanvas) ───
  useEffect(() => {
    let ticking = false;
    const onResize = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        resizeCanvas();
        ticking = false;
      });
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [resizeCanvas]);

  // ─── IntersectionObserver + visibilitychange: pause/resume rAF loop ───
  useEffect(() => {
    const section = containerRef.current;
    if (!section) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        isActiveRef.current = entry.isIntersecting && !document.hidden;
        if (isActiveRef.current) ensureLoopRunning();
      },
      { threshold: 0 },
    );
    io.observe(section);

    const onVisibility = () => {
      isActiveRef.current = !document.hidden && isActiveRef.current;
      if (!document.hidden) ensureLoopRunning();
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [ensureLoopRunning]);

  // ─── Mulai rAF loop sekali di awal ───
  useEffect(() => {
    ensureLoopRunning();
    return () => {
      if (rafIdRef.current !== null) cancelAnimationFrame(rafIdRef.current);
    };
  }, [ensureLoopRunning]);

  // ─── Update target frame dari scroll progress (tanpa trigger re-render React) ───
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (progress) => {
      targetFrameRef.current = Math.round(progress * (TOTAL - 1));
      ensureLoopRunning(); // scroll saat loop sedang idle (settled+hidden) harus membangunkannya lagi
    });
    return () => unsubscribe();
  }, [scrollYProgress, ensureLoopRunning]);

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
              {t("Armada Premium untuk Setiap Perjalanan", "Premium Fleet for Every Journey")}
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
              {t(
                "Toyota Alphard, Hiace Premio, dan Innova Zenix — siap mengantar Anda dengan kenyamanan dan ketepatan waktu kelas atas.",
                "Toyota Alphard, Hiace Premio, and Innova Zenix — ready to escort you with top-class comfort and punctuality.",
              )}
            </p>
            <div className="mt-8">
              <a
                href={waLink("Halo, saya ingin menyewa armada premium.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-medium text-black transition-transform duration-200 hover:scale-[1.03]"
              >
                <WhatsAppIcon className="h-4 w-4" />
                {t("Chat via WhatsApp", "Chat on WhatsApp")}
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}