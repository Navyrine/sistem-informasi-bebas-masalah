import fs from "fs";
import BadRequestError from "../error/BadRequestError.js";
import {
  showKeuangan,
  showKeuanganById,
  showKeuanganByMhsId,
  showStatusKeuanganByMhsId,
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

async function presentStatusKeuanganByMhsId(req, res, next) {
  try {
    let accountId = req.user.id;
    accountId = parseInt(accountId);

    const result = await showStatusKeuanganByMhsId(accountId);
    return res.status(200).json({
      status: 200,
      data: result,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

async function presentKeuanganById(req, res, next) {
  try {
    let keuanganId = req.params.id_keuangan;
    keuanganId = parseInt(keuanganId);

    const result = await showKeuanganById(keuanganId);
    return res.status(200).json({ status: 200, data: result });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

async function presentKeuanganByMhsId(req, res, next) {
  try {
    let accountId = req.user.id;
    accountId = parseInt(accountId);

    let result = await showKeuanganByMhsId(accountId);
    return res.status(200).json({
      status: 200,
      data: result,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

async function newKeuangan(req, res, next) {
  try {
    if (!req.file) {
      throw new BadRequestError("File keuangan tidak boleh kosong");
    }

    const keuanganPath = req.file ? req.file.path : null;
    let accountId = req.user.id;

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
    if (!req.file) {
      throw new BadRequestError("File keuangan tidak boleh kosong");
    }

    let keuanganId = req.params.id_keuangan;
    let accountId = req.user.id;
    const keuanganPath = req.file ? req.file.path : null;

    accountId = parseInt(accountId);
    keuanganId = parseInt(keuanganId);

    const existingKeuangan = getKeuanganById(keuanganId);
    await editKeuangan(accountId, keuanganPath, keuanganId);

    if (req.file && existingKeuangan.dokumen_keuangan) {
      fs.unlink(existingKeuangan.dokumen_keuangan, (error) => {
        if (error) {
          console.log("Gagal menghapus file keuangan lama: ", error);
        }
      });
    }
    return res.status(201).json({
      status: 200,
      message: "Berhasil mengubah data keuangan",
    });
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
    status = status.toLowerCase().trim();

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
  presentStatusKeuanganByMhsId,
  presentKeuanganById,
  presentKeuanganByMhsId,
  newKeuangan,
  changeKeuangan,
  changeStatusKeuangan,
};
