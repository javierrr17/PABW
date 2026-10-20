<script setup>
import { ref } from 'vue'

// State lokal menggunakan ref untuk menampung isi input form
const nama = ref('')
const email = ref('')
const nim = ref('')
const pesan = ref('')

// Fungsi penanganan submit form
function kirimPesan(event) {
  // Mencegah halaman reload/refresh browser
  event.preventDefault()

  // Logika saat form berhasil dikirim (bisa ditambah alert jika perlu)
  alert(`Pesan dari ${nama.value} berhasil dikirim!`)

  // Mengosongkan form kembali
  nama.value = ''
  email.value = ''
  nim.value = ''
  pesan.value = ''
}
</script>

<template>
  <section id="kontak">
    <h2>Hubungi saya</h2>
    <p>Isi formulir berikut. Semua kolom bertanda wajib harus diisi.</p>

    <form @submit="kirimPesan" action="#" method="post">
      <fieldset>
        <legend>Data pengirim</legend>

        <p>
          <label for="nama">Nama lengkap</label>
          <input 
            id="nama" 
            name="nama" 
            type="text" 
            v-model="nama" 
            autocomplete="name" 
            required
          >
        </p>

        <p>
          <label for="email">Email</label>
          <input 
            id="email" 
            name="email" 
            type="email" 
            v-model="email" 
            autocomplete="email" 
            required
          >
        </p>

        <p>
          <label for="nim">NIM</label>
          <input 
            id="nim" 
            name="nim" 
            type="text" 
            v-model="nim" 
            inputmode="numeric" 
            pattern="[0-9]{8}" 
            aria-describedby="nim-bantuan" 
            required
          >
          <span id="nim-bantuan">Delapan digit angka, contoh 12345678.</span>
        </p>

        <p>
          <label for="pesan">Pesan</label>
          <textarea 
            id="pesan" 
            name="pesan" 
            rows="4" 
            v-model="pesan" 
            required
          ></textarea>
        </p>

        <button type="submit">Kirim</button>
      </fieldset>
    </form>
  </section>
</template>