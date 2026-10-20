export const profil = {
  nama: "Firstly Javierrazel Hermawan",
  peran: "Mahasiswa Informatika Universitas Islam Indonesia",
  keahlian: ["HTML", "CSS", "JavaScript"],
  jumlahProyek: 3,
};

export const daftarProyek = [
  { id: "p1", judul: "Figma: membuat desain aplikasi Cek Mental Health", tahun: 2025, selesai: true },
  { id: "p2", judul: "SceneBuilder: membuat desain sistem tentang Laundry ZIPPY", tahun: 2025, selesai: true },
  { id: "p3", judul: "HTML: membuat web tentang profil diri saya", tahun: 2026, selesai: true },
];

export function buatPerkenalan({ nama, peran }) {
  return `${nama} – ${peran}`;
}

export const formatKeahlian = (daftar) => daftar.join(" · ");