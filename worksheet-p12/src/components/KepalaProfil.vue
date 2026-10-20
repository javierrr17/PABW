<script setup>
const props = defineProps({
  profil: { type: Object, required: true }
})
</script>

<template>
  <a class="lewati" href="#utama">Lewati ke konten utama</a>

  <header class="kepala">
    <input type="checkbox" id="tema" class="pengalih-tema">
    <label for="tema" class="tombol-tema">
      <span class="ikon-tema" aria-hidden="true"></span> Ganti tema terang/gelap
    </label>

    <h1>{{ props.profil.nama }}</h1>
    <p class="tagline">{{ props.profil.peran }}</p>

    <nav aria-label="Navigasi utama">
      <ul>
        <li><a href="#tentang">Tentang</a></li>
        <li><a href="#karya">Karya</a></li>
        <li><a href="#kontak">Kontak</a></li>
      </ul>
    </nav>
  </header>

  <section id="tentang">
    <h2>Tentang saya</h2>

    <figure class="foto">
      <img src="/media/Foto Saya.jpeg" alt="Foto diri Firstly Javierrazel Hermawan memakai kemeja putih." width="340" height="500" loading="lazy">
      <figcaption></figcaption>
    </figure>

    <p>Saya mahasiswa Program Studi Informatika Universitas Islam Indonesia, Saya terdorong oleh visi besar untuk berkarier sebagai AI Engineer dan menciptakan inovasi berbasis kecerdasan buatan. Saat ini saya juga mendalami pengembangan web dan UI/UX.</p>

    <table>
      <caption>Kegiatan saya</caption>
      <thead>
        <tr>
          <th scope="col">Kegiatan</th>
          <th scope="col">Peran</th>
          <th scope="col">Waktu</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">Osis</th>
          <td>Wakil ketua 2</td>
          <td>2022/2023</td>
        </tr>
        <tr>
          <th scope="row">Majelis Perwakilan Kelas</th>
          <td>Ketua 1</td>
          <td>2024/2025</td>
        </tr>
        <tr>
          <th scope="row">Google Student Ambassador</th>
          <td>Student Ambassador</td>
          <td>2026</td>
        </tr>
      </tbody>
    </table>
  </section>
</template>