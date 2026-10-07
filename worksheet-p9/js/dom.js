// D.2 Seleksi Elemen Formulir
const elForm = document.querySelector("form");
const inputNama = document.querySelector("#nama");
const inputEmail = document.querySelector("#email");
const inputNim = document.querySelector("#nim");
const inputPesan = document.querySelector("#pesan");
const tombolSubmit = elForm.querySelector("button[type='submit']");

// Fungsi memeriksa keabsahan seluruh kolom input
function validasiForm() {
  const namaValid = inputNama.value.trim() !== "";
  const emailValid = inputEmail.checkValidity() && inputEmail.value.trim() !== "";
  const nimValid = inputNim.checkValidity() && inputNim.value.trim() !== "";
  const pesanValid = inputPesan.value.trim() !== "";

  // Set atribut accessibility aria-invalid
  inputNama.setAttribute("aria-invalid", !namaValid);
  inputEmail.setAttribute("aria-invalid", !emailValid);
  inputNim.setAttribute("aria-invalid", !nimValid);
  inputPesan.setAttribute("aria-invalid", !pesanValid);

  const sah = namaValid && emailValid && nimValid && pesanValid;
  tombolSubmit.disabled = !sah;

  return { sah, namaValid, emailValid, nimValid, pesanValid };
}

// Jalankan validasi setiap kali pengguna mengetik (event input)
elForm.addEventListener("input", () => {
  validasiForm();
});

// Penanganan submit formulir
elForm.addEventListener("submit", (event) => {
  // 1. Hentikan pengiriman bawaan peramban
  event.preventDefault();

  const hasilValidasi = validasiForm();

  // Jika ada kolom tidak valid, arahkan kursor ke kolom bermasalah pertama
  if (!hasilValidasi.sah) {
    if (!hasilValidasi.namaValid) inputNama.focus();
    else if (!hasilValidasi.emailValid) inputEmail.focus();
    else if (!hasilValidasi.nimValid) inputNim.focus();
    else if (!hasilValidasi.pesanValid) inputPesan.focus();
    return;
  }

  // Jika seluruh kolom valid
  alert("Pesan berhasil dikirim!");
  elForm.reset();
  validasiForm(); // Reset status tombol setelah form dikosongkan
});