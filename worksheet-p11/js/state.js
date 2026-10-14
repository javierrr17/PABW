import { daftarProyek as dataAwalProyek } from "./data.js";
import { render } from "./dom.js";

const KUNCI = "pabw-p11";
const VERSI = 2;

export function simpan(state) {
  const isi = { versi: VERSI, kategoriAktif: state.kategoriAktif };
  localStorage.setItem(KUNCI, JSON.stringify(isi));
}

export function muat() {
  try {
    const data = localStorage.getItem(KUNCI);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

// Membaca simpanan saat pertama kali dimuat (pemeriksaan null wajib ada)
const simpanan = muat();
const kategoriAwal = (simpanan && simpanan.versi === VERSI && simpanan.kategoriAktif) 
  ? simpanan.kategoriAktif 
  : "semua";

export const state = {
  daftarProyek: [...dataAwalProyek],
  kategoriAktif: kategoriAwal,
};

// Fungsi Atur Ulang: hapus simpanan, kembalikan state ke awal, lalu render ulang
export function aturUlang() {
  localStorage.removeItem(KUNCI);
  state.kategoriAktif = "semua";
  render(state);
}

export function pilihKategori(kategoriBaru) {
  state.kategoriAktif = kategoriBaru;
  simpan(state);
  render(state);
}

window.state = state;
window.pilihKategori = pilihKategori;
window.aturUlang = aturUlang;