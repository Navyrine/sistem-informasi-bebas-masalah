import ConflictError from "../error/ConflictError.js";
import { findMahasiswaIdByAccountId } from "../model/mahasiswaModel.js";
import { findPegawaiIdByAccountId } from "../model/pegawaiModel.js";
import {
  getPerpustakaan,
  getPerpustakaanById,
  addPerpustakaan,
  updatePerpustakaan,
  updateStatusPerpustakaan,
} from "../model/perpustakaanModel.js";

async function showPerpustakaan() {
  const result = await getPerpustakaan();
  if (result.length === 0) {
    throw new ConflictError("Data perpustakaan tidak ditemukan");
  }

  return result;
}

async function showPerpustakaanById(perpusId) {
  const result = await getPerpustakaanById(perpusId);
  if (!result) {
    throw new ConflictError("Data perpustakaan tidak ditemukan");
  }

  return result;
}

async function savePerpustakaan(accountId, dokumen_perpus) {
  const mhsId = await findMahasiswaIdByAccountId(accountId);
  await addPerpustakaan(mhsId.id_mhs, dokumen_perpus);
}

async function editPerpustakaan(accountId, dokumen_perpus, perpusId) {
  const mhsId = await findMahasiswaIdByAccountId(accountId);
  await updatePerpustakaan(mhsId.id_mhs, dokumen_perpus, perpusId);
}

async function editStatusPerpustakaan(accountId, rincian, status, perpusId) {
  const pegawaiId = await findPegawaiIdByAccountId(
    accountId,
    rincian,
    status,
    perpusId
  );
  await updateStatusPerpustakaan(
    pegawaiId.id_pegawai,
    rincian,
    status,
    perpusId
  );
}

export {
  showPerpustakaan,
  showPerpustakaanById,
  savePerpustakaan,
  editPerpustakaan,
  editStatusPerpustakaan,
};
