import { daftarProyek as dataAwalProyek } from "./data.js";
import { render } from "./dom.js";

const KUNCI = "pabw-p11";
const VERSI = 2;

// Fungsi menyimpan ke localStorage
export function simpan(state) {
  const isi = { versi: VERSI, kategoriAktif: state.kategoriAktif };
  localStorage.setItem(KUNCI, JSON.stringify(isi));
}

// E.2 — Fungsi muat yang diperbarui dengan proteksi versi & try-catch (menggantikan versi D.1)
export function muat() {
  try {
    const isi = JSON.parse(localStorage.getItem(KUNCI));
    if (isi?.versi !== VERSI) {
      localStorage.removeItem(KUNCI); // bentuk lama: buang
      return null;
    }
    return isi;
  } catch {
    localStorage.removeItem(KUNCI); // isi rusak: buang
    return null;
  }
}

// Menentukan nilai kategori awal dari hasil muat()
const simpanan = muat();
const kategoriAwal = simpanan ? simpanan.kategoriAktif : "semua";

// Objek state terpusat
export const state = {
  daftarProyek: [...dataAwalProyek],
  kategoriAktif: kategoriAwal,
};

export function ambilDaftarProyek() {
  return state.daftarProyek;
}

// Fungsi Atur Ulang: hapus simpanan, kembalikan state ke awal, lalu render ulang
export function aturUlang() {
  localStorage.removeItem(KUNCI);
  state.kategoriAktif = "semua";
  render(state);
}

// Fungsi pengubah state (satu pintu masuk)
export function pilihKategori(kategoriBaru) {
  state.kategoriAktif = kategoriBaru;
  simpan(state);
  render(state);
}

// Penempelan ke window untuk testing via Console DevTools
window.state = state;
window.pilihKategori = pilihKategori;
window.aturUlang = aturUlang;
window.muat = muat;