import { reactive } from "vue";
import { daftarProyek as dataAwalProyek } from "./data.js";

const KUNCI = "pabw-p11";
const VERSI = 2;

// Fungsi menyimpan ke localStorage
export function simpan(stateObj) {
  const isi = { versi: VERSI, kategoriAktif: stateObj.kategoriAktif };
  localStorage.setItem(KUNCI, JSON.stringify(isi));
}

// Fungsi muat dengan proteksi versi & try-catch
export function muat() {
  try {
    const isi = JSON.parse(localStorage.getItem(KUNCI));
    if (isi?.versi !== VERSI) {
      localStorage.removeItem(KUNCI);
      return null;
    }
    return isi;
  } catch {
    localStorage.removeItem(KUNCI);
    return null;
  }
}

// Menentukan nilai kategori awal dari hasil muat()
const simpanan = muat();
const kategoriAwal = simpanan ? simpanan.kategoriAktif : "semua";

// Objek state terpusat yang reaktif (menggunakan reactive dari Vue)
export const state = reactive({
  daftarProyek: [...dataAwalProyek],
  kategoriAktif: kategoriAwal,
});

export function ambilDaftarProyek() {
  return state.daftarProyek;
}

// Fungsi Atur Ulang: hapus simpanan & kembalikan state ke awal
export function aturUlang() {
  localStorage.removeItem(KUNCI);
  state.kategoriAktif = "semua";
}

// Fungsi pengubah state
export function pilihKategori(kategoriBaru) {
  state.kategoriAktif = kategoriBaru;
  simpan(state);
}

// Penempelan ke window untuk testing via Console DevTools
window.state = state;
window.pilihKategori = pilihKategori;
window.aturUlang = aturUlang;
window.muat = muat;