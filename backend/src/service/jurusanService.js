import { getJurusan, addJurusan, updatJurusan } from "../model/jurusanModel.js";
import ConflictError from "../error/ConflictError.js";
import BadRequetError from "../error/BadRequestError.js";

async function showJurusan() {
  const result = await getJurusan();

  if (result.length === 0) {
    throw new ConflictError("Data kosong");
  }

  return result;
}

async function saveJurusan(nama_jurusan) {
  if (!nama_jurusan) {
    throw new BadRequetError("nama jurusan wajib diisi");
  }

  if (typeof nama_jurusan === "string") {
    nama_jurusan = nama_jurusan.trim();
  }

  await addJurusan(nama_jurusan);
}

async function editJurusan(id_jurusan, nama_jurusan) {
  if (!id_jurusan || !nama_jurusan) {
    throw new BadRequetError("id jurusan dan nama jurusan wajib diisi");
  }

  if (typeof id_jurusan === "string") {
    id_jurusan = parseInt(id_jurusan);
  } else {
    return id_jurusan;
  }

  if (typeof nama_jurusan === "string") {
    nama_jurusan = nama_jurusan.trim();
  }

  await updatJurusan(id_jurusan, nama_jurusan);
}

export { showJurusan, saveJurusan, editJurusan };
