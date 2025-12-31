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
    const id_prodi = req.params.id_prodi;
    const result = await showProdibyId(id_prodi);

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
    const { nama_jurusan, nama_prodi } = req.body;

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
    const id_prodi = req.params.id_prodi;
    const { nama_jurusan, nama_prodi } = req.body;

    await editProdi(nama_jurusan, id_prodi, nama_prodi);
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
    const id_prodi = req.params.id_prodi;

    await removeProdi(id_prodi);
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
