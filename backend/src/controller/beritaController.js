import {
  showBerita,
  showBeritaById,
  saveBerita,
  editBerita,
  removeBerita,
} from "../service/beritaService.js";

async function presentBerita(req, res, next) {
  try {
    const result = await showBerita();

    return res.status(200).json({ status: 200, data: result });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

async function presentBeritaById(req, res, next) {
  try {
    const beritaId = req.params.id_berita;
    const result = await showBeritaById(beritaId);

    return res.status(200).json({ status: 200, data: result });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

async function newBerita(req, res, next) {
  try {
    const { judul, konten } = req.body;
    const gambarPath = req.file ? req.file.path : null;

    await saveBerita(judul, konten, gambarPath);
  } catch (err) {
    console.log(err);
    next(err);
  }
}

async function changeBerita(req, res, next) {
  try {
    const beritaId = req.params.id_berita;
    const { judul, konten } = req.body;
    const gambarPath = req.file ? req.file.path : null;

    await editBerita(beritaId, judul, konten, gambarPath);
  } catch (err) {
    console.log(err);
    next(err);
  }
}

async function remove(req, res, next) {
  try {
    const beritaId = req.params.id_berita;

    await removeBerita(beritaId);
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export { presentBerita, presentBeritaById, newBerita, changeBerita, remove };
