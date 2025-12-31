import sibema from "../config/sibema.js";

async function getJurusan() {
  const query = await sibema.query("SELECT * FROM jurusan");
  const result = query.rows;

  return result;
}

async function getJurusanId(nama_jurusan) {
  const query = await sibema.query(
    "SELECT id_jurusan FROM jurusan WHERE LOWER(nama_jurusan) = $1",
    nama_jurusan
  );
  const result = query.rows[0];

  return result;
}

async function getAllNamaJurusan() {
  const query = await sibema.query("SELECT nama_jurusan FROM jurusan");
  const result = query.rows;

  return result;
}

async function addJurusan(nama_jurusan) {
  await sibema.query("INSERT INTO jurusan (nama_jurusan) VALUES ($1)", [
    nama_jurusan,
  ]);
}

async function updateJurusan(id_jurusan, nama_jurusan) {
  await sibema.query(
    "UPDATE jurusan SET nama_jurusan = $1 WHERE id_jurusan = $2",
    [nama_jurusan, id_jurusan]
  );
}

export {
  getJurusan,
  getJurusanId,
  getAllNamaJurusan,
  addJurusan,
  updateJurusan,
};
