import ConflictError from "../error/ConflictError.js";
import {
  getBerita,
  getBeritaById,
  addBerita,
  updateBerita,
  deleteBerita,
} from "../model/beritaModel.js";
import { findPegawaiIdByAccountId } from "../model/pegawaiModel.js";

async function showBerita() {
  const result = await getBerita();
  if (result.length === 0) {
    throw new ConflictError("Data berita tidak ditemukan");
  }

  return result;
}

async function showBeritaById(beritaId) {
  const result = await getBeritaById(beritaId);
  if (!result) {
    throw new ConflictError("Data berita tidak ditemukan");
  }

  return result;
}

async function saveBerita(accountId, judul, konten, gambar) {
  const pegawaiId = await findPegawaiIdByAccountId(accountId);
  await addBerita(pegawaiId.id_pegawai, judul, konten, gambar);
}

async function editBerita(accountId, judul, konten, gambar, beritaId) {
  const pegawaiId = await findPegawaiIdByAccountId(accountId);
  await updateBerita(pegawaiId.id_pegawai, judul, konten, gambar, beritaId);
}

async function removeBerita(beritaId) {
  await deleteBerita(beritaId);
}

export { showBerita, showBeritaById, saveBerita, editBerita, removeBerita };
