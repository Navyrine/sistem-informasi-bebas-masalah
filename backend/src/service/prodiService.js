import ConflictError from "../error/ConflictError.js";
import BadRequestError from "../error/BadRequestError.js";
import { getJurusanId, getAllNamaJurusan } from "../model/jurusanModel.js";
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

  nama_prodi = nama_prodi.trim();
  nama_jurusan = nama_jurusan.toLowerCase().trim();

  const jurusanId = await getJurusanId(nama_jurusan);
  if (!jurusanId) {
    throw new ConflictError("Jurusan tidak ditemukan");
  }

  await addProdi(jurusanId.id_jurusan, nama_prodi);
}

async function showProdibyId(id_prodi) {
  if (typeof id_prodi === "string" || isNaN(id_prodi)) {
    id_prodi = parseInt(id_prodi);
  }

  const result = await getProdiById(id_prodi);
  const jurusanResult = await getAllNamaJurusan();

  if (result === undefined || result.length === 0) {
    throw new ConflictError("Data prodi tidak ditemukan");
  }

  return {
    jurusan: jurusanResult,
    prodi: result,
  };
}

async function editProdi(id_prodi, updateBody) {
  const existingProdi = await getProdiById(id_prodi);

  if (!existingProdi) {
    throw new ConflictError("Data prodi tidak ditemukan");
  }

  if (typeof updateBody.nama_jurusan === "string") {
    updateBody.nama_jurusan = updateBody.nama_jurusan.toLowerCase().trim();
  }

  if (typeof updateBody.nama_prodi === "string") {
    updateBody.nama_prodi = updateBody.nama_prodi.trim();
  }

  const jurusanId = existingProdi.id_jurusan;
  console.log(jurusanId);

  if (updateBody.nama_jurusan) {
    const jurusan = await getJurusanId(updateBody.nama_jurusan);

    if (!jurusan) {
      throw new ConflictError("Jurusan tidak ditemukan");
    }
    jurusanId = jurusan.id_jurusan;
  }

  const updateData = {
    id_jurusan: jurusanId,
    nama_prodi: updateBody.nama_prodi ?? existingProdi.nama_prodi,
  };

  await updateProdi(id_prodi, updateData);
}

async function removeProdi(id_prodi) {
  if (typeof id_prodi === "string" || isNaN(id_prodi)) {
    id_prodi = parseInt(id_prodi);
  }

  await deleteProdi(id_prodi);
}

export { showProdi, showProdibyId, saveProdi, editProdi, removeProdi };
