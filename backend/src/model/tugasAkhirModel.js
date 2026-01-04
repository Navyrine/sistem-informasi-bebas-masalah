import sibema from "../config/sibema.js";

async function getTugasAkhir() {
  const query = await sibema.query("SELECT * FROM tugas_akhir");
  const result = query.rows;

  return result;
}

async function getTugasAkhirById(taId) {
  const query = await sibema.query("SELECT * FROM WHERE id_ta = $1", [taId]);
  const result = query.rows[0];

  return result;
}

async function addTugasAkhir(
  lembarPersetujuan,
  lembarPengesahan,
  lembarKonsul1,
  lembarKonsul2,
  lembarRevisi,
  rincian
) {
  await sibema.query(
    `
        INSERT INTO tugas_akhir
        (lembar_persetujuan, lembar_pengesahan, lembar_konsul_1, lembar_konsul_2, lembar_revisi)
        VALUES
        ($1, $2, $3, $4, $5)
    `,
    [
      lembarPersetujuan,
      lembarPengesahan,
      lembarKonsul1,
      lembarKonsul2,
      lembarRevisi,
    ]
  );
}

async function updateTugasAkhir(taId, updateBody) {
  await sibema.query(
    `
        UPDATE tugas_akhir
        SET
        lembar_persetujuan = $1,
        lembar_pengesahan = $2,
        lembar_konsul_1 = $3,
        lembar_konsul_2 = $4,
        lembar_revisi = $5,
        WHERE id_ta = $6 
    `,
    [
      updateBody.lembar_persetujuan,
      updateBody.lembar_pengesahan,
      updateBody.lembar_konsul_1,
      updateBody.lembar_konsul_2,
      updateBody.lembar_revisi,
      updateBody.rincian,
      taId,
    ]
  );
}

export { getTugasAkhir, getTugasAkhirById, addTugasAkhir, updateTugasAkhir };
