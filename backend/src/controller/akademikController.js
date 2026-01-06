import fs from "fs";
import BadRequestError from "../error/BadRequestError.js";
import { getAkademikById } from "../model/akademikModel.js";
import {
  showAkademik,
  showAkademikById,
  saveAkademik,
  editAkademik,
} from "../service/akademikService.js";

async function presentAkademik(req, res, next) {
  try {
    const result = await showAkademik();

    return res.status(200).json({ status: 200, data: result });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

async function presentAkademikById(req, res, next) {
  try {
    const akademikId = req.params.id_akademik;
    const result = await showAkademikById(akademikId);

    return res.status(200).json({ status: 200, data: result });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

async function newAkademik(req, res, next) {
  try {
    const khsSem1Field = req.files["khs_sem_1"];
    const khsSem2Field = req.files["khs_sem_2"];
    const khsSem3Field = req.files["khs_sem_3"];
    const khsSem4Field = req.files["khs_sem_4"];
    const khsSem5Field = req.files["khs_sem_5"];
    const khsSem6Field = req.files["khs_sem_6"];
    const lembarSpField = req.files["lembar_sp"];

    if (!khsSem1Field) {
      throw new BadRequestError("Dokumen khs semester 1 wajib diisi");
    }

    if (!khsSem2Field) {
      throw new BadRequestError("Dokumen khs semester 2 wajib diisi");
    }

    if (!khsSem3Field) {
      throw new BadRequestError("Dokumen khs semester 3 wajib diisi");
    }

    if (!khsSem4Field) {
      throw new BadRequestError("Dokumen khs semester 4 wajib diisi");
    }

    if (!khsSem5Field) {
      throw new BadRequestError("Dokumen khs semester 5 wajib diisi");
    }

    if (!khsSem6Field) {
      throw new BadRequestError("Dokumen khs semester 6 wajib diisi");
    }

    if (!lembarSpField) {
      throw new BadRequestError("Dokumen lembar sp wajib diisi");
    }

    const khsSem1Path = req?.files["khs_sem_1"]?.[0]?.path;
    const khsSem2Path = req?.files["khs_sem_2"]?.[0]?.path;
    const khsSem3Path = req?.files["khs_sem_3"]?.[0]?.path;
    const khsSem4Path = req?.files["khs_sem_4"]?.[0]?.path;
    const khsSem5Path = req?.files["khs_sem_5"]?.[0]?.path;
    const khsSem6Path = req?.files["khs_sem_6"]?.[0]?.path;
    const lembarSpPath = req?.files["lembar_sp"]?.[0]?.path;

    await saveAkademik(
      khsSem1Path,
      khsSem2Path,
      khsSem3Path,
      khsSem4Path,
      khsSem5Path,
      khsSem6Path,
      lembarSpPath
    );

    return res
      .status(201)
      .json({ status: 201, message: "Berhasil menambahkan data akademik" });
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

async function changeAkademik(req, res, next) {
  try {
    const akademikId = req.params.id_akademik;
    const fileAkademik = req.files;

    if (!fileAkademik["khs_sem_1"]) {
      throw new BadRequestError("Dokumen khs semester 1 wajib diisi");
    }

    if (!fileAkademik["khs_sem_2"]) {
      throw new BadRequestError("Dokumen khs semester 2 wajib diisi");
    }

    if (!fileAkademik["khs_sem_3"]) {
      throw new BadRequestError("Dokumen khs semester 3 wajib diisi");
    }

    if (!fileAkademik["khs_sem_4"]) {
      throw new BadRequestError("Dokumen khs semester 4 wajib diisi");
    }

    if (!fileAkademik["khs_sem_5"]) {
      throw new BadRequestError("Dokumen khs semester 5 wajib diisi");
    }

    if (!fileAkademik["khs_sem_6"]) {
      throw new BadRequestError("Dokumen khs semester 6 wajib diisi");
    }

    if (!fileAkademik["lembar_sp"]) {
      throw new BadRequestError("Dokumen lembar sp wajib diisi");
    }

    const existingtAkademik = await getAkademikById(akademikId);
    const update = {
      khs_sem_1:
        fileAkademik["khs_sem_1"]?.[0]?.path ?? existingtAkademik.khs_sem_1,
      khs_sem_2:
        fileAkademik["khs_sem_2"]?.[0]?.path ?? existingtAkademik.khs_sem_2,
      khs_sem_3:
        fileAkademik["khs_sem_3"]?.[0]?.path ?? existingtAkademik.khs_sem_3,
      khs_sem_4:
        fileAkademik["khs_sem_4"]?.[0]?.path ?? existingtAkademik.khs_sem_4,
      khs_sem_5:
        fileAkademik["khs_sem_5"]?.[0]?.path ?? existingtAkademik.khs_sem_5,
      khs_sem_6:
        fileAkademik["khs_sem_6"]?.[0]?.path ?? existingtAkademik.khs_sem_6,
      lembar_sp:
        fileAkademik["lembar_sp"]?.[0]?.path ?? existingtAkademik.lembar_sp,
    };

    await editAkademik(update, akademikId);

    Object.keys(update).forEach((key) => {
      if (
        fileAkademik[key] &&
        existingtAkademik[key] &&
        existingtAkademik[key] !== update[key]
      ) {
        fs.unlink(existingtAkademik[key], () => {});
      }
    });

    return res
      .status(200)
      .json({ status: 200, message: "Berhasil mengubah data akademik" });
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

export { presentAkademik, presentAkademikById, newAkademik, changeAkademik };
