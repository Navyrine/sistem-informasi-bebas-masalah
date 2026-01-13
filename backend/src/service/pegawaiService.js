import ConflictError from "../error/ConflictError.js";
import {
  getPegawai,
  getPegawaiById,
  addPegawai,
  updatePegawai,
  deletePegawai,
} from "../model/pegawaiModel.js";

async function showPegawai() {
  const result = await getPegawai();
  if (result.length === 0) {
    throw new ConflictError("Data pegawai tidak ditemukan");
  }

  return result;
}

async function showPegawaiById(pegawaiId) {
  const result = await getPegawaiById(pegawaiId);
  if (!result) {
    throw new ConflictError("Data pegawai tidak ditemukan");
  }

  return result;
}

async function savePegawai(namaPegawai, noTelp, alamat) {
  await addPegawai(namaPegawai, noTelp, alamat);
}

async function editPegawai(pegawaiId, namaPegawai, noTelp, alamat) {
  const existingPegawai = await getPegawaiById(pegawaiId);
  if (!existingPegawai) {
    throw new ConflictError("Data pegawai tidak ditemukan");
  }

  await updatePegawai(pegawaiId, namaPegawai, noTelp, alamat);
}

async function removePegawai(pegawaiId) {
  const existingPegawai = await getPegawaiById(pegawaiId);
  if (!existingPegawai) {
    throw new ConflictError("Data pegawai tidak ditemukan");
  }

  await deletePegawai(pegawaiId);
}

export {
  showPegawai,
  showPegawaiById,
  savePegawai,
  editPegawai,
  removePegawai,
};
