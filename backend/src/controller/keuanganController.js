import fs from "fs";
import BadRequestError from "../error/BadRequestError.js";
import {
  showKeuangan,
  showKeuanganById,
  saveKeuangan,
  editKeuangan,
  editStatusKeuangan,
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
    keuanganId = parseInt(keuanganId);

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
    const accountId = req.user.id;

    if (!keuanganPath) {
      throw new BadRequestError("File keuangan tidak boleh kosong");
    }

    accountId = parseInt(accountId);
    await saveKeuangan(accountId, keuanganPath);
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
    let accountId = req.user.id;

    if (!keuanganPath) {
      throw new BadRequestError("File keuangan tidak boleh kosong");
    }

    accountId = parseInt(accountId);
    await editKeuangan(accountId, keuanganPath, keuanganId);

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

async function changeStatusKeuangan(req, res, next) {
  try {
    let keuanganId = req.params.id_keuangan;
    let accountId = req.user.id;
    let { rincian, status } = req.body;

    if (!rincian) {
      throw new BadRequestError("Rincian tidak boleh kosong");
    }

    if (!status) {
      throw new BadRequestError("Status tidak boleh kosong");
    }

    keuanganId = parseInt(keuanganId);
    accountId = parseInt(accountId);
    rincian = rincian.trim();
    status = status.trim();

    await editStatusKeuangan(accountId, rincian, status, keuanganId);
    return res.status(200).json({
      status: 200,
      message: "Berhasil mengubah status keuangan",
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export {
  presentKeuangan,
  presentKeuanganById,
  newKeuangan,
  changeKeuangan,
  changeStatusKeuangan,
};
