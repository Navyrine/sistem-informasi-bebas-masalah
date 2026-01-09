import express from "express";
import authenticate from "../middleware/authMiddleware.js";
import authorize from "../middleware/roleMiddleware.js";
import uploadFile from "../middleware/handleFileTugasAkhir.js";
import {
  presentTugasAkhir,
  presentTugasAkhirById,
  newTugasAkhir,
  changeTugasAkhir,
  changeStatusTugasAkhir,
} from "../controller/tugasAkhirController.js";

const tugasAkhirRoute = express.Router();

tugasAkhirRoute.get("/tugas-akhir", authenticate, presentTugasAkhir);
tugasAkhirRoute.get(
  "/tugas-akhir/:id_ta",
  authenticate,
  authorize("mahasiswa"),
  presentTugasAkhirById
);
tugasAkhirRoute.post(
  "/tugas-akhir",
  authenticate,
  authorize("mahasiswa"),
  uploadFile,
  newTugasAkhir
);
tugasAkhirRoute.put(
  "/tugas-akhir/:id_ta",
  authenticate,
  authorize("mahasiswa"),
  uploadFile,
  changeTugasAkhir
);
tugasAkhirRoute.put(
  "/tugas-akhir/status/:id_ta",
  authenticate,
  authorize("pengawas_tugas_akhir"),
  changeStatusTugasAkhir
);

export default tugasAkhirRoute;
