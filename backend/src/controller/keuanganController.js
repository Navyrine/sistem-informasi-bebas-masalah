import BadRequestError from "../error/BadRequestError.js";
import {
  showKeuangan,
  showKeuanganById,
  saveKeuangan,
  editKeuangan,
} from "../service/keuanganService.js";

async function presentKeuangan(req, res, next) {
  try {
    const result = await showKeuangan();

    return res.status(200).json({ status: 200, data: result });
  } catch (err) {
    console.log(err);
    next(er);
  }
}

async function presentKeuanganById(req, res, next) {
  try {
    const keuanganId = req.params.id_keuangan;
    const result = await showKeuanganById(keuanganId);

    return res.status(200).json({ status: 200, data: result });
  } catch (err) {
    console.log(err);
    next(er);
  }
}

async function newKeuangan(req, res, next) {
  try {
    const keuanganPath = req.file?.keuangan?.path;

    if (!keuanganPath) {
      throw new BadRequestError("File keuangan tidak boleh kosong");
    }

    await saveKeuangan(keuanganPath);
    return res
      .status(201)
      .json({ status: 201, message: "Berhasil menambahkan data keuangan" });
  } catch (err) {
    console.log(err);
    next(er);
  }
}

async function changeKeuangan(req, res, next) {
  try {
    const keuanganId = req.params.id_keuangan;
    const keuanganPath = req.file?.keuangan?.path;

    if (!keuanganPath) {
      throw new BadRequestError("File keuangan tidak boleh kosong");
    }

    await editKeuangan(keuanganPath, keuanganId);
    return res
      .status(201)
      .json({ status: 200, message: "Berhasil mengubah data keuangan" });
  } catch (err) {
    console.log(err);
    next(er);
  }
}

export { presentKeuangan, presentKeuanganById, newKeuangan, changeKeuangan };
