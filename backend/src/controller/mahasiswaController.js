import {
  showMahasiswa,
  showMahasiswaById,
  saveMahasiswa,
  editMahasiswa,
  removeMahasiswa,
} from "../service/mahasiswaService.js";

async function presentMahsiswa(req, res, next) {
  try {
    const result = await showMahasiswa();

    return res.status(200).json({
      status: 200,
      data: result,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

async function presentMahsiswaById(req, res, next) {
  try {
    const mhsId = req.params.id_mhs;
    const result = await showMahasiswaById(mhsId);

    return res.status(200).json({
      status: 200,
      data: result,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

async function newMahasiswa(req, res, next) {
  try {
    const { nama_prodi, nim, nama_mhs, no_telp, alamat, tahun_lulus } =
      req.body;

    await saveMahasiswa(
      nama_prodi,
      nim,
      nama_mhs,
      no_telp,
      alamat,
      tahun_lulus
    );
    return res.status(201).json({
      status: 201,
      message: "Berhasil menambahkan data mahasiswa",
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

async function changeMahasiswa(req, res, next) {
  try {
    const mhsId = req.params.id_mhs;
    const updateBody = req.body;

    await editMahasiswa(mhsId, updateBody);
    return res.status(200).json({
      status: 200,
      message: "Berhasil mengubah data mahasiswa",
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

async function remove(req, res, next) {
  try {
    const mhsId = req.params.id_mhs;

    await removeMahasiswa(mhsId);
    return res.status(201).json({
      status: 201,
      message: "Berhasil menghapus data mahasiswa",
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export {
  presentMahsiswa,
  presentMahsiswaById,
  newMahasiswa,
  changeMahasiswa,
  remove,
};
