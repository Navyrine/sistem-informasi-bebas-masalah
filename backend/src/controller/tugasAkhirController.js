import fs from "fs";
import {
  showTugasAkhir,
  showTugasAkhirById,
  saveTugasAkhir,
  editTugasAkhir,
  editStatusTugasAkhir,
} from "../service/tugasAkhirService.js";
import BadRequestError from "../error/BadRequestError.js";

async function presentTugasAkhir(req, res, next) {
  try {
    const result = await showTugasAkhir();

    return res.status(200).json({
      status: 200,
      data: result,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

async function presentTugasAkhirById(req, res, next) {
  try {
    let taId = req.params.id_ta;
    taId = parseInt(taId);

    const result = await showTugasAkhirById(taId);
    return res.status(200).json({
      status: 200,
      data: result,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

async function newTugasAkhir(req, res, next) {
  try {
    let accountId = req.user.id;
    const lembarPersetujuanField = req.files["lembar_persetujuan"];
    const lembarPengesahanField = req.files["lembar_pengesahan"];
    const lembarKonsul1Field = req.files["lembar_konsul_1"];
    const lembarKonsul2Field = req.files["lembar_konsul_2"];
    const lembarRevisiField = req.files["lembar_revisi"];

    if (lembarPersetujuanField === undefined) {
      throw new BadRequestError("Lembar persetujuan wajib diisi");
    }

    if (lembarPengesahanField === undefined) {
      throw new BadRequestError("Lembar pengesahan wajib diisi");
    }

    if (lembarKonsul1Field === undefined) {
      throw new BadRequestError("Lembar konsul 1 wajib diisi");
    }

    if (lembarKonsul2Field === undefined) {
      throw new BadRequestError("Lembar konsul 2 wajib diisi");
    }

    if (lembarRevisiField === undefined) {
      throw new BadRequestError("Lembar revisi wajib diisi");
    }

    accountId = parseInt(accountId);

    const lembarPersetujuan = req.files["lembar_persetujuan"][0].path;
    const lembarPengesahan = req.files["lembar_pengesahan"][0].path;
    const lembarKonsul1 = req.files["lembar_konsul_1"][0].path;
    const lembarKonsul2 = req.files["lembar_konsul_2"][0].path;
    const lembarRevisi = req.files["lembar_revisi"][0].path;

    await saveTugasAkhir(
      accountId,
      lembarPersetujuan,
      lembarPengesahan,
      lembarKonsul1,
      lembarKonsul2,
      lembarRevisi
    );
    return res
      .status(200)
      .json({ status: 201, message: "Berhasil menambahkan data tugas akhir" });
  } catch (err) {
    Object.values(req.files || {})
      .flat()
      .forEach((file) => {
        fs.unlink(file.path, () => {});
      });

    console.log(err);
    next(err);
  }
}

async function changeTugasAkhir(req, res, next) {
  try {
    let taId = req.params.id_ta;
    let accountId = req.user.id;
    const lembarPersetujuanField = req.files["lembar_persetujuan"];
    const lembarPengesahanField = req.files["lembar_pengesahan"];
    const lembarKonsul1Field = req.files["lembar_konsul_1"];
    const lembarKonsul2Field = req.files["lembar_konsul_2"];
    const lembarRevisiField = req.files["lembar_revisi"];

    if (lembarPersetujuanField === undefined) {
      throw new BadRequestError("Lembar persetujuan wajib diisi");
    }

    if (lembarPengesahanField === undefined) {
      throw new BadRequestError("Lembar pengesahan wajib diisi");
    }

    if (lembarKonsul1Field === undefined) {
      throw new BadRequestError("Lembar konsul 1 wajib diisi");
    }

    if (lembarKonsul2Field === undefined) {
      throw new BadRequestError("Lembar konsul 2 wajib diisi");
    }

    if (lembarRevisiField === undefined) {
      throw new BadRequestError("Lembar revisi wajib diisi");
    }

    accountId = parseInt(accountId);
    taId = parseInt(taId);

    const lembarPersetujuanPath = req.files["lembar_persetujuan"]?.[0]?.path;
    const lembarPengesahanPath = req.files["lembar_pengesahan"]?.[0]?.path;
    const lembarKonsul1Path = req.files["lembar_konsul_1"]?.[0]?.path;
    const lembarKonsul2Path = req.files["lembar_konsul_2"]?.[0]?.path;
    const lembarRevisiPath = req.files["lembar_revisi"]?.[0]?.path;

    await editTugasAkhir(
      accountId,
      lembarPersetujuanPath,
      lembarPengesahanPath,
      lembarKonsul1Path,
      lembarKonsul2Path,
      lembarRevisiPath,
      taId
    );

    return res
      .status(200)
      .json({ status: 200, message: "Berhasil mengubah data tugas akhir" });
  } catch (err) {
    Object.values(req.files || {})
      .flat()
      .forEach((file) => {
        fs.unlink(file.path, () => {});
      });

    console.log(err);
    next(err);
  }
}

async function changeStatusTugasAkhir(req, res, next) {
  try {
    let taId = req.params.id_ta;
    let accountId = req.user.id;
    let { rincian, status } = req.body;

    if (!rincian) {
      throw new BadRequestError("Rincian tidak boleh kosong");
    }

    if (!status) {
      throw new BadRequestError("Status tidak boleh kosong");
    }

    taId = parseInt(taId);
    accountId = parseInt(accountId);

    await editStatusTugasAkhir(accountId, rincian, status, taId);
    return res.status(200).json({
      status: 200,
      message: "Berhasil mengubah status tugas akhir",
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export {
  presentTugasAkhir,
  presentTugasAkhirById,
  newTugasAkhir,
  changeTugasAkhir,
  changeStatusTugasAkhir,
};
