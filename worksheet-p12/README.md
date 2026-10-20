# Worksheet P12: Build Tooling, npm, dan Framework SPA (SIF302)

Proyek ini merupakan pengembangan lanjutan dari Pertemuan 11 pada mata kuliah **Pengembangan Aplikasi Berbasis Web (SIF302)**. Proyek ini memindahkan halaman profil modular (vanilla JavaScript) menjadi proyek **Vue + Vite** yang tersusun dari empat komponen, menjalankannya dengan `npm`, menyambungkan kembali *state* dan `localStorage` dengan reaktivitas Vue, lalu membangunnya untuk produksi (`dist/`) dan mencobanya lewat `npm run preview`. Tidak ada fitur baru yang ditambahkan; perilaku halaman harus sama seperti Pertemuan 11.

---

## 📑 Daftar Isi

- [Identitas Mahasiswa](#-identitas-mahasiswa)
- [Capaian Pembelajaran & Aturan Pengerjaan](#-capaian-pembelajaran--aturan-pengerjaan)
- [Struktur Berkas](#-struktur-berkas)
- [Langkah Pengerjaan (Lembar A–F)](#-langkah-pengerjaan-lembar-af)
- [Tiket Keluar & Penutup (Lembar G)](#-tiket-keluar--penutup-lembar-g)
- [Penilaian Mandiri](#-penilaian-mandiri)
- [Deklarasi Penggunaan AI](#-deklarasi-penggunaan-ai)

---

## 👤 Identitas Mahasiswa

- **Nama**: Firstly Javierrazel Hermawan
- **NIM**: 25523158
- **Kelas**: E
- **Tanggal**: 19-10-2026

---

## 🎯 Capaian Pembelajaran & Aturan Pengerjaan

1. **Proyek Berjalan**: `npm run dev` membuka halaman dan Console bersih.
2. **Aset P04–P06 Dipakai Apa Adanya**: Token, CSS, dan HTML tidak diubah.
3. **Empat Komponen**: Halaman tersusun dari empat komponen; satu di antaranya (`KepalaProfil`) menerima data lewat *props*.
4. **Build Produksi**: `npm run build` menghasilkan folder `dist/`.
5. **Preview**: `npm run preview` menjalankan hasil build tersebut.

**Aturan pengerjaan**: individu; menggunakan Node.js LTS, npm, VS Code, terminal, dan peramban; berkas awal berasal dari hasil Pertemuan 11 (termasuk `js/api.js` dari Pertemuan 10); kerangka Vue dibuat di folder baru `worksheet-p12/`; waktu 90 menit; seluruh isi `worksheet-p12/` diunggah ke repositori GitHub.

---

## 📁 Struktur Berkas

```text
worksheet-p12/
├── public/                   # Berkas statis (.json, gambar yang dipakai di CSS)
├── src/
│   ├── components/
│   │   ├── KepalaProfil.vue  # Identitas; menerima props `profil`
│   │   ├── TombolFilter.vue  # Deretan tombol kategori (state bersama)
│   │   ├── DaftarProyek.vue  # Daftar kartu proyek + penyaringan (state bersama)
│   │   └── FormKontak.vue    # Formulir kontak (ref lokal)
│   ├── App.vue               # Komponen induk; onMounted, watch, tombol atur ulang
│   ├── main.js               # Titik masuk; impor enam CSS & mount aplikasi
│   ├── state.js              # reactive() state tunggal + pilihKategori()
│   ├── simpanan.js           # simpan(), muat(), aturUlang(), KUNCI, VERSI
│   ├── data.js               # Data mentah (kini dengan id unik untuk :key)
│   ├── api.js                # (Dari Pertemuan 10) lapisan data masuk, isi tidak diubah
│   ├── tokens.css            # Design tokens
│   ├── base.css              # Gaya dasar elemen global
│   ├── layout.css            # Tata letak kontainer & grid
│   ├── komponen.css          # Komponen UI
│   ├── tema.css              # Tema warna
│   └── responsif.css         # Media queries & breakpoints
├── index.html                # Hanya <div id="app"> dan satu <script type="module">
├── vite.config.js
├── package.json
├── package-lock.json         # Ikut di-commit (mengunci versi paket)
├── .gitignore                # node_modules/, dist/, .env, .DS_Store
└── README.md                 # Dokumentasi worksheet
```

---

## 🛠️ Langkah Pengerjaan (Lembar A–F)

### **Lembar A: Memeriksa Perkakas Sebelum Bekerja**

1. **Versi perkakas**:

   | Perintah | Versi yang muncul | Catatan |
   | :--- | :--- | :--- |
   | `node -v` | `v24.21.0` | Berjalan; versi LTS. |
   | `npm -v` | `11.19.0` | Berjalan. |

2. **Berkas Pertemuan 11 yang harus ada**:

   | Berkas | Ada? | Jumlah baris |
   | :--- | :---: | :---: |
   | `profil.html` | Ada | 174 |
   | Enam berkas CSS (P04–P06) | Ada | 477 |
   | `js/app.js`, `js/dom.js` | Ada | 84 |
   | `js/data.js`, `js/state.js`, `js/events.js` | Ada | 121 |
   | `js/api.js` (Pertemuan 10) | Ada | 13 |

3. **Folder kerja**:

   | Yang diperiksa | Hasil yang saya dapat |
   | :--- | :--- |
   | Folder `worksheet-p12/` | Ada di dalam `~/pabw`, masih kosong |
   | `node_modules/` di `worksheet-p11/` | Tidak ada |
   | Berkas P11 sudah di-commit | Sudah (`git status` bersih) |
   | Nomor port `npm run dev` | 3000 (tercatat saat pemeriksaan awal); pada pengujian Lembar B tercatat `http://localhost:5173/` |

   **Commit yang disarankan**: `P12 — perkakas diperiksa, versi dicatat`

---

### **Lembar B: Membuat Proyek Baru di Folder Baru**

1. **Enam baris perintah, berurutan** (titik pada `npm create vite@latest .` berarti "buat di folder ini"):
   ```bash
   cd ~/pabw
   mkdir worksheet-p12
   cd worksheet-p12

   npm create vite@latest . -- --template vue
   npm install
   npm run dev
   ```

2. **Bila pertanyaan pemasangan muncul** (hanya jika folder tidak kosong):

   | Pilihan di layar | Yang saya pilih |
   | :--- | :--- |
   | `Cancel operation` | **Dipilih**, tidak ada berkas yang disentuh |
   | `Remove existing files and continue` | Jangan: pekerjaan P11 bisa hilang |
   | `Ignore files and continue` | Jangan: berkas P11 bisa tertimpa |

3. **`.gitignore` ditulis sebelum commit pertama**:
   ```text
   node_modules/
   dist/
   .env
   .DS_Store
   ```
   `package.json` dan `package-lock.json` **tidak** diabaikan; `package-lock.json` justru disimpan karena mengunci versi tepat seluruh paket.

4. **Hasil setelah `npm run dev`**:

   | Yang diperiksa | Hasil yang saya dapat |
   | :--- | :--- |
   | Halaman terbuka | Halaman contoh Vue tampil |
   | Alamat di terminal | `http://localhost:5173/` |
   | Console | Bersih |
   | Folder `node_modules/` | Ada di dalam `worksheet-p12/` |
   | Git status | Bersih (`node_modules/` dan `dist/` tidak terdaftar) |

   **Commit yang disarankan**: `P12 — kerangka Vue di folder kosong`

---

### **Lembar C: Memindahkan Aset Pertemuan 11**

1. **Apa yang berpindah, dan ke mana**:

   | Berkas P11 | Tujuan di proyek Vue | Yang diubah |
   | :--- | :--- | :--- |
   | `profil.html` | `index.html` | Hanya `<div id="app">` dan satu `<script type="module" src="/src/main.js">`; isi `<body>` pindah ke komponen |
   | Enam berkas CSS | `src/` | Isinya tidak disentuh sama sekali |
   | `js/app.js`, `js/dom.js` | Tidak ikut | Digantikan `<template>`; `muat()`, `simpan()`, `aturUlang()` pindah ke `src/simpanan.js` |
   | `js/data.js` | `src/data.js` | Isi tetap; ditambah `id` unik untuk `:key` |
   | `js/state.js`, `js/events.js` | `src/` | `state.js` dipakai di Lembar E; `events.js` menjadi `@click` dan `@submit` di Lembar D |
   | `js/api.js` (P10) | `src/api.js` | Isinya tidak diubah; `fetch` tetap hanya di dalamnya |

2. **Enam impor CSS di `main.js`** (urutan sama seperti aslinya: tokens, base, layout, komponen, tema, responsif):
   ```javascript
   // src/main.js
   import { createApp } from 'vue'
   import App from './App.vue'

   import './tokens.css'
   import './base.css'
   import './layout.css'
   import './komponen.css'
   import './tema.css'
   import './responsif.css'

   createApp(App).mount('#app')
   ```

3. **`App.vue` sementara** (agar tidak menunjuk `HelloWorld.vue` yang sudah dihapus):
   ```html
   <template>
     <h1>Halaman Anda</h1>
     <p>Bagian halaman dipindahkan di lembar D.</p>
   </template>
   ```

4. **Letak berkas berdasarkan bentuknya**:

   | Bentuk berkas | Letaknya |
   | :--- | :--- |
   | Kode JavaScript yang diimpor | `src/` |
   | Berkas `.json` statis | `public/` |
   | Gambar yang dipakai di CSS | `public/` |
   | Gambar yang diimpor kode | `src/assets/` |

5. **Hasil pemeriksaan**:

   | Yang diperiksa | Hasil yang saya dapat |
   | :--- | :--- |
   | Baris `<link>` di `index.html` | Tidak ada lagi |
   | Enam berkas CSS | Ada di `src/` dan diimpor di `main.js` |
   | Tampilan halaman | Sama seperti P11 |
   | Console | Bersih, tidak ada 404 berkas CSS |
   | Berkas contoh Vue | `HelloWorld.vue` dan isinya sudah dihapus |
   | Data | Ada di `src/data.js` |
   | Tampilan diubah? | Tidak; token dan CSS P04–P06 apa adanya |

   **Commit yang disarankan**: `P12 — aset P11 dipindahkan apa adanya`

---

### **Lembar D: Memecah Halaman Menjadi Empat Komponen**

1. **Empat langkah, satu komponen setiap langkah** (diperiksa tiap langkah): `KepalaProfil.vue` → `TombolFilter.vue` → `DaftarProyek.vue` → `FormKontak.vue`.

2. **Empat komponen dan tanggung jawabnya**:

   | Komponen | Bagian halaman yang dipindahkan | Data yang dipakainya |
   | :--- | :--- | :--- |
   | `KepalaProfil.vue` | Bagian identitas di atas halaman | *props* `profil` dari `App.vue` |
   | `TombolFilter.vue` | Deretan tombol kategori | State bersama |
   | `DaftarProyek.vue` | Daftar kartu proyek | State bersama |
   | `FormKontak.vue` | Formulir kontak | `ref` lokal di komponennya (isi form) |

3. **Padanan dari P08–P11 ke Vue**:

   | Yang ditulis di P08–P11 | Bentuknya di Vue |
   | :--- | :--- |
   | `daftarProyek.map(...)` lalu ditempel | `v-for="proyek in state.daftarProyek"` |
   | Filter saat tombol diklik | `v-if` atau daftar terhitung |
   | `textContent = nilai` | `{{ nilai }}` |
   | `setAttribute("src", ...)` | `:src="..."` |
   | `addEventListener("click", ...)` | `@click="..."` |
   | Membaca `input.value` | `v-model="..."` |
   | Wajib `:key` berisi id unik | `v-for="proyek in state.daftarProyek" :key="proyek.id"` (id ditambahkan di `src/data.js`) |

4. **Data dari induk ke anak lewat props** (hanya `KepalaProfil`):
   ```html
   <!-- src/components/KepalaProfil.vue -->
   <script setup>
   const props = defineProps({
     profil: { type: Object, required: true },
   })
   </script>
   <template>
     <h1>{{ props.profil.nama }}</h1>
     <p>{{ props.profil.peran }}</p>
   </template>
   ```
   ```javascript
   // src/App.vue
   import KepalaProfil from './components/KepalaProfil.vue'
   import TombolFilter from './components/TombolFilter.vue'
   import DaftarProyek from './components/DaftarProyek.vue'
   import FormKontak from './components/FormKontak.vue'
   ```
   ```html
   <KepalaProfil :profil="identitas" />
   <TombolFilter /> <DaftarProyek /> <FormKontak />
   ```

5. **Hasil pemeriksaan**:

   | Yang diperiksa | Hasil yang saya dapat |
   | :--- | :--- |
   | Empat komponen | Ada 4 berkas: `KepalaProfil.vue`, `TombolFilter.vue`, `DaftarProyek.vue`, `FormKontak.vue` |
   | props `KepalaProfil` | Terisi lewat `:profil="identitas"` dari `App.vue` dan diterima lewat `defineProps` |
   | props diubah dari anak? | Tidak; props hanya dibaca di dalam template |
   | Nama berkas dan impor | Ditulis persis sama, termasuk huruf besar-kecil |
   | Console | Bersih, tanpa peringatan props |

6. **Pohon komponen yang disusun**:

   | Komponen | Dipakai di | Menerima props? |
   | :--- | :--- | :--- |
   | `KepalaProfil.vue` | `App.vue` | Ya (`:profil="identitas"`) |
   | `TombolFilter.vue` | `App.vue` | Tidak (state bersama dari `state.js`) |
   | `DaftarProyek.vue` | `App.vue` | Tidak (state bersama dari `state.js`) |
   | `FormKontak.vue` | `App.vue` | Tidak (state lokal `ref`) |

---

### **Lembar E: Menyambungkan Kembali Keadaan dan Simpanannya**

1. **Tiga langkah, satu berkas setiap langkah**: `src/state.js` → `src/simpanan.js` → `App.vue`.

2. **`render(state)` menjadi state reaktif**:

   | Pertemuan 11 | Pertemuan 12 | Catatan |
   | :--- | :--- | :--- |
   | `const state = { ... }` | `const state = reactive({ ... })` | Paling mirip objek state P11 |
   | `pilihKategori()` memanggil `render()` | `pilihKategori()` hanya mengubah state | Vue menggambar ulang bagian yang berubah |
   | `render(state)` ditulis sendiri | Tidak ada `render()` manual | `<template>` menggantikannya |
   | Nilai tunggal di variabel | `const pesan = ref('')` | Untuk nilai tunggal seperti isi form |
   | Hasil `ambilNotisia()` dari `js/api.js` | Dimasukkan ke state di `App.vue` | `api.js` tidak berubah sejak P10 |

   ```javascript
   // src/state.js
   import { reactive } from 'vue'
   import { daftarProyek } from './data.js'

   export const state = reactive({
     daftarProyek: daftarProyek,
     kategoriAktif: 'semua',
   })

   export function pilihKategori(nilai) {
     state.kategoriAktif = nilai // tanpa render()
   }
   ```

3. **`localStorage` P11 dipakai ulang lewat dua kait dan satu tombol** (`KUNCI` `"pabw-p11"` dan `VERSI` tidak diubah):
   ```javascript
   // src/App.vue
   import { onMounted, watch } from 'vue'
   import { state } from './state.js'
   import { muat, simpan, aturUlang } from './simpanan.js'

   onMounted(() => {
     const isi = muat() // VERSI diperiksa di dalam muat(); bentuk lama dibuang
     if (isi) state.kategoriAktif = isi.kategoriAktif
   })
   watch(state, (nilai) => simpan(nilai), { deep: true })

   function aturUlangPilihan() { // tombol atur ulang dari P11 lembar D.2
     aturUlang()
     state.kategoriAktif = 'semua'
     simpan(state)
   }
   ```

4. **Hasil pemeriksaan**:

   | Yang diperiksa | Hasil yang saya dapat |
   | :--- | :--- |
   | Ganti kategori | `state.kategoriAktif` berubah dan tampilan proyek langsung memperbarui otomatis |
   | Tutup tab, lalu buka lagi | Pilihan kategori terakhir tetap tersimpan dan otomatis aktif saat dimuat ulang |
   | `localStorage` di Console | Berupa teks JSON, bukan `[object Object]` (lihat bukti di bawah) |
   | `render(state)` lama | Sudah bersih, tidak digunakan di seluruh berkas proyek |
   | Tombol atur ulang | Kategori kembali ke `"semua"` |
   | Console | Bersih dari peringatan maupun galat reaktivitas/`watch` |

   **Bukti isi `localStorage`**:

   ![Isi localStorage berupa teks JSON](media/bukti-localstorage.png)

5. **Bila simpanan rusak**:

   | Yang ditulis di Console | Hasil yang saya dapat |
   | :--- | :--- |
   | `localStorage.setItem("pabw-p11", "bukan-json")` | Halaman tetap terbuka lancar; simpanan invalid langsung dibuang oleh `try...catch` dan kategori kembali ke nilai bawaan `"semua"` |
   | `npm run dev` dihentikan lalu dijalankan lagi | Pilihan kategori terakhir tetap tersimpan dan otomatis dimuat kembali |
   | `localStorage.clear()` | Halaman kembali memakai kategori bawaan `"semua"` secara bersih tanpa galat |

   **Commit yang disarankan**: `P12 — keadaan reaktif dan simpanan tersambung`

---

### **Lembar F: Membangun dan Mencoba Hasil Build**

1. **Dua perintah yang berbeda gunanya**:
   ```bash
   npm run build     # menghasilkan folder dist/
   npm run preview   # menjalankan isi dist/
   ```

   | Perintah | Yang dijalankan | Kapan dipakai |
   | :--- | :--- | :--- |
   | `npm run dev` | Sumber apa adanya, dengan pemuatan ulang otomatis | Selama mengerjakan |
   | `npm run build` | Menggabungkan dan memperkecil sumber menjadi `dist/` | Sesudah pekerjaan selesai |
   | `npm run preview` | Menjalankan isi `dist/` seperti situs sungguhan | Memastikan hasil build benar |

2. **Hasil build saya**:

   | Yang diperiksa | Hasil yang saya dapat |
   | :--- | :--- |
   | Folder `dist/` terbentuk | Terbentuk otomatis di direktori utama setelah `npm run build` ![dist](media/bukti-folder-dist.png) |
   | `dist/index.html` ada | ![dist/index.html](media/bukti-dist-index.png) |
   | `dist/assets/` berisi `.js` dan `.css` | ![dist/assets](media/bukti-dist-assets.png) |
   | Nama berkas di `dist/assets/` memuat huruf dan angka acak | Iya |
   | Halaman jalan lewat `npm run preview` | Terbuka lancar di `http://localhost:4173` dan semua fitur berfungsi normal |
   | Console bersih saat preview dibuka | Lihat tangkapan layar di bawah |

   ![Halaman berjalan dari npm run preview dengan Console bersih](media/bukti-preview-console.png)

3. **Ukuran sebelum dan sesudah build**:

   | Yang diukur | Sebelum build | Sesudah build |
   | :--- | :---: | :---: |
   | Ukuran seluruh berkas yang dikirim | 2,027 kB (2.02 MB) | 532 kB |
   | Jumlah berkas yang dikirim peramban | 23 requests | 4 requests |
   | Cara mengukur | DevTools → tab Network, muat ulang | DevTools → tab Network, muat ulang |

4. **Tiga kasus sulit**:

   | Kasus | Gejala | Yang dilakukan |
   | :--- | :--- | :--- |
   | Nama berkas berbeda huruf besar-kecil | Jalan di Windows, gagal di Linux/CI | Samakan huruf besar-kecil nama berkas dan nama impor |
   | `dist/` ter-commit | Riwayat penuh berkas hasil build ber-hash | `git rm -r --cached dist/`, lalu abaikan lewat `.gitignore` |
   | Gambar tidak muncul | Gambar ada, tetapi alamatnya salah | `public/` dibaca lewat `/nama.png`; `src/assets/` diimpor kode |

5. **Yang sengaja tidak saya commit**:

   | Yang tidak di-commit | Alasan saya |
   | :--- | :--- |
   | `dist/` | Hasil build dibuat ulang kapan saja dengan `npm run build` |
   | `node_modules/` | Isinya ribuan berkas dan bisa dipasang ulang dengan `npm install` |

   **Commit yang disarankan**: `P12 — build produksi berhasil`

---

## 📝 Tiket Keluar & Penutup (Lembar G)

1. **Apa bedanya `dependencies` dan `devDependencies`? Sebutkan satu contoh untuk masing-masing dari proyek Anda.**
   - `dependencies` adalah pustaka yang dibutuhkan aplikasi agar dapat berjalan di lingkungan produksi (saat diakses pengguna), sedangkan `devDependencies` hanya digunakan selama proses pengembangan dan pembuatan berkas (*build*).
   - **Contoh dari proyek**: `vue` (`dependencies`) dan `vite` (`devDependencies`).

2. **Mengapa `package-lock.json` wajib disimpan di repositori, sedangkan `node_modules/` tidak?**
   - `package-lock.json` wajib disimpan karena mencatat versi spesifik dan dependensi persis agar aplikasi berjalan konsisten di semua komputer anggota tim/server.
   - `node_modules/` tidak disimpan karena ukurannya sangat besar (berisi ribuan berkas terinstal) dan dapat dipasang ulang secara otomatis menggunakan perintah `npm install`.

3. **Apa yang dilakukan perintah `npm create vite@latest . -- --template vue`? Apa arti titik pada perintah itu?**
   - **Yang dilakukan**: Membuat proyek aplikasi web baru menggunakan skrip pembuat dari Vite versi terbaru dengan templat struktur awal berbasis Vue.js.
   - **Arti titik (`.`)**: Menentukan direktori tujuan instalasi, yaitu folder saat ini tempat perintah dijalankan (tanpa membuat folder baru di luarnya).

4. **Di Pertemuan 11 Anda memanggil `render(state)` sendiri. Apa yang menggantikannya di Vue, dan siapa yang memanggilnya sekarang?**
   - **Yang menggantikan**: Sistem reaktivitas Vue (seperti `reactive()` dan `ref()`) serta *Virtual DOM/template rendering*.
   - **Yang memanggilnya sekarang**: Dikelola dan dipanggil secara otomatis oleh *framework* Vue sendiri ketika terjadi perubahan data pada *state*.

5. **Mengapa props tidak boleh diubah dari dalam komponen anak?**
   - Karena Vue menganut aliran data satu arah (*one-way data flow*). Mengubah *props* secara langsung di komponen anak dapat merusak struktur data dari induk, memicu perilaku yang tidak terprediksi, dan menimbulkan peringatan galat di Console.

6. **Apa bedanya `npm run dev` dan `npm run preview`? Kapan Anda memakai masing-masing?**
   - **Bedanya**: `npm run dev` menjalankan server pengembangan langsung dari kode sumber dengan pemuatan ulang otomatis (*Hot Module Replacement*), sedangkan `npm run preview` menjalankan server lokal khusus untuk menguji hasil akhir berkas *build* di dalam folder `dist/`.
   - **Waktu penggunaan**: `npm run dev` dipakai saat aktif mengoding; `npm run preview` dipakai setelah `npm run build` untuk memastikan hasil rilis tidak galat sebelum diunggah ke produksi.

7. **Mengapa `dist/` diabaikan sedangkan hasilnya justru yang dijalankan peramban di produksi?**
   - Folder `dist/` diabaikan dari repositori Git karena merupakan berkas hasil olahan (*generated output*) yang dapat dibuat ulang kapan saja menggunakan `npm run build`. Repositori cukup menyimpan kode sumber utama agar riwayat perubahan tetap bersih.

### G.1 Periksa Satu per Satu

- [x] **Perkakas**: `node -v` dan `npm -v` menjawab; versinya tercatat di README.
- [x] **Proyek**: `worksheet-p12/` dibuat dari folder kosong; `npm run dev` membuka halaman tanpa galat.
- [x] **Pemindahan**: Halaman tampil sama seperti P11; token dan CSS P04–P06 tidak diubah.
- [x] **Komponen**: Empat komponen tersusun; `KepalaProfil` menerima props `profil`; nama berkas dan impor ditulis sama.
- [x] **Keadaan**: State memakai `reactive()`; tidak ada `render(state)` manual lagi.
- [x] **Simpanan**: `onMounted` memuat dan `watch` menyimpan; pilihan terakhir bertahan setelah tab ditutup; tombol atur ulang mengembalikan nilai bawaan.
- [x] **Build**: `npm run build` menghasilkan `dist/`; `npm run preview` menjalankannya; dua ukuran sudah dibandingkan.
- [x] **Git**: `.gitignore` memuat `node_modules/` dan `dist/`; `package-lock.json` ikut di-commit; lebih dari satu commit.
- [x] **Deklarasi AI**: README menyebutkan bagian mana yang dibantu AI dan bagian mana yang dikerjakan sendiri.
- [x] **Lapisan data**: `js/api.js` dari Pertemuan 10 ikut pindah, isinya tidak diubah, dan `fetch` hanya ada di dalamnya.

### G.2 Satu Baris untuk Diingat

> *Cukup ubah nilai state reaktif secara langsung dan biarkan Vue yang menggambar ulang tampilan tanpa perlu memanggil fungsi render manual.*

### G.4 Catatan untuk Pengampu

- **Bagian tersulit hari ini**: Melakukan *refactoring* state dan pemisahan logika `localStorage` ke berkas `simpanan.js` tanpa merusak reaktivitas Vue, serta menangani galat impor fungsi saat pembagian komponen.
- **Yang ingin dibahas di kelas berikutnya**: Praktik terbaik (*best practice*) pengelolaan state yang lebih kompleks pada Vue.js (seperti Pinia) serta penanganan alur rilis/build untuk aplikasi berskala besar.
- **Kendala perkakas**: Sempat muncul peringatan galat 404 `favicon.ico` di Console saat menjalankan `npm run preview` dan sedikit penyesuaian port lokal Vite saat pengujian.
- **Tanggal**: 20-10-2026 · **Jam selesai**: 9:50 WIB

**Commit yang disarankan**: `P12 — periksa, lalu simpan`

### Catatan Pengingat

> *Pertemuan 13 adalah Ujian CPMK Blok 2 (DOM, event, dan API JSON, seluruhnya vanilla). Pertemuan 14 melanjutkan dari folder `dist/` yang dihasilkan hari ini, jadi simpan proyek ini rapi di repositori.*

---

## 📊 Penilaian Mandiri

| Bagian | Bobot | Nilai Mandiri | Bukti Implementasi / Berkas |
| :--- | :---: | :---: | :--- |
| **Proyek Vue Berjalan** | **20** | 20 | Proyek dibuat dari folder kosong; `npm run dev` membuka halaman dengan Console bersih; berkas contoh Vite sudah dihapus. |
| **Pemindahan Tanpa Mengubah Perilaku** | **25** | 25 | Enam CSS P04–P06 diimpor apa adanya di `src/main.js`; tampilan sama seperti P11; `src/api.js` ikut dipindahkan tanpa perubahan. |
| **Pemecahan Komponen dan Props** | **20** | 20 | Empat komponen di `src/components/`; `KepalaProfil.vue` menerima `defineProps({ profil })` dan hanya membacanya; penamaan konsisten. |
| **Build Produksi dan Preview** | **25** | 25 | `npm run build` menghasilkan `dist/`; `npm run preview` berjalan di port 4173; ukuran dibandingkan (2,027 kB → 532 kB; 23 → 4 requests). |
| **Kebersihan, `.gitignore`, Deklarasi AI, & Bukti** | **10** | 10 | `src/` rapi tanpa berkas contoh; `node_modules/` dan `dist/` diabaikan; `package-lock.json` di-commit; deklarasi AI terisi; lebih dari satu commit. |
| **TOTAL** | **100** | **100** | |

---

## 🤖 Deklarasi Penggunaan AI

Sesuai dengan ketentuan pengerjaan karya ilmiah dan akademis:
- **Penggunaan AI**: AI digunakan untuk membantu menyusun dokumentasi `README.md` dan memverifikasi kesesuaian jawaban lembar kerja dengan aturan *Worksheet P12*.
- **Pengerjaan Kode & Logika**: Pemindahan aset P11 ke proyek Vue + Vite, pemecahan empat komponen beserta props, state reaktif (`reactive()`), penyimpanan `localStorage` lewat `onMounted` dan `watch`, build produksi (`npm run build` dan `npm run preview`), serta pengujian di DevTools dikerjakan mandiri oleh **Firstly Javierrazel Hermawan (25523158)**.
