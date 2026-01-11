import ConflictError from "../error/ConflictError.js";
import { findMahasiswaIdByAccountId } from "../model/mahasiswaModel.js";
import { findPegawaiIdByAccountId } from "../model/pegawaiModel.js";
import {
  getKeuangan,
  getKeuanganById,
  getKeuanganByMhsId,
  getStatusKeuanganByMhsId,
  addKeuangan,
  updateKeuangan,
  updateStatusKeuangan,
} from "../model/keuanganModel.js";

async function showKeuangan() {
  const result = await getKeuangan();
  if (result.length === 0) {
    throw new ConflictError("Data keuangan tidak ditemukan");
  }

  return result;
}

async function showStatusKeuanganByMhsId(accountId) {
  const mhsId = await findMahasiswaIdByAccountId(accountId);
  const result = await getStatusKeuanganByMhsId(mhsId.id_mhs);

  if (!result) {
    throw new ConflictError("Data keuangan tidak ditemukan");
  }

  return result;
}

async function showKeuanganById(keuanganId) {
  const result = await getKeuanganById(keuanganId);
  if (!result) {
    throw new ConflictError("Data keuangan tidak ditemukan");
  }

  return result;
}

async function showKeuanganByMhsId(accountId) {
  const mhsId = await findMahasiswaIdByAccountId(accountId);
  const result = await getKeuanganByMhsId(mhsId.id_mhs);

  if (!result) {
    throw new ConflictError("Data keuangan tidak ditemukan");
  }

  return result;
}

async function saveKeuangan(accountId, dokumenKeuangan) {
  const mhsId = await findMahasiswaIdByAccountId(accountId);
  await addKeuangan(mhsId.id_mhs, dokumenKeuangan);
}

async function editKeuangan(accountId, dokumenKeuangan, keuanganId) {
  const existingKeuanganByKeuanganId = await getKeuanganById(keuanganId);
  const mhsId = await findMahasiswaIdByAccountId(accountId);
  const existingKeuanganByMhsId = await getKeuanganByMhsId(mhsId.id_mhs);

  if (!existingKeuanganByKeuanganId) {
    throw new ConflictError("Data keuangan tidak ditemukan");
  }

  if (!mhsId) {
    throw new ConflictError("Data mahasiswa tidak ditemukan");
  }

  if (!existingKeuanganByMhsId) {
    throw new ConflictError("Data keuangan tidak ditemukan");
  }

  await updateKeuangan(mhsId.id_mhs, dokumenKeuangan, keuanganId);
}

async function editStatusKeuangan(accountId, rincian, status, keuanganId) {
  const existingKeuangan = await getKeuanganById(keuanganId);
  const pegawaiId = await findPegawaiIdByAccountId(accountId);

  if (!existingKeuangan) {
    throw new ConflictError("Data keuangan tidak ditemukan");
  }

  if (!pegawaiId) {
    throw new ConflictError("Data pegawai tidak ditemukan");
  }

  await updateStatusKeuangan(pegawaiId.id_pegawai, rincian, status, keuanganId);
}

export {
  showKeuangan,
  showKeuanganById,
  showKeuanganByMhsId,
  showStatusKeuanganByMhsId,
  saveKeuangan,
  editKeuangan,
  editStatusKeuangan,
};
