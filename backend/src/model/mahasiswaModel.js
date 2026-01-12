import sibema from "../config/sibema.js";

// AUTHORIZATION: ADMINISTRATOR
async function getMahasiswa() {
  const query = await sibema.query(`
        SELECT
        mahasiswa.id_mhs,
        mahasiswa.id_account,
        nama_prodi,
        nim,
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

// AUTHORIZATION: ADMINISTRATOR DAN MAHASISWA (KHUSUS INI)
async function getMahasiswabyId(mhsId) {
  const query = await sibema.query(
    `
        SELECT
        mahasiswa.id_mhs,
        mahasiswa.id_account,
        nama_prodi,
        nim,
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
    [mhsId]
  );
  const result = query.rows[0];

  return result;
}

async function findMahasiswaId(namaMhs) {
  const query = await sibema.query(
    "SELECT id_mhs, id_account, nim FROM mahasiswa WHERE LOWER(nama_mhs) = LOWER($1)",
    [namaMhs]
  );
  const result = query.rows[0];

  return result;
}

async function findMahasiswaIdByAccountId(accountId) {
  const query = await sibema.query(
    "SELECT id_mhs FROM mahasiswa WHERE id_account = $1",
    [accountId]
  );
  const result = query.rows[0];

  return result;
}

async function findMahasiswaByNimExceptId(nim, mhsId) {
  const query = await sibema.query(
    "SELECT id_mhs, nim FROM mahasiswa WHERE LOWER(TRIM(nim)) = LOWER(TRIM($1)) AND id_mhs != $2",
    [nim, mhsId]
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

async function updateMahasiswa(
  prodiId,
  nim,
  namaMhs,
  noTelp,
  alamat,
  tahunLulus,
  mhsId
) {
  await sibema.query(
    `
        UPDATE mahasiswa SET
        id_prodi = $1,
        nim = $2,
        nama_mhs = $3,
        no_telp = $4,
        alamat = $5,
        tahun_lulus = $6
        WHERE id_mhs = $7    
    `,
    [prodiId, nim, namaMhs, noTelp, alamat, tahunLulus, mhsId]
  );
}

async function updateIdAccount(accountId, mhsId) {
  await sibema.query("UPDATE mahasiswa SET id_account = $1 WHERE id_mhs = $2", [
    accountId,
    mhsId,
  ]);
}

async function updateStatusMahasiswa(status, mhsId) {
  await sibema.query("UPDATE mahasiswa SET status = $1 WHERE id_mhs = $2", [
    status,
    mhsId,
  ]);
}

async function deleteMahasiswa(idMhs) {
  await sibema.query("DELETE FROM mahasiswa WHERE id_mhs = $1", [idMhs]);
}

export {
  getMahasiswa,
  getMahasiswabyId,
  findMahasiswaId,
  findMahasiswaIdByAccountId,
  findMahasiswaByNimExceptId,
  addMahasiswa,
  updateMahasiswa,
  updateIdAccount,
  updateStatusMahasiswa,
  deleteMahasiswa,
};
