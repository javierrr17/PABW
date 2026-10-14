import { state, pilihKategori } from "./state.js";
import { render } from "./dom.js";
import { inisialisasiEvent } from "./events.js";

// Render awal menggunakan objek state utuh sesuai petunjuk C.2
render(state);

// Jalankan listener event
inisialisasiEvent();

// Tempel ke objek window agar bisa diuji via Console browser
window.state = state;
window.pilihKategori = pilihKategori;