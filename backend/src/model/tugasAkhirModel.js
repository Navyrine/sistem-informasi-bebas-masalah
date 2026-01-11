import sibema from "../config/sibema.js";

// AUTHORIZATION PENGAWAS TUGAS AKHIR
async function getTugasAkhir() {
  const query = await sibema.query(`
    SELECT
    tugas_akhir.id_ta,
    tugas_akhir.id_mhs,
    nama_mhs,
    lembar_persetujuan,
    lembar_pengesahan,
    lembar_konsul_1,
    lembar_konsul_2,
    lembar_revisi,
    tugas_akhir.rincian,
    tugas_akhir.status
    FROM tugas_akhir
    LEFT JOIN mahasiswa ON tugas_akhir.id_mhs = mahasiswa.id_mhs  
  `);
  const result = query.rows;

  return result;
}

// KHUSUS INI BISA DIAKSES OLEH MHS DAN PENGAWAS TUGAS AKHIR
async function getTugasAkhirById(taId) {
  const query = await sibema.query(
    `
    SELECT
    tugas_akhir.id_ta,
    tugas_akhir.id_pegawai,
    tugas_akhir.id_mhs,
    nama_mhs,
    nama_pegawai,
    lembar_persetujuan,
    lembar_pengesahan,
    lembar_konsul_1,
    lembar_konsul_2,
    lembar_revisi,
    tugas_akhir.rincian,
    tugas_akhir.status
    FROM tugas_akhir
    LEFT JOIN pegawai ON tugas_akhir.id_pegawai = pegawai.id_pegawai
    LEFT JOIN mahasiswa ON tugas_akhir.id_mhs = mahasiswa.id_mhs
    WHERE tugas_akhir.id_ta = $1
  `,
    [taId]
  );
  const result = query.rows[0];

  return result;
}

async function updateStatusTugasAkhir(pegawaiId, rincian, status, taId) {
  await sibema.query(
    `
    UPDATE tugas_akhir
    SET
    id_pegawai = $1,
    rincian = $2,
    status = $3
    WHERE id_ta = $4
  `,
    [pegawaiId, rincian, status, taId]
  );
}

// AUTHORIZATION MAHASISWA
async function getTugasAkhirByMhsId(mhsId) {
  const query = await sibema.query(
    `
    SELECT
    tugas_akhir.id_ta,
    tugas_akhir.id_pegawai,
    tugas_akhir.id_mhs,
    nama_pegawai,
    lembar_persetujuan,
    lembar_pengesahan,
    lembar_konsul_1,
    lembar_konsul_2,
    lembar_revisi,
    tugas_akhir.rincian,
    tugas_akhir.status
    FROM tugas_akhir
    LEFT JOIN pegawai ON tugas_akhir.id_pegawai = pegawai.id_pegawai
    LEFT JOIN mahasiswa ON tugas_akhir.id_mhs = mahasiswa.id_mhs
    WHERE tugas_akhir.id_mhs = $1
  `,
    [mhsId]
  );
  const result = query.rows[0];

  return result;
}

async function getStatusTugasAkhirByMhsId(mhsId) {
  const query = await sibema.query(
    `
    SELECT
    tugas_akhir.id_ta,
    tugas_akhir.status
    FROM tugas_akhir
    LEFT JOIN mahasiswa ON tugas_akhir.id_mhs = mahasiswa.id_mhs
    WHERE tugas_akhir.id_mhs = $1  
  `,
    [mhsId]
  );
  const result = query.rows[0];

  return result;
}

async function addTugasAkhir(
  mhsId,
  lembarPersetujuan,
  lembarPengesahan,
  lembarKonsul1,
  lembarKonsul2,
  lembarRevisi
) {
  await sibema.query(
    `
        INSERT INTO tugas_akhir
        (id_mhs, lembar_persetujuan, lembar_pengesahan, lembar_konsul_1, lembar_konsul_2, lembar_revisi)
        VALUES
        ($1, $2, $3, $4, $5, $6)
    `,
    [
      mhsId,
      lembarPersetujuan,
      lembarPengesahan,
      lembarKonsul1,
      lembarKonsul2,
      lembarRevisi,
    ]
  );
}

async function updateTugasAkhir(
  mhsId,
  lembarPersetujuan,
  lembarPengesahan,
  lembarKonsul1,
  lembarKonsul2,
  lembarRevisi,
  taId
) {
  await sibema.query(
    `
        UPDATE tugas_akhir
        SET
        id_mhs =$1,
        lembar_persetujuan = $2,
        lembar_pengesahan = $3,
        lembar_konsul_1 = $4,
        lembar_konsul_2 = $5,
        lembar_revisi = $6
        WHERE id_ta = $7
    `,
    [
      mhsId,
      lembarPersetujuan,
      lembarPengesahan,
      lembarKonsul1,
      lembarKonsul2,
      lembarRevisi,
      taId,
    ]
  );
}

export {
  getTugasAkhir,
  getTugasAkhirById,
  getTugasAkhirByMhsId,
  getStatusTugasAkhirByMhsId,
  addTugasAkhir,
  updateTugasAkhir,
  updateStatusTugasAkhir,
};
