const profil = {
  nama: "Firstly Javierrazel Hermawan",
  peran: "Mahasiswa Informatika Universitas Islam Indonesia",
  keahlian: ["HTML", "CSS", "JavaScript"],
  jumlahProyek: 3,
};

const kalimat = `Nama saya ${profil.nama}, dan saya belajar ${profil.keahlian.length} hal.`;
console.log(kalimat);

console.log(typeof profil.nama);   // Mengatur output "string"
console.log(typeof profil.keahlian.length);  // Mengatur output "number"
console.log(typeof belumDibuat);   // Mengatur output "undefined"

// 1. Menyusun kalimat perkenalan dari satu object
function buatPerkenalan({ nama, peran }) {
  return `${nama} — ${peran}`;
}

// 2. Merapikan daftar keahlian menjadi satu baris teks
const formatKeahlian = (daftar) => daftar.join(" · ");

console.log(buatPerkenalan(profil));
console.log(formatKeahlian(profil.keahlian));
console.log(buatPerkenalan({ nama: "Javier", peran: "UI/UX Designer" }));
console.log(buatPerkenalan({ nama: "Razel", peran: "Project Manager" }));
console.log(formatKeahlian(["Java", "Python", "R"]));
