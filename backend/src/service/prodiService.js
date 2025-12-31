import ConflictError from "../error/ConflictError.js";
import BadRequestError from "../error/BadRequestError.js";
import {
  getProdi,
  addProdi,
  getProdiById,
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

async function saveProdi(nama_jurusan, nama_prodi) {
  if (!nama_jurusan || !nama_prodi) {
    throw new BadRequestError("Nama jurusan atau nama prodi wajib diisi");
  }

  if (typeof nama_jurusan === "string") {
    nama_jurusan = nama_jurusan.toLowerCase().trim();
  }

  if (typeof nama_prodi === "string") {
    nama_prodi = nama_prodi.trim();
  }

  await addProdi(nama_jurusan, nama_prodi);
}

async function showProdibyId(id_prodi) {
  if (typeof id_prodi === "string" || isNaN(id_prodi)) {
    id_prodi = parseInt(id_prodi);
  }

  const result = await getProdiById(id_prodi);

  if (result.length === 0) {
    throw new ConflictError("Data prodi tidak ditemukan");
  }

  return result;
}

async function editProdi(nama_jurusan, id_prodi, nama_prodi) {
  if (typeof nama_jurusan === "string") {
    nama_jurusan = nama_jurusan.toLowerCase().trim();
  }

  if (typeof id_prodi === "string" || isNaN(id_prodi)) {
    id_prodi = parseInt(id_prodi);
  }

  if (typeof nama_prodi === "string") {
    nama_prodi = nama_prodi.trim();
  }

  await updateProdi(nama_jurusan, id_prodi, nama_prodi);
}

async function removeProdi(id_prodi) {
  if (typeof id_prodi === "string" || isNaN(id_prodi)) {
    id_prodi = parseInt(id_prodi);
  }

  await deleteProdi(id_prodi);
}

export { showProdi, showProdibyId, saveProdi, editProdi, removeProdi };
