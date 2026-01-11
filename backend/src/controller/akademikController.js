import fs from "fs";
import BadRequestError from "../error/BadRequestError.js";
import {
  showAkademik,
  showAkademikById,
  showStatusAkademikByMhsId,
  showAkademikByMhsId,
  saveAkademik,
  editAkademik,
  editStatusAkademik,
} from "../service/akademikService.js";

async function presentAkademik(req, res, next) {
  try {
    const result = await showAkademik();

    return res.status(200).json({
      status: 200,
      data: result,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

async function presentAkademikById(req, res, next) {
  try {
    let akademikId = req.params.id_akademik;
    akademikId = parseInt(akademikId);

    const result = await showAkademikById(akademikId);
    return res.status(200).json({
      status: 200,
      data: result,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

async function presentStatusAkademikByMhsId(req, res, next) {
  try {
    let accountId = req.user.id;
    accountId = parseInt(accountId);

    const result = await showStatusAkademikByMhsId(accountId);
    return res.status(200).json({
      status: 200,
      data: result,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

async function presentAkademikByMhsId(req, res, next) {
  try {
    let accountId = req.user.id;
    accountId = parseInt(accountId);

    const result = await showAkademikByMhsId(accountId);
    return res.status(200).json({
      status: 200,
      message: result,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

async function newAkademik(req, res, next) {
  try {
    let accountId = req.user.id;
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

    accountId = parseInt(accountId);

    const khsSem1Path = req?.files["khs_sem_1"]?.[0]?.path;
    const khsSem2Path = req?.files["khs_sem_2"]?.[0]?.path;
    const khsSem3Path = req?.files["khs_sem_3"]?.[0]?.path;
    const khsSem4Path = req?.files["khs_sem_4"]?.[0]?.path;
    const khsSem5Path = req?.files["khs_sem_5"]?.[0]?.path;
    const khsSem6Path = req?.files["khs_sem_6"]?.[0]?.path;
    const lembarSpPath = req?.files["lembar_sp"]?.[0]?.path;

    await saveAkademik(
      accountId,
      khsSem1Path,
      khsSem2Path,
      khsSem3Path,
      khsSem4Path,
      khsSem5Path,
      khsSem6Path,
      lembarSpPath
    );

    return res.status(201).json({
      status: 201,
      message: "Berhasil menambahkan data akademik",
    });
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
    let akademikId = req.params.id_akademik;
    let accountId = req.user.id;
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

    akademikId = parseInt(akademikId);
    accountId = parseInt(accountId);

    const khsSem1Path = req?.files["khs_sem_1"]?.[0]?.path;
    const khsSem2Path = req?.files["khs_sem_2"]?.[0]?.path;
    const khsSem3Path = req?.files["khs_sem_3"]?.[0]?.path;
    const khsSem4Path = req?.files["khs_sem_4"]?.[0]?.path;
    const khsSem5Path = req?.files["khs_sem_5"]?.[0]?.path;
    const khsSem6Path = req?.files["khs_sem_6"]?.[0]?.path;
    const lembarSpPath = req?.files["lembar_sp"]?.[0]?.path;

    await editAkademik(
      accountId,
      khsSem1Path,
      khsSem2Path,
      khsSem3Path,
      khsSem4Path,
      khsSem5Path,
      khsSem6Path,
      lembarSpPath,
      akademikId
    );

    return res.status(200).json({
      status: 200,
      message: "Berhasil mengubah data akademik",
    });
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

async function changeStatusAkademik(req, res, next) {
  try {
    let akademikId = req.params.id_akademik;
    let accountId = req.user.id;
    const { rincian, status } = req.body;

    if (!rincian) {
      throw new BadRequestError("Rincian tidak boleh kosong");
    }

    if (!status) {
      throw new BadRequestError("Status tidak boleh kosong");
    }

    akademikId = parseInt(akademikId);
    accountId = parseInt(accountId);

    await editStatusAkademik(accountId, rincian, status, akademikId);
    return res.status(200).json({
      status: 200,
      message: "Berhasil mengubah status akademik",
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export {
  presentAkademik,
  presentAkademikById,
  presentStatusAkademikByMhsId,
  presentAkademikByMhsId,
  newAkademik,
  changeAkademik,
  changeStatusAkademik,
};
