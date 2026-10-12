# Worksheet P9: DOM, Event, dan Interaktivitas (SIF302)

Proyek ini merupakan pengembangan lanjutan dari Pertemuan 8 pada mata kuliah **Pengembangan Aplikasi Berbasis Web (SIF302)**. Proyek ini bertujuan untuk menghubungkan data proyek JavaScript (`js/app.js`) ke antarmuka HTML (`profil.html`) secara dinamis menggunakan manipulasi DOM, menerapkan penanganan peristiwa (*event handling*) dengan pola *event delegation*, mengelola keadaan tampilan melalui fungsi `render()`, serta melakukan validasi formulir interaktif tanpa memuat ulang halaman (*page reload*).

---

## 📑 Daftar Isi

- [Identitas Mahasiswa](#-identitas-mahasiswa)
- [Capaian Pembelajaran & Aturan Pengerjaan](#-capaian-pembelajaran--aturan-pengerjaan)
- [Struktur Berkas](#-struktur-berkas)
- [Langkah Pengerjaan (Lembar A–E)](#-langkah-pengerjaan-lembar-a-e)
- [Pertanyaan Tiket Keluar (Lembar F)](#-pertanyaan-tiket-keluar-lembar-f)
- [Penilaian Mandiri](#-penilaian-mandiri)
- [Deklarasi Penggunaan AI](#-deklarasi-penggunaan-ai)

---

## 👤 Identitas Mahasiswa

- **Nama**: Firstly Javierrazel Hermawan
- **NIM**: 25523158
- **Kelas**: E
- **Tanggal**: 07-10-2026

---

## 🎯 Capaian Pembelajaran & Aturan Pengerjaan

1. **Halaman Bebas Galat**: Berjalan tanpa galat di Console dan tidak ada pemilih (*selector*) yang menghasilkan `null`.
2. **Render dari Data**: Daftar proyek disusun dan dirender dari array data `app.js` menggunakan `createElement` dan `textContent`, bukan ditulis tangan di HTML.
3. **Pengosongan Wadah**: Wadah dikosongkan lebih dahulu di baris pertama fungsi `render()` sebelum diisi ulang.
4. **Event Delegation**: Menggunakan satu pendengar peristiwa (*event listener*) di elemen induk untuk melayani seluruh tombol filter.
5. **Validasi Formulir**: Formulir tidak memuat ulang halaman dan menampilkan pesan galat spesifik per kolom.

---

## 📁 Struktur Berkas

```text
worksheet-p9/
├── css/
│   ├── base.css          # Gaya dasar elemen global
│   ├── komponen.css      # Komponen UI (kartu, tombol, form, kelas .aktif)
│   ├── layout.css        # Tata letak kontainer & grid
│   ├── responsif.css     # Media queries & breakpoints
│   ├── tema.css          # Tema warna
│   └── tokens.css        # Design tokens
├── js/
│   ├── app.js            # Data proyek dan modul utama (export)
│   └── dom.js            # (BERKAS BARU) Manipulasi DOM, filter, & validasi form (import)
├── media/                # Aset gambar & media
├── profil.html           # Berkas HTML utama
└── README.md             # Dokumentasi worksheet
```

---

## 🛠️ Langkah Pengerjaan (Lembar A–E)

### **Lembar A: Memilih Elemen di Halaman**
1. **Penyediaan Wadah di `profil.html`**:
   ```html
   <section>
     <h2>Proyek</h2>
     <div id="filter">
       <button data-kategori="semua" class="aktif">Semua</button>
       <button data-kategori="web">Web</button>
       <button data-kategori="data">Data</button>
     </div>
     <ul id="daftar"></ul>
     <p id="pesan-kosong" hidden>Tidak ada proyek pada kategori itu.</p>
   </section>
   ```
2. **Daftar Pemilih Elemen (`js/dom.js`)**:
   | Bagian Halaman | Pemilih yang Dipakai | Diisi Apa | Nama Variabel |
   | :--- | :--- | :--- | :--- |
   | Daftar proyek | `#daftar` | Kartu proyek (`<li>`) | `elDaftar` / `wadah` |
   | Baris tombol filter | `#filter` | Event listener filter | `elFilter` |
   | Pesan daftar kosong | `#pesan-kosong` | Pesan status kosong | `elPesanKosong` / `kosong` |
   | Form & input | `form` | Input data pengirim | `elForm` |

3. **Menghubungkan Skrip Modul**:
   ```html
     <script type="module" src="js/app.js"></script>
     <script type="module" src="js/dom.js"></script>
   </body>
   ```

---

### **Lembar B: Menyusun Elemen dari Data**
1. **Fungsi Pembuatan Elemen Aman (`textContent`)**:
   ```javascript
   import { daftarProyek } from "./app.js";

   const wadah = document.querySelector("#daftar");
   const kosong = document.querySelector("#pesan-kosong");

   function buatKartu(proyek) {
     const li = document.createElement("li");
     li.className = "kartu";
     li.textContent = proyek.judul; // Menghindari XSS
     return li;
   }
   ```
2. **Hasil Pemeriksaan Mandiri**:
   - Jumlah kartu sesuai dengan panjang `daftarProyek` (3 kartu tampil).
   - Judul kartu paling atas sesuai dengan data pertama.
   - Teks tampil murni sebagai teks biasa, bukan tag HTML yang terurai.

---

### **Lembar C: Event Delegation pada Tombol Filter**
1. **Memasang 1 Pendengar di Induk (`#filter`)**:
   ```javascript
   const barisFilter = document.querySelector("#filter");

   barisFilter.addEventListener("click", (event) => {
     const tombol = event.target.closest("button");
     if (!tombol) return;

     const kategori = tombol.dataset.kategori;
     const terpilih = daftarProyek.filter(
       (proyek) => kategori === "semua" || proyek.kategori === kategori
     );

     render(terpilih);
     tandaiTombolAktif(tombol);
   });
   ```
2. **Menandai Tombol Aktif**:
   ```javascript
   function tandaiTombolAktif(tombolAktif) {
     document.querySelectorAll("#filter button").forEach((tombol) => {
       tombol.classList.toggle("aktif", tombol === tombolAktif);
     });
   }
   ```

---

### **Lembar D: Pola Render & Validasi Form**
1. **Fungsi Render Terpusat**:
   ```javascript
   function render(daftar) {
     wadah.textContent = ""; // 1. Kosongkan wadah lebih dahulu
     if (daftar.length === 0) { // 2. Periksa keadaan kosong
       kosong.hidden = false;
       return;
     }
     kosong.hidden = true;
     daftar.forEach((proyek) => wadah.append(buatKartu(proyek))); // 3. Isi ulang
   }
   ```
2. **Validasi Formulir Interaktif**:
   ```javascript
   const elForm = document.querySelector("form");

   elForm.addEventListener("submit", (event) => {
     event.preventDefault(); // Mencegah reload halaman
     // Logika validasi input & pesan galat per kolom
   });
   ```

---

### **Lembar E: Penanganan Kasus & Membaca Gejala Error**

| Gejala yang Ditemui | Penyebab Utama | Tindakan & Baris Perbaikan |
| :--- | :--- | :--- |
| Error `Cannot read properties of null` pada `querySelector` | Nama `id` (`#daftar` / `#filter`) di JavaScript tidak cocok dengan elemen HTML. | Mengubah nama pemilih di `js/dom.js` agar sama persis hurufnya dengan `id` di `profil.html`. |
| Kartu proyek bertumpuk/berlipat saat filter diklik | Wadah proyek tidak dikosongkan terlebih dahulu sebelum memasukkan data baru. | Menambahkan `wadah.textContent = ""` di baris pertama dalam fungsi `render()`. |
| Halaman *reload* otomatis saat tombol Kirim ditekan | Perilaku bawaan pengiriman *form* belum dihentikan. | Menambahkan `event.preventDefault()` pada baris pertama *handler submit* di `js/dom.js`. |

---

## 📝 Pertanyaan Tiket Keluar (Lembar F)

1. **Sebutkan satu elemen di halaman Anda, pemilih yang Anda pakai, dan nama variabelnya!**
   - **Elemen**: Wadah daftar proyek (`<ul id="daftar">`)
   - **Pemilih**: `#daftar`
   - **Nama Variabel**: `wadah` (atau `elDaftar`)

2. **Apa bedanya `querySelector` dan `querySelectorAll`? Mengapa `map` tidak bisa langsung dipakai pada hasil `querySelectorAll`?**
   - `querySelector` mengembalikan satu elemen pertama yang cocok, sedangkan `querySelectorAll` mengembalikan seluruh elemen yang cocok dalam bentuk `NodeList`.
   - `NodeList` bukan merupakan Array biasa sehingga tidak memiliki metode `.map()` bawaan. `NodeList` harus diubah dahulu menjadi Array menggunakan `Array.from()`.

3. **Apa keuntungan memasang pendengar di induk (event delegation)?**
   - **Keuntungan**: Efisiensi memori; pendengar dipasang sekali saja di elemen induk dan tetap dapat melayani interaksi pada elemen anak yang dibuat secara dinamis.
   - **Bukti Kode**:
     ```javascript
     barisFilter.addEventListener("click", (event) => {
       const tombol = event.target.closest("button");
       if (!tombol) return;
       ...
     });
     ```

4. **Apa yang terjadi bila baris pengosongan wadah dihapus dari fungsi `render`?**
   - Setiap kali tombol filter diklik, kartu proyek baru akan terus ditambahkan ke bawah kartu lama tanpa menghapus kartu sebelumnya, sehingga daftar proyek bertumpuk dan berlipat ganda.

5. **Mengapa input pengguna tidak boleh dimasukkan dengan `innerHTML`? Tuliskan cara gantinya!**
   - Rentan terhadap serangan keamanan **XSS (Cross-Site Scripting)**, karena peramban akan mengeksekusi teks input pengguna sebagai kode HTML/JS.
   - **Solusi**: Gunakan properti `textContent` (contoh: `li.textContent = proyek.judul`), yang memperlakukan seluruh isi murni sebagai teks biasa.

> **Catatan Pengingat**: *Selalu pastikan wadah dikosongkan (`wadah.textContent = ''`) di awal fungsi `render()`, pasang pendengar event di induk (bukan di dalam `render`), dan cocokkan ID/kelas huruf per huruf agar tidak bernilai `null`.*

---

## 📊 Penilaian Mandiri

| Bagian | Bobot | Nilai Mandiri | Bukti Implementasi / Berkas |
| :--- | :---: | :---: | :--- |
| **Pemilihan dan Pengisian Elemen** | **20** | 20 | `profil.html` (`#daftar`, `#filter`, `#pesan-kosong`) & `js/dom.js` |
| **Render dari Data** | **25** | 25 | `js/dom.js` (Fungsi `render()` & `buatKartu()`) |
| **Event & Event Delegation** | **25** | 25 | `js/dom.js` (`barisFilter.addEventListener("click", ...)` & `closest("button")`) |
| **Validasi Form** | **20** | 20 | `js/dom.js` (`elForm.addEventListener("submit", ...)` & `preventDefault()`) |
| **Kebersihan Kode, Deklarasi AI, & Bukti** | **10** | 10 | `README.md` & riwayat commit Git |
| **TOTAL** | **100** | **100** | |

---

## 🤖 Deklarasi Penggunaan AI

Sesuai dengan ketentuan pengerjaan karya ilmiah dan akademis:
- **Penggunaan AI**: AI (Gemini) digunakan untuk membantu menyusun dokumentasi `README.md` dan memverifikasi kesesuaian jawaban lembar kerja sesuai aturan *Worksheet P9*.
- **Pengerjaan Kode & Logika**: Seluruh penulisan struktur HTML, pemilih elemen DOM, fungsi `render()`, *event delegation*, dan pengujian di DevTools dikerjakan mandiri oleh **Firstly Javierrazel Hermawan (25523158)**.