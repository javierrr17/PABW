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