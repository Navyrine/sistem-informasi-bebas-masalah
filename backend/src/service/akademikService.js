import ConflictError from "../error/ConflictError.js";
import { findMahasiswaIdByAccountId } from "../model/mahasiswaModel.js";
import { findPegawaiIdByAccountId } from "../model/pegawaiModel.js";
import {
  getAkademik,
  getAkademikById,
  getStatusAkademikById,
  addAkademik,
  updateAkademik,
  updateStatusAkademik,
} from "../model/akademikModel.js";

async function showAkademik() {
  const result = await getAkademik();
  if (result.length === 0) {
    throw new ConflictError("Data akademik tidak ditemukan");
  }

  return result;
}

async function showAkademikById(akademikId) {
  const result = await getAkademikById(akademikId);
  if (!result) {
    throw new ConflictError("Data akademik tidak ditemukan");
  }

  return result;
}

async function showStatusAkademikById(akademikId) {
  const result = await getStatusAkademikById(akademikId);
  if (!result) {
    throw new ConflictError("Data akademik tidak ditemukan");
  }

  return result;
}

async function saveAkademik(
  accountId,
  khsSem1,
  khsSem2,
  khsSem3,
  khsSem4,
  khsSem5,
  khsSem6,
  lembarSp
) {
  const mhsId = await findMahasiswaIdByAccountId(accountId);
  await addAkademik(
    mhsId.id_mhs,
    khsSem1,
    khsSem2,
    khsSem3,
    khsSem4,
    khsSem5,
    khsSem6,
    lembarSp
  );
}

async function editAkademik(
  accountId,
  khsSem1,
  khsSem2,
  khsSem3,
  khsSem4,
  khsSem5,
  khsSem6,
  lembarSp,
  akademikId
) {
  const mhsId = await findMahasiswaIdByAccountId(accountId);
  const existingAkademik = await getAkademikById(akademikId);

  if (!existingAkademik) {
    throw new ConflictError("Data akademik tidak ditemukan");
  }
  await updateAkademik(
    mhsId.id_mhs,
    khsSem1,
    khsSem2,
    khsSem3,
    khsSem4,
    khsSem5,
    khsSem6,
    lembarSp,
    akademikId
  );
}

async function editStatusAkademik(accountId, rincian, status, akademikId) {
  const pegawaiId = await findPegawaiIdByAccountId(accountId);
  const existingAkademik = await getAkademikById(akademikId);

  if (!existingAkademik) {
    throw new ConflictError("Data akademik tidak ditemukan");
  }
  await updateStatusAkademik(pegawaiId.id_pegawai, rincian, status, akademikId);
}

export {
  showAkademik,
  showAkademikById,
  showStatusAkademikById,
  saveAkademik,
  editAkademik,
  editStatusAkademik,
};
