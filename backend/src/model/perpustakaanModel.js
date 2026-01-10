import sibema from "../config/sibema.js";

async function getPerpustakaan() {
  const query = await sibema.query("SELECT * FROM perpustakaan");
  const result = query.rows;

  return result;
}

async function getPerpustakaanById(perpusId) {
  const query = await sibema.query(
    "SELECT * FROM perpustakaan WHERE id_perpus = $1",
    [perpusId]
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

export {
  getPerpustakaan,
  getPerpustakaanById,
  addPerpustakaan,
  updatePerpustakaan,
  updateStatusPerpustakaan,
};
