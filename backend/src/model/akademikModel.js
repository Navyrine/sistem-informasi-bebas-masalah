import sibema from "../config/sibema.js";

// AUTHORIZATION PENGAWAS AKADEMIK
async function getAkademik() {
  const query = await sibema.query(`
    SELECT
    akademik.id_akademik,
    akademik.id_mhs,
    nama_mhs
    khs_sem_1,  
    khs_sem_2,  
    khs_sem_3,  
    khs_sem_4,  
    khs_sem_5,  
    khs_sem_6,  
    lembar_sp,
    akademik.rincian,
    akademik.status
    FROM akademik
    LEFT JOIN mahasiswa ON akademik.id_mhs = mahasiswa.id_mhs
  `);
  const result = query.rows;

  return result;
}

// AUTHORIZATION MAHASISWA DAN PENGAWAS AKADEMIK (KHUSUS INI)
async function getAkademikById(akademikId) {
  const query = await sibema.query(
    `
    SELECT
    akademik.id_akademik,
    akademik.id_pegawai,
    akademik.id_mhs,
    nama_pegawai,
    nama_mhs,
    khs_sem_1, 
    khs_sem_2, 
    khs_sem_3, 
    khs_sem_4, 
    khs_sem_5, 
    khs_sem_6, 
    lembar_sp,
    akademik.rincian,
    akademik.status
    FROM akademik
    LEFT JOIN pegawai ON akademik.id_pegawai = pegawai.id_pegawai
    LEFT JOIN mahasiswa ON akademik.id_mhs = mahasiswa.id_mhs
    WHERE id_akademik = $1  
  `,
    [akademikId]
  );
  const result = query.rows[0];

  return result;
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

// AUTHORIZATION MAHASISWA
async function getStatusAkademikByMhsId(mhsId) {
  const query = await sibema.query(
    `
    SELECT
    akademik.id_akademik,
    akademik.id_mhs,
    nama_mhs,
    akademik.rincian,
    akademik.status
    FROM akademik
    LEFT JOIN mahasiswa ON akademik.id_mhs = mahasiswa.id_mhs
    WHERE akademik.id_mhs = $1
  `,
    [mhsId]
  );
  const result = query.rows[0];

  return result;
}

async function getAkademikByMhsId(mhsId) {
  const query = await sibema.query(
    `
    SELECT
    akademik.id_akademik,
    akademik.id_pegawai,
    akademik.id_mhs,
    nama_pegawai,
    nama_mhs,
    khs_sem_1, 
    khs_sem_2, 
    khs_sem_3, 
    khs_sem_4, 
    khs_sem_5, 
    khs_sem_6, 
    lembar_sp,
    akademik.rincian,
    akademik.status
    FROM akademik
    LEFT JOIN pegawai ON akademik.id_pegawai = pegawai.id_pegawai
    LEFT JOIN mahasiswa ON akademik.id_mhs = mahasiswa.id_mhs
    WHERE akademik.id_mhs = $1  
  `,
    [mhsId]
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

export {
  getAkademik,
  getAkademikById,
  getStatusAkademikByMhsId,
  getAkademikByMhsId,
  addAkademik,
  updateAkademik,
  updateStatusAkademik,
};
