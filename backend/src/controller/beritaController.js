import fs from "fs";
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
    let beritaId = req.params.id_berita;
    beritaId = parseInt(beritaId);

    const result = await showBeritaById(beritaId);
    return res.status(200).json({ status: 200, data: result });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

async function newBerita(req, res, next) {
  try {
    let accountId = req.user.id;
    let { judul, konten } = req.body;

    if (!judul) {
      throw new BadRequestError("Judul tidak boleh kosong");
    }

    if (!konten) {
      throw new BadRequestError("Konten tidak boleh kosong");
    }

    if (!req.file) {
      throw new BadRequestError("Gambar tidak boleh kosong");
    }

    let gambarPath = req.file ? req.file.path : null;

    accountId = parseInt(accountId);
    judul = judul.trim();
    konten = konten.trim();

    await saveBerita(accountId, judul, konten, gambarPath);
    return res
      .status(201)
      .json({ status: 201, message: "Berhasil menambahkan berita" });
  } catch (err) {
    if (req.file) {
      fs.unlink(req.file.path, (unlinkErr) => {
        if (unlinkErr) {
          console.log("Gagal menghapus file: ", unlinkErr);
        }
      });
    }

    console.log(err);
    next(err);
  }
}

async function changeBerita(req, res, next) {
  try {
    let accountId = req.user.id;
    let beritaId = req.params.id_berita;
    let { judul, konten } = req.body;
    let existingBerita = await showBeritaById(beritaId);
    let gambarPath = req.file ? req.file.path : null;

    if (!judul) {
      throw new BadRequestError("Judul tidak boleh kosong");
    }

    if (!konten) {
      throw new BadRequestError("Konten tidak boleh kosong");
    }

    if (!existingBerita) {
      throw new ConflictError("Data berita tidak ditemukan");
    }

    if (!req.file) {
      gambarPath = existingBerita.gambar;
    }

    accountId = parseInt(accountId);
    judul = judul.trim();
    konten = konten.trim();
    beritaId = parseInt(beritaId);

    await editBerita(accountId, judul, konten, gambarPath, beritaId);

    if (req.file && existingBerita.gambar) {
      fs.unlink(existingBerita.gambar, (error) => {
        if (error) {
          console.log("Gagal menghapus gambar lama: ", error);
        }
      });
    }

    return res
      .status(200)
      .json({ status: 200, message: "Berhasil mengubah data berita" });
  } catch (err) {
    if (req.file) {
      fs.unlink(req.file.path, () => {});
    }
    console.log(err);
    next(err);
  }
}

async function remove(req, res, next) {
  try {
    let beritaId = req.params.id_berita;
    beritaId = parseInt(beritaId);

    await removeBerita(beritaId);
    return res
      .status(201)
      .json({ status: 201, message: "Berhasil menghapus data berita" });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export { presentBerita, presentBeritaById, newBerita, changeBerita, remove };
