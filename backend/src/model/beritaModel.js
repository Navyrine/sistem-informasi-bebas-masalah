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

async function addBerita(pegawaiId, judul, konten, gambar) {
  await sibema.query(
    `
        INSERT INTO berita
        (id_pegawai, judul, konten, gambar)
        VALUES
        ($1, $2, $3, $4)    
    `,
    [pegawaiId, judul, konten, gambar]
  );
}

async function updateBerita(pegawaiId, judul, konten, gambar, beritaId) {
  await sibema.query(
    `
        UPDATE berita
        SET
        id_pegawai = $1,
        judul = $2,
        konten = $3,
        gambar = $4
        WHERE id_berita = $5
    `,
    [pegawaiId, judul, konten, gambar, beritaId]
  );
}

async function deleteBerita(beritaId) {
  await sibema.query("DELETE FROM berita WHERE id_berita = $1", [beritaId]);
}

export { getBerita, getBeritaById, addBerita, updateBerita, deleteBerita };
