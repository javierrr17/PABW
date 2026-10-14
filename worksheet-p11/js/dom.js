export const wadah = document.querySelector("#daftar");
export const kosong = document.querySelector("#pesan-kosong");

export const elForm = document.querySelector("form");
export const inputNama = document.querySelector("#nama");
export const inputEmail = document.querySelector("#email");
export const inputNim = document.querySelector("#nim");
export const inputPesan = document.querySelector("#pesan");
export const tombolSubmit = elForm ? elForm.querySelector("button[type='submit']") : null;

export function buatItem(proyek) {
  const li = document.createElement("li");
  li.textContent = `${proyek.judul} - ${proyek.tahun}`;
  return li;
}

export function render(daftar) {
  if (!wadah) return;
  wadah.textContent = "";

  if (daftar.length === 0) {
    if (kosong) kosong.hidden = false;
    return;
  }
  if (kosong) kosong.hidden = true;

  daftar.forEach((proyek) => wadah.append(buatItem(proyek)));
}

export function validasiForm() {
  if (!elForm) return { sah: false };

  const namaValid = inputNama.value.trim() !== "";
  const emailValid = inputEmail.checkValidity() && inputEmail.value.trim() !== "";
  const nimValid = inputNim.checkValidity() && inputNim.value.trim() !== "";
  const pesanValid = inputPesan.value.trim() !== "";

  inputNama.setAttribute("aria-invalid", !namaValid);
  inputEmail.setAttribute("aria-invalid", !emailValid);
  inputNim.setAttribute("aria-invalid", !nimValid);
  inputPesan.setAttribute("aria-invalid", !pesanValid);

  const sah = namaValid && emailValid && nimValid && pesanValid;
  if (tombolSubmit) tombolSubmit.disabled = !sah;

  return { sah, namaValid, emailValid, nimValid, pesanValid };
}