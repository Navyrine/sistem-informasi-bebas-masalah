import BadRequestError from "../error/BadRequestError.js";
import {
  showJurusan,
  showJurusanById,
  saveJurusan,
  editJurusan,
} from "../service/jurusanService.js";

async function presentJurusan(req, res, next) {
  try {
    const result = await showJurusan();

    return res.status(200).json({
      status: 200,
      data: result,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

async function presentJurusanById(req, res, next) {
  try {
    let jurusanId = req.params.id_jurusan;
    jurusanId = parseInt(jurusanId);

    const result = await showJurusanById(jurusanId);
    return res.status(200).json({
      status: 200,
      data: result,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

async function newJurusan(req, res, next) {
  try {
    let nama_jurusan = req.body.nama_jurusan;
    if (!nama_jurusan) {
      throw new BadRequestError("Nama jurusan tidak boleh kosong");
    }

    nama_jurusan = nama_jurusan.trim();
    await saveJurusan(nama_jurusan);
    return res.status(201).json({
      status: 201,
      message: "Berhasil menambahkan jurusan",
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

async function changeJurusan(req, res, next) {
  try {
    let jurusanId = req.params.id_jurusan;
    let nama_jurusan = req.body.nama_jurusan;

    if (!nama_jurusan) {
      throw new BadRequestError("Nama jurusan tidak boleh kosong");
    }

    jurusanId = parseInt(jurusanId);
    nama_jurusan = nama_jurusan.trim();

    await editJurusan(jurusanId, nama_jurusan);
    return res.status(201).json({
      status: 201,
      message: "Berhasil memperbarui jurusan",
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export { presentJurusan, presentJurusanById, newJurusan, changeJurusan };
