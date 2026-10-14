import { state, pilihKategori, aturUlang, muat } from "./state.js";
import { render } from "./dom.js";
import { inisialisasiEvent } from "./events.js";

// 1. Render awal saat halaman dimuat
render(state);

// 2. Jalankan event listener
inisialisasiEvent();

// 3. Tempelkan fungsi & state ke window agar bisa diuji di DevTools Console
window.state = state;
window.pilihKategori = pilihKategori;
window.aturUlang = aturUlang;
window.muat = muat; 
window.render = render;