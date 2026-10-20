<script setup>
import { onMounted, watch } from 'vue'
import { state } from './state.js'
import { muat, simpan, aturUlang } from './simpanan.js'

import KepalaProfil from './components/KepalaProfil.vue'
import TombolFilter from './components/TombolFilter.vue'
import DaftarProyek from './components/DaftarProyek.vue'
import FormKontak from './components/FormKontak.vue'

const identitas = {
  nama: 'Firstly Javierrazel Hermawan',
  peran: 'Mahasiswa Informatika Universitas Islam Indonesia.'
}

// 1. kait onMounted: membaca simpanan saat komponen dipasang
onMounted(() => {
  const isi = muat() // VERSI diperiksa di dalam muat(); bentuk lama dibuang
  if (isi) state.kategoriAktif = isi.kategoriAktif
})

// 2. kait watch: otomatis menyimpan setiap kali state berubah
watch(state, (nilai) => simpan(nilai), { deep: true })

// 3. Fungsi tombol atur ulang
function aturUlangPilihan() {
  aturUlang()
  state.kategoriAktif = 'semua'
  simpan(state)
}
</script>

<template>
  <KepalaProfil :profil="identitas" />

  <main id="utama">
    <section id="karya">
      <h2>Proyek</h2>
      
      <!-- Tombol atur ulang pilihan -->
      <button type="button" id="tombol-reset" @click="aturUlangPilihan">
        Atur Ulang Pilihan
      </button>

      <TombolFilter />
      <DaftarProyek />
    </section>

    <FormKontak />

    <section id="keterampilan">
      <h2>Keterampilan</h2>
      <dl class="keterampilan">
        <dt>Bahasa Pemrograman</dt>
        <dd>Java, Python, R, HTML, CSS.</dd>
        <dt>Spesialisasi &amp; Alat</dt>
        <dd>UI/UX Design (Figma), Git, VS Code, Pengembangan Web Dasar.</dd>
      </dl>
    </section>

    <section id="tanya-jawab">
      <h2>Tanya jawab</h2>
      <details>
        <summary>Apa fokus karier utama saya?</summary>
        <p>Saya berfokus untuk menjadi AI Engineer serta mengembangkan solusi berbasis kecerdasan buatan dan web UI/UX.</p>
      </details>
      <details>
        <summary>Teknologi apa yang sedang dipelajari saat ini?</summary>
        <p>Pengembangan web berbasis design token, struktur data, dan arsitektur CSS modern.</p>
      </details>
    </section>

    <section id="kutipan">
      <h2>Prinsip</h2>
      <figure class="kutipan">
        <blockquote>
          <p>Teknologi dan desain yang baik adalah yang memberikan dampak nyata serta dapat diakses oleh siapa saja.</p>
        </blockquote>
        <figcaption>— Firstly Javierrazel Hermawan</figcaption>
      </figure>
    </section>
  </main>

  <footer class="kaki">
    <p>Firstly Javierrazel Hermawan · 25523158 · <time datetime="2026">2026</time></p>
  </footer>
</template>