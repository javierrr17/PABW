import { daftarProyek as dataAwalProyek } from "./data.js";
import { render } from "./dom.js";

// 1. Objek state memuat daftarProyek dan kategoriAktif
export const state = {
  daftarProyek: [...dataAwalProyek],
  kategoriAktif: "semua",
};

export function ambilDaftarProyek() {
  return state.daftarProyek;
}

// 2. Fungsi pengubah (satu pintu masuk perubahan state)
export function pilihKategori(kategoriBaru) {
  state.kategoriAktif = kategoriBaru;
  render(state); // Otomatis gambar ulang tampilan saat state berubah
}

// 3. Tempelkan ke window agar bisa diuji via Console
window.state = state;
window.pilihKategori = pilihKategori;
window.render = render;