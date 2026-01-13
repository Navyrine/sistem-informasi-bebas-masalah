import BadRequestError from "../error/BadRequestError.js";
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
    let pegawaiId = req.params.id_pegawai;
    pegawaiId = parseInt(pegawaiId);

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
    let { nama_pegawai, no_telp, alamat } = req.body;

    if (!nama_pegawai) {
      throw new BadRequestError("Nama pegawai tidak boleh kosong");
    }

    if (!no_telp) {
      throw new BadRequestError("No telpon tidak boleh kosong");
    }

    if (!alamat) {
      throw new BadRequestError("Alamat tidak boleh kosong");
    }

    nama_pegawai = nama_pegawai.trim();
    no_telp = no_telp.trim();
    alamat = alamat.trim();

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
    let pegawaiId = req.params.id_pegawai;
    let { nama_pegawai, no_telp, alamat } = req.body;

    if (!nama_pegawai) {
      throw new BadRequestError("Nama pegawai tidak boleh kosong");
    }

    if (!no_telp) {
      throw new BadRequestError("No telp tidak boleh kosong");
    }

    if (!alamat) {
      throw new BadRequestError("Alamat tidak boleh kosong");
    }

    pegawaiId = parseInt(pegawaiId);
    nama_pegawai = nama_pegawai.trim();
    no_telp = no_telp.trim();
    alamat = alamat.trim();

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
    let pegawaiId = req.params.id_pegawai;
    pegawaiId = parseInt(pegawaiId);

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
