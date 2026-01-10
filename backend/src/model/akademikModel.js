import sibema from "../config/sibema.js";

async function getAkademik() {
  const query = await sibema.query(`
    SELECT
    id_akademik,
    khs_sem_1,  
    khs_sem_2,  
    khs_sem_3,  
    khs_sem_4,  
    khs_sem_5,  
    khs_sem_6,  
    lembar_sp,
    rincian,
    status
    FROM akademik
  `);
  const result = query.rows;

  return result;
}

async function getAkademikById(akademikId) {
  const query = await sibema.query(
    `
    SELECT
    id_akademik,
    khs_sem_1, 
    khs_sem_2, 
    khs_sem_3, 
    khs_sem_4, 
    khs_sem_5, 
    khs_sem_6, 
    lembar_sp
    FROM akademik 
    WHERE id_akademik = $1  
  `,
    [akademikId]
  );
  const result = query.rows[0];

  return result;
}

async function getStatusAkademikById(akademikId) {
  const query = await sibema.query(
    `
    SELECT
    id_akademik,
    rincian,
    status
    FROM akademik
    WHERE id_akademik = $1  
  `,
    [akademikId]
  );
  const result = query.rows[0];

  return result;
}

async function addAkademik(
  mhsId,
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
        (id_mhs, khs_sem_1, khs_sem_2, khs_sem_3, khs_sem_4, khs_sem_5, khs_sem_6, lembar_sp)
        VALUES
        ($1, $2, $3, $4, $5, $6, $7, $8)
    `,
    [mhsId, khsSem1, khsSem2, khsSem3, khsSem4, khsSem5, khsSem6, lembarSp]
  );
}

async function updateAkademik(
  mhsId,
  khsSem1,
  khsSem2,
  khsSem3,
  khsSem4,
  khsSem5,
  khsSem6,
  lembarSp,
  akademikId
) {
  await sibema.query(
    `
        UPDATE akademik
        SET
        id_mhs = $1,
        khs_sem_1 = $2,
        khs_sem_2 = $3,
        khs_sem_3 = $4,
        khs_sem_4 = $5,
        khs_sem_5 = $6,
        khs_sem_6 = $7,
        lembar_sp = $8
        WHERE id_akademik = $9
    `,
    [
      mhsId,
      khsSem1,
      khsSem2,
      khsSem3,
      khsSem4,
      khsSem5,
      khsSem6,
      lembarSp,
      akademikId,
    ]
  );
}

async function updateStatusAkademik(pegawaiId, rincian, status, akademikId) {
  await sibema.query(
    `
    UPDATE akademik
    SET
    id_pegawai = $1,
    rincian = $2,
    status = $3
    WHERE id_akademik = $4  
  `,
    [pegawaiId, rincian, status, akademikId]
  );
}

export {
  getAkademik,
  getAkademikById,
  getStatusAkademikById,
  addAkademik,
  updateAkademik,
  updateStatusAkademik,
};
