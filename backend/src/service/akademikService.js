import ConflictError from "../error/ConflictError.js";
import {
  getAkademik,
  getAkademikById,
  addAkademik,
  updateAkademik,
} from "../model/akademikModel.js";

async function showAkademik() {
  const result = await getAkademik();

  if (result.length === 0) {
    throw new ConflictError("Data akademik tidak ditemukan");
  }

  return result;
}

async function showAkademikById(akademikId) {
  akademikId = parseInt(akademikId);

  const result = await getAkademikById(akademikId);

  if (!result) {
    throw new ConflictError("Data akademik tidak ditemukan");
  }

  return result;
}

async function saveAkademik(
  khsSem1,
  khsSem2,
  khsSem3,
  khsSem4,
  khsSem5,
  khsSem6,
  lembarSp
) {
  await addAkademik(
    khsSem1,
    khsSem2,
    khsSem3,
    khsSem4,
    khsSem5,
    khsSem6,
    lembarSp
  );
}

async function editTugasAkhir(updateData, akademikId) {
  akademikId = parseInt(akademikId);

  const existingAkademik = getAkademikById(akademikId);
  if (!existingAkademik) {
    throw new ConflictError("Data akademik tidak ditemukan");
  }

  const update = {
    khs_sem_1: updateData.khs_sem_1 ?? existingAkademik.khs_sem_1,
    khs_sem_2: updateData.khs_sem_2 ?? existingAkademik.khs_sem_2,
    khs_sem_3: updateData.khs_sem_3 ?? existingAkademik.khs_sem_3,
    khs_sem_4: updateData.khs_sem_4 ?? existingAkademik.khs_sem_4,
    khs_sem_5: updateData.khs_sem_5 ?? existingAkademik.khs_sem_5,
    khs_sem_6: updateData.khs_sem_6 ?? existingAkademik.khs_sem_6,
    lembar_sp: updateData.lembar_sp ?? existingAkademik.lembar_sp,
  };
  await updateAkademik(update, akademikId);
}

export { showAkademik, showAkademikById, saveAkademik, editTugasAkhir };
