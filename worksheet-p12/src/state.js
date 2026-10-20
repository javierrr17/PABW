import { reactive } from 'vue';
import { daftarProyek as dataAwalProyek } from './data.js';

// Objek state reaktif tanpa pemanggilan render() manual
export const state = reactive({
  daftarProyek: [...dataAwalProyek],
  kategoriAktif: 'semua',
});

// Fungsi pengubah state
export function pilihKategori(kategoriBaru) {
  state.kategoriAktif = kategoriBaru;
}

export function ambilDaftarProyek() {
  return state.daftarProyek;
}

// Penempelan ke window untuk testing via Console DevTools
window.state = state;
window.pilihKategori = pilihKategori;