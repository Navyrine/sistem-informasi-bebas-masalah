import {
  showPegawai,
  showPegawaiById,
  savePegawai,
  editPegawai,
  removePegawai,
} from "../service/pegawaiService.js";

async function presentPegawai(req, res, next) {
  try {
    const result = await showPegawai();

    return res.status(200).json({
      status: 200,
      data: result,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

async function presentPegawaiById(req, res, next) {
  try {
    const pegawaiId = req.params.id_pegawai;
    const result = await showPegawaiById(pegawaiId);

    return res.status(200).json({
      status: 200,
      data: result,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

async function newPegawai(req, res, next) {
  try {
    const { nama_pegawai, no_telp, alamat } = req.body;

    await savePegawai(nama_pegawai, no_telp, alamat);
    return res.status(201).json({
      status: 201,
      message: "Berhasil menambahkan data pegawai",
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

async function changePegawai(req, res, next) {
  try {
    const pegawaiId = req.params.id_pegawai;
    const { nama_pegawai, no_telp, alamat } = req.body;

    await editPegawai(pegawaiId, nama_pegawai, no_telp, alamat);
    return res.status(200).json({
      status: 200,
      message: "Berhasil mengubah data pegawai",
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

async function remove(req, res, next) {
  try {
    const pegawaiId = req.params.id_pegawai;

    await removePegawai(pegawaiId);
    return res.status(201).json({
      status: 201,
      message: "Berhasil menghapus data pegawai",
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export {
  presentPegawai,
  presentPegawaiById,
  newPegawai,
  changePegawai,
  remove,
};
