import fs from "fs";
import BadRequestError from "../error/BadRequestError.js";
import { getPerpustakaanById } from "../model/perpustakaanModel.js";
import {
  showPerpustakaan,
  showPerpustakaanById,
  savePerpustakaan,
  editPerpustakaan,
  editStatusPerpustakaan,
} from "../service/perpustakaanService.js";

async function presentPerpustakaan(req, res, next) {
  try {
    const result = await showPerpustakaan();

    return res.status(200).json({
      status: 200,
      data: result,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

async function presentPerpustakaanById(req, res, next) {
  try {
    let perpusId = req.params.id_perpus;
    perpusId = parseInt(perpusId);

    const result = await showPerpustakaanById(perpusId);
    return res.status(200).json({
      status: 200,
      data: result,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

async function newPerpustakaan(req, res, next) {
  try {
    let accountId = req.user.id;
    const perpusFilePath = req.file ? req.file.path : null;

    if (!req.file) {
      throw new BadRequestError("Dokumen perpus tidak boleh kosong");
    }

    accountId = parseInt(accountId);
    await savePerpustakaan(accountId, perpusFilePath);
    return res.status(201).json({
      status: 201,
      message: "Berhasil menambahkan data perpustakaan",
    });
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
    let perpusId = req.params.id_perpus;
    let accountId = req.user.id;
    const perpusFilePath = req.file ? req.file.path : null;
    const existingPerpus = getPerpustakaanById(perpusId);

    if (!req.file) {
      throw new BadRequestError("Dokumen perpustakaan tidak boleh kosong");
    }

    perpusId = parseInt(perpusId);
    accountId = parseInt(accountId);

    await editPerpustakaan(accountId, perpusFilePath, perpusId);

    if (req.file && existingPerpus.dokumen_perpus) {
      fs.unlink(existingKeuangan.dokumen_perpus, (error) => {
        if (error) {
          console.log("Gagal menghapus file perpustakaan lama: ", error);
        }
      });
    }
    return res.status(200).json({
      status: 200,
      message: "Berhasil mengubah data perpustakaan",
    });
  } catch (err) {
    if (req.file) {
      fs.unlink(req.file.path, () => {});
    }

    console.log(err);
    next(err);
  }
}

async function changeStatusPerpustakaan(req, res, next) {
  try {
    let perpusId = req.params.id_perpus;
    let accountId = req.user.id;
    let { rincian, status } = req.body;

    if (!rincian) {
      throw new BadRequestError("Rincian tidak boleh kosong");
    }

    if (!status) {
      throw new BadRequestError("Status tidak boleh kosong");
    }

    perpusId = parseInt(perpusId);
    accountId = parseInt(accountId);
    rincian = rincian.trim();
    status = status.trim();

    await editStatusPerpustakaan(accountId, rincian, status, perpusId);
    return res.status(200).json({
      status: 200,
      message: "Berhasil mengubah status perpustakaan",
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export {
  presentPerpustakaan,
  presentPerpustakaanById,
  newPerpustakaan,
  changePerpustakaan,
  changeStatusPerpustakaan,
};
