import ConflictError from "../error/ConflictError.js";
import { getJurusanId, getAllNamaJurusan } from "../model/jurusanModel.js";
import {
  getProdi,
  addProdi,
  getProdiById,
  getNamaProdiByNama,
  updateProdi,
  deleteProdi,
} from "../model/prodiModel.js";

async function showProdi() {
  const result = await getProdi();
  if (result.length === 0) {
    throw new ConflictError("Data prodi kosong");
  }

  return result;
}

async function showProdibyId(prodiId) {
  const result = await getProdiById(prodiId);
  const jurusanResult = await getAllNamaJurusan();

  if (!jurusanResult) {
    throw new ConflictError("Data jurusan tidak ditemukan");
  }

  if (!result) {
    throw new ConflictError("Data prodi tidak ditemukan");
  }

  return {
    jurusan: jurusanResult,
    prodi: result,
  };
}

async function saveProdi(namaJurusan, namaProdi) {
  const jurusanId = await getJurusanId(namaJurusan);
  const existingProdi = await getNamaProdiByNama(namaProdi);

  if (!jurusanId) {
    throw new ConflictError("Jurusan tidak ditemukan");
  }

  if (existingProdi) {
    throw new ConflictError("Nama prodi sudah terdaftar");
  }

  await addProdi(jurusanId.id_jurusan, namaProdi);
}

async function editProdi(namaJurusan, namaProdi, prodiId) {
  const jurusanId = await getJurusanId(namaJurusan);
  const existingProdi = await getNamaProdiByNama(namaProdi);
  const existingProdiById = await getProdiById(prodiId);

  if (!jurusanId) {
    throw new ConflictError("Data jurusan tidak ditemukan");
  }

  if (!existingProdiById) {
    throw new ConflictError("Data prodi tidak ditemukan");
  }

  if (existingProdi) {
    throw new ConflictError("Nama prodi sudah terdaftar");
  }

  await updateProdi(jurusanId.id_jurusan, namaProdi, prodiId);
}

async function removeProdi(prodiId) {
  const existingProdiId = await getProdiById(prodiId);
  if (!existingProdiId) {
    throw new ConflictError("Data prodi tidak ditemukan");
  }

  await deleteProdi(prodiId);
}

export { showProdi, showProdibyId, saveProdi, editProdi, removeProdi };
