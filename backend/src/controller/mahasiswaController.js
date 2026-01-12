import BadRequestError from "../error/BadRequestError.js";
import {
  showMahasiswa,
  showMahasiswaById,
  showProfileMahasiswa,
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

async function presentProfileMahasiswa(req, res, next) {
  try {
    let accountId = req.user.id;
    accountId = parseInt(accountId);

    const result = await showProfileMahasiswa(accountId);
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
    let { nama_prodi, nim, nama_mhs, no_telp, alamat, tahun_lulus } = req.body;

    if (!nama_prodi) {
      throw new BadRequestError("Nama prodi tidak boleh kosong");
    }

    if (!nim) {
      throw new BadRequestError("Nim tidak boleh kosong");
    }

    if (nim.length > 10) {
      throw new BadRequestError("Panjang nim tidak boleh lebih dari 10");
    }

    if (!nama_mhs) {
      throw new BadRequestError("Nama mahasiswa tidak boleh kosong");
    }

    if (!no_telp) {
      throw new BadRequestError("Nomor telpon tidak boleh kosong");
    }

    if (no_telp.length > 13) {
      throw new BadRequestError(
        "Panjang nomor telepon tidak boleh lebih dari 13"
      );
    }

    if (!alamat) {
      throw new BadRequestError("Alamat tidak boleh kosong");
    }

    if (!tahun_lulus) {
      throw new BadRequestError("Tahun lulus tidak boleh kosong");
    }

    nim = nim.trim();
    nama_mhs = nama_mhs.trim();
    nama_prodi = nama_prodi.toLowerCase().trim();
    no_telp = no_telp.trim();
    alamat = alamat.trim();

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
    let mhsId = req.params.id_mhs;
    let { nama_prodi, nim, nama_mhs, no_telp, alamat, tahun_lulus } = req.body;

    if (!nama_prodi) {
      throw new BadRequestError("Nama prodi tidak boleh kosong");
    }

    if (!nim) {
      throw new BadRequestError("Nim tidak boleh kosong");
    }

    if (nim.length > 10) {
      throw new BadRequestError("Panjang nim tidak boleh lebih dari 10");
    }

    if (!nama_mhs) {
      throw new BadRequestError("Nama mahasiswa tidak boleh kosong");
    }

    if (!no_telp) {
      throw new BadRequestError("No telp tidak boleh kosong");
    }

    if (no_telp.length > 13) {
      throw new BadRequestError();
    }

    if (!alamat) {
      throw new BadRequestError("Alamat tidak boleh kosong");
    }

    if (!tahun_lulus) {
      throw new BadRequestError("Tahun lulus tidak boleh kosong");
    }

    nama_prodi = nama_prodi.toLowerCase().trim();
    mhsId = parseInt(mhsId);
    nim = nim.trim();
    nama_mhs = nama_mhs.trim();
    no_telp = no_telp.trim();
    alamat = alamat.trim();
    tahun_lulus = tahun_lulus.trim();

    await editMahasiswa(
      nama_prodi,
      nim,
      nama_mhs,
      no_telp,
      alamat,
      tahun_lulus,
      mhsId
    );
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
  presentProfileMahasiswa,
  newMahasiswa,
  changeMahasiswa,
  remove,
};
