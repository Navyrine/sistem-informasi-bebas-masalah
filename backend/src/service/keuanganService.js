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

async function saveKeuangan(mhsId, dokumenKeuangan) {
  await addKeuangan(mhsId, dokumenKeuangan);
}

async function editKeuangan(keuanganId, dokumenKeuangan) {
  await updateKeuangan(dokumenKeuangan, keuanganId);
}

export { showKeuangan, showKeuanganById, saveKeuangan, editKeuangan };
