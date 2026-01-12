import BadRequestError from "../error/BadRequestError.js";
import {
  showProdi,
  showProdibyId,
  saveProdi,
  editProdi,
  removeProdi,
} from "../service/prodiService.js";

async function presentProdi(req, res, next) {
  try {
    const result = await showProdi();

    return res.status(200).json({
      status: 200,
      data: result,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

async function presentProdibyId(req, res, next) {
  try {
    let prodiId = req.params.id_prodi;
    const result = await showProdibyId(prodiId);

    prodiId = parseInt(prodiId);
    return res.status(200).json({
      status: 200,
      data: result,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

async function newProdi(req, res, next) {
  try {
    let { nama_jurusan, nama_prodi } = req.body;

    if (!nama_jurusan) {
      throw new BadRequestError("Nama jurusan tidak boleh kosong");
    }

    if (!nama_prodi) {
      throw new BadRequestError("Nama prodi tidak boleh kosong");
    }

    nama_jurusan = nama_jurusan.trim();
    nama_prodi = nama_prodi.trim();

    await saveProdi(nama_jurusan, nama_prodi);
    return res.status(200).json({
      status: 201,
      message: "Berhasil menambahkan prodi",
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

async function changeProdi(req, res, next) {
  try {
    let prodiId = req.params.id_prodi;
    let namaJurusan = req.body.nama_jurusan;
    let namaProdi = req.body.nama_prodi;

    if (!namaJurusan) {
      throw new BadRequestError("Nama jurusan tidak boleh kosong");
    }

    if (!namaProdi) {
      throw BadRequestError("Nama prodi tidak boleh kosong");
    }

    prodiId = parseInt(prodiId);
    namaJurusan = namaJurusan.trim();
    namaProdi = namaProdi.trim();

    await editProdi(namaJurusan, namaProdi, prodiId);
    return res.status(200).json({
      status: 200,
      message: "Berhasil mengubah prodi",
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

async function remove(req, res, next) {
  try {
    let prodiId = req.params.id_prodi;
    prodiId = parseInt(prodiId);

    await removeProdi(prodiId);
    return res.status(201).json({
      status: 201,
      message: "Prodi berhasil dihapus",
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export { presentProdi, presentProdibyId, newProdi, changeProdi, remove };
