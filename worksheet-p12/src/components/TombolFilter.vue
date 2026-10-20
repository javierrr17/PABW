<script setup>
import { state, pilihKategori, aturUlang } from '../state.js'

const daftarKategori = [
  { id: 'semua', label: 'Semua' },
  { id: 'web', label: 'Web' },
  { id: 'ai', label: 'AI & ML' },
  { id: 'desain', label: 'Desain UI/UX' }
]
</script>

<template>
  <button type="button" id="tombol-reset" @click="aturUlang">Atur Ulang Pilihan</button>

  <nav class="filter-kategori" aria-label="Filter kategori proyek">
    <button 
      v-for="kategori in daftarKategori" 
      :key="kategori.id"
      type="button"
      :class="{ aktif: state.kategoriAktif === kategori.id }"
      @click="pilihKategori(kategori.id)"
    >
      {{ kategori.label }}
    </button>
  </nav>
</template>