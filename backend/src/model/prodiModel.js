import sibema from "../config/sibema.js";

async function getProdi() {
  const query = await sibema.query(`
        SELECT 
        prodi.id_prodi,
        nama_jurusan,
        nama_prodi
        FROM prodi
        INNER JOIN jurusan ON jurusan.id_jurusan = prodi.id_jurusan   
    `);
  const result = query.rows;

  return result;
}

async function getProdiById(prodiId) {
  const query = await sibema.query(
    `
        SELECT 
        prodi.id_prodi,
        jurusan.id_jurusan,
        nama_jurusan,
        nama_prodi
        FROM prodi
        INNER JOIN jurusan ON jurusan.id_jurusan = prodi.id_jurusan   
        WHERE prodi.id_prodi = $1
    `,
    [prodiId]
  );
  const result = query.rows[0];

  return result;
}

async function getProdiId(namaProdi) {
  const query = await sibema.query(
    "SELECT id_prodi, nama_prodi FROM prodi WHERE LOWER(nama_prodi) = LOWER($1)",
    [namaProdi]
  );
  const result = query.rows[0];

  return result;
}

async function getAllNamaProdi() {
  const query = await sibema.query("SELECT nama_prodi FROM prodi");
  const result = query.rows;

  return result;
}

async function addProdi(jurusanId, namaProdi) {
  await sibema.query(
    "INSERT INTO prodi (id_jurusan, nama_prodi) VALUES ($1, $2)",
    [jurusanId, namaProdi]
  );
}

async function updateProdi(jurusanId, namaProdi, prodiId) {
  await sibema.query(
    "UPDATE prodi SET id_jurusan = $1, nama_prodi = $2 WHERE id_prodi = $3",
    [jurusanId, namaProdi, prodiId]
  );
}

async function deleteProdi(prodiId) {
  await sibema.query("DELETE FROM prodi WHERE id_prodi = $1", [prodiId]);
}

export {
  getProdi,
  addProdi,
  getProdiById,
  getProdiId,
  getAllNamaProdi,
  updateProdi,
  deleteProdi,
};
