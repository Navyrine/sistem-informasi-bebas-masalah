import { findMahasiswaIdByAccountId } from "../model/mahasiswaModel.js";
import ConflictError from "../error/ConflictError.js";
import {
  getKeuangan,
  getKeuanganById,
  addKeuangan,
  updateKeuangan,
} from "../model/keuanganModel.js";

async function showKeuangan() {
  const result = await getKeuangan();
  if (result.length === 0) {
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

async function saveKeuangan(accountId, dokumenKeuangan) {
  const mhsId = findMahasiswaIdByAccountId(accountId);
  await addKeuangan(mhsId.id_mhs, dokumenKeuangan);
}

async function editKeuangan(accountId, dokumenKeuangan, keuanganId) {
  const mhsId = findMahasiswaIdByAccountId(accountId);
  await updateKeuangan(mhsId.id_mhs, dokumenKeuangan, keuanganId);
}

export { showKeuangan, showKeuanganById, saveKeuangan, editKeuangan };
