import sibema from "../config/sibema.js";

async function getKeuangan() {
  const query = await sibema.query("SELECT * FROM keuangan");
  const result = query.rows;

  return result;
}

async function getKeuanganById(keuanganId) {
  const query = await sibema.query(
    "SELECT * FROM keuangan WHERE id_keuangan = $1",
    [keuanganId]
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

export { getKeuangan, getKeuanganById, addKeuangan, updateKeuangan };
