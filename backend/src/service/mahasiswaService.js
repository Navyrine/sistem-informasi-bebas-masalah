import ConflictError from "../error/ConflictError.js";
import { getProdiId } from "../model/prodiModel.js";
import { getStatusTugasAkhirByMhsId } from "../model/tugasAkhirModel.js";
import { getStatusKeuanganByMhsId } from "../model/keuanganModel.js";
import { getStatusPerpustakaanByMhsId } from "../model/perpustakaanModel.js";
import { getStatusAkademikByMhsId } from "../model/akademikModel.js";
import {
  getMahasiswa,
  getMahasiswabyId,
  addMahasiswa,
  updateMahasiswa,
  updateStatusMahasiswa,
  findMahasiswaIdByAccountId,
  findMahasiswaByNim,
  deleteMahasiswa,
} from "../model/mahasiswaModel.js";

async function showMahasiswa() {
  const result = await getMahasiswa();

  if (result.length === 0) {
    throw new ConflictError("Data mahasiswa tidak ada");
  }

  return result;
}

async function showMahasiswaById(mhsId) {
  const result = await getMahasiswabyId(mhsId);
  if (!result) {
    throw new ConflictError("Data mahasiswa tidak ada");
  }

  return result;
}

async function showProfileMahasiswa(accountId) {
  const mhsId = await findMahasiswaIdByAccountId(accountId);
  if (!mhsId) {
    throw new ConflictError("Data mahasiswa tidak ditemukan");
  }

  const result = await getMahasiswabyId(mhsId.id_mhs);
  if (!result) {
    throw new ConflictError("Data mahasiswa tidak ditemukan");
  }

  const statusTugasAkhir = await getStatusTugasAkhirByMhsId(mhsId.id_mhs);
  const statusKeuangan = await getStatusKeuanganByMhsId(mhsId.id_mhs);
  const statusPerpustakaan = await getStatusPerpustakaanByMhsId(mhsId.id_mhs);
  const statusAkademik = await getStatusAkademikByMhsId(mhsId.id_mhs);

  if (!statusTugasAkhir) {
    throw new ConflictError("Data tugas akhir tidak ditemukan");
  }

  if (!statusKeuangan) {
    throw new ConflictError("Data keuangan tidak ditemukan");
  }

  if (!statusPerpustakaan) {
    throw new ConflictError("Data perpustakaan tidak ditemukan");
  }

  if (!statusAkademik) {
    throw new ConflictError("Data akademik tidak ditemukan");
  }

  if (
    statusTugasAkhir.status === "bermasalah" &&
    statusKeuangan.status === "bermasalah" &&
    statusPerpustakaan.status === "bermasalah" &&
    statusAkademik.status === "bermasalah"
  ) {
    await updateStatusMahasiswa("bermasalah", mhsId.id_mhs);
  } else if (
    statusTugasAkhir.status === "bebas_masalah" &&
    statusKeuangan.status === "bebas_masalah" &&
    statusPerpustakaan.status === "bebas_masalah" &&
    statusAkademik.status === "bebas_masalah"
  ) {
    updateStatusMahasiswa("bebas_masalah", mhsId.id_mhs);
  }

  return result;
}

async function saveMahasiswa(
  namaProdi,
  nim,
  namaMhs,
  noTelp,
  alamat,
  tahunLulus
) {
  const prodiId = await getProdiId(namaProdi);
  const existingMhsByNim = await findMahasiswaByNim(nim);

  if (!prodiId) {
    throw new ConflictError("Data prodi tidak ditemukan");
  }

  if (existingMhsByNim) {
    throw new ConflictError("Nim mahasiswa telah terdaftar");
  }

  await addMahasiswa(
    prodiId.id_prodi,
    nim,
    namaMhs,
    noTelp,
    alamat,
    tahunLulus
  );
}

async function editMahasiswa(
  namaProdi,
  nim,
  namaMhs,
  noTelp,
  alamat,
  tahunLulus,
  mhsId
) {
  const prodiId = await getProdiId(namaProdi);
  const existingMhsById = await getMahasiswabyId(mhsId);
  const duplicateNim = await findMahasiswaByNim(nim, mhsId);

  if (!prodiId) {
    throw new ConflictError("Data prodi tidak ditemukan");
  }

  if (!existingMhsById) {
    throw new ConflictError("Data mahasiswa tidak ditemukan");
  }

  if (duplicateNim) {
    throw new ConflictError("Nim mahasiswa telah terdaftar");
  }

  await updateMahasiswa(
    prodiId.id_prodi,
    nim,
    namaMhs,
    noTelp,
    alamat,
    tahunLulus,
    mhsId
  );
}

async function removeMahasiswa(mhsId) {
  const existingMhsById = await getMahasiswabyId(mhsId);
  if (!existingMhsById) {
    throw new ConflictError("Data mahasiswa tidak ditemukan");
  }

  await deleteMahasiswa(mhsId);
}

export {
  showMahasiswa,
  showMahasiswaById,
  showProfileMahasiswa,
  saveMahasiswa,
  editMahasiswa,
  removeMahasiswa,
};
