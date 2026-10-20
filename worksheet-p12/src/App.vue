<template>
  <a class="lewati" href="#utama">Lewati ke konten utama</a>

  <header class="kepala">
    <input type="checkbox" id="tema" class="pengalih-tema">
    <label for="tema" class="tombol-tema"><span class="ikon-tema" aria-hidden="true"></span> Ganti tema terang/gelap</label>

    <h1>Firstly Javierrazel Hermawan</h1>
    <p class="tagline">Mahasiswa Informatika Universitas Islam Indonesia.</p>
    <nav aria-label="Navigasi utama">
      <ul>
        <li><a href="#tentang">Tentang</a></li>
        <li><a href="#karya">Karya</a></li>
        <li><a href="#kontak">Kontak</a></li>
      </ul>
    </nav>
  </header>

  <main id="utama">

    <section id="tentang">
      <h2>Tentang saya</h2>

      <figure class="foto">
        <img src="/media/Foto Saya.jpeg"
             alt="Foto diri Firstly Javierrazel Hermawan memakai kemeja putih."
             width="340" height="500" loading="lazy">
        <figcaption></figcaption>
      </figure>

      <p>Saya mahasiswa Program Studi Informatika Universitas Islam Indonesia, Saya terdorong oleh visi besar untuk berkarier sebagai AI Engineer dan menciptakan inovasi berbasis kecerdasan buatan.
        Saat ini saya juga mendalami pengembangan web dan UI/UX.
      </p>

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

    <section id="karya">
      <h2>Proyek</h2>

      <button type="button" id="tombol-reset">Atur Ulang Pilihan</button>

      <ol id="daftar"></ol>
      <p id="pesan-kosong" hidden>Belum ada proyek.</p>
    </section>

    <section id="kontak">
      <h2>Hubungi saya</h2>
      <p>Isi formulir berikut. Semua kolom bertanda wajib harus diisi.</p>

      <form action="#" method="post">
        <fieldset>
          <legend>Data pengirim</legend>

          <p>
            <label for="nama">Nama lengkap</label>
            <input id="nama" name="nama" type="text"
                   autocomplete="name" required>
          </p>

          <p>
            <label for="email">Email</label>
            <input id="email" name="email" type="email"
                   autocomplete="email" required>
          </p>

          <p>
            <label for="nim">NIM</label>
            <input id="nim" name="nim" type="text" inputmode="numeric"
                   pattern="[0-9]{8}" aria-describedby="nim-bantuan" required>
            <span id="nim-bantuan">Delapan digit angka, contoh 12345678.</span>
          </p>

          <p>
            <label for="pesan">Pesan</label>
            <textarea id="pesan" name="pesan" rows="4" required></textarea>
          </p>

          <button type="submit">Kirim</button>
        </fieldset>
      </form>
    </section>

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

<script setup>
</script>