import express from "express";
import handleFilePerpustakaan from "../middleware/handleFilePerpustakaan.js";
import authenticate from "../middleware/authMiddleware.js";
import authorize from "../middleware/roleMiddleware.js";
import {
  presentPerpustakaan,
  presentPerpustakaanById,
  presentStatusPerpustakaanByMhsId,
  presentPerpustakaanByMhsId,
  newPerpustakaan,
  changePerpustakaan,
  changeStatusPerpustakaan,
} from "../controller/perpustakaanController.js";

const perpustakaanRoute = express.Router();

perpustakaanRoute.get(
  "/perpustakaan",
  authenticate,
  authorize("pengawas_perpustakaan"),
  presentPerpustakaan
);
perpustakaanRoute.get(
  "/perpustakaan/mhs",
  authenticate,
  authorize("mahasiswa"),
  presentPerpustakaanByMhsId
);
perpustakaanRoute.get(
  "/perpustakaan/mhs/status",
  authenticate,
  authorize("mahasiswa"),
  presentStatusPerpustakaanByMhsId
);
perpustakaanRoute.get(
  "/perpustakaan/:id_perpus",
  authenticate,
  authorize("mahasiswa", "pengawas_perpustakaan"),
  presentPerpustakaanById
);
perpustakaanRoute.post(
  "/perpustakaan",
  authenticate,
  authorize("mahasiswa"),
  handleFilePerpustakaan.single("dokumen_perpus"),
  newPerpustakaan
);
perpustakaanRoute.put(
  "/perpustakaan/:id_perpus",
  authenticate,
  authorize("mahasiswa"),
  handleFilePerpustakaan.single("dokumen_perpus"),
  changePerpustakaan
);
perpustakaanRoute.put(
  "/perpustakaan/status/:id_perpus",
  authenticate,
  authorize("pengawas_perpustakaan"),
  changeStatusPerpustakaan
);

export default perpustakaanRoute;
