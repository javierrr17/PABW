import { daftarProyek } from "./app.js";

const wadah = document.querySelector("#daftar");
const kosong = document.querySelector("#pesan-kosong");

function buatKartu(proyek) {
  const li = document.createElement("li");
  li.className = "kartu";
  li.textContent = proyek.judul;
  return li;
}

// Fungsi render daftar proyek
function tampilkanDaftar(daftar) {
  wadah.textContent = "";

  daftar.forEach((proyek) => wadah.append(buatKartu(proyek)));
}

tampilkanDaftar(daftarProyek);