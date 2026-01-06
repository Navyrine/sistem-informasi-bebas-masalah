import BadRequestError from "../error/BadRequestError.js";
import { getPerpustakaanById } from "../model/perpustakaanModel.js";
import {
  showPerpustakaan,
  showPerpustakaanById,
  savePerpustakaan,
  editPerpustakaan,
} from "../service/perpustakaanService.js";

async function presentPerpustakaan(req, res, next) {
  try {
    const result = await showPerpustakaan();

    return res.status(200).json({ status: 200, data: result });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

async function presentPerpustakaanById(req, res, next) {
  try {
    const perpusId = req.params.id_perpus;
    const result = await showPerpustakaanById(perpusId);

    return res.status(200).json({ status: 200, data: result });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

async function newPerpustakaan(req, res, next) {
  try {
    const perpusFilePath = req.file ? req.file.path : null;

    await savePerpustakaan(perpusFilePath);
    return res
      .status(201)
      .json({ status: 201, message: "Berhasil menambahkan data perpustakaan" });
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

async function changePerpustakaan(req, res, next) {
  try {
    const perpusId = req.params.id_perpus;
    const perpusFilePath = req.file ? req.file.path : null;
    const existingPerpus = getPerpustakaanById(perpusId);

    if (!perpusFilePath) {
      throw new BadRequestError("Dokumen perpustakaan tidak boleh kosong");
    }

    await editPerpustakaan(perpusId, perpusFilePath);

    if (req.file && existingPerpus.dokumen_perpus) {
      fs.unlink(existingKeuangan.dokumen_perpus, (error) => {
        if (error) {
          console.log("Gagal menghapus file perpustakaan lama: ", error);
        }
      });
    }
    return res
      .status(201)
      .json({ status: 200, message: "Berhasil mengubah data perpustakaan" });
  } catch (err) {
    if (req.file) {
      fs.unlink(req.file.path, () => {});
    }

    console.log(err);
    next(err);
  }
}

export {
  presentPerpustakaan,
  presentPerpustakaanById,
  newPerpustakaan,
  changePerpustakaan,
};
