import { daftarProyek } from "./app.js";

// Mengambil elemen yang sudah didaftarkan pada Tabel A.3
const elDaftar = document.querySelector("#daftar");
const elFilter = document.querySelector("#filter");
const elPesanKosong = document.querySelector("#pesan-kosong");
const elForm = document.querySelector("form");

// Verifikasi di console
console.log("Data proyek berhasil diimpor:", daftarProyek);