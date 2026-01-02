import {
  getJurusan,
  addJurusan,
  updateJurusan,
} from "../model/jurusanModel.js";
import ConflictError from "../error/ConflictError.js";
import BadRequetError from "../error/BadRequestError.js";

async function showJurusan() {
  const result = await getJurusan();

  if (result.length === 0) {
    throw new ConflictError("Data jurusan tidak ditemukan");
  } else {
    return result;
  }
}

async function saveJurusan(namaJurusan) {
  if (!namaJurusan) {
    throw new BadRequetError("nama jurusan wajib diisi");
  }

  namaJurusan = namaJurusan.trim();

  await addJurusan(namaJurusan);
}

async function editJurusan(jurusanId, namaJurusan) {
  if (!jurusanId || !namaJurusan) {
    throw new BadRequetError("id jurusan atau nama jurusan wajib diisi");
  }

  jurusanId = parseInt(jurusanId);
  namaJurusan = namaJurusan.trim();

  await updateJurusan(jurusanId, namaJurusan);
}

export { showJurusan, saveJurusan, editJurusan };
