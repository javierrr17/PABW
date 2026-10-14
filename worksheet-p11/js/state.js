import { daftarProyek as dataAwalProyek } from "./data.js";

export const state = {
  daftarProyek: [...dataAwalProyek],
};

export function ambilDaftarProyek() {
  return state.daftarProyek;
}