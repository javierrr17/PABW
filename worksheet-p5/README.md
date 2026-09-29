# Worksheet P5 — Layout Modern: Flexbox dan Grid

Lanjutan Pertemuan 4: halaman `profil.html` yang sama, dengan susunan baru.
Isi, warna, dan token tidak diganti; yang berubah hanya CSS yang mengatur posisi
(ditambah kelas kait `galeri`, `kartu`, `kartu__isi`, `kartu__judul`, `kartu__kaki`
pada tiga karya, teks karyanya tetap sama).

## Isi folder

- `profil.html` — halaman (sebelumnya `kerangka-profil.html`)
- `css/tokens.css`, `base.css`, `layout.css`, `komponen.css`, `tema.css`
- `media/` — foto
- `bukti/` — tangkapan layar

## Lembar A — Sketsa kerangka

Tiga baris halaman (grid pada `<body>`), lalu dua kolom di baris tengah.
Di layar >= 48rem:

```
+--------------------------------------------------------------+
| KEPALA  (flex)  judul | tombol tema | menu        baris: auto |
+------------------+-------------------------------------------+
| SIDEBAR 16rem    | KONTEN 1fr                                |
|                  |                                           |
|  [tentang ------------------------ span 2 kolom ----------]  |
|  [skill ]        [karya  ->  galeri auto-fit, 3 kartu]       |
|  [tanya ]        [kontak ]                                   |
|  [kutipan ------------------------ span 2 kolom ---------]   |
|                                              baris: 1fr      |
+--------------------------------------------------------------+
| KAKI                                          baris: auto    |
+--------------------------------------------------------------+
```

Di layar < 48rem seluruh bagian ditumpuk satu kolom mengikuti urutan HTML.

| Bagian | Nilai |
|---|---|
| Baris halaman | `auto 1fr auto` |
| Kolom isi | `16rem 1fr` |
| Galeri | `repeat(auto-fit, minmax(min(16rem, 100%), 1fr))` |

## Yang berubah

- **layout.css** — `body` grid tiga baris (`min-height: 100dvh`); navbar flex dengan `gap`;
  `main` grid dua kolom dengan area bernama (`tentang`, `skill`, `karya`, `tanya`,
  `kontak`, `kutipan`); di dalam "Tentang saya" foto memakai `grid-row: span 2`;
  galeri `auto-fit` tanpa media query.
- **komponen.css** — kartu karya flex kolom, `.kartu__kaki` flex baris; form, tanya
  jawab, keterampilan, dan kutipan disusun flex dengan `gap`, tanpa margin tempelan.
- **base.css** — margin bawah `h2` dan `h3` dihapus; jarak diambil alih `gap`.
- **tokens.css** dan **tema.css** tidak diubah. Tombol tema gelap tetap bekerja.

## Tiga kasus yang ditemui

1. **Meluber di 360 px:** tabel "Kegiatan saya" melewati tepi kanan kartu (lebar tabel
   394 px pada layar 360 px). Perbaikan: padding sel dikecilkan dan kolom pertama
   diberi `overflow-wrap: anywhere` (bukti: `bukti/P5 sebelum 360px tabel meluber.png`).
2. **Petak tumpang tindih:** `grid-area` sempat ditulis di luar media query sehingga di
   ponsel semua bagian menumpuk di satu petak. Dipindah ke dalam media query.
3. **Kolom galeri di bawah 16rem:** `minmax(16rem, 1fr)` polos meluber di 320 px, jadi
   batas bawah ditulis `min(16rem, 100%)`.

## Hasil pemeriksaan (diukur di Chromium)

| Pemeriksaan | Hasil |
|---|---|
| Kerangka tiga baris | lolos, `grid-template-rows` terbaca 3 jalur |
| `margin`, `float`, `!important` di layout.css dan komponen.css | 0 kemunculan |
| Lebar kolom memakai `fr`, `rem`, `minmax`, `repeat` | lolos, `px` hanya untuk garis tepi |
| Galeri adaptif | 1 kolom (360, 480), 2 kolom (700, 900, 1024), 3 kolom (1280) |
| Meluber | 0 elemen di 320, 360, dan 1 280 px |
| Tema gelap | tombol mengganti latar `#F4F6F8` menjadi `#10151F`, tanpa luberan di 360 px |

## Bukti

`bukti/` — `P5 sesudah 360px.png`, `P5 sesudah 1280px.png`, `P5 tema gelap 1280px.png`,
`P5 sesudah 320px.png`, dan `P5 sebelum 360px tabel meluber.png`.
Tangkapan layar Lighthouse dan Nu Html Checker di folder itu berasal dari Pertemuan 4.
