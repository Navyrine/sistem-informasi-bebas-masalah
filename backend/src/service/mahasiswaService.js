import ConflictError from "../error/ConflictError.js";
import BadRequestError from "../error/BadRequestError.js";
import { getProdiId } from "../model/prodiModel.js";
import {
  getMahasiswa,
  getMahasiswabyId,
  addMahasiswa,
  updateMahasiswa,
  deleteMahasiswa,
} from "../model/mahasiswaModel.js";

async function showMahasiswa() {
  const result = await getMahasiswa();

  if (result.length === 0) {
    throw new ConflictError("Data mahasiswa tidak ada");
  }

  return result;
}

async function showMahasiswaById(idMhs) {
  const result = await getMahasiswabyId(idMhs);

  if (!result) {
    throw new ConflictError("Data mahasiswa tidak ada");
  }

  return result;
}

async function saveMahasiswa(
  prodiId,
  nim,
  namaMhs,
  noTelp,
  alamat,
  tahunLulus
) {
  const existingProdi = await getProdiId(id_prodi);

  if (!existingProdi) {
    throw new ConflictError("Data prodi tidak ditemukan");
  }

  if (!prodiId) {
    throw new BadRequestError("Id prodi tidak boleh kosong");
  }

  if (!nim) {
    throw new BadRequestError("Nim tidak boleh kosong");
  }

  if (nim.length > 10) {
    throw new BadRequestError("Panjang nim telepon tidak boleh lebih dari 13");
  }

  if (!namaMhs) {
    throw new BadRequestError("Nama mahasiswa tidak boleh kosong");
  }

  if (!noTelp) {
    throw new BadRequestError("Nomor telpon tidak boleh kosong");
  }

  if (noTelp.length > 13) {
    throw new BadRequestError(
      "Panjang nomor telepon tidak boleh lebih dari 13"
    );
  }

  if (!alamat) {
    throw new BadRequestError("Alamat tidak boleh kosong");
  }

  if (!tahunLulus) {
    throw new BadRequestError("Tahun lulus tidak boleh kosong");
  }

  nim = nim.trim();
  namaMhs = namaMhs.trim();
  noTelp = noTelp.trim();
  alamat = alamat.trim();

  await addMahasiswa(prodiId, nim, namaMhs, noTelp, alamat);
}

async function editMahasiswa(idMhs, updateBody) {
  const existingMhs = await getMahasiswabyId(idMhs);

  if (!existingMhs) {
    throw new ConflictError("Data mahasiswa tidak ditemukan");
  }

  updateBody.nama_prodi = updateBody.nama_prodi.toLowerCase().trim();
  updateBody.nim = updateBody.nim.trim();
  updateBody.nama_mhs = updateBody.nama_mhs.trim();
  updateBody.no_telp = updateBody.no_telp.trim();
  updateBody.alamat = updateBody.alamat.trim();

  const prodiId = existingMhs.id_prodi;

  if (updateBody.nama_prodi) {
    const prodi = await getProdiId(updateBody.nama_prodi);

    if (!prodi) {
      throw new ConflictError("Prodi tidak ditemukan");
    }
    prodiId = prodi.id_prodi;
  }

  const updateData = {
    id_prodi: prodiId,
    nim_mhs: updateBody.nim ?? existingMhs.nim,
    nama_mhs: updateBody.nama_mhs ?? existingMhs.nama_mhs,
    no_telp: updateBody.no_telp ?? existingMhs.no_telp,
    alamat: updateBody.alamat ?? existingMhs.alamat,
  };

  await updateProdi(prodiId, updateData);
}

async function removeMahasiswa(mhsId) {
  mhsId = parseInt(mhsId);

  await deleteMahasiswa(mhsId);
}

export {
  showMahasiswa,
  showMahasiswaById,
  saveMahasiswa,
  editMahasiswa,
  removeMahasiswa,
};
