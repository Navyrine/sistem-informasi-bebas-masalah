import sibema from "../config/sibema.js";

async function getMahasiswa() {
  const query = await sibema.query(`
        SELECT
        mahasiswa.id_mhs,
        mahasiswa.id_account,
        nama_prodi,
        nama_mhs,
        no_telp,
        alamat,
        tahun_lulus,
        status
        FROM mahasiswa
        LEFT JOIN account ON mahasiswa.id_account = account.id_account
        LEFT JOIN prodi ON mahasiswa.id_prodi = prodi.id_prodi
    `);
  const result = query.rows;

  return result;
}

async function getMahasiswabyId(idMhs) {
  const query = await sibema.query(
    `
        SELECT
        mahasiswa.id_mhs,
        mahasiswa.id_account,
        nama_prodi,
        nama_mhs,
        no_telp,
        alamat,
        tahun_lulus,
        status
        FROM mahasiswa
        LEFT JOIN account ON mahasiswa.id_account = account.id_account
        LEFT JOIN prodi ON mahasiswa.id_prodi = prodi.id_prodi
        WHERE id_mhs = $1
    `,
    [idMhs]
  );
  const result = query.rows[0];

  return result;
}

async function addMahasiswa(idProdi, nim, namaMhs, noTelp, alamat, tahunLulus) {
  await sibema.query(
    `
        INSERT INTO mahasiswa
        (id_prodi, nim, nama_mhs, no_telp, alamat, tahun_lulus)
        VALUES
        ($1, $2, $3, $4, $5, $6)
    `,
    [idProdi, nim, namaMhs, noTelp, alamat, tahunLulus]
  );
}

async function updateMahasiswa(idMhs, updateBody) {
  await sibema.query(
    `
        UPDATE SET
        id_prodi = $1,
        nama_mhs = $2,
        no_telp = $3,
        alamat = $4,
        tahun_lulus = $5
        WHERE id_mhs = $6    
    `,
    [
      updateBody.id_prodi,
      updateBody.nama_mhs,
      updateBody.no_telp,
      updateBody.alamat,
      updateBody.tahun_lulus,
      idMhs,
    ]
  );
}

async function deleteMahasiswa(idMhs) {
  await sibema.query("DELETE FROM mahasiswa WHERE id_mhs = $1", [idMhs]);
}

export {
  getMahasiswa,
  getMahasiswabyId,
  addMahasiswa,
  updateMahasiswa,
  deleteMahasiswa,
};
