export const KUNCI = 'pabw-p11'
export const VERSI = 2

// Fungsi menyimpan state ke localStorage
export function simpan(stateObj) {
  const isi = { versi: VERSI, kategoriAktif: stateObj.kategoriAktif }
  localStorage.setItem(KUNCI, JSON.stringify(isi))
}

// Fungsi memuat data dari localStorage
export function muat() {
  try {
    const isi = JSON.parse(localStorage.getItem(KUNCI))
    if (isi?.versi !== VERSI) {
      localStorage.removeItem(KUNCI)
      return null
    }
    return isi
  } catch {
    localStorage.removeItem(KUNCI)
    return null
  }
}

// Fungsi menghapus simpanan
export function aturUlang() {
  localStorage.removeItem(KUNCI)
}