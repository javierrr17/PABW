const ALAMAT = 'https://jsonplaceholder.typicode.com/posts';

async function muat() {
  const respons = await fetch(ALAMAT);
  console.log('status', respons.status, 'ok', respons.ok);
  if (!respons.ok) {
    throw new Error('status ' + respons.status);
  }
  return respons.json();
}

muat();