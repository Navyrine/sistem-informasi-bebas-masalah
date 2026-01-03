import multer from "multer";
import path from "path";
import ConflictError from "../error/ConflictError.js";
import BadRequestError from "../error/BadRequestError.js";
import {
  getBerita,
  getBeritaById,
  addBerita,
  updateBerita,
  deleteBerita,
} from "../model/beritaModel.js";

const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, "../upload/gambar-berita");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      Date.now() + path.extname(file.originalname) + "." + file.mimetype
    );
  },
});
const image = multer({ storage });

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

async function saveBerita(judul, konten, gambar) {
  if (!judul) {
    throw new BadRequestError("Judul tidak boleh kosong");
  }

  if (!konten) {
    throw new BadRequestError("Konten tidak boleh kosong");
  }

  if (!gambar) {
    throw new BadRequestError("Gambar tidak boleh kosong");
  }

  judul = judul.trim();
  konten = konten.trim();

  await addBerita(judul, konten, gambar);
}

async function editBerita(beritaId, judul, konten, gambar) {
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

  beritaId = parseInt(beritaId);
  judul = judul.trim();
  konten = konten.trim();

  if (gambar === null || gambar === "") {
    gambar = existingBerita.gambar;
  }

  await updateBerita(beritaId, judul, konten, gambar);
}

async function removeBerita(beritaId) {
  beritaId = parseInt(beritaId);

  await deleteBerita(beritaId);
}

export { showBerita, showBeritaById, saveBerita, editBerita, removeBerita };
