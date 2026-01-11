import ConflictError from "../error/ConflictError.js";
import { findMahasiswaIdByAccountId } from "../model/mahasiswaModel.js";
import { findPegawaiIdByAccountId } from "../model/pegawaiModel.js";
import {
  getPerpustakaan,
  getPerpustakaanById,
  getStatusPerpustakaanByMhsId,
  getPerpustakaanByMhsId,
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

async function showPerpustakaanStatusByMhsId(accountId) {
  const mhsId = await findMahasiswaIdByAccountId(accountId);
  const result = await getStatusPerpustakaanByMhsId(mhsId.id_mhs);

  if (!mhsId) {
    throw new ConflictError("Data mahasiswa tidak ditemukan");
  }

  if (!result) {
    throw new ConflictError("Data mahasiswa tidak ditemukan");
  }

  return result;
}

async function showPerpustakaanByMhsId(accountId) {
  const mhsId = await findMahasiswaIdByAccountId(accountId);
  const result = await getPerpustakaanByMhsId(mhsId.id_mhs);

  if (!mhsId) {
    throw new ConflictError("Data mahasiswa tidak ditemukan");
  }

  if (!result) {
    throw new ConflictError("Data keuangan tidak ditemukan");
  }

  return result;
}

async function savePerpustakaan(accountId, dokumen_perpus) {
  const mhsId = await findMahasiswaIdByAccountId(accountId);
  if (!mhsId) {
    throw new ConflictError("Data mahasiswa tidak ditemukan");
  }

  await addPerpustakaan(mhsId.id_mhs, dokumen_perpus);
}

async function editPerpustakaan(accountId, dokumen_perpus, perpusId) {
  const existingPerpusByPerpusId = await getPerpustakaanById(perpusId);
  const mhsId = await findMahasiswaIdByAccountId(accountId);
  const existingPerpusByMhsId = await getPerpustakaanByMhsId(mhsId.id_mhs);

  if (!existingPerpusByPerpusId) {
    throw new ConflictError("Data perpustakaan tidak ditemukan");
  }

  if (!existingPerpusByMhsId) {
    throw new ConflictError("Data perpustakaan tidak ditemukan");
  }

  await updatePerpustakaan(mhsId.id_mhs, dokumen_perpus, perpusId);
}

async function editStatusPerpustakaan(accountId, rincian, status, perpusId) {
  const existingPerpusByPerpusId = await getPerpustakaanById(perpusId);
  const pegawaiId = await findPegawaiIdByAccountId(
    accountId,
    rincian,
    status,
    perpusId
  );

  if (!existingPerpusByPerpusId) {
    throw new ConflictError("Data perpustakaan tidak ditemukan");
  }

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
  showPerpustakaanStatusByMhsId,
  showPerpustakaanByMhsId,
  savePerpustakaan,
  editPerpustakaan,
  editStatusPerpustakaan,
};
