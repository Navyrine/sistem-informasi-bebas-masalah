import ConflictError from "../error/ConflictError.js";
import { findMahasiswaIdByAccountId } from "../model/mahasiswaModel.js";
import { findPegawaiIdByAccountId } from "../model/pegawaiModel.js";
import {
  getTugasAkhir,
  getTugasAkhirById,
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

async function saveTugasAkhir(
  accountId,
  lembarPersetujuan,
  lembarPengesahan,
  lembarKonsul1,
  lembarKonsul2,
  lembarRevisi
) {
  const mshId = await findMahasiswaIdByAccountId(accountId);
  await addTugasAkhir(
    mshId.id_mhs,
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
  await updateStatusTugasAkhir(pegawaiId.id_pegawai, rincian, status, taId);
}

export {
  showTugasAkhir,
  showTugasAkhirById,
  saveTugasAkhir,
  editTugasAkhir,
  editStatusTugasAkhir,
};
