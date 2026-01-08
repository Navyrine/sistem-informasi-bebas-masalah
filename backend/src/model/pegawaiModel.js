import sibema from "../config/sibema.js";

async function getPegawai() {
  const query = await sibema.query("SELECT * FROM pegawai");
  const result = query.rows;

  return result;
}

async function getPegawaiById(pegawaiId) {
  const query = await sibema.query(
    "SELECT * from pegawai WHERE id_pegawai = $1",
    [pegawaiId]
  );
  const result = query.rows[0];

  return result;
}

async function getPegawaiId(namaPegawai) {
  const query = await sibema.query(
    "SELECT id_pegawai FROM pegawai WHERE LOWER(nama_pegawai) = $1",
    [namaPegawai]
  );
  const result = query.rows[0];

  return result;
}

async function addPegawai(namaPegawai, noTelp, alamat) {
  await sibema.query(
    `
        INSERT INTO pegawai
        (nama_pegawai, no_telp, alamat)
        VALUES
        ($1, $2, $3)    
    `,
    [namaPegawai, noTelp, alamat]
  );
}

async function updateAccountId(accountId, pegawaiId) {
  await sibema.query(
    "UPDATE pegawai SET id_account = $1 WHERE id_pegawai = $2",
    [accountId, pegawaiId]
  );
}

async function updatePegawai(pegawaiId, namaPegawai, noTelp, alamat) {
  await sibema.query(
    `
        UPDATE pegawai SET
        nama_pegawai = $1, 
        no_telp = $2, 
        alamat = $3
        WHERE id_pegawai = $4   
    `,
    [namaPegawai, noTelp, alamat, pegawaiId]
  );
}

async function deletePegawai(pegawaiId) {
  await sibema.query("DELETE FROM pegawai WHERE id_pegawai = $1", [pegawaiId]);
}

export {
  getPegawai,
  getPegawaiById,
  getPegawaiId,
  addPegawai,
  updateAccountId,
  updatePegawai,
  deletePegawai,
};
