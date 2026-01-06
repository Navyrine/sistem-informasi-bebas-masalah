import ConflictError from "../error/ConflictError.js";
import {
  getPerpustakaan,
  getPerpustakaanById,
  addPerpustakaan,
  updatePerpustakaan,
} from "../model/perpustakaanModel.js";

async function showPerpustakaan() {
  const result = await getPerpustakaan();

  if (result.length === 0) {
    throw new ConflictError("Data perpustakaan tidak ditemukan");
  }

  return result;
}

async function showPerpustakaanById(perpusId) {
  const result = await getPerpustakaanById(perpusId);

  if (!result) {
    throw new ConflictError("Data perpustakaan tidak ditemukan");
  }

  return result;
}

async function savePerpustakaan(dokumen_perpus) {
  await addPerpustakaan(dokumen_perpus);
}

async function updatePerpustakaan(perpusId, dokumen_perpus) {
  await addPerpustakaan(dokumen_perpus, perpusId);
}

export {
  showPerpustakaan,
  showPerpustakaanById,
  savePerpustakaan,
  updatePerpustakaan,
};
