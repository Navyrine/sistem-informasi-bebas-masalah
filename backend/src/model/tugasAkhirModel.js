import sibema from "../config/sibema.js";

async function getTugasAkhir() {
  const query = await sibema.query("SELECT * FROM tugas_akhir");
  const result = query.rows;

  return result;
}

async function getTugasAkhirById(taId) {
  const query = await sibema.query(
    "SELECT * FROM tugas_akhir WHERE id_ta = $1",
    [taId]
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

export {
  getTugasAkhir,
  getTugasAkhirById,
  addTugasAkhir,
  updateTugasAkhir,
  updateStatusTugasAkhir,
};
