<script setup>
import KepalaProfil from './components/KepalaProfil.vue'
import TombolFilter from './components/TombolFilter.vue'
import DaftarProyek from './components/DaftarProyek.vue'
import FormKontak from './components/FormKontak.vue'

const identitas = {
  nama: 'Firstly Javierrazel Hermawan',
  peran: 'Mahasiswa Informatika Universitas Islam Indonesia.'
}
</script>

<template>
  <KepalaProfil :profil="identitas" />

  <main id="utama">
    <section id="karya">
      <h2>Proyek</h2>
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