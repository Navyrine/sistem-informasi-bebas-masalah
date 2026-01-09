import ConflictError from "../error/ConflictError.js";
import BadRequestError from "../error/BadRequestError.js";
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
  if (!judul) {
    throw new BadRequestError("Judul tidak boleh kosong");
  }

  if (!konten) {
    throw new BadRequestError("Konten tidak boleh kosong");
  }

  if (!gambar) {
    throw new BadRequestError("Gambar tidak boleh kosong");
  }

  accountId = parseInt(accountId);
  judul = judul.trim();
  konten = konten.trim();

  const pegawaiId = await findPegawaiIdByAccountId(accountId);
  await addBerita(pegawaiId.id_pegawai, judul, konten, gambar);
}

async function editBerita(accountId, judul, konten, gambar, beritaId) {
  if (!judul) {
    throw new BadRequestError("Judul tidak boleh kosong");
  }

  if (!konten) {
    throw new BadRequestError("Konten tidak boleh kosong");
  }

  const existingBerita = await getBeritaById(beritaId);

  if (!existingBerita) {
    throw new ConflictError("Data berita tidak ditemukan");
  }

  accountId = parseInt(accountId);
  judul = judul.trim();
  konten = konten.trim();
  beritaId = parseInt(beritaId);

  if (!gambar) {
    gambar = existingBerita.gambar;
  }

  const pegawaiId = await findPegawaiIdByAccountId(accountId);
  await updateBerita(pegawaiId.id_pegawai, judul, konten, gambar, beritaId);
}

async function removeBerita(beritaId) {
  beritaId = parseInt(beritaId);

  await deleteBerita(beritaId);
}

export { showBerita, showBeritaById, saveBerita, editBerita, removeBerita };
