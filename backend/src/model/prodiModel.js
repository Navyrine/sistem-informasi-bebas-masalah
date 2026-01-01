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

async function getProdiId(namaProdi) {
  const query = await sibema.query(
    "SELECT id_prodi FROM prodi WHERE LOWER(nama_prodi) = $1",
    [namaProdi]
  );
  const result = query.rows[0];

  return result;
}

async function addProdi(id_jurusan, nama_prodi) {
  await sibema.query(
    "INSERT INTO prodi (id_jurusan, nama_prodi) VALUES ($1, $2)",
    [id_jurusan, nama_prodi]
  );
}

async function getProdiById(id_prodi) {
  const prodiQuery = await sibema.query(
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
    [id_prodi]
  );
  const prodiResult = prodiQuery.rows[0];

  return prodiResult;
}

async function updateProdi(id_prodi, bodyUpdate) {
  await sibema.query(
    "UPDATE prodi SET id_jurusan = $1, nama_prodi = $2 WHERE id_prodi = $3",
    [bodyUpdate.id_jurusan, bodyUpdate.nama_prodi, id_prodi]
  );
}

async function deleteProdi(id_prodi) {
  await sibema.query("DELETE FROM prodi WHERE id_prodi = $1", [id_prodi]);
}

export {
  getProdi,
  addProdi,
  getProdiById,
  getProdiId,
  updateProdi,
  deleteProdi,
};
