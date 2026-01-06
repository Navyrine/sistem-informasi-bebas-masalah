import sibema from "../config/sibema.js";

async function getAkademik() {
  const query = await sibema.query("SELECT * FROM akademik");
  const result = query.rows;

  return result;
}

async function getAkademikById(akademikId) {
  const query = await sibema.query(
    "SELECT * FROM akademik WHERE id_akademik = $1",
    [akademikId]
  );
  const result = query.rows[0];

  return result;
}

async function addAkademik(
  khsSem1,
  khsSem2,
  khsSem3,
  khsSem4,
  khsSem5,
  khsSem6,
  lembarSp
) {
  await sibema.query(
    `
        INSERT INTO akademik
        (khs_sem_1, khs_sem_2, khs_sem_3, khs_sem_4, khs_sem_5, khs_sem_6, lembar_sp)
        VALUES
        ($1, $2, $3, $4, $5, $6, $7)
    `,
    [khsSem1, khsSem2, khsSem3, khsSem4, khsSem5, khsSem6, lembarSp]
  );
}

async function updateAkademik(updateData, akademikId) {
  await sibema.query(
    `
        UPDATE akademik
        SET
        khs_sem_1 = $1,
        khs_sem_2 = $2,
        khs_sem_3 = $3,
        khs_sem_4 = $4,
        khs_sem_5 = $5,
        khs_sem_6 = $6,
        lembar_sp = $7
        WHERE id_akademik = $8
    `,
    [
      updateData.khs_sem_1,
      updateData.khs_sem_2,
      updateData.khs_sem_3,
      updateData.khs_sem_4,
      updateData_khs_sem_5,
      updateData_khs_sem_6,
      updateData_lembar_sp,
      akademikId,
    ]
  );
}

export { getAkademik, getAkademikById, addAkademik, updateAkademik };
