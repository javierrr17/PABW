# Worksheet P11: Modul, State, dan Penyimpanan Klien (SIF302)

Proyek ini merupakan pengembangan lanjutan dari Pertemuan 9 pada mata kuliah **Pengembangan Aplikasi Berbasis Web (SIF302)**. Proyek ini bertujuan memecah satu berkas JavaScript menjadi lima modul dengan satu tanggung jawab masing-masing, memisahkan keadaan aplikasi (*state*) dari tampilan (DOM), serta menyimpan pilihan pengguna di `localStorage` sehingga halaman dapat mengingat pilihan terakhir, termasuk saat simpanan rusak atau berbeda versi.

---

## 📑 Daftar Isi

- [Identitas Mahasiswa](#-identitas-mahasiswa)
- [Capaian Pembelajaran & Aturan Pengerjaan](#-capaian-pembelajaran--aturan-pengerjaan)
- [Struktur Berkas](#-struktur-berkas)
- [Langkah Pengerjaan (Lembar A–E)](#-langkah-pengerjaan-lembar-a-e)
- [Tiket Keluar & Penutup (Lembar F)](#-tiket-keluar--penutup-lembar-f)
- [Penilaian Mandiri](#-penilaian-mandiri)
- [Deklarasi Penggunaan AI](#-deklarasi-penggunaan-ai)

---

## 👤 Identitas Mahasiswa

- **Nama**: Firstly Javierrazel Hermawan
- **NIM**: 25523158
- **Kelas**: E
- **Tanggal**: 14-10-2026

---

## 🎯 Capaian Pembelajaran & Aturan Pengerjaan

1. **Lima Modul Berjalan**: Lima modul tersusun dan berjalan tanpa galat impor.
2. **State Tunggal**: Seluruh keadaan aplikasi berada di satu objek `state`.
3. **Tampilan dari State**: Tampilan digambar dari `state` melalui `render(state)`, bukan disimpan di DOM.
4. **Pilihan Bertahan**: Pilihan terakhir tetap ada setelah halaman dimuat ulang atau tab ditutup.
5. **Simpanan Rusak Tertangani**: Simpanan yang rusak atau berbeda versi tidak membuat halaman gagal terbuka.

**Aturan pengerjaan**: individu; menggunakan VS Code dan peramban (Node.js belum dipakai); berkas awal berasal dari hasil Pertemuan 9 yang disalin ke folder `worksheet-p11/`; tidak ada fitur baru yang ditambahkan, hanya tempat penulisan kode yang berubah.

---

## 📁 Struktur Berkas

```text
worksheet-p11/
├── css/
│   ├── base.css          # Gaya dasar elemen global
│   ├── komponen.css      # Komponen UI (kartu, tombol, form, kelas .aktif)
│   ├── layout.css        # Tata letak kontainer & grid
│   ├── responsif.css     # Media queries & breakpoints
│   ├── tema.css          # Tema warna
│   └── tokens.css        # Design tokens
├── js/
│   ├── data.js           # Data mentah & fungsi murni pemformat
│   ├── state.js          # Objek state tunggal, fungsi pengubah, simpan/muat localStorage
│   ├── dom.js            # Seluruh sentuhan ke halaman: pemilih, render, kelas
│   ├── events.js         # Pemasangan seluruh pendengar peristiwa
│   ├── app.js            # Perakit: hanya import & pemanggilan awal
│   └── api.js            # (Dari Pertemuan 10) lapisan data masuk, diimpor apa adanya
├── media/                # Aset gambar & media
├── profil.html           # Berkas HTML utama (satu <script type="module" src="js/app.js">)
└── README.md             # Dokumentasi worksheet
```

---

## 🛠️ Langkah Pengerjaan (Lembar A–E)

### **Lembar A: Memeriksa Berkas & Menggambar Susunan Modul**

1. **Berkas awal dari Pertemuan 9** disalin ke `worksheet-p11/` dan seluruhnya ada: `profil.html`, enam berkas CSS, `js/app.js`, dan `js/dom.js`.

2. **Berkas tambahan dari Pertemuan 10**:

   | Nama berkas di `js/` | Namanya sama dengan yang akan dibuat hari ini? | Tindakan |
   | :--- | :---: | :--- |
   | `api.js` | Tidak | Dibiarkan dan diimpor apa adanya untuk lapisan *data fetching* API. |

3. **Jumlah baris yang menyentuh halaman** (memakai `querySelector`, `createElement`, `append`, `classList`, atau `textContent`):

   | Berkas | Jumlah baris seluruhnya | Baris yang menyentuh halaman |
   | :--- | :---: | :---: |
   | `js/app.js` | 59 | 6 |
   | `js/dom.js` | 82 | 13 |

4. **Susunan modul yang dibuat** (satu berkas, satu tanggung jawab):

   | Berkas | Tanggung jawab | Yang dipindah dari mana |
   | :--- | :--- | :--- |
   | `js/data.js` | Data mentah dan fungsi murni pemformat | `profil`, `buatPerkenalan`, `formatKeahlian`, dan `daftarProyek` dari `js/app.js` |
   | `js/state.js` | Objek state tunggal dan fungsi pengubahnya | Filter kategori dan logika status validasi dari `js/dom.js` |
   | `js/dom.js` | Seluruh sentuhan ke halaman: pemilih, render, kelas | Pemilih elemen, `buatKartu`, `render`, dan `validasiForm` dari `js/app.js` dan `js/dom.js` |
   | `js/events.js` | Pemasangan seluruh pendengar peristiwa | Listener filter (`click`) dan validasi form (`input`, `submit`) dari `js/dom.js` |
   | `js/app.js` | Perakit: mengimpor semuanya dan menjalankan aplikasi | Pemanggilan `tampilkan()`, `render(daftarProyek)`, dan inisialisasi awal |

---

### **Lembar B: Memecah Berkas & Menyambungkannya Kembali**

1. **Aturan `export` / `import`**: jalur relatif wajib diawali `./` dan diakhiri `.js` karena peramban tidak menambahkan akhiran sendiri.

   | Bentuk | Ditulis di berkas asal | Diimpor dengan |
   | :--- | :--- | :--- |
   | Named export | `export const daftarProyek = ...` | `import { daftarProyek } from './data.js'` |
   | Named function | `export function formatTanggal() {}` | `import { formatTanggal } from './data.js'` |
   | Default export | `export default state` | `import state from './state.js'` |
   | Tidak diekspor | `const bantu = ...` | Tidak bisa diimpor berkas lain |

2. **Satu baris pemanggil di `profil.html`** (dua baris `<script>` dari P9 menjadi satu):
   ```html
   <script type="module" src="js/app.js"></script>
   ```

3. **Urutan pemecahan** (Console diperiksa setelah setiap langkah): `data.js` → `state.js` → `events.js` → `dom.js` → `app.js`.

4. **Hasil pemeriksaan pemecahan**:

   | Yang diperiksa | Hasil |
   | :--- | :--- |
   | Console | Bersih, tidak ada galat. |
   | Perilaku halaman | Sama persis seperti akhir Pertemuan 9, tanpa kendala. |
   | Isi `app.js` | Hanya `import` dan 2 pemanggilan awal. |
   | Jumlah modul | 5 berkas wajib: `data.js`, `state.js`, `dom.js`, `events.js`, `app.js` (`api.js` dihitung terpisah). |
   | Jalur import | Seluruhnya berawalan `./` dan berakhiran `.js`. |

---

### **Lembar C: Memindahkan Keadaan Keluar dari Halaman**

1. **Mengapa keadaan di DOM akhirnya kacau**: saat daftar digambar ulang, elemen lama dibuang dan elemen baru belum membawa keadaan apa pun, sehingga halaman "lupa".

   | Keadaan menempel di DOM | Keadaan di satu objek |
   | :--- | :--- |
   | Dibaca dari kelas aktif: `document.querySelector(".aktif")` | Dibaca dari `state.kategoriAktif` |
   | Hilang setiap wadah digambar ulang | Bertahan karena tidak berada di halaman |
   | Bisa berbeda dari tampilan yang terlihat | Satu-satunya sumber, tanpa salinan kedua |
   | Sulit diuji karena butuh halaman | Cukup diperiksa dengan `console.log(state)` |

2. **`render(state)` (tiga pekerjaan tetap: kosongkan, periksa kosong, isi ulang)**:
   ```javascript
   function render(state) {
     wadah.textContent = "";                    // 1. kosongkan
     const tampil = saring(state);              // dari state, bukan argumen

     if (tampil.length === 0) {                 // 2. keadaan kosong
       kosong.hidden = false;
       return;
     }
     kosong.hidden = true;

     tampil.forEach((item) => wadah.append(buatKartu(item)));   // 3. isi ulang
   }
   ```

3. **Fungsi pengubah**: setiap perubahan keadaan ditulis sebagai fungsi bernama di `state.js` (misalnya `pilihKategori`, `aturUlang`), dan fungsi itulah yang memanggil `render`. `events.js` tidak boleh mengubah `state` secara langsung.

4. **Hasil pemeriksaan**:

   | Yang diperiksa | Hasil |
   | :--- | :--- |
   | Ganti kategori | `pilihKategori("web")` mengubah `state.kategoriAktif` menjadi `'web'` dan memperbarui tampilan. |
   | `console.log(state)` | Menampilkan objek utuh berisi array `daftarProyek` dan string `kategoriAktif`. |
   | Cari di berkas | Tidak ditemukan `.aktif` atau `dataset.kategori` sebagai pembacaan keadaan di berkas JS. |
   | Gambar ulang | Memanggil `render(state)` berulang kali tidak membuat tampilan berlipat ganda atau ter-reset. |

---

### **Lembar D: Halaman yang Mengingat Pilihan**

1. **Simpan, muat, dan atur ulang dengan `localStorage` + JSON**:
   ```javascript
   const KUNCI = "pabw-p11";
   const VERSI = 2;

   export function simpan(state) {
     const isi = { versi: VERSI, kategoriAktif: state.kategoriAktif };
     localStorage.setItem(KUNCI, JSON.stringify(isi));
   }

   export function aturUlang() { localStorage.removeItem(KUNCI); }
   ```
   Sebuah tombol **Atur Ulang** ditambahkan di halaman, dengan satu pendengar klik yang memanggil `aturUlang()` lalu menggambar ulang halaman.

2. **Nilai bawaan pada kunjungan pertama** (`getItem` mengembalikan `null`, bukan galat):

   | Keadaan | Nilai bawaan | Alasan |
   | :--- | :--- | :--- |
   | Kategori aktif | `"semua"` | Pengguna baru melihat seluruh daftar proyek tanpa ada yang terfilter. |
   | Urutan tampilan | Sesuai urutan data awal / kronologis | Proyek tersaji sistematis dan konsisten saat pertama dimuat. |

3. **Batas penyimpanan klien**: hanya teks (selalu lewat JSON), sekitar 5 MB per alamat, sinkron dan menghambat, tidak terenkripsi, serta terikat alamat (simpanan hilang bila nomor port server lokal berubah).

4. **Yang disimpan dan yang sengaja tidak**:

   | Keadaan | Disimpan? | Alasan |
   | :--- | :---: | :--- |
   | Kategori aktif | Ya | Preferensi navigasi ringan yang meningkatkan kenyamanan; pilihan filter tetap bertahan saat halaman dibuka kembali. |
   | Kata kunci pencarian | Tidak | Bersifat sementara, cepat berubah, dan tidak perlu dipertahankan setelah sesi selesai. |
   | Token atau data pribadi | Tidak | `localStorage` tidak terenkripsi sehingga berisiko tinggi terhadap keamanan. |

5. **Pengujian**: ubah kategori → tutup tab sepenuhnya → buka kembali → pilihan terakhir masih ada.

---

### **Lembar E: Simpanan yang Rusak & Jalan Pulangnya**

1. **Tiga kasus kegagalan dan penanganannya**:

   | Kasus | Artinya | Penanganan |
   | :--- | :--- | :--- |
   | Simpanan rusak atau `null` | Isinya bukan JSON sah sehingga `JSON.parse` melempar galat | Bungkus dengan `try/catch`; bila gagal, buang simpanan dan pakai nilai bawaan. |
   | Versi skema lama | Bentuk isi berubah sehingga properti yang dicari tidak ada | Sertakan nomor versi; bila berbeda, buang dan mulai dari nilai bawaan. |
   | Data yang tergoda disimpan | Token/data pribadi ikut tersimpan | Simpan hanya pilihan tampilan dan catat apa yang sengaja tidak disimpan. |

2. **Fungsi `muat()` final** (menggantikan versi di Lembar D, bukan fungsi kedua):
   ```javascript
   export function muat() {
     try {
       const isi = JSON.parse(localStorage.getItem(KUNCI));
       if (isi?.versi !== VERSI) {
         localStorage.removeItem(KUNCI);   // bentuk lama: buang
         return null;
       }
       return isi;
     } catch {
       localStorage.removeItem(KUNCI);     // isi rusak: buang
       return null;
     }
   }
   ```

3. **Uji kerusakan sendiri lewat Console**:

   | Perintah di Console | Hasil |
   | :--- | :--- |
   | `localStorage.setItem("pabw-p11", "bukan-json")` | Berhasil: `try...catch` menangkap galat `JSON.parse`, menghapus data rusak, dan mengembalikan `null` tanpa galat merah. |
   | `localStorage.setItem("pabw-p11", "{}")` | Pemeriksaan `isi?.versi !== VERSI` mendeteksi skema lama, menghapus simpanan, dan mengembalikan `null`. |
   | `console.log(muat())` | Mencetak `null` dengan bersih; skrip tetap berjalan normal. |

4. **Catatan: apa yang sengaja tidak disimpan**

   | Yang tidak disimpan | Alasan |
   | :--- | :--- |
   | Token, kata sandi, dan data pribadi (NIM, email, pesan) | Tidak terenkripsi di peramban sehingga berisiko keamanan (XSS / kebocoran data). |
   | Daftar proyek utuh (`daftarProyek`) dan input teks sementara | Data proyek bersifat statis dan input bersifat sementara; menyimpannya hanya membuang kuota `localStorage` (~5 MB). |

---

## 📝 Tiket Keluar & Penutup (Lembar F)

1. **Sebutkan satu berkas yang Anda buat hari ini, tanggung jawabnya, dan dua berkas lain yang mengimpornya!**
   - **Berkas**: `state.js`
   - **Tanggung jawab**: Mengelola objek *state* terpusat (`kategoriAktif`), membaca/menyimpan ke `localStorage`, serta mereset data.
   - **Diimpor oleh**: `app.js` dan `events.js`.

2. **Mengapa jalur import wajib berawalan `./` dan berakhiran `.js`? Apa yang muncul di Console bila dilewatkan?**
   - ES Modules di peramban membutuhkan `./` untuk menandai jalur relatif lokal (agar tidak dianggap paket `node_modules`), dan ekstensi `.js` agar berkas ditemukan tepat di server web.
   - Bila dilewatkan, muncul `TypeError` atau `Failed to resolve module specifier` (404 Not Found).

3. **Sebelum hari ini, di mana keadaan kategori aktif disimpan? Mengapa akhirnya kacau saat daftar digambar ulang?**
   - Di elemen DOM (kelas CSS `.aktif` atau atribut `dataset.kategori`).
   - Saat `render()` menggambar ulang, elemen DOM lama dihapus sehingga status pilihan hilang dan kembali ke nilai awal.

4. **Apa yang harus dilakukan sebelum dipakai, ketika `getItem` mengembalikan `null` pada kunjungan pertama?**
   - Memeriksa keberadaan data (`if (data === null)`), lalu mengganti `null` dengan nilai bawaan seperti `"semua"` sebelum dimasukkan ke dalam *state*.

5. **Mengapa simpanan yang rusak harus tetap membuat halaman terbuka? Tuliskan cara menanganinya!**
   - **Alasan**: Agar aplikasi tetap tangguh (*resilient*) dan tidak *crash* atau menampilkan layar putih akibat data luar yang korup.
   - **Cara**: Bungkus `JSON.parse` dengan `try...catch` dan periksa `isi?.versi !== VERSI`; bila rusak atau beda versi, hapus dengan `localStorage.removeItem()` lalu kembalikan `null` agar nilai bawaan dipakai.

6. **Sebutkan satu hal yang bisa disimpan di `localStorage` dan satu yang tidak boleh. Jelaskan bedanya!**
   - **Boleh**: Preferensi tampilan ringan (seperti `kategoriAktif` atau tema).
   - **Tidak boleh**: Data sensitif/pribadi (kata sandi, token, NIM, pesan).
   - **Beda**: Preferensi tampilan tidak berisiko bila terbaca orang lain, sedangkan data sensitif di `localStorage` tidak terenkripsi sehingga rentan dicuri lewat serangan XSS.

### Satu Baris untuk Diingat

> *Selalu ingat untuk mendaftarkan fungsi ke `window` saat menguji modul, dan mengoper objek `state` utuh ke `render()`, bukan array mentahnya.*

### Pekerjaan Rumah Sebelum Pertemuan 12: Node.js LTS

| Perintah | Versi yang muncul | Catatan bila gagal |
| :--- | :--- | :--- |
| `node -v` | _(isi setelah pemasangan)_ | |
| `npm -v` | _(isi setelah pemasangan)_ | |

### Catatan Pengingat

> *Pecah berkas tanpa menambah fitur; `app.js` hanya merakit; ubah `state` hanya lewat fungsi pengubah di `state.js`; selalu bungkus `JSON.parse` dengan `try/catch` dan periksa nomor versi.*

---

## 📊 Penilaian Mandiri

| Bagian | Bobot | Nilai Mandiri | Bukti Implementasi / Berkas |
| :--- | :---: | :---: | :--- |
| **Pemecahan Modul dan Impor** | **25** | 25 | Fungsi terbagi bersih dalam ES Modules (`app.js`, `state.js`, `dom.js`, `events.js`, `data.js`) dengan jalur impor `./` dan ekstensi `.js`; satu entry point `<script type="module" src="js/app.js">` di `profil.html`. |
| **Pemisahan State dari Tampilan** | **25** | 25 | Objek `state` terisolasi di `state.js`; `render(state)` di `dom.js` tidak menyimpan status di DOM. |
| **Simpan dan Muat `localStorage`** | **25** | 25 | `kategoriAktif` tersimpan lewat `JSON.stringify` dan dimuat kembali saat aplikasi dibuka; teruji bertahan setelah tab ditutup total. |
| **Penanganan Simpanan Rusak** | **15** | 15 | `muat()` dibungkus `try/catch` dan memvalidasi `isi?.versi === VERSI`; simpanan rusak/lama dibuang (`removeItem`) lalu kembali ke nilai bawaan `null` tanpa *crash*. |
| **Kebersihan Kode, Deklarasi AI, & Bukti** | **10** | 10 | Kode bersih tanpa galat/peringatan Console, tanpa pendaftaran skrip ganda, pengujian Console (E.3) terverifikasi `null`; `README.md` dan riwayat commit Git. |
| **TOTAL** | **100** | **100** | |

---

## 🤖 Deklarasi Penggunaan AI

Sesuai dengan ketentuan pengerjaan karya ilmiah dan akademis:
- **Penggunaan AI**: AI digunakan untuk membantu menyusun dokumentasi `README.md` dan memverifikasi kesesuaian jawaban lembar kerja dengan aturan *Worksheet P11*.
- **Pengerjaan Kode & Logika**: Pemecahan lima modul, objek `state` dan fungsi pengubah, `render(state)`, penyimpanan `localStorage` (simpan/muat/atur ulang), penanganan simpanan rusak, serta pengujian di DevTools dikerjakan mandiri oleh **Firstly Javierrazel Hermawan (25523158)**.
