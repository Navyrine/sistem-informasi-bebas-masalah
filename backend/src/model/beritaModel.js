import sibema from "../config/sibema.js";

async function getBerita() {
  const query = await sibema.query("SELECT * FROM berita");
  const result = query.rows;

  return result;
}

async function getBeritaById(beritaId) {
  const query = await sibema.query(
    "SELECT * FROM berita WHERE id_berita = $1",
    [beritaId]
  );
  const result = query.rows[0];

  return result;
}

async function addBerita(judul, konten, gambar) {
  await sibema.query(
    `
        INSERT INTO berita
        (judul, konten, gambar)
        VALUES
        ($1, $2, $3)    
    `,
    [judul, konten, gambar]
  );
}

async function updateBerita(beritaId, judul, konten, gambar) {
  await sibema.query(
    `
        UPDATE berita
        SET
        judul = $1,
        konten = $2,
        gambar = $3
        WHERE id_berita = $4
    `,
    [judul, konten, gambar, beritaId]
  );
}

async function deleteBerita(beritaId) {
  await sibema.query("DELETE FROM berita WHERE id_berita = $1", [beritaId]);
}

export { getBerita, getBeritaById, addBerita, updateBerita, deleteBerita };
