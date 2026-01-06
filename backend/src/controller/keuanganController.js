import fs from "fs";
import BadRequestError from "../error/BadRequestError.js";
import {
  showKeuangan,
  showKeuanganById,
  saveKeuangan,
  editKeuangan,
} from "../service/keuanganService.js";
import { getKeuanganById } from "../model/keuanganModel.js";

async function presentKeuangan(req, res, next) {
  try {
    const result = await showKeuangan();

    return res.status(200).json({ status: 200, data: result });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

async function presentKeuanganById(req, res, next) {
  try {
    const keuanganId = req.params.id_keuangan;
    const result = await showKeuanganById(keuanganId);

    return res.status(200).json({ status: 200, data: result });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

async function newKeuangan(req, res, next) {
  try {
    const keuanganPath = req.file ? req.file.path : null;

    if (!keuanganPath) {
      throw new BadRequestError("File keuangan tidak boleh kosong");
    }

    await saveKeuangan(keuanganPath);
    return res
      .status(201)
      .json({ status: 201, message: "Berhasil menambahkan data keuangan" });
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

async function changeKeuangan(req, res, next) {
  try {
    const keuanganId = req.params.id_keuangan;
    const keuanganPath = req.file ? req.file.path : null;
    const existingKeuangan = getKeuanganById(keuanganId);

    if (!keuanganPath) {
      throw new BadRequestError("File keuangan tidak boleh kosong");
    }

    await editKeuangan(keuanganPath, keuanganId);

    if (req.file && existingKeuangan.dokumen_keuangan) {
      fs.unlink(existingKeuangan.dokumen_keuangan, (error) => {
        if (error) {
          console.log("Gagal menghapus file keuangan lama: ", error);
        }
      });
    }
    return res
      .status(201)
      .json({ status: 200, message: "Berhasil mengubah data keuangan" });
  } catch (err) {
    if (req.file) {
      fs.unlink(req.file.path, () => {});
    }

    console.log(err);
    next(err);
  }
}

export { presentKeuangan, presentKeuanganById, newKeuangan, changeKeuangan };
