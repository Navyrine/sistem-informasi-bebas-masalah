import ConflictError from "../error/ConflictError.js";
import { findMahasiswaIdByAccountId } from "../model/mahasiswaModel.js";
import { findPegawaiIdByAccountId } from "../model/pegawaiModel.js";
import {
  getKeuangan,
  getKeuanganById,
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

async function showKeuanganById(keuanganId) {
  const result = await getKeuanganById(keuanganId);
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
  const mhsId = await findMahasiswaIdByAccountId(accountId);
  await updateKeuangan(mhsId.id_mhs, dokumenKeuangan, keuanganId);
}

async function editStatusKeuangan(accountId, rincian, status, keuanganId) {
  const pegawaiId = await findPegawaiIdByAccountId(accountId);
  await updateStatusKeuangan(pegawaiId.id_pegawai, rincian, status, keuanganId);
}

export {
  showKeuangan,
  showKeuanganById,
  saveKeuangan,
  editKeuangan,
  editStatusKeuangan,
};
