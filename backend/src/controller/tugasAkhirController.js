import fs from "fs";
import {
  showTugasAkhir,
  showTugasAkhirById,
  saveTugasAkhir,
  editTugasAkhir,
} from "../service/tugasAkhirService";

async function presentTugasAkhir(req, res, next) {
  try {
    const result = await showTugasAkhir();

    return res.status(200).json({ status: 200, data: result });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

async function presentTugasAkhirById(req, res, next) {
  try {
    const taId = req.params.id_ta;
    const result = await showTugasAkhirById(taId);

    return res.status(200).json({ status: 200, data: result });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

async function newTugasAkhir(req, res, next) {
  try {
    const fileTa = req.files;
    const data = {
      lembar_persetujuan: fileTa?.lembar_persetujuan[0].path,
      lembar_pengesahan: fileTa.lembar_pengesahan[0].path,
      lembar_konsul_1: fileTa.lembar_konsul_1[0].path,
      lembar_konsul_2: fileTa.lembar_konsul_2[0].path,
      lembar_revisi: fileTa.lembar_revisi[0].path,
    };

    await saveTugasAkhir(data);
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
    const taId = req.params.id_ta;
    const fileTa = req.files;
    const existingtA = await showTugasAkhirById(taId);
    const updateData = {
      lembar_persetujuan:
        fileTa.lembar_persetujuan[0].path ?? existingtA.lembar_persetujuan,
      lembar_pengesahan:
        fileTa.lembar_pengesahan[0].path ?? existingtA.lembar_pengesahan,
      lembar_konsul_1:
        fileTa.lembar_konsul_1[0].path ?? existingtA.lembar_konsul_1,
      lembar_konsul_2:
        fileTa.lembar_konsul_2[0].path ?? existingtA.lembar_konsul_2,
      lembar_revisi: fileTa.lembar_revisi[0].path ?? existingtA.lembar_revisi,
    };

    await editTugasAkhir(taId, updateData);

    Object.keys(updateData).forEach((key) => {
      if (
        fileTa[key] &&
        existingtA[key] &&
        existingtA[key] !== updateData[key]
      ) {
        fs.unlink(existingtA[key], () => {});
      }
    });

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
