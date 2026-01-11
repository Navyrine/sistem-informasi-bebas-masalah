import sibema from "../config/sibema.js";

// AUTHORIZATION PENGAWAS KEUANGAN
async function getKeuangan() {
  const query = await sibema.query(`
    SELECT
    keuangan.id_keuangan,
    keuangan.id_mhs,
    nama_mhs,
    dokumen_keuangan,
    keuangan.rincian,
    keuangan.status
    FROM keuangan
    LEFT JOIN mahasiswa ON keuangan.id_mhs = mahasiswa.id_mhs
  `);
  const result = query.rows;

  return result;
}

// AUTHORIZATION MAHASISWA DAN PENGAWAS KEUANGAN (KHUSUS INI)
async function getKeuanganById(keuanganId) {
  const query = await sibema.query(
    `
    SELECT
    keuangan.id_keuangan,
    keuangan.id_pegawai,
    keuangan.id_mhs,
    nama_pegawai,
    nama_mhs,
    dokumen_keuangan,
    keuangan.rincian,
    keuangan.status
    FROM keuangan
    LEFT JOIN pegawai ON keuangan.id_pegawai = pegawai.id_pegawai
    LEFT JOIN mahasiswa ON keuangan.id_mhs = mahasiswa.id_mhs
    WHERE id_keuangan = $1
  `,
    [keuanganId]
  );
  const result = query.rows[0];

  return result;
}

async function updateStatusKeuangan(pegawaiId, rincian, status, keuanganId) {
  await sibema.query(
    `
    UPDATE keuangan
    SET
    id_pegawai = $1,
    rincian = $2,
    status = $3
    WHERE id_keuangan = $4  
  `,
    [pegawaiId, rincian, status, keuanganId]
  );
}

// AUTHORIZATION MAHASISWA
async function getKeuanganByMhsId(mhsId) {
  const query = await sibema.query(
    `
    SELECT
    keuangan.id_keuangan,
    keuangan.id_pegawai,
    keuangan.id_mhs,
    nama_pegawai,
    nama_mhs,
    dokumen_keuangan,
    keuangan.rincian,
    keuangan.status
    FROM keuangan
    LEFT JOIN pegawai ON keuangan.id_pegawai = pegawai.id_pegawai
    LEFT JOIN mahasiswa ON keuangan.id_mhs = mahasiswa.id_mhs
    WHERE keuangan.id_mhs = $1
  `,
    [mhsId]
  );
  const result = query.rows[0];

  return result;
}

async function getStatusKeuanganByMhsId(mhsId) {
  const query = await sibema.query(
    `
    SELECT
    keuangan.id_keuangan,
    keuangan.status
    FROM keuangan
    WHERE keuangan.id_mhs = $1
  `,
    [mhsId]
  );
  const result = query.rows[0];

  return result;
}

async function addKeuangan(mhsId, dokumenKeuangan) {
  await sibema.query(
    "INSERT INTO keuangan (id_mhs, dokumen_keuangan) VALUES ($1, $2)",
    [mhsId, dokumenKeuangan]
  );
}

async function updateKeuangan(mhsId, dokumenKeuangan, keuanganId) {
  await sibema.query(
    `
        UPDATE keuangan
        SET
        id_mhs = $1,
        dokumen_keuangan = $2
        WHERE id_keuangan = $3 
    `,
    [mhsId, dokumenKeuangan, keuanganId]
  );
}

export {
  getKeuangan,
  getKeuanganById,
  getKeuanganByMhsId,
  getStatusKeuanganByMhsId,
  addKeuangan,
  updateKeuangan,
  updateStatusKeuangan,
};
