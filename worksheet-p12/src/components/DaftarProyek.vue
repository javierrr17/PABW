<script setup>
import { computed } from 'vue'
import { state } from '../state.js'
import { daftarProyek } from '../data.js'

const proyekTersaring = computed(() => {
  if (!state.kategoriAktif || state.kategoriAktif === 'semua') {
    return daftarProyek
  }
  return daftarProyek.filter(proyek => proyek.kategori === state.kategoriAktif)
})
</script>

<template>
  <section id="karya">
    <h2>Proyek</h2>

    <ol v-if="proyekTersaring.length > 0" id="daftar">
      <li v-for="proyek in proyekTersaring" :key="proyek.id">
        <strong>{{ proyek.judul }}</strong> — {{ proyek.tahun }}
      </li>
    </ol>

    <p v-else id="pesan-kosong">Belum ada proyek.</p>
  </section>
</template>