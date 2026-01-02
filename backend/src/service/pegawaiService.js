import ConflictError from "../error/ConflictError";
import BadRequestError from "../error/BadRequestError";
import {
  getPegawai,
  getPegawaiById,
  getPegawaiId,
  addPegawai,
  updatePegawai,
  deletePegawai,
} from "../model/pegawaiModel";

async function showPegawai() {
  const result = await getPegawai();

  if (result.length === 0) {
    throw new ConflictError("Data pegawai tidak ditemukan");
  }

  return result;
}

async function showPegawaiById(pegawaiId) {
  const result = await getPegawaiById(pegawaiId);

  if (!pegawaiId) {
    throw new ConflictError("Data pegawai tidak ditemukan");
  }

  return result;
}

async function showPegawaiId(namaPegawai) {
  if (!namaPegawai) {
    throw new BadRequestError("Nama pegawai tidak boleh kosong");
  }

  namaPegawai = namaPegawai.toLowerCase().trim();

  const result = await getPegawaiId(namaPegawai);

  return result;
}

async function newPegawai(namaPegawai, noTelp, alamat) {
  if (!namaPegawai || !noTelp || !alamat) {
    throw new BadRequestError(
      "Nama pegawai atau no telp atau alamat tidak boleh kosong"
    );
  }

  if (noTelp.length > 13) {
    throw new BadRequestError("Panjang no telp tidak boleh lebih dari 13");
  }

  namaPegawai = namaPegawai.trim();
  noTelp = noTelp.trim();
  alamat = alamat.trim();

  await addPegawai(namaPegawai, noTelp, alamat);
}

async function editPegawai(pegawaiId, namaPegawai, noTelp, alamat) {
  const existingPegawai = getPegawaiById(pegawaiId);

  if (!existingPegawai) {
    throw new ConflictError("Data pegawai tidak ditemukan");
  }

  if (!namaPegawai || !noTelp || !alamat) {
    throw new BadRequestError(
      "Nama pegawai atau no telp atau alamat tidak boleh kosong"
    );
  }

  pegawaiId = parseInt(pegawaiId);
  namaPegawai = namaPegawai.trim();
  noTelp = noTelp.trim();
  alamat = alamat.trim();

  await updatePegawai(pegawaiId, namaPegawai, noTelp, alamat);
}

async function removePegawai(pegawaiId) {
  pegawaiId = parseInt(pegawaiId);

  await deletePegawai(pegawaiId);
}

export {
  showPegawai,
  showPegawaiById,
  showPegawaiId,
  newPegawai,
  editPegawai,
  removePegawai,
};
