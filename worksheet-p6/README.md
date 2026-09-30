# Worksheet P6: Responsif Mobile-First (SIF302)

Proyek ini merupakan pengembangan lanjutan dari Pertemuan 5 pada mata kuliah **Pengembangan Aplikasi Berbasis Web (SIF302)**. Proyek ini bertujuan untuk mengimplementasikan rancangan **Mobile-First Responsive Web Design** menggunakan `meta viewport`, gaya dasar tanpa syarat media query, titik henti (*breakpoints*) berbasis `rem`, serta penanganan elemen media/tabel agar halaman dapat diakses dengan rapi tanpa *horizontal scrolling* pada berbagai ukuran layar.

---

## 📑 Daftar Isi

- [Tujuan Proyek](#-tujuan-proyek)
- [Pendekatan Mobile-First](#-pendekatan-mobile-first)
- [Struktur Berkas](#-struktur-berkas)
- [Titik Henti (Breakpoints)](#-titik-henti-breakpoints)
- [Langkah Pengerjaan (Lembar A–E)](#-langkah-pengerjaan-lembar-a-e)
- [Gaya Dasar & CSS Responsif (`responsif.css`)](#-gaya-dasar--css-responsif-responsifcss)
- [Panduan Pengujian di DevTools](#-panduan-pengujian-di-devtools)
- [Kriteria Penilaian Mandiri](#-kriteria-penilaian-mandiri)

---

## 🎯 Tujuan Proyek

1. **Penerapan Viewport**: Menjamin halaman web tidak mengecil secara otomatis saat dibuka di layar seluler dengan memasangkan baris `<meta name="viewport">`.
2. **Eliminasi Ukuran Tetap**: Mengganti semua elemen berlebar piksel tetap (`px`) menjadi ukuran relatif (`%`, `rem`, `1fr`).
3. **Penerapan Mobile-First**: Menulis gaya dasar tanpa syarat *media query* terlebih dahulu untuk tampilan layar sempit (ponsel).
4. **Penambahan Titik Henti (*Breakpoints*)**: Menggunakan `min-width` dengan satuan `rem` (`48rem` untuk tablet, `60rem` untuk desktop).
5. **Pencegahan Luberan (*Overflow*)**: Membatasi ukuran gambar dengan `max-width: 100%` dan membungkus tabel lebar dengan wadah bergulir (`overflow-x: auto`).
6. **Bebas Horizontal Scroll**: Memastikan halaman tidak memiliki batang gulir mendatar (*horizontal scrollbar*) pada lebar 360 px, 768 px, dan 1 280 px.

---

## 📱 Pendekatan Mobile-First

Mengapa gaya dasar ditulis untuk layar sempit terlebih dahulu?

- **Efisiensi Kode & Performa**: Gaya dasar berlaku secara universal untuk semua lebar layar tanpa memerlukan evaluasi *media query*. Perangkat seluler dengan sumber daya lebih terbatas memuat CSS dasar secara langsung.
- **Progresif & Additif**: Perubahan tata letak untuk layar yang lebih besar ditulis menggunakan `@media (min-width: ...)` sebagai **tambahan** aturan, bukan menimpa aturan yang sudah ada secara destruktif.
- **Konsistensi Skala**: Memudahkan membaca alur CSS dari layar terkecil menuju layar terbesar secara berurutan dari atas ke bawah.

---

## 📁 Struktur Berkas

```text
worksheet-p6/
├── css/
│   ├── base.css          # Gaya dasar elemen global (img, body, html)
│   ├── komponen.css      # Komponen UI (kartu, tombol, form)
│   ├── layout.css        # Struktur kontainer utama & sidebar
│   ├── responsif.css     # (BERKAS BARU) Meta viewport, gaya dasar, & media queries
│   ├── tema.css          # Tema warna (terang/gelap)
│   └── tokens.css        # Variabel design tokens (warna, jarak, font)
├── media/                # Aset gambar & media
├── profil.html           # Berkas HTML utama
└── README.md             # Dokumentasi proyek
```

---

## 📐 Titik Henti (Breakpoints)

Titik henti ditentukan berdasarkan **kebutuhan isi/konten (*content-driven*)**, bukan merek perangkat spesifik, menggunakan satuan `rem` agar sepadan ketika pengguna memperbesar ukuran font sistem.

| Titik Henti | Lebar Piksel (Setara) | Perubahan Tata Letak | Alasan Pemilihan |
| :--- | :--- | :--- | :--- |
| **Gaya Dasar** | `< 48rem` (< 768 px) | **1 Kolom**: Tampilan seluler menumpuk ke bawah secara vertikal (`grid-template-columns: 1fr`). | Optimal untuk keterbacaan pada ponsel layar sempit (misal 360 px). |
| **`48rem`** | `≥ 768 px` | **2 Kolom**: Galeri/grid kartu berubah dari 1 kolom menjadi 2 kolom (`repeat(2, 1fr)`). | Layar tablet memiliki ruang horizontal yang cukup untuk menampilkan 2 kartu berdampingan. |
| **`60rem`** | `≥ 960 px` | **3 Kolom + Sidebar**: Sidebar bersanding dengan konten (`16rem 1fr`), galeri menjadi 3 kolom (`repeat(3, 1fr)`). | Layar desktop/laptop lega untuk menempatkan bilah samping secara horisontal di sebelah area utama. |

---

## 🛠️ Langkah Pengerjaan (Lembar A–E)

### **Lembar A: Viewport & Identifikasi Lebar Tetap**
1. Pasang baris meta di bagian `<head>` pada `profil.html`:
   ```html
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   ```
2. Temukan dan ubah semua lebar piksel tetap (`px`) di CSS lama:
   - `layout.css` (`.sidebar`): Hapus `width: 280px` $\rightarrow$ Gunakan tata letak grid/relatif.
   - `komponen.css` (`.kartu`): Hapus `width: 320px` $\rightarrow$ Gunakan `width: 100%`.
   - `base.css` (`img`): Hapus `width: 900px` $\rightarrow$ Gunakan `max-width: 100%`.

### **Lembar B: Gaya Dasar Layar Sempit (`responsif.css`)**
1. Buat berkas baru `css/responsif.css`.
2. Tulis gaya dasar 1 kolom tanpa menggunakan `@media`:
   ```css
   /* dasar: berlaku di semua lebar */
   .content {
     display: grid;
     grid-template-columns: 1fr;
     gap: var(--space-4);
   }

   .grid {
     display: grid;
     grid-template-columns: 1fr;
     gap: var(--space-4);
   }
   ```

### **Lembar C: Tambah Dua Titik Henti**
Tambahkan *media query* di bagian bawah `responsif.css` menggunakan `min-width`:
```css
/* tablet: galeri dua kolom */
@media (min-width: 48rem) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* desktop: sidebar bersanding dengan konten */
@media (min-width: 60rem) {
  .content {
    grid-template-columns: 16rem 1fr;
  }
  .grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

### **Lembar D: Penanganan Gambar, Tabel, & Teks**
Mencegah elemen internal meluber melampaui kontainer:
```css
/* Gambar tidak melebihi wadahnya */
img {
  max-width: 100%;
  height: auto;
}

/* Tabel lebar dapat digulir secara mandiri */
.table-wrap {
  overflow-x: auto;
}

/* Keterbacaan teks berbasis satuan relatif */
p {
  font-size: 1rem;
  line-height: 1.6;
}
```

---

## 🛠️️ Gaya Dasar & CSS Responsif (`responsif.css`)

Berikut adalah gabungan berkas lengkap `responsif.css`:

```css
/* ==========================================
   GAYA DASAR (MOBILE-FIRST)
   Berlaku universal di semua ukuran layar
   ========================================== */
.content {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-4);
}

.grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-4);
}

img {
  max-width: 100%;
  height: auto;
}

.table-wrap {
  overflow-x: auto;
}

p {
  font-size: 1rem;
  line-height: 1.6;
}

/* ==========================================
   TITIK HENTI 1: TABLET (>= 48rem / 768px)
   ========================================== */
@media (min-width: 48rem) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* ==========================================
   TITIK HENTI 2: DESKTOP (>= 60rem / 960px)
   ========================================== */
@media (min-width: 60rem) {
  .content {
    grid-template-columns: 16rem 1fr;
  }
  .grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

---

## 🔍 Panduan Pengujian di DevTools

Pengujian dilakukan menggunakan **Developer Tools (DevTools)** pada peramban Chrome/Firefox:

1. Buka `profil.html` pada peramban.
2. Buka DevTools dengan menekan tombol `F12` atau `Ctrl + Shift + I` (`Cmd + Option + I` pada Mac).
3. Aktifkan **Toggle Device Toolbar** (`Ctrl + Shift + M`).
4. Uji dan lakukan verifikasi pada tiga dimensi spesifik:
   - **360 px (Ponsel)**:
     - Tampilan wajib 1 kolom menumpuk vertikal.
     - Pastikan tidak ada batang gulir mendatar (*horizontal scrollbar*) di bagian bawah.
   - **768 px (Tablet - `48rem`)**:
     - Bagian galeri (`.grid`) otomatis berubah menjadi **2 kolom**.
     - Konten utama dan sidebar masih 1 kolom.
   - **1 280 px (Desktop - `60rem`)**:
     - *Sidebar* bersanding di samping konten utama (`16rem 1fr`).
     - Galeri (`.grid`) berubah menjadi **3 kolom**.
5. **Uji Luberan Media & Tabel**:
     - Gulir tabel lebar di dalam `.table-wrap` pada ukuran 360 px untuk memastikan tabel dapat digulir sendiri tanpa menggeser seluruh halaman.
6. **Ambil Tangkapan Layar**: Simpan bukti uji visual pada ketiga ukuran layar tersebut untuk diunggah ke repositori GitHub.

---

## 📊 Kriteria Penilaian Mandiri

| Komponen Penilaian | Bobot | Indikator Keberhasilan |
| :--- | :---: | :--- |
| **Viewport dan Gaya Dasar** | **30** | Tag `<meta name="viewport">` terpasang; tidak ada elemen dengan piksel tetap (`px`); gaya dasar ditulis tanpa *media query*. |
| **Dua Titik Henti** | **30** | Menggunakan `min-width: 48rem` dan `min-width: 60rem`; tata letak galeri dan sidebar berubah sesuai spesifikasi. |
| **Gambar dan Tabel** | **20** | `img` memiliki `max-width: 100%`; tabel terbungkus `.table-wrap` dengan `overflow-x: auto`. |
| **Kebersihan Kode & Bukti Uji** | **20** | Tidak ada *horizontal scroll* pada 360 px, 768 px, dan 1 280 px; struktur berkas rapi; 3 tangkapan layar diunggah ke GitHub. |
| **TOTAL** | **100** | |