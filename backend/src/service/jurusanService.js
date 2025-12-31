import {
  getJurusan,
  getJurusanId,
  getAllNamaJurusan,
  addJurusan,
  updateJurusan,
} from "../model/jurusanModel.js";
import ConflictError from "../error/ConflictError.js";
import BadRequetError from "../error/BadRequestError.js";

async function showJurusan() {
  const result = await getJurusan();

  if (result.length === 0) {
    throw new ConflictError("Data kosong");
  } else {
    return result;
  }
}

async function showJurusanId(nama_jurusan) {
  const result = await getJurusanId(nama_jurusan);

  if (result.length === 0) {
    throw new ConflictError("Id jurusan tidak ditemukan");
  } else {
    return result;
  }
}

async function showAllNamaJurusan() {
  const result = await getAllNamaJurusan();

  if (result.length === 0) {
    throw new ConflictError("Nama jurusan tidak ditemukan");
  } else {
    return result;
  }
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

  await updateJurusan(id_jurusan, nama_jurusan);
}

export {
  showJurusan,
  showJurusanId,
  showAllNamaJurusan,
  saveJurusan,
  editJurusan,
};
