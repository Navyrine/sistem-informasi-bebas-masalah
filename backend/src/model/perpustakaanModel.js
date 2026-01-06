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
  const result = query.rows;

  return result;
}

async function addPerpustakaan(dokumen_perpus) {
  await sibema.query("INSERT INTO perpustakaan (dokumen_perpus) VALUES ($1)", [
    dokumen_perpus,
  ]);
}

async function updatePerpustakaan(perpusId, dokumen_perpus) {
  await sibema.query(
    `
        UPDATE perpustakaan
        SET
        dokumen_perpus = $1
        WHERE id_perpus = $2    
    `,
    [dokumen_perpus, perpusId]
  );
}

export {
  getPerpustakaan,
  getPerpustakaanById,
  addPerpustakaan,
  updatePerpustakaan,
};
