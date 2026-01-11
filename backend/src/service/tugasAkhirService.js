import ConflictError from "../error/ConflictError.js";
import { findMahasiswaIdByAccountId } from "../model/mahasiswaModel.js";
import { findPegawaiIdByAccountId } from "../model/pegawaiModel.js";
import {
  getTugasAkhir,
  getTugasAkhirById,
  getTugasAkhirByMhsId,
  getStatusTugasAkhirByMhsId,
  addTugasAkhir,
  updateTugasAkhir,
  updateStatusTugasAkhir,
} from "../model/tugasAkhirModel.js";

async function showTugasAkhir() {
  const result = await getTugasAkhir();
  if (result.length === 0) {
    throw new ConflictError("Data tugas akhir tidak ditemukan");
  }

  return result;
}

async function showTugasAkhirById(taId) {
  const result = await getTugasAkhirById(taId);
  if (!result) {
    throw new ConflictError("Data tugas akhir tidak ditemukan");
  }

  return result;
}

async function showTugasAkhirByMhsId(accountId) {
  const mhsId = await findMahasiswaIdByAccountId(accountId);
  const result = await getTugasAkhirByMhsId(mhsId.id_mhs);

  if (!mhsId) {
    throw new ConflictError("Data mahasiswa tidak ditemukan");
  }

  if (!result) {
    throw new ConflictError("Data tugas akhir tidak ditemukan");
  }

  return result;
}

async function showStatusTugasAkhirByMhsId(accountId) {
  const mhsId = await findMahasiswaIdByAccountId(accountId);
  const result = await getStatusTugasAkhirByMhsId(mhsId.id_mhs);

  if (!mhsId) {
    throw new ConflictError("Data mahasiswa tidak ditemukan");
  }

  if (!result) {
    throw new ConflictError("Data tugas akhir tidak ditemukan");
  }

  return result;
}

async function saveTugasAkhir(
  accountId,
  lembarPersetujuan,
  lembarPengesahan,
  lembarKonsul1,
  lembarKonsul2,
  lembarRevisi
) {
  const mhsId = await findMahasiswaIdByAccountId(accountId);
  if (!mhsId) {
    throw new ConflictError("Data mahasiswa tidak ditemukan");
  }

  await addTugasAkhir(
    mhsId.id_mhs,
    lembarPersetujuan,
    lembarPengesahan,
    lembarKonsul1,
    lembarKonsul2,
    lembarRevisi
  );
}

async function editTugasAkhir(
  accountId,
  lembarPersetujuan,
  lembarPengesahan,
  lembarKonsul1,
  lembarKonsul2,
  lembarRevisi,
  taId
) {
  const mhsId = await findMahasiswaIdByAccountId(accountId);
  if (!mhsId) {
    throw new ConflictError("Data mahasiswa tidak ditemukan");
  }

  const existingTugasAkhirByTaId = await getTugasAkhirById(taId);
  const existingTugasAkhirByMhsId = await getStatusTugasAkhirByMhsId(
    mhsId.id_mhs
  );

  if (!existingTugasAkhirByTaId) {
    throw new ConflictError("Data tugas akhir tidak ditemukan");
  }

  if (!existingTugasAkhirByMhsId) {
    throw new ConflictError("Data tugas akhir tidak ditemukan");
  }

  await updateTugasAkhir(
    mhsId.id_mhs,
    lembarPersetujuan,
    lembarPengesahan,
    lembarKonsul1,
    lembarKonsul2,
    lembarRevisi,
    taId
  );
}

async function editStatusTugasAkhir(accountId, rincian, status, taId) {
  const pegawaiId = await findPegawaiIdByAccountId(accountId);
  const existingTugasAkhirByTaId = await getTugasAkhirById(taId);

  if (!existingTugasAkhirByTaId) {
    throw new ConflictError("Data tugas akhir tidak ditemukan");
  }
  if (!pegawaiId) {
    throw new ConflictError("Data pegawai tidak ditemukan");
  }

  await updateStatusTugasAkhir(pegawaiId.id_pegawai, rincian, status, taId);
}

export {
  showTugasAkhir,
  showTugasAkhirById,
  showStatusTugasAkhirByMhsId,
  showTugasAkhirByMhsId,
  saveTugasAkhir,
  editTugasAkhir,
  editStatusTugasAkhir,
};
