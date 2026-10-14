import { ambilDaftarProyek } from "./state.js";
import { render } from "./dom.js";
import { inisialisasiEvent } from "./events.js";

render(ambilDaftarProyek());

inisialisasiEvent();