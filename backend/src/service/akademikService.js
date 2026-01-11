import ConflictError from "../error/ConflictError.js";
import { findMahasiswaIdByAccountId } from "../model/mahasiswaModel.js";
import { findPegawaiIdByAccountId } from "../model/pegawaiModel.js";
import {
  getAkademik,
  getAkademikById,
  getStatusAkademikByMhsId,
  getAkademikByMhsId,
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

async function showStatusAkademikByMhsId(accoundId) {
  const mhsId = await findMahasiswaIdByAccountId(accoundId);
  const result = await getStatusAkademikByMhsId(mhsId.id_mhs);

  if (!mhsId) {
    throw new ConflictError("Data mahasiswa tidak ditemukan");
  }

  if (!result) {
    throw new ConflictError("Data akademik tidak ditemukan");
  }

  return result;
}

async function showAkademikByMhsId(accountId) {
  const mhsId = await findMahasiswaIdByAccountId(accountId);
  const result = await getAkademikByMhsId(mhsId.id_mhs);

  if (!result) {
    throw new ConflictError("Data mahasiswa tidak ditemukan");
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
  if (!mhsId) {
    throw new ConflictError("Data mahasiswa tidak ditemukan");
  }

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
  const existingAkademikByAkademikId = await getAkademikById(akademikId);
  const mhsId = await findMahasiswaIdByAccountId(accountId);
  const existingAkademikByMhsId = await getAkademikByMhsId(mhsId.id_mhs);

  if (!existingAkademikByAkademikId) {
    throw new ConflictError("Data akademik tidak ditemukan");
  }

  if (!existingAkademikByMhsId) {
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
  const existingAkademik = await getAkademikById(akademikId);
  const pegawaiId = await findPegawaiIdByAccountId(accountId);

  if (!pegawaiId) {
    throw new ConflictError("Data pegawai tidak ditemukan");
  }

  if (!existingAkademik) {
    throw new ConflictError("Data akademik tidak ditemukan");
  }

  await updateStatusAkademik(pegawaiId.id_pegawai, rincian, status, akademikId);
}

export {
  showAkademik,
  showAkademikById,
  showStatusAkademikByMhsId,
  showAkademikByMhsId,
  saveAkademik,
  editAkademik,
  editStatusAkademik,
};
