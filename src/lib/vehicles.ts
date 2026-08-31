
import alphardInt1 from "@/assets/interior-alphard-1.jpg";
import alphardInt2 from "@/assets/interior-alphard-2.jpg";
import alphardInt3 from "@/assets/interior-alphard-3.jpg";
import alphardInt4 from "@/assets/interior-alphard-4.jpg";
import zenixInt1 from "@/assets/interior-zenix-1.jpg";
import zenixInt2 from "@/assets/interior-zenix-2.jpg";
import zenixInt3 from "@/assets/interior-zenix-3.jpg";
import zenixInt4 from "@/assets/interior-zenix-4.jpg";
import rebornInt1 from "@/assets/interior-reborn-1.jpg";
import rebornInt2 from "@/assets/interior-reborn-2.jpg";
import rebornInt3 from "@/assets/interior-reborn-3.jpg";
import rebornInt4 from "@/assets/interior-reborn-4.jpg";
import hiaceInt1 from "@/assets/interior-hiace-1.jpg";
import hiaceInt2 from "@/assets/interior-hiace-2.jpg";
import hiaceInt3 from "@/assets/interior-hiace-3.jpg";
import hiaceInt4 from "@/assets/interior-hiace-4.jpg";

export type VehicleCategory =
  | "Executive MPV"
  | "Premium MPV"
  | "Business MPV"
  | "Family MPV"
  | "Luxury Sedan"
  | "Premium SUV"
  | "Compact SUV"
  | "Van Rombongan"
  | "Electric Vehicle";

export type GalleryImage = { src: string; label: string };

export type Vehicle = {
  slug: string;
  name: string;
  tagline: string;
  category: VehicleCategory;
  priceStarting: string;
  priceNote: string;
  description: string;
  model: string;
  image: string;
  badges: string[];
  capacity: string;
  luggage: string;
  transmission: string;
  fuel: string;
  ac: string;
  entertainment: string;
  services: string[];
  fitFor: string[];
  interior: GalleryImage[];
  rates?: {
    package: string;
    price: string;
    description: string;
  }[];
};

export const EXTERIOR_ANGLES = [
  { label: "Front View", azimuth: 0, polar: 78 },
  { label: "Front Left 45°", azimuth: -45, polar: 74 },
  { label: "Left Side", azimuth: -90, polar: 80 },
  { label: "Rear Left 45°", azimuth: -135, polar: 74 },
  { label: "Rear View", azimuth: 180, polar: 78 },
  { label: "Right Side", azimuth: 90, polar: 80 },
  { label: "Front Right 45°", azimuth: 45, polar: 74 },
  { label: "Top View", azimuth: 30, polar: 22 },
];

export const EXTERIOR_GALLERY = [
  { label: "Tampak Depan", azimuth: 0, polar: 78 },
  { label: "Tampak Belakang", azimuth: 180, polar: 78 },
  { label: "Samping Kiri", azimuth: -90, polar: 80 },
  { label: "Samping Kanan", azimuth: 90, polar: 80 },
  { label: "Sudut 45 Derajat", azimuth: -45, polar: 74 },
];

export const VEHICLES: Vehicle[] = [
  // ── 1. Luxury & Executive MPV ──
  {
    slug: "lexus-lm350h-2025",
    name: "Lexus LM350h 2025",
    tagline: "Puncak Kemewahan & Kenyamanan Ultra-VIP",
    category: "Executive MPV",
    priceStarting: "Best Rate Guarantee",
    priceNote: "Konsultasi Promo VIP via WhatsApp",
    description:
      "Kemewahan kasta tertinggi dengan partisi privasi kabin, kursi pijat Ottoman elektrik, sistem audio Mark Levinson, dan keheningan kabin sempurna untuk tamu kenegaraan & eksekutif puncak.",
    model: "",
    image: "/images/alphard.png",
    badges: ["Ultra VIP", "Ottoman Seat", "Hybrid Luxury"],
    capacity: "4–6 penumpang",
    luggage: "3 koper besar + 2 kabin",
    transmission: "Direct-Shift e-CVT Automatic",
    fuel: "Hybrid (Bensin + Listrik)",
    ac: "Nanoe-X Climate Concierge Multi-Zone",
    entertainment: "Mark Levinson 23-Speaker Sound, 48\" Rear Screen, Smart Touch Controller",
    services: ["Tamu Kenegaraan & VIP", "Mobil Pengantin Mewah", "Antar Jemput VVIP Bandara"],
    fitFor: ["Eksekutif & CEO", "Tamu VIP Internasional", "Pernikahan Mewah", "Antar Jemput Bandara"],
    rates: [
      { package: "Airport Transfer VVIP", price: "Tanya Promo", description: "Termasuk Supir VIP, Tol, Parkir & Sambutan Khusus" },
      { package: "Sewa Harian (12 Jam)", price: "Tanya Promo", description: "Termasuk Unit + Supir Berpengalaman Khusus VIP" },
      { package: "Full Day All-In", price: "Tanya Promo", description: "Termasuk Supir, BBM, Tol, & Parkir" },
    ],
    interior: [
      { src: alphardInt1, label: "Dashboard Mewah" },
      { src: alphardInt2, label: "Kabin Depan" },
      { src: alphardInt3, label: "Ottoman Captain Seat" },
      { src: alphardInt4, label: "Partisi Privasi & Layara 48 Inci" },
    ],
  },
  {
    slug: "alphard-hybrid-2025",
    name: "Alphard Hybrid 2025",
    tagline: "Generasi Terbaru All-New Alphard Hybrid",
    category: "Executive MPV",
    priceStarting: "Best Rate Guarantee",
    priceNote: "Konsultasi Promo Hari Ini via WhatsApp",
    description:
      "All-New Alphard generasi 2025 dengan mesin Hybrid ramah lingkungan, kabin ekstra senyap, captain seat dengan penghangat & pendingin, serta panoramic glass roof ganda.",
    model: "",
    image: "/images/alphard.png",
    badges: ["All-New 2025", "Captain Seat", "Hybrid Eco"],
    capacity: "4–6 penumpang",
    luggage: "3 koper besar + 2 kabin",
    transmission: "e-CVT Automatic",
    fuel: "Hybrid (Bensin + Listrik)",
    ac: "Nanoe-X 4-Zone Independent AC",
    entertainment: "14\" Rear Ceiling Screen, JBL Audio, Wireless Apple CarPlay",
    services: ["Antar Jemput Bandara", "Sewa Harian / Bisnis", "Mobil Pernikahan"],
    fitFor: ["Antar Jemput Bandara", "Tamu Kantor & Bisnis", "Keluarga", "Mobil Pernikahan"],
    rates: [
      { package: "Airport Transfer Bandara", price: "Tanya Promo", description: "Termasuk Supir, Tol & Parkir" },
      { package: "Dalam Kota (12 Jam)", price: "Tanya Promo", description: "Termasuk Mobil + Supir Profesional" },
      { package: "Full Day All-In", price: "Tanya Promo", description: "Termasuk Supir, BBM, Tol, & Parkir" },
    ],
    interior: [
      { src: alphardInt1, label: "Dashboard Digital" },
      { src: alphardInt2, label: "Kokpit Modern" },
      { src: alphardInt3, label: "Executive Lounge Seat" },
      { src: alphardInt4, label: "Panoramic Glass Roof" },
    ],
  },
  {
    slug: "toyota-alphard",
    name: "Toyota Alphard",
    tagline: "Kenyamanan Eksekutif & Luas",
    category: "Executive MPV",
    priceStarting: "Best Rate Guarantee",
    priceNote: "Konsultasi Promo Hari Ini via WhatsApp",
    description:
      "Pilihan utama perjalanan nyaman di Jakarta. Captain seat lapang, kabin senyap dan sejuk, pas untuk perjalanan bisnis maupun keluarga dengan supir profesional.",
    model: "/models/Alphard.glb",
    image: "/images/alphard.png",
    badges: ["Executive", "Captain Seat", "Supir Ramah"],
    capacity: "4–6 penumpang",
    luggage: "3 koper besar + 2 kabin",
    transmission: "Automatic",
    fuel: "Bensin",
    ac: "Triple zone climate control",
    entertainment: "Rear entertainment, ambient light, USB-C fast charge",
    services: ["Antar Jemput Bandara", "Sewa Harian / Bisnis", "Mobil Pernikahan"],
    fitFor: ["Antar Jemput Bandara", "Tamu Kantor & Bisnis", "Keluarga", "Mobil Pernikahan", "City Tour Jakarta"],
    rates: [
      { package: "Airport Transfer Bandara", price: "Tanya Promo", description: "Termasuk Supir, Tol, Parkir & Pantau Jadwal Terbang" },
      { package: "Dalam Kota (12 Jam)", price: "Tanya Promo", description: "Termasuk Mobil + Supir Profesional" },
      { package: "Full Day All-In", price: "Tanya Promo", description: "Termasuk Supir, BBM, Tol, & Parkir" },
    ],
    interior: [
      { src: alphardInt1, label: "Dashboard" },
      { src: alphardInt2, label: "Setir & Baris Depan" },
      { src: alphardInt3, label: "Kabin Tengah" },
      { src: alphardInt4, label: "Baris Belakang & Bagasi" },
    ],
  },
  {
    slug: "alphard-g-facelift",
    name: "Alphard G Facelift",
    tagline: "Kemewahan Teruji & Kenyamanan Captain Seat",
    category: "Executive MPV",
    priceStarting: "Best Rate Guarantee",
    priceNote: "Konsultasi Promo Hari Ini via WhatsApp",
    description:
      "Varian Alphard Facelift tipe G dengan captain seat fleksibel, power sliding door ganda, dan ruang kabin lega untuk mobilitas eksekutif dan keluarga di Jakarta.",
    model: "",
    image: "/images/alphard.png",
    badges: ["Executive", "Captain Seat", "Favorit VIP"],
    capacity: "5–6 penumpang",
    luggage: "3 koper besar + 2 kabin",
    transmission: "Super CVT-i Automatic",
    fuel: "Bensin",
    ac: "Dual Climate Control + Nanoe Filter",
    entertainment: "Roof Monitor, DVD/Bluetooth Audio, Ambient Light",
    services: ["Antar Jemput Bandara", "Sewa Harian", "Mobil Pernikahan"],
    fitFor: ["Antar Jemput Bandara", "Tamu VIP", "Perjalanan Keluarga", "Wedding Car"],
    rates: [
      { package: "Airport Transfer Bandara", price: "Tanya Promo", description: "Termasuk Supir, Tol & Parkir" },
      { package: "Dalam Kota (12 Jam)", price: "Tanya Promo", description: "Termasuk Mobil + Supir Profesional" },
      { package: "Full Day All-In", price: "Tanya Promo", description: "Termasuk Supir, BBM, Tol, & Parkir" },
    ],
    interior: [
      { src: alphardInt1, label: "Dashboard" },
      { src: alphardInt2, label: "Setir & Baris Depan" },
      { src: alphardInt3, label: "Kabin Tengah" },
      { src: alphardInt4, label: "Baris Belakang" },
    ],
  },
  {
    slug: "toyota-alphard-g",
    name: "Toyota Alphard G",
    tagline: "Kenyamanan Eksekutif Terpercaya",
    category: "Executive MPV",
    priceStarting: "Best Rate Guarantee",
    priceNote: "Konsultasi Promo Hari Ini via WhatsApp",
    description:
      "Armada Alphard tipe G dengan suspensi empuk, captain seat individual, dan supir beretika standar hotel bintang lima untuk perjalanan bisnis dan liburan.",
    model: "",
    image: "/images/alphard.png",
    badges: ["Executive", "Nyaman", "Best Value VIP"],
    capacity: "5–6 penumpang",
    luggage: "3 koper besar + 2 kabin",
    transmission: "CVT Automatic",
    fuel: "Bensin",
    ac: "Triple Zone Automatic AC",
    entertainment: "Audio System Touchscreen, Rear Monitor, USB Port",
    services: ["Antar Jemput Bandara", "Sewa Harian Bisnis", "Wisata Jakarta"],
    fitFor: ["Antar Jemput Bandara", "Kunjungan Kerja", "Keluarga Santai"],
    rates: [
      { package: "Airport Transfer", price: "Tanya Promo", description: "Termasuk Supir & Tol" },
      { package: "Dalam Kota (12 Jam)", price: "Tanya Promo", description: "Termasuk Unit + Supir" },
      { package: "Full Day All-In", price: "Tanya Promo", description: "Termasuk BBM, Tol & Parkir" },
    ],
    interior: [
      { src: alphardInt1, label: "Dashboard" },
      { src: alphardInt2, label: "Kabin Depan" },
      { src: alphardInt3, label: "Captain Seat" },
      { src: alphardInt4, label: "Bagasi Belakang" },
    ],
  },

  // ── 2. Luxury Sedan ──
  {
    slug: "mercedes-benz-e300",
    name: "Mercedes-Benz E300",
    tagline: "Kemewahan Bisnis Eksekutif Sejati",
    category: "Luxury Sedan",
    priceStarting: "Best Rate Guarantee",
    priceNote: "Konsultasi Promo Hari Ini via WhatsApp",
    description:
      "Standar emas sedan bisnis dunia. Ruang kaki lapang, suspensi agilitas tinggi, dan interior berkelas untuk perjalanan VIP, delegasi kenegaraan, dan pertemuan penting.",
    model: "",
    image: "/images/alphard.png",
    badges: ["Business VIP", "Chauffeur Choice", "Prestige"],
    capacity: "4 penumpang",
    luggage: "2 koper besar + 2 kabin",
    transmission: "9G-TRONIC Automatic",
    fuel: "Bensin Turbo Mild Hybrid",
    ac: "Thermotronic 3-Zone Climate Control",
    entertainment: "MBUX Superscreen, Burmester Sound, Rear Seat Comfort Package",
    services: ["Tamu VIP Bisnis", "Mobil Pengantin", "Airport Transfer VIP"],
    fitFor: ["Direksi & CEO", "Pertemuan Bisnis", "Pernikahan Elegan", "Tamu Asing"],
    rates: [
      { package: "Airport Transfer VIP", price: "Tanya Promo", description: "Termasuk Supir Jas & Pantau Jadwal" },
      { package: "12 Jam Dalam Kota", price: "Tanya Promo", description: "Termasuk Mobil + Supir Profesional" },
      { package: "Full Day All-In", price: "Tanya Promo", description: "Termasuk Supir, BBM, Tol, & Parkir" },
    ],
    interior: [
      { src: alphardInt1, label: "Interior MBUX" },
      { src: alphardInt2, label: "Setir Kemudi" },
      { src: alphardInt3, label: "Jok Belakang Eksekutif" },
      { src: alphardInt4, label: "Bagasi Luas" },
    ],
  },
  {
    slug: "mercedes-c300",
    name: "Mercedes-Benz C300",
    tagline: "Sedan Mewah Dinamis & Prestisius",
    category: "Luxury Sedan",
    priceStarting: "Best Rate Guarantee",
    priceNote: "Konsultasi Promo Hari Ini via WhatsApp",
    description:
      "Sedan premium dengan desain sporty elegan, interior bertabur ambient light 64 warna, dan kenyamanan suspensi khas Mercedes-Benz untuk mobilitas prestisius.",
    model: "",
    image: "/images/alphard.png",
    badges: ["Luxury Sedan", "Executive VIP", "Sporty"],
    capacity: "4 penumpang",
    luggage: "2 koper besar + 2 kabin",
    transmission: "9G-TRONIC Automatic",
    fuel: "Bensin Turbo",
    ac: "Thermatic Dual Zone Climate Control",
    entertainment: "11.9\" Portrait Screen, Burmester 3D Sound, Wireless Charging",
    services: ["Sewa Harian Eksekutif", "Airport Transfer", "Wedding Car"],
    fitFor: ["Perjalanan Bisnis", "Mobil Pengantin", "City Tour VIP"],
    rates: [
      { package: "Airport Transfer", price: "Tanya Promo", description: "Termasuk Supir & Tol" },
      { package: "Dalam Kota (12 Jam)", price: "Tanya Promo", description: "Termasuk Unit + Supir" },
      { package: "Full Day All-In", price: "Tanya Promo", description: "Termasuk BBM, Tol & Parkir" },
    ],
    interior: [
      { src: alphardInt1, label: "Dashboard Modern" },
      { src: alphardInt2, label: "Cockpit" },
      { src: alphardInt3, label: "Kursi Kulit Mewah" },
      { src: alphardInt4, label: "Bagasi Belakang" },
    ],
  },
  {
    slug: "new-accord-turbo",
    name: "Honda New Accord Turbo",
    tagline: "Sedan Eksekutif Berjiwa Sporty & Elegan",
    category: "Luxury Sedan",
    priceStarting: "Best Rate Guarantee",
    priceNote: "Konsultasi Promo Hari Ini via WhatsApp",
    description:
      "Sedan berkelas dengan kabin senyap berkat Active Noise Cancellation, akselerasi responsif 1.5L VTEC Turbo, dan ruang kaki belakang yang sangat lega.",
    model: "",
    image: "/images/zenix.png",
    badges: ["Executive Sedan", "Honda Sensing", "Sunroof"],
    capacity: "4 penumpang",
    luggage: "2 koper besar + 2 kabin",
    transmission: "CVT with Sport Mode",
    fuel: "1.5L VTEC Turbo Bensin",
    ac: "Dual Zone i-Dual AC + Rear Vent",
    entertainment: "10.2\" Display, Bose Premium Audio, Wireless Apple CarPlay",
    services: ["Sewa Harian Eksekutif", "Kunjungan Bisnis", "Airport Transfer"],
    fitFor: ["Eksekutif Perusahaan", "Dinas Kantor", "Perjalanan Nyaman"],
    rates: [
      { package: "Airport Transfer", price: "Tanya Promo", description: "Termasuk Supir & Tol" },
      { package: "Dalam Kota (12 Jam)", price: "Tanya Promo", description: "Termasuk Unit + Supir" },
      { package: "Full Day All-In", price: "Tanya Promo", description: "Termasuk BBM, Tol & Parkir" },
    ],
    interior: [
      { src: zenixInt1, label: "Dashboard Digital" },
      { src: zenixInt2, label: "Kabin Depan" },
      { src: zenixInt3, label: "Baris Kedua Lapang" },
      { src: zenixInt4, label: "Bagasi Belakang" },
    ],
  },

  // ── 3. Premium & Luxury SUV ──
  {
    slug: "toyota-land-cruiser",
    name: "Toyota Land Cruiser",
    tagline: "Ketangguhan Legendaris & Status Tertinggi",
    category: "Premium SUV",
    priceStarting: "Best Rate Guarantee",
    priceNote: "Konsultasi Promo Hari Ini via WhatsApp",
    description:
      "SUV flagship Toyota dengan kemampuan segala medan, kabin kedap suara mewah, suspensi adaptif, dan wibawa tak tertandingi untuk pengawalan dan tamu VVIP.",
    model: "",
    image: "/images/reborn.png",
    badges: ["Flagship VVIP", "4x4 King", "Bulletproof Feel"],
    capacity: "5–7 penumpang",
    luggage: "4 koper besar + 3 kabin",
    transmission: "10-Speed Automatic",
    fuel: "Twin-Turbo Diesel",
    ac: "4-Zone Independent Climate Control + Seat Cooler",
    entertainment: "JBL Premium Sound 14-Speaker, Rear Seat Entertainment, 12.3\" Display",
    services: ["Pengawalan VIP / VVIP", "Kunjungan Lapangan / Proyek", "Sewa Harian"],
    fitFor: ["Tamu VVIP & Pejabat", "Kunjungan Proyek / Luar Kota", "Eksekutif"],
    rates: [
      { package: "Airport Transfer VVIP", price: "Tanya Promo", description: "Termasuk Supir Berpengalaman VVIP" },
      { package: "Dalam Kota (12 Jam)", price: "Tanya Promo", description: "Termasuk Unit + Supir Khusus" },
      { package: "Full Day All-In", price: "Tanya Promo", description: "Termasuk BBM, Tol & Parkir" },
    ],
    interior: [
      { src: rebornInt1, label: "Dashboard Flagship" },
      { src: rebornInt2, label: "Cockpit Pengemudi" },
      { src: rebornInt3, label: "Kabin Tengah Mewah" },
      { src: rebornInt4, label: "Ruang Bagasi Jumbo" },
    ],
  },
  {
    slug: "mercedes-glc300",
    name: "Mercedes-Benz GLC300",
    tagline: "Kemewahan & Performa SUV Jerman",
    category: "Premium SUV",
    priceStarting: "Best Rate Guarantee",
    priceNote: "Konsultasi Promo Hari Ini via WhatsApp",
    description:
      "SUV mewah berkarakter elegan dengan interior modern MBUX, panoramic sunroof, suspensi halus, dan performa bertenaga untuk perjalanan berkelas di Jakarta.",
    model: "",
    image: "/images/alphard.png",
    badges: ["Luxury SUV", "Panoramic Roof", "German Luxury"],
    capacity: "4–5 penumpang",
    luggage: "3 koper besar + 2 kabin",
    transmission: "9G-TRONIC Automatic",
    fuel: "Bensin Turbo",
    ac: "Thermotronic 3-Zone Climate Control",
    entertainment: "Burmester Surround Sound, MBUX Touchscreen, Wireless Apple CarPlay",
    services: ["Sewa Harian VIP", "Airport Transfer", "Weekend Gateaway"],
    fitFor: ["Eksekutif", "Keluarga Modern", "Tamu Internasional", "City Trip"],
    rates: [
      { package: "Airport Transfer", price: "Tanya Promo", description: "Termasuk Supir & Tol" },
      { package: "Dalam Kota (12 Jam)", price: "Tanya Promo", description: "Termasuk Mobil + Supir" },
      { package: "Full Day All-In", price: "Tanya Promo", description: "Termasuk BBM, Tol & Parkir" },
    ],
    interior: [
      { src: alphardInt1, label: "Dashboard MBUX" },
      { src: alphardInt2, label: "Cockpit" },
      { src: alphardInt3, label: "Kabin Mewah" },
      { src: alphardInt4, label: "Panoramic Roof & Bagasi" },
    ],
  },
  {
    slug: "palisade-signature",
    name: "Hyundai Palisade Signature",
    tagline: "Flagship SUV Korea yang Megah & Lapang",
    category: "Premium SUV",
    priceStarting: "Best Rate Guarantee",
    priceNote: "Konsultasi Promo Hari Ini via WhatsApp",
    description:
      "SUV 3-baris premium berdesain gagah dengan captain seat baris kedua, dual sunroof, dan interior kulit Nappa yang sangat lega dan nyaman untuk keluarga.",
    model: "",
    image: "/images/reborn.png",
    badges: ["Captain Seat SUV", "Dual Sunroof", "Gagah"],
    capacity: "6–7 penumpang",
    luggage: "3 koper besar + 2 kabin",
    transmission: "8-Speed Shift-by-Wire Automatic",
    fuel: "CRDi Diesel Turbo",
    ac: "Triple Zone Independent AC",
    entertainment: "Infinity Premium Audio, 12.3\" Navigation, Wireless Charging",
    services: ["Sewa Harian Eksekutif", "Perjalanan Luar Kota", "Airport Transfer"],
    fitFor: ["Keluarga Besar", "Eksekutif", "Roadtrip Nyaman", "Tamu VIP"],
    rates: [
      { package: "Airport Transfer", price: "Tanya Promo", description: "Termasuk Supir & Tol" },
      { package: "Dalam Kota (12 Jam)", price: "Tanya Promo", description: "Termasuk Mobil + Supir" },
      { package: "Full Day All-In", price: "Tanya Promo", description: "Termasuk BBM, Tol & Parkir" },
    ],
    interior: [
      { src: rebornInt1, label: "Dashboard Megah" },
      { src: rebornInt2, label: "Shift-by-wire Cockpit" },
      { src: rebornInt3, label: "Captain Seat Nappa" },
      { src: rebornInt4, label: "Dual Sunroof & Bagasi" },
    ],
  },
  {
    slug: "pajero-sport-dakar",
    name: "Pajero Sport Dakar",
    tagline: "Gagah, Tangguh & Nyaman di Berbagai Medan",
    category: "Premium SUV",
    priceStarting: "Best Rate Guarantee",
    priceNote: "Konsultasi Promo Hari Ini via WhatsApp",
    description:
      "SUV ladder-frame favorit dengan mesin MIVEC Diesel bertenaga, sunroof, dan ground clearance tinggi siap untuk mobilitas dalam kota maupun rute luar kota yang menantang.",
    model: "",
    image: "/images/reborn.png",
    badges: ["Gagah", "Sunroof", "Diesel Bertenaga"],
    capacity: "6–7 penumpang",
    luggage: "3 koper besar + 2 kabin",
    transmission: "8-Speed Automatic",
    fuel: "2.4L MIVEC Turbo Diesel",
    ac: "Dual Zone Automatic + Rear AC",
    entertainment: "8\" Touchscreen Audio, Roof Monitor Belakang, Power Outlet",
    services: ["Perjalanan Luar Kota", "Kunjungan Proyek", "Sewa Harian"],
    fitFor: ["Perjalanan Jarak Jauh", "Keluarga", "Dinas Proyek", "Wisata Alam"],
    rates: [
      { package: "Airport Transfer", price: "Tanya Promo", description: "Termasuk Supir & Tol" },
      { package: "Dalam Kota (12 Jam)", price: "Tanya Promo", description: "Termasuk Mobil + Supir" },
      { package: "Full Day All-In", price: "Tanya Promo", description: "Termasuk BBM, Tol & Parkir" },
    ],
    interior: [
      { src: rebornInt1, label: "Dashboard Sporty" },
      { src: rebornInt2, label: "Setir & Spidometer LCD" },
      { src: rebornInt3, label: "Kabin 7-Seater" },
      { src: rebornInt4, label: "Sunroof & Bagasi" },
    ],
  },
  {
    slug: "fortuner-gr-sport",
    name: "Toyota Fortuner GR Sport",
    tagline: "Karakter Sporty & Wibawa Tinggi",
    category: "Premium SUV",
    priceStarting: "Best Rate Guarantee",
    priceNote: "Konsultasi Promo Hari Ini via WhatsApp",
    description:
      "SUV gagah dengan sentuhan Gazoo Racing, suspensi kokoh, dan tenaga mesin 2.8L diesel yang luar biasa bertenaga untuk perjalanan dinas maupun keluarga.",
    model: "",
    image: "/images/reborn.png",
    badges: ["GR Sport", "Mesin 2.8L", "Gagah"],
    capacity: "6–7 penumpang",
    luggage: "3 koper besar + 2 kabin",
    transmission: "6-Speed Sport Sequential Automatic",
    fuel: "2.8L 1GD-FTV Turbo Diesel",
    ac: "Dual Zone Auto AC with Cabin Air Purifier",
    entertainment: "9\" Head Unit with NFC, Rear Seat Entertainment, Wireless Charger",
    services: ["Kunjungan Dinas", "Sewa Harian", "Luar Kota"],
    fitFor: ["Operasional Kantor", "Perjalanan Dinas", "Keluarga", "Luar Kota"],
    rates: [
      { package: "Airport Transfer", price: "Tanya Promo", description: "Termasuk Supir & Tol" },
      { package: "Dalam Kota (12 Jam)", price: "Tanya Promo", description: "Termasuk Mobil + Supir" },
      { package: "Full Day All-In", price: "Tanya Promo", description: "Termasuk BBM, Tol & Parkir" },
    ],
    interior: [
      { src: rebornInt1, label: "Dashboard GR Sport" },
      { src: rebornInt2, label: "Cockpit Kemudi" },
      { src: rebornInt3, label: "Kabin Kulit Hitam" },
      { src: rebornInt4, label: "Bagasi Fleksibel" },
    ],
  },
  {
    slug: "cr-v-turbo-prestige",
    name: "Honda CR-V Turbo Prestige",
    tagline: "SUV Premium 7-Seater dengan Panoramic Sunroof",
    category: "Premium SUV",
    priceStarting: "Best Rate Guarantee",
    priceNote: "Konsultasi Promo Hari Ini via WhatsApp",
    description:
      "SUV prestisius dengan mesin VTEC Turbo responsif, panoramic sunroof megah, dan jok kulit elektrik berkelas untuk perjalanan bisnis dan keluarga.",
    model: "",
    image: "/images/zenix.png",
    badges: ["Panoramic Sunroof", "Turbo Power", "7-Seater Mewah"],
    capacity: "5–7 penumpang",
    luggage: "3 koper besar + 2 kabin",
    transmission: "CVT with Earth Dreams Technology",
    fuel: "1.5L VTEC Turbo Bensin",
    ac: "Dual Zone Auto AC with Nanoe Technology",
    entertainment: "9\" Display Audio, Navigation, Hands-Free Access Power Tailgate",
    services: ["Sewa Harian", "Airport Transfer", "Liburan Keluarga"],
    fitFor: ["Keluarga", "Tamu Kantor", "City Tour", "Perjalanan Luar Kota"],
    rates: [
      { package: "Airport Transfer", price: "Tanya Promo", description: "Termasuk Supir & Tol" },
      { package: "Dalam Kota (12 Jam)", price: "Tanya Promo", description: "Termasuk Mobil + Supir" },
      { package: "Full Day All-In", price: "Tanya Promo", description: "Termasuk BBM, Tol & Parkir" },
    ],
    interior: [
      { src: zenixInt1, label: "Dashboard Elegan" },
      { src: zenixInt2, label: "Cockpit" },
      { src: zenixInt3, label: "Kabin 7-Seater" },
      { src: zenixInt4, label: "Panoramic Sunroof" },
    ],
  },
  {
    slug: "mazda-cx-5-gt-kuro",
    name: "Mazda CX-5 GT Kuro",
    tagline: "Desain KODO Eksklusif & Kualitas Interior Mewah",
    category: "Premium SUV",
    priceStarting: "Best Rate Guarantee",
    priceNote: "Konsultasi Promo Hari Ini via WhatsApp",
    description:
      "SUV berdesain KODO anggun dengan kualitas interior sekelas mobil mewah Eropa, audio Bose 10-speaker, dan kenyamanan suspensi G-Vectoring Control.",
    model: "",
    image: "/images/zenix.png",
    badges: ["Bose 10-Speaker", "Kuro Edition", "Interior Mewah"],
    capacity: "4–5 penumpang",
    luggage: "2 koper besar + 2 kabin",
    transmission: "6-Speed SKYACTIV-DRIVE Automatic",
    fuel: "2.5L SKYACTIV-G Bensin",
    ac: "Dual Zone Climate Control + Rear Vent",
    entertainment: "10.25\" Mazda Connect Display, Bose Centerpoint Surround Sound",
    services: ["Sewa Harian", "City Tour", "Airport Transfer"],
    fitFor: ["Eksekutif Muda", "Perjalanan Santai", "Pasangan & Keluarga Kecil"],
    rates: [
      { package: "Airport Transfer", price: "Tanya Promo", description: "Termasuk Supir & Tol" },
      { package: "Dalam Kota (12 Jam)", price: "Tanya Promo", description: "Termasuk Mobil + Supir" },
      { package: "Full Day All-In", price: "Tanya Promo", description: "Termasuk BBM, Tol & Parkir" },
    ],
    interior: [
      { src: zenixInt1, label: "Dashboard Minimalis Mewah" },
      { src: zenixInt2, label: "Kokpit Driver-Centric" },
      { src: zenixInt3, label: "Jok Kulit Nappa" },
      { src: zenixInt4, label: "Bagasi Belakang" },
    ],
  },

  // ── 4. Electric Vehicle ──
  {
    slug: "hyundai-ioniq-5-signature",
    name: "Hyundai Ioniq 5 Signature",
    tagline: "Mobilitas Masa Depan Bebas Ganjil-Genap",
    category: "Electric Vehicle",
    priceStarting: "Best Rate Guarantee",
    priceNote: "Konsultasi Promo Hari Ini via WhatsApp",
    description:
      "Crossover listrik murni dengan akselerasi instan senyap, lantai kabin rata super lapang, relaxation seat, dan kebebasan melintasi seluruh jalan ganjil-genap di Jakarta.",
    model: "",
    image: "/images/zenix.png",
    badges: ["100% Listrik", "Bebas Ganjil Genap", "Vision Roof"],
    capacity: "5 penumpang",
    luggage: "2 koper besar + Frunk depan",
    transmission: "Single Speed Reduction Gear",
    fuel: "100% Listrik (EV Battery 72.6 kWh)",
    ac: "Dual Zone Climate with Heat Pump",
    entertainment: "BOSE 8-Speaker Sound, Dual 12.3\" Panoramic Screen, V2L",
    services: ["Bebas Ganjil Genap Jakarta", "Airport Transfer", "Event Ramah Lingkungan"],
    fitFor: ["Perjalanan Tanpa Batas Ganjil-Genap", "Eksekutif Modern", "Event & Promosi", "Keluarga"],
    rates: [
      { package: "Airport Transfer EV", price: "Tanya Promo", description: "Termasuk Supir & Bebas Ganjil Genap" },
      { package: "Dalam Kota (12 Jam)", price: "Tanya Promo", description: "Termasuk Mobil + Supir + Bebas Ganjil Genap" },
      { package: "Full Day All-In", price: "Tanya Promo", description: "Termasuk Charging, Tol, & Parkir" },
    ],
    interior: [
      { src: zenixInt1, label: "Dashboard Futuristik" },
      { src: zenixInt2, label: "Dual Screen 12.3 Inci" },
      { src: zenixInt3, label: "Relaxation Comfort Seat" },
      { src: zenixInt4, label: "Vision Roof & Bagasi" },
    ],
  },

  // ── 5. Compact SUV & Crossover ──
  {
    slug: "honda-hr-v-se",
    name: "Honda HR-V SE",
    tagline: "Crossover Modern, Stylish & Lincah",
    category: "Compact SUV",
    priceStarting: "Best Rate Guarantee",
    priceNote: "Konsultasi Promo Hari Ini via WhatsApp",
    description:
      "Crossover ringkas dengan panoramic glass roof, desain futuristik, dan kepraktisan ultra seat yang fleksibel untuk mobilitas lincah di tengah lalu lintas Jakarta.",
    model: "",
    image: "/images/zenix.png",
    badges: ["Panoramic Roof", "Stylish", "Lincah"],
    capacity: "4–5 penumpang",
    luggage: "2 koper besar + 1 kabin",
    transmission: "CVT Automatic",
    fuel: "Bensin i-VTEC",
    ac: "Auto AC with Air Diffusion System",
    entertainment: "8\" Display Audio, Apple CarPlay, Hands-free Power Tailgate",
    services: ["Sewa Harian", "City Tour", "Airport Transfer"],
    fitFor: ["Mobilitas Perkotaan", "Keluarga Muda", "Perjalanan Santai"],
    rates: [
      { package: "Airport Transfer", price: "Tanya Promo", description: "Termasuk Supir & Tol" },
      { package: "Dalam Kota (12 Jam)", price: "Tanya Promo", description: "Termasuk Mobil + Supir" },
      { package: "Full Day All-In", price: "Tanya Promo", description: "Termasuk BBM, Tol & Parkir" },
    ],
    interior: [
      { src: zenixInt1, label: "Dashboard Horizontal" },
      { src: zenixInt2, label: "Cockpit Kemudi" },
      { src: zenixInt3, label: "Kabin Ultra Seat" },
      { src: zenixInt4, label: "Panoramic Glass Roof" },
    ],
  },
  {
    slug: "mitsubishi-xforce",
    name: "Mitsubishi XForce",
    tagline: "Compact SUV Canggih dengan Dynamic Sound Yamaha",
    category: "Compact SUV",
    priceStarting: "Best Rate Guarantee",
    priceNote: "Konsultasi Promo Hari Ini via WhatsApp",
    description:
      "SUV perkotaan terbaru dengan ground clearance tinggi 222mm, audio premium Dynamic Sound Yamaha, 4 mode berkendara, dan kabin ekstra nyaman.",
    model: "",
    image: "/images/zenix.png",
    badges: ["Yamaha Premium Sound", "Unit Baru", "Futuristik"],
    capacity: "4–5 penumpang",
    luggage: "2 koper besar + 2 kabin",
    transmission: "CVT Automatic",
    fuel: "Bensin MIVEC",
    ac: "Dual Zone Auto AC with Nanoe-X",
    entertainment: "12.3\" Smartphone-link Display Audio, Dynamic Sound Yamaha Premium",
    services: ["Sewa Harian", "City Tour", "Airport Transfer"],
    fitFor: ["Perjalanan Santai", "Keluarga Kecil", "Wisata Jakarta"],
    rates: [
      { package: "Airport Transfer", price: "Tanya Promo", description: "Termasuk Supir & Tol" },
      { package: "Dalam Kota (12 Jam)", price: "Tanya Promo", description: "Termasuk Mobil + Supir" },
      { package: "Full Day All-In", price: "Tanya Promo", description: "Termasuk BBM, Tol & Parkir" },
    ],
    interior: [
      { src: zenixInt1, label: "Dashboard Modern" },
      { src: zenixInt2, label: "Layar 12.3 Inci" },
      { src: zenixInt3, label: "Kabin Yamaha Audio" },
      { src: zenixInt4, label: "Bagasi Luas" },
    ],
  },
  {
    slug: "city-hatchback-rs",
    name: "Honda City Hatchback RS",
    tagline: "Hatchback Sporty, Lincah & Fleksibel",
    category: "Compact SUV",
    priceStarting: "Best Rate Guarantee",
    priceNote: "Konsultasi Promo Hari Ini via WhatsApp",
    description:
      "Hatchback sporty dengan mesin bertenaga, manuver gesit di jalanan ibu kota, serta fitur Ultra Seat yang bisa diatur dalam 4 mode ruang fleksibel.",
    model: "",
    image: "/images/zenix.png",
    badges: ["Ultra Seat", "Sporty RS", "Lincah Jakarta"],
    capacity: "4–5 penumpang",
    luggage: "2 koper sedang + 2 ransel",
    transmission: "CVT with Paddle Shift",
    fuel: "1.5L DOHC i-VTEC Bensin",
    ac: "Auto AC with Digital Display",
    entertainment: "8\" Advanced Capacitive Touchscreen, 8 Speakers, Apple CarPlay",
    services: ["Sewa Harian", "City Tour", "Airport Transfer"],
    fitFor: ["Keliling Kota Jakarta", "Mobilitas Cepat", "Perjalanan Hemat"],
    rates: [
      { package: "Airport Transfer", price: "Tanya Promo", description: "Termasuk Supir & Tol" },
      { package: "Dalam Kota (12 Jam)", price: "Tanya Promo", description: "Termasuk Mobil + Supir" },
      { package: "Full Day All-In", price: "Tanya Promo", description: "Termasuk BBM, Tol & Parkir" },
    ],
    interior: [
      { src: zenixInt1, label: "Dashboard Sporty RS" },
      { src: zenixInt2, label: "Cockpit" },
      { src: zenixInt3, label: "Kursi Kombinasi Suede" },
      { src: zenixInt4, label: "Ultra Seat Bagasi" },
    ],
  },

  // ── 6. Premium & Medium MPV ──
  {
    slug: "toyota-innova-zenix",
    name: "Toyota Innova Zenix",
    tagline: "MPV Modern & Nyaman",
    category: "Premium MPV",
    priceStarting: "Best Rate Guarantee",
    priceNote: "Konsultasi Promo Hari Ini via WhatsApp",
    description:
      "Generasi terbaru Innova dengan platform TNGA kabin senyap, suspensi empuk, dan interior modern — pilihan favorit untuk keluarga dan mobilitas santai di Jakarta.",
    model: "/models/innova-zenix.glb",
    image: "/images/zenix.png",
    badges: ["Unit Baru", "Hybrid/Bensin", "Keluarga"],
    capacity: "5–7 penumpang",
    luggage: "2 koper besar + 2 kabin",
    transmission: "Automatic (CVT)",
    fuel: "Bensin / Hybrid",
    ac: "Dual zone + rear blower",
    entertainment: "10\" touchscreen, Apple CarPlay, Android Auto",
    services: ["Antar Jemput Bandara", "Sewa Harian", "Luar Kota"],
    fitFor: ["Antar Jemput Bandara", "Keluarga", "Perjalanan Santai", "City Tour Jakarta", "Tamu Kantor"],
    rates: [
      { package: "Airport Transfer Bandara", price: "Tanya Promo", description: "Termasuk Supir, Tol & Parkir Bandara" },
      { package: "Dalam Kota (12 Jam)", price: "Tanya Promo", description: "Termasuk Mobil + Supir Berpengalaman" },
      { package: "Full Day All-In", price: "Tanya Promo", description: "Termasuk Supir, BBM, Tol, & Parkir" },
    ],
    interior: [
      { src: zenixInt1, label: "Dashboard" },
      { src: zenixInt2, label: "Setir & Baris Depan" },
      { src: zenixInt3, label: "Kabin Tengah" },
      { src: zenixInt4, label: "Baris Belakang & Bagasi" },
    ],
  },
  {
    slug: "toyota-voxy",
    name: "Toyota Voxy",
    tagline: "\"Baby Alphard\" dengan Captain Seat Fleksibel",
    category: "Premium MPV",
    priceStarting: "Best Rate Guarantee",
    priceNote: "Konsultasi Promo Hari Ini via WhatsApp",
    description:
      "Boxy MPV modern dengan lantai rendah, captain seat long slide, dual sliding door otomatis, dan visibilitas kaca luas yang sangat ramah anak-anak dan lansia.",
    model: "",
    image: "/images/alphard.png",
    badges: ["Baby Alphard", "Captain Seat", "Keluarga Nyaman"],
    capacity: "6–7 penumpang",
    luggage: "3 koper besar + 2 kabin",
    transmission: "Direct Shift-CVT Automatic",
    fuel: "Bensin Dynamic Force",
    ac: "Dual Zone Auto AC + Air Purifier",
    entertainment: "9\" Head Unit, 11.6\" Roof Rear Monitor, Wireless Charging",
    services: ["Antar Jemput Bandara", "Sewa Keluarga", "City Tour"],
    fitFor: ["Keluarga Besar", "Tamu Kantor", "Antar Jemput Bandara", "Wisata Jakarta"],
    rates: [
      { package: "Airport Transfer", price: "Tanya Promo", description: "Termasuk Supir & Tol" },
      { package: "Dalam Kota (12 Jam)", price: "Tanya Promo", description: "Termasuk Mobil + Supir" },
      { package: "Full Day All-In", price: "Tanya Promo", description: "Termasuk BBM, Tol & Parkir" },
    ],
    interior: [
      { src: alphardInt1, label: "Dashboard Modern" },
      { src: alphardInt2, label: "Cockpit Luas" },
      { src: alphardInt3, label: "Long Slide Captain Seat" },
      { src: alphardInt4, label: "Roof Monitor & Bagasi" },
    ],
  },
  {
    slug: "nissan-serena-highway-star",
    name: "Nissan Serena Highway Star",
    tagline: "MPV Paling Fleksibel dengan Dual Back Door",
    category: "Premium MPV",
    priceStarting: "Best Rate Guarantee",
    priceNote: "Konsultasi Promo Hari Ini via WhatsApp",
    description:
      "MPV keluarga berdesain lapang dengan captain seat multi-fungsi, pintu bagasi dua arah (Dual Back Door), dan suspensi stabil untuk liburan keluarga nyaman.",
    model: "",
    image: "/images/alphard.png",
    badges: ["Dual Back Door", "Captain Seat", "Lega & Praktis"],
    capacity: "6–7 penumpang",
    luggage: "3 koper besar + 2 kabin",
    transmission: "XTRONIC CVT Automatic",
    fuel: "Bensin",
    ac: "Dual Zone Auto AC with Intelligent Climate Control",
    entertainment: "Roof Monitor 11\", Touchscreen Audio, 7 USB Charging Ports",
    services: ["Sewa Harian Keluarga", "Airport Transfer", "Wisata Luar Kota"],
    fitFor: ["Keluarga", "Perjalanan Wisata", "Antar Jemput Tamu"],
    rates: [
      { package: "Airport Transfer", price: "Tanya Promo", description: "Termasuk Supir & Tol" },
      { package: "Dalam Kota (12 Jam)", price: "Tanya Promo", description: "Termasuk Mobil + Supir" },
      { package: "Full Day All-In", price: "Tanya Promo", description: "Termasuk BBM, Tol & Parkir" },
    ],
    interior: [
      { src: alphardInt1, label: "Dashboard Serena" },
      { src: alphardInt2, label: "Cockpit" },
      { src: alphardInt3, label: "Captain Seat Fleksibel" },
      { src: alphardInt4, label: "Dual Back Door Bagasi" },
    ],
  },
  {
    slug: "innova-venturer",
    name: "Toyota Innova Venturer",
    tagline: "Edisi Tertinggi Innova Reborn yang Mewah",
    category: "Premium MPV",
    priceStarting: "Best Rate Guarantee",
    priceNote: "Konsultasi Promo Hari Ini via WhatsApp",
    description:
      "Varian flagship Innova Reborn dengan captain seat berbalut kulit hitam, body kit sporty elegan, ambient light kabin, dan ketangguhan mesin diesel legendaris.",
    model: "",
    image: "/images/reborn.png",
    badges: ["Captain Seat", "Kulit Premium", "Diesel/Bensin"],
    capacity: "6 penumpang",
    luggage: "2 koper besar + 2 kabin",
    transmission: "6-Speed Sport Sequential Automatic",
    fuel: "2.4L Diesel / 2.0L Bensin",
    ac: "Automatic Climate Control + Rear Blower",
    entertainment: "8\" Touchscreen Audio, Premium Illumination Light, Smartphone Mirroring",
    services: ["Perjalanan Luar Kota", "Operasional Kantor VIP", "Sewa Harian"],
    fitFor: ["Perjalanan Dinas", "Kunjungan Kerja", "Keluarga", "Luar Kota"],
    rates: [
      { package: "Airport Transfer", price: "Tanya Promo", description: "Termasuk Supir & Tol" },
      { package: "Dalam Kota (12 Jam)", price: "Tanya Promo", description: "Termasuk Mobil + Supir" },
      { package: "Full Day All-In", price: "Tanya Promo", description: "Termasuk BBM, Tol & Parkir" },
    ],
    interior: [
      { src: rebornInt1, label: "Dashboard Venturer" },
      { src: rebornInt2, label: "Setir Ornamen Kayu" },
      { src: rebornInt3, label: "Captain Seat Kulit Hitam" },
      { src: rebornInt4, label: "Ambient Lighting & Bagasi" },
    ],
  },
  {
    slug: "toyota-innova-reborn",
    name: "Toyota Innova Reborn",
    tagline: "Tangguh & Nyaman Luar Kota",
    category: "Business MPV",
    priceStarting: "Best Rate Guarantee",
    priceNote: "Konsultasi Promo Hari Ini via WhatsApp",
    description:
      "Andalan perjalanan dalam kota maupun luar kota. Tangguh, nyaman, dan hemat untuk rute jauh bersama supir berpengalaman.",
    model: "/models/innova-reborn.glb",
    image: "/images/reborn.png",
    badges: ["Hemat & Nyaman", "Luar Kota", "Diesel"],
    capacity: "6–7 penumpang",
    luggage: "2 koper besar + 2 kabin",
    transmission: "Automatic / Manual",
    fuel: "Diesel",
    ac: "Dual blower",
    entertainment: "Touchscreen audio, Bluetooth, USB",
    services: ["Perjalanan Luar Kota", "Operasional Kantor", "Sewa Harian"],
    fitFor: ["Kunjungan Kerja", "Mobilitas Harian", "Perjalanan Dinas", "Operasional Kantor", "Perjalanan Luar Kota"],
    rates: [
      { package: "Airport Transfer Bandara", price: "Tanya Promo", description: "Termasuk Supir, Tol & Parkir Bandara" },
      { package: "Dalam Kota (12 Jam)", price: "Tanya Promo", description: "Termasuk Mobil + Supir Berpengalaman" },
      { package: "Full Day All-In", price: "Tanya Promo", description: "Termasuk Supir, BBM, Tol, & Parkir" },
    ],
    interior: [
      { src: rebornInt1, label: "Dashboard" },
      { src: rebornInt2, label: "Setir & Baris Depan" },
      { src: rebornInt3, label: "Kabin Tengah" },
      { src: rebornInt4, label: "Baris Belakang & Bagasi" },
    ],
  },

  // ── 7. Family MPV & Crossover ──
  {
    slug: "xpander-ultimate",
    name: "Mitsubishi Xpander Ultimate",
    tagline: "Kenyamanan Kabin Senyap Idaman Keluarga",
    category: "Family MPV",
    priceStarting: "Best Rate Guarantee",
    priceNote: "Konsultasi Promo Hari Ini via WhatsApp",
    description:
      "MPV keluarga favorit berkat suspensi paling empuk di kelasnya, peredaman suara maksimal, dan tata letak interior yang ergonomis dan elegan.",
    model: "",
    image: "/images/zenix.png",
    badges: ["Suspensi Empuk", "Kabin Senyap", "Keluarga"],
    capacity: "6–7 penumpang",
    luggage: "2 koper besar + 2 kabin",
    transmission: "CVT Automatic",
    fuel: "Bensin MIVEC",
    ac: "Digital AC + Rear Double Blower",
    entertainment: "8\" Touchscreen Audio, Cruise Control, Hands-Free Voice Control",
    services: ["Sewa Harian", "Antar Jemput Bandara", "Liburan Keluarga"],
    fitFor: ["Keluarga", "Wisata Jakarta", "Perjalanan Hemat & Nyaman"],
    rates: [
      { package: "Airport Transfer", price: "Tanya Promo", description: "Termasuk Supir & Tol" },
      { package: "Dalam Kota (12 Jam)", price: "Tanya Promo", description: "Termasuk Mobil + Supir" },
      { package: "Full Day All-In", price: "Tanya Promo", description: "Termasuk BBM, Tol & Parkir" },
    ],
    interior: [
      { src: zenixInt1, label: "Dashboard Xpander" },
      { src: zenixInt2, label: "Cockpit" },
      { src: zenixInt3, label: "Kabin 7-Seater" },
      { src: zenixInt4, label: "Bagasi Fleksibel" },
    ],
  },
  {
    slug: "xpander-cross",
    name: "Mitsubishi Xpander Cross",
    tagline: "Kombinasi Kenyamanan MPV & Ketangguhan SUV",
    category: "Family MPV",
    priceStarting: "Best Rate Guarantee",
    priceNote: "Konsultasi Promo Hari Ini via WhatsApp",
    description:
      "Crossover MPV keluarga dengan suspensi empuk, kekedapan kabin terbaik di kelasnya, dan ground clearance tinggi untuk segala rute perjalanan.",
    model: "",
    image: "/images/zenix.png",
    badges: ["Keluarga", "Ground Clearance Tinggi", "Nyaman"],
    capacity: "6–7 penumpang",
    luggage: "2 koper besar + 2 kabin",
    transmission: "CVT Automatic",
    fuel: "Bensin MIVEC",
    ac: "Digital AC with Rear Blower",
    entertainment: "9\" Touchscreen Audio, Wireless Charger, LCD Digital Cluster",
    services: ["Sewa Harian", "Luar Kota", "Airport Transfer"],
    fitFor: ["Keluarga", "Roadtrip Luar Kota", "City Tour"],
    rates: [
      { package: "Airport Transfer", price: "Tanya Promo", description: "Termasuk Supir & Tol" },
      { package: "Dalam Kota (12 Jam)", price: "Tanya Promo", description: "Termasuk Mobil + Supir" },
      { package: "Full Day All-In", price: "Tanya Promo", description: "Termasuk BBM, Tol & Parkir" },
    ],
    interior: [
      { src: zenixInt1, label: "Dashboard Crossover" },
      { src: zenixInt2, label: "Setir 4-Spoke" },
      { src: zenixInt3, label: "Kabin 7 Penumpang" },
      { src: zenixInt4, label: "Bagasi Luas" },
    ],
  },
  {
    slug: "toyota-veloz-q",
    name: "Toyota Veloz Q",
    tagline: "MPV Modern Fitur Terlengkap di Kelasnya",
    category: "Family MPV",
    priceStarting: "Best Rate Guarantee",
    priceNote: "Konsultasi Promo Hari Ini via WhatsApp",
    description:
      "Tipe tertinggi Veloz dengan rem parkir elektrik, wireless charger, ambient light, dan mode sofa seat untuk istirahat santai di perjalanan.",
    model: "",
    image: "/images/zenix.png",
    badges: ["TSS Safety", "Wireless Charger", "Sofa Mode"],
    capacity: "6–7 penumpang",
    luggage: "2 koper besar + 2 kabin",
    transmission: "CVT Automatic",
    fuel: "Bensin Dual VVT-i",
    ac: "Digital Auto AC + Rear Air Conditioner",
    entertainment: "9\" Display Audio with Smartphone Connectivity, Rear Seat Entertainment",
    services: ["Sewa Harian", "Antar Jemput Bandara", "Operasional Bisnis"],
    fitFor: ["Keluarga", "Mobilitas Harian", "Perjalanan Dinas"],
    rates: [
      { package: "Airport Transfer", price: "Tanya Promo", description: "Termasuk Supir & Tol" },
      { package: "Dalam Kota (12 Jam)", price: "Tanya Promo", description: "Termasuk Mobil + Supir" },
      { package: "Full Day All-In", price: "Tanya Promo", description: "Termasuk BBM, Tol & Parkir" },
    ],
    interior: [
      { src: zenixInt1, label: "Dashboard Veloz Q" },
      { src: zenixInt2, label: "TFT Digital Cluster" },
      { src: zenixInt3, label: "Kabin Long Sofa Mode" },
      { src: zenixInt4, label: "Roof Monitor & Bagasi" },
    ],
  },
  {
    slug: "stargazer-x-prime",
    name: "Hyundai Stargazer X Prime",
    tagline: "Crossover MPV Futuristik dengan Captain Seat",
    category: "Family MPV",
    priceStarting: "Best Rate Guarantee",
    priceNote: "Konsultasi Promo Hari Ini via WhatsApp",
    description:
      "Crossover MPV dengan desain futuristik Starlight horizontal, opsi captain seat, meja lipat baris kedua, dan fitur Hyundai Smartsense terlengkap.",
    model: "",
    image: "/images/zenix.png",
    badges: ["Futuristik", "Captain Seat", "Bose Audio"],
    capacity: "6–7 penumpang",
    luggage: "2 koper besar + 2 kabin",
    transmission: "IVT (Intelligent Variable Transmission)",
    fuel: "Smartstream G1.5 Bensin",
    ac: "Full Auto AC + Rear Air Circulator",
    entertainment: "8\" Display Audio, Bose Premium Sound System, Wireless Smartphone Charger",
    services: ["Sewa Harian", "City Tour", "Airport Transfer"],
    fitFor: ["Keluarga Modern", "Perjalanan Wisata", "City Tour Jakarta"],
    rates: [
      { package: "Airport Transfer", price: "Tanya Promo", description: "Termasuk Supir & Tol" },
      { package: "Dalam Kota (12 Jam)", price: "Tanya Promo", description: "Termasuk Mobil + Supir" },
      { package: "Full Day All-In", price: "Tanya Promo", description: "Termasuk BBM, Tol & Parkir" },
    ],
    interior: [
      { src: zenixInt1, label: "Dashboard Futuristik" },
      { src: zenixInt2, label: "Cockpit" },
      { src: zenixInt3, label: "Captain Seat & Meja Lipat" },
      { src: zenixInt4, label: "Bagasi Fleksibel" },
    ],
  },
  {
    slug: "br-v-prestige",
    name: "Honda BR-V Prestige",
    tagline: "7-Seater Tangguh dengan Fitur Keselamatan Lengkap",
    category: "Family MPV",
    priceStarting: "Best Rate Guarantee",
    priceNote: "Konsultasi Promo Hari Ini via WhatsApp",
    description:
      "SUV keluarga 7-seater dengan tenaga terbesar di kelasnya (121 PS), kabin ergonomis, dan fitur keselamatan Honda Sensing untuk keamanan ekstra.",
    model: "",
    image: "/images/zenix.png",
    badges: ["Honda Sensing", "7-Seater", "Bertenaga"],
    capacity: "6–7 penumpang",
    luggage: "2 koper besar + 2 kabin",
    transmission: "CVT Automatic",
    fuel: "1.5L DOHC i-VTEC Bensin",
    ac: "Auto AC with Rear Ventilation",
    entertainment: "7\" Touchscreen Display Audio, Smartphone Connection, USB Ports all rows",
    services: ["Sewa Harian", "Luar Kota", "Airport Transfer"],
    fitFor: ["Keluarga", "Perjalanan Dinas", "Wisata Luar Kota"],
    rates: [
      { package: "Airport Transfer", price: "Tanya Promo", description: "Termasuk Supir & Tol" },
      { package: "Dalam Kota (12 Jam)", price: "Tanya Promo", description: "Termasuk Mobil + Supir" },
      { package: "Full Day All-In", price: "Tanya Promo", description: "Termasuk BBM, Tol & Parkir" },
    ],
    interior: [
      { src: zenixInt1, label: "Dashboard BR-V" },
      { src: zenixInt2, label: "Setir Kemudi" },
      { src: zenixInt3, label: "Kabin 7-Seater" },
      { src: zenixInt4, label: "Bagasi Belakang" },
    ],
  },

  // ── 8. Van Rombongan ──
  {
    slug: "toyota-hiace-premio",
    name: "Toyota Hiace Premio",
    tagline: "Kenyamanan Rombongan",
    category: "Van Rombongan",
    priceStarting: "Best Rate Guarantee",
    priceNote: "Konsultasi Promo Hari Ini via WhatsApp",
    description:
      "Kabin lega dengan kursi reclining yang nyaman untuk rombongan keluarga besar, wisata keliling Jakarta, atau kegiatan kantor.",
    model: "/models/hiace-premio.glb",
    image: "/images/hiace.png",
    badges: ["Rombongan", "High Roof", "Recliner"],
    capacity: "11–14 penumpang",
    luggage: "8+ koper besar",
    transmission: "Automatic",
    fuel: "Diesel",
    ac: "Double blower kabin panjang",
    entertainment: "LED cabin lighting, audio system, mic",
    services: ["Antar Jemput Rombongan", "Wisata Jakarta & Luar Kota", "Event & Kantor"],
    fitFor: ["Wisata Keluarga", "Gathering Kantor", "Transportasi Event", "Kunjungan Lapangan", "Perjalanan Rombongan"],
    rates: [
      { package: "Airport Transfer Rombongan", price: "Tanya Promo", description: "Termasuk Supir, Tol & Parkir Bandara" },
      { package: "Dalam Kota (12 Jam)", price: "Tanya Promo", description: "Termasuk Mobil + Supir Berpengalaman" },
      { package: "Full Day All-In", price: "Tanya Promo", description: "Termasuk Supir, BBM, Tol, & Parkir" },
    ],
    interior: [
      { src: hiaceInt1, label: "Dashboard" },
      { src: hiaceInt2, label: "Setir & Baris Depan" },
      { src: hiaceInt3, label: "Kabin Tengah" },
      { src: hiaceInt4, label: "Baris Belakang & Bagasi" },
    ],
  },
];

export function getVehicle(slug: string) {
  return VEHICLES.find((v) => v.slug === slug);
}

export type TravelNeed = {
  id: string;
  emoji: string;
  title: string;
  desc: string;
  vehicles: string[];
};

export const TRAVEL_NEEDS: TravelNeed[] = [
  {
    id: "bandara",
    emoji: "✈️",
    title: "Antar Jemput Bandara",
    desc: "Soekarno-Hatta & Halim, pantauan jadwal terbang, siap 24 jam.",
    vehicles: ["toyota-alphard", "toyota-innova-zenix"],
  },
  {
    id: "corporate",
    emoji: "🏢",
    title: "Perjalanan Bisnis & Kantor",
    desc: "Sewa harian atau bulanan untuk operasional dan tamu kantor dengan invoice resmi.",
    vehicles: ["toyota-alphard", "toyota-innova-zenix", "toyota-innova-reborn"],
  },
  {
    id: "vip",
    emoji: "👔",
    title: "Perjalanan Eksekutif",
    desc: "Kenyamanan ekstra untuk tamu penting dan perjalanan khusus di Jakarta.",
    vehicles: ["toyota-alphard"],
  },
  {
    id: "wedding",
    emoji: "💍",
    title: "Mobil Pernikahan",
    desc: "Unit bersih mengilap, opsi hiasan bunga, dan supir rapi untuk hari istimewa.",
    vehicles: ["toyota-alphard"],
  },
  {
    id: "rombongan",
    emoji: "👥",
    title: "Sewa Mobil Rombongan",
    desc: "Wisata keluarga besar, event, dan perjalanan rombongan 11–14 penumpang.",
    vehicles: ["toyota-hiace-premio"],
  },
];
