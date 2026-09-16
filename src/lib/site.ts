export const SITE = {
  company: "PT. Vicky Rental Nusantara",
  brand: "Vicky Rentcar Jakarta",
  phone: "+62 823-6338-9893",
  whatsappNumber: "6282363389893",
  city: "Jakarta, Indonesia",
  address: "Sudirman Central Business District (SCBD) Lot 28, Senayan, Jakarta Selatan, DKI Jakarta 12190",
  poolAddress: "Pool Bandara Soekarno-Hatta & Pool TB Simatupang, Jakarta",
  email: "reservasi@vickyrentcar.id",
  hours: "24 Jam Setiap Hari (Layanan 24/7)",
  instagram: "@vickyrentcar_jakarta",
};

export function waLink(message: string) {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${SITE.whatsappNumber}?text=${encodedMessage}`;
}

export function createBookingWaLink(data: {
  vehicle?: string;
  service?: string;
  pickupDate?: string;
  pickupTime?: string;
  duration?: string;
  pickupLocation?: string;
  destination?: string;
  userName?: string;
  notes?: string;
}) {
  const parts = [
    `Halo ${SITE.brand}, saya ingin melakukan reservasi kendaraan dengan detail berikut:`,
    "",
    data.userName ? `👤 Nama: ${data.userName}` : "",
    data.service ? `💼 Layanan: ${data.service}` : "",
    data.vehicle ? `🚘 Armada: ${data.vehicle}` : "",
    data.pickupDate ? `📅 Tanggal: ${data.pickupDate}` : "",
    data.pickupTime ? `⏰ Waktu: ${data.pickupTime}` : "",
    data.duration ? `⏳ Durasi: ${data.duration}` : "",
    data.pickupLocation ? `📍 Titik Jemput: ${data.pickupLocation}` : "",
    data.destination ? `🎯 Tujuan: ${data.destination}` : "",
    data.notes ? `📝 Catatan: ${data.notes}` : "",
    "",
    "Mohon informasi ketersediaan unit dan penawaran harga terbaik. Terima kasih!",
  ].filter((line) => line !== "");

  return waLink(parts.join("\n"));
}

