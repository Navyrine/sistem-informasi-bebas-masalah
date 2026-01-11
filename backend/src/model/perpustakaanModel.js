import sibema from "../config/sibema.js";

// AUTHORIZATION PENGAWAS PERPUSTAKAAN
async function getPerpustakaan() {
  const query = await sibema.query(`
    SELECT
    perpustakaan.id_perpus,
    mahasiswa.id_mhs,
    nama_mhs,
    dokumen_perpus,
    rincian,
    perpustakaan.status
    FROM perpustakaan
    LEFT JOIN mahasiswa ON perpustakaan.id_mhs = mahasiswa.id_mhs;  
  `);
  const result = query.rows;

  return result;
}

// AUTHORIZATION MAHASISWA DAN PENGAWAS PERPUSTAKAAN (KHUSUS INI)
async function getPerpustakaanById(perpusId) {
  const query = await sibema.query(
    `
    SELECT
    perpustakaan.id_perpus,
    pegawai.id_pegawai,
    mahasiswa.id_mhs,
    nama_pegawai,
    nama_mhs,
    dokumen_perpus,
    perpustakaan.rincian,
    perpustakaan.status
    FROM perpustakaan
    LEFT JOIN pegawai ON perpustakaan.id_pegawai = pegawai.id_pegawai
    LEFT JOIN mahasiswa ON perpustakaan.id_mhs = mahasiswa.id_mhs
    WHERE perpustakaan.id_perpus = $1
  `,
    [perpusId]
  );
  const result = query.rows[0];

  return result;
}

async function updateStatusPerpustakaan(pegawaiId, rincian, status, perpusId) {
  await sibema.query(
    `
    UPDATE perpustakaan
    SET
    id_pegawai = $1,
    rincian = $2,
    status = $3
    WHERE id_perpus = $4  
  `,
    [pegawaiId, rincian, status, perpusId]
  );
}

// AUTHORIZATION MAHASISWA
async function getPerpustakaanByMhsId(mhsId) {
  const query = await sibema.query(
    `
    SELECT
    perpustakaan.id_perpus,
    pegawai.id_pegawai,
    mahasiswa.id_mhs,
    nama_pegawai,
    nama_mhs,
    dokumen_perpus,
    perpustakaan.rincian,
    perpustakaan.status
    FROM perpustakaan
    LEFT JOIN pegawai ON perpustakaan.id_pegawai = pegawai.id_pegawai
    LEFT JOIN mahasiswa ON perpustakaan.id_mhs = mahasiswa.id_mhs
    WHERE perpustakaan.id_mhs = $1
  `,
    [mhsId]
  );
  const result = query.rows[0];

  return result;
}

async function getStatusPerpustakaanByMhsId(mhsId) {
  const query = await sibema.query(
    `
    SELECT
    perpustakaan.id_perpus,
    perpustakaan.status
    FROM perpustakaan
    WHERE perpustakaan.id_mhs = $1
  `,
    [mhsId]
  );
  const result = query.rows[0];

  return result;
}

async function addPerpustakaan(mhsId, dokumen_perpus) {
  await sibema.query(
    "INSERT INTO perpustakaan (id_mhs, dokumen_perpus) VALUES ($1, $2)",
    [mhsId, dokumen_perpus]
  );
}

async function updatePerpustakaan(mhsId, dokumen_perpus, perpusId) {
  await sibema.query(
    `
        UPDATE perpustakaan
        SET
        id_mhs = $1,
        dokumen_perpus = $2
        WHERE id_perpus = $3    
    `,
    [mhsId, dokumen_perpus, perpusId]
  );
}

export {
  getPerpustakaan,
  getPerpustakaanById,
  getStatusPerpustakaanByMhsId,
  getPerpustakaanByMhsId,
  addPerpustakaan,
  updatePerpustakaan,
  updateStatusPerpustakaan,
};
