import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight, Quote, Star } from "lucide-react";
import { SectionHeading } from "@/components/Reveal";

const TESTIMONIALS = [
  {
    name: "Andreas Wijaya",
    role: "Direktur, Perusahaan Logistik",
    category: "Corporate",
    quote:
      "Alphard-nya bersih sempurna dan pengemudinya sangat profesional. Tamu kami dari Jepang merasa sangat dihargai sejak penjemputan di Soekarno-Hatta.",
  },
  {
    name: "Sarah Halim",
    role: "Executive Assistant",
    category: "Airport Transfer",
    quote:
      "Pesawat delay dua jam, driver tetap menunggu tanpa biaya tambahan dan terus mengabari via WhatsApp. Layanan seperti ini yang membuat kami langganan.",
  },
  {
    name: "Nadia Prameswari",
    role: "Wedding Organizer",
    category: "Wedding",
    quote:
      "Sudah tiga kali memakai Vicky Rentcar untuk wedding car. Selalu tepat waktu, dekorasi rapi, dan komunikasinya cepat via WhatsApp.",
  },
  {
    name: "Reza Mahendra",
    role: "Penyelenggara Acara Jakarta",
    category: "Event & Tamu",
    quote:
      "Pelayanan Vicky Rentcar sangat memuaskan untuk tamu kami. Driver-nya ramah, datang lebih awal, dan mobilnya wangi serta nyaman.",
  },
  {
    name: "Michael Tanuwijaya",
    role: "Perjalanan Dinas & Kantor",
    category: "Corporate",
    quote:
      "Hiace Premio untuk rombongan 12 orang selama keliling Jakarta dan luar kota. Nyaman, aman, dan armadanya benar-benar terawat.",
  },
];

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const t = TESTIMONIALS[index]!;
  const go = (dir: number) =>
    setIndex((i) => (i + dir + TESTIMONIALS.length) % TESTIMONIALS.length);

  return (
    <section id="testimoni" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Testimoni"
          title="Cerita & Pengalaman Pelanggan Kami"
          subtitle="Pengalaman menyenangkan dari pelanggan perorangan, keluarga, hingga instansi di Jakarta."
        />

        <div className="relative mx-auto mt-16 max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="glass rounded-xl p-10 text-center"
            >
              <span className="rounded-full border border-gold/30 px-4 py-1.5 text-[0.55rem] tracking-[0.28em] text-gold uppercase">
                {t.category}
              </span>
              <Quote className="mx-auto mt-6 h-8 w-8 text-gold/50" aria-hidden="true" />
              <blockquote className="mt-5 text-base leading-relaxed text-muted-foreground">
                “{t.quote}”
              </blockquote>
              <div
                className="mt-6 flex justify-center gap-1"
                aria-label="Penilaian 5 dari 5 bintang"
              >
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-gold text-gold" aria-hidden="true" />
                ))}
              </div>
              <figcaption className="mt-6 border-t border-gold/15 pt-5">
                <p className="font-display text-xl">{t.name}</p>
                <p className="mt-1 text-[0.6rem] tracking-[0.25em] text-muted-foreground uppercase">
                  {t.role}
                </p>
              </figcaption>
            </motion.figure>
          </AnimatePresence>

          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Testimoni sebelumnya"
              className="glass flex h-11 w-11 items-center justify-center rounded-full text-gold transition-colors hover:bg-gold hover:text-primary-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <div className="flex gap-2">
              {TESTIMONIALS.map((item, i) => (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Testimoni ${item.name}`}
                  aria-current={i === index}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === index ? "w-8 bg-gold" : "w-2 bg-gold/30 hover:bg-gold/60"
                  }`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Testimoni berikutnya"
              className="glass flex h-11 w-11 items-center justify-center rounded-full text-gold transition-colors hover:bg-gold hover:text-primary-foreground"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
