import {
  elForm,
  inputNama,
  inputEmail,
  inputNim,
  inputPesan,
  validasiForm,
} from "./dom.js";

export function inisialisasiEvent() {
  if (!elForm) return;

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
}