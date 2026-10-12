import { daftarProyek } from "./app.js";

const wadah = document.querySelector("#daftar");
const kosong = document.querySelector("#pesan-kosong");
const barisFilter = document.querySelector("#filter");

function buatKartu(proyek) {
  const li = document.createElement("li");
  li.className = "kartu";
  li.textContent = proyek.judul;
  return li;
}

function render(daftar) {
  wadah.textContent = "";

  if (daftar.length === 0) {
    kosong.hidden = false;
    return;
  }
  kosong.hidden = true;

  daftar.forEach((proyek) => wadah.append(buatKartu(proyek)));
}

function tandaiTombolAktif(tombolAktif) {
  document.querySelectorAll("#filter button").forEach((tombol) => {
    tombol.classList.toggle("aktif", tombol === tombolAktif);
  });
}

// Tampilkan semua proyek saat pertama kali dimuat
render(daftarProyek);

// Event Listener Filter (Event Delegation)
barisFilter.addEventListener("click", (event) => {
  const tombol = event.target.closest("button");
  if (!tombol) return;

  const kategori = tombol.dataset.kategori;
  const terpilih = daftarProyek.filter(
    (proyek) => kategori === "semua" || proyek.kategori === kategori
  );

  render(terpilih);
  tandaiTombolAktif(tombol);
});

// ==========================================
// D.2 VALIDASI FORMULIR (TAMBAHKAN DI SINI)
// ==========================================
const elForm = document.querySelector("form");
const inputNama = document.querySelector("#nama");
const inputEmail = document.querySelector("#email");
const inputNim = document.querySelector("#nim");
const inputPesan = document.querySelector("#pesan");
const tombolSubmit = elForm.querySelector("button[type='submit']");

function validasiForm() {
  const namaValid = inputNama.value.trim() !== "";
  const emailValid = inputEmail.checkValidity() && inputEmail.value.trim() !== "";
  const nimValid = inputNim.checkValidity() && inputNim.value.trim() !== "";
  const pesanValid = inputPesan.value.trim() !== "";

  inputNama.setAttribute("aria-invalid", !namaValid);
  inputEmail.setAttribute("aria-invalid", !emailValid);
  inputNim.setAttribute("aria-invalid", !nimValid);
  inputPesan.setAttribute("aria-invalid", !pesanValid);

  const sah = namaValid && emailValid && nimValid && pesanValid;
  tombolSubmit.disabled = !sah;

  return { sah, namaValid, emailValid, nimValid, pesanValid };
}

elForm.addEventListener("input", () => {
  validasiForm();
});

elForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const hasilValidasi = validasiForm();

  if (!hasilValidasi.sah) {
    if (!hasilValidasi.namaValid) inputNama.focus();
    else if (!hasilValidasi.emailValid) inputEmail.focus();
    else if (!hasilValidasi.nimValid) inputNim.focus();
    else if (!hasilValidasi.pesanValid) inputPesan.focus();
    return;
  }

  alert("Pesan berhasil dikirim!");
  elForm.reset();
  validasiForm();
});