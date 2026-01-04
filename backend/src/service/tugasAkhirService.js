import ConflictError from "../error/ConflictError.js";
import BadRequestError from "../error/BadRequestError.js";
import {
  getTugasAkhir,
  getTugasAkhirById,
  addTugasAkhir,
  updateTugasAkhir,
} from "../model/tugasAkhirModel.js";

async function showTugasAkhir() {
  const result = await getTugasAkhir();

  if (result.length === 0) {
    throw new ConflictError("Data tugas akhir tidak ditemukan");
  }

  return result;
}

async function showTugasAkhirById(taId) {
  const result = await getTugasAkhirById(taId);

  if (!result) {
    throw new ConflictError("Data tugas akhir tidak ditemukan");
  }

  taId = parseInt(taId);

  return result;
}

async function saveTugasAkhir(
  lembarPersetujuan,
  lembarPengesahan,
  lembarKonsul1,
  lembarKonsul2,
  lembarRevisi
) {
  if (!lembarPersetujuan) {
    throw new BadRequestError("Lembar pengesahan tidak boleh kosong");
  }

  if (!lembarPengesahan) {
    throw new BadRequestError("Lembar pengesahan tidak boleh kosong");
  }

  if (!lembarKonsul1) {
    throw new BadRequestError("Lembar pengesahan tidak boleh kosong");
  }

  if (!lembarKonsul2) {
    throw new BadRequestError("Lembar pengesahan tidak boleh kosong");
  }

  if (!lembarRevisi) {
    throw new BadRequestError("Lembar pengesahan tidak boleh kosong");
  }

  await addTugasAkhir(
    lembarPengesahan,
    lembarPersetujuan,
    lembarKonsul1,
    lembarKonsul2,
    lembarRevisi
  );
}

async function editTugasAkhir(taId, updateBody) {
  const existingtA = await getTugasAkhirById(taId);

  if (!existingtA) {
    throw new ConflictError("Data tugas akhir tidak ditemukan");
  }

  taId = parseInt(taId);

  const updateData = {
    lembar_persetujuan:
      updateBody.lembar_persetujuan ?? existingtA.lembar_persetujuan,
    lembar_pengesahan:
      updateBody.lembar_pengesahan ?? existingtA.lembar_pengesahan,
    lembar_konsul_1: updateBody.lembar_konsul_1 ?? existingtA.lembar_konsul_1,
    lembar_konsul_2: updateBody.lembar_konsul_2 ?? existingtA.lembar_konsul_2,
    lembar_revisi: updateBody.lembar_revisi ?? existingtA.lembar_revisi,
  };
  await updateTugasAkhir(taId, updateData);
}

export { showTugasAkhir, showTugasAkhirById, saveTugasAkhir, editTugasAkhir };
