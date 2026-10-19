// Pemilih DOM
export const wadah = document.querySelector("#daftar");
export const kosong = document.querySelector("#pesan-kosong");

export const elForm = document.querySelector("form");
export const inputNama = document.querySelector("#nama");
export const inputEmail = document.querySelector("#email");
export const inputNim = document.querySelector("#nim");
export const inputPesan = document.querySelector("#pesan");
export const tombolSubmit = elForm ? elForm.querySelector("button[type='submit']") : null;

// Fungsi pembuat item list HTML
export function buatItem(proyek) {
  const li = document.createElement("li");
  li.textContent = `${proyek.judul} - ${proyek.tahun}`;
  return li;
}

// Fungsi saring membaca dari state.kategoriAktif
export function saring(state) {
  if (!state.kategoriAktif || state.kategoriAktif === "semua") {
    return state.daftarProyek;
  }
  return state.daftarProyek.filter((proyek) =>
    proyek.judul.toLowerCase().includes(state.kategoriAktif.toLowerCase())
  );
}

// Fungsi render menerima objek state utuh (bukan array mentah)
export function render(state) {
  if (!wadah) return;

  // 1. Kosongkan wadah
  wadah.textContent = "";

  // Ambil array proyek yang sudah disaring dari objek state
  const tampil = saring(state);

  // 2. Periksa keadaan kosong
  if (tampil.length === 0) {
    if (kosong) kosong.hidden = false;
    return;
  }
  if (kosong) kosong.hidden = true;

  // 3. Isi ulang wadah dari array 'tampil'
  tampil.forEach((proyek) => wadah.append(buatItem(proyek)));
}

// Fungsi validasi formulir
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