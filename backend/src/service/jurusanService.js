import {
  getJurusan,
  getJurusanById,
  getNamaJurusanByNama,
  addJurusan,
  updateJurusan,
} from "../model/jurusanModel.js";
import ConflictError from "../error/ConflictError.js";
import BadRequetError from "../error/BadRequestError.js";

async function showJurusan() {
  const result = await getJurusan();
  if (result.length === 0) {
    throw new ConflictError("Data jurusan tidak ditemukan");
  }

  return result;
}

async function showJurusanById(jurusanId) {
  const result = await getJurusanById(jurusanId);
  if (!result) {
    throw new ConflictError("Data jurusan tidak ditemukan");
  }

  return result;
}

async function saveJurusan(namaJurusan) {
  const existingJurusan = await getJurusan();

  if (existingJurusan.length > 0) {
    throw new ConflictError("Jurusan telah terdaftar");
  }

  await addJurusan(namaJurusan);
}

async function editJurusan(jurusanId, namaJurusan) {
  const existingJurusan = await getNamaJurusanByNama(namaJurusan);
  const existingJurusanById = await getJurusanById(jurusanId);

  if (!existingJurusanById) {
    throw new ConflictError("Data jurusan tidak ditemukan");
  }

  if (existingJurusan && existingJurusan.id_jurusan !== existingJurusanById) {
    throw new ConflictError("Data jurusan telah terdaftar");
  }

  await updateJurusan(jurusanId, namaJurusan);
}

export { showJurusan, showJurusanById, saveJurusan, editJurusan };
