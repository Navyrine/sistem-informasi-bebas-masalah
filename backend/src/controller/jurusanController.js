import {
  showJurusan,
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
  } catch (error) {
    console.log(err);
    next(err);
  }
}

async function newJurusan(req, res, next) {
  try {
    const nama_jurusan = req.body.nama_jurusan;

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
    const id_jurusan = req.params.id_jurusan;
    const nama_jurusan = req.body.nama_jurusan;

    await editJurusan(id_jurusan, nama_jurusan);
    return res.status(201).json({
      status: 201,
      message: "Berhasil memperbarui jurusan",
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export { presentJurusan, newJurusan, changeJurusan };
