import express from "express";
import authenticate from "../middleware/authMiddleware.js";
import authorize from "../middleware/roleMiddleware.js";
import uploadFile from "../middleware/handleFileTugasAkhir.js";
import {
  presentTugasAkhir,
  presentTugasAkhirById,
  presentTugasAkhirByMhsId,
  presentStatusTugasAkhirByMhsId,
  newTugasAkhir,
  changeTugasAkhir,
  changeStatusTugasAkhir,
} from "../controller/tugasAkhirController.js";

const tugasAkhirRoute = express.Router();

tugasAkhirRoute.get(
  "/tugas-akhir",
  authenticate,
  authorize("pengawas_tugas_akhir"),
  presentTugasAkhir
);
tugasAkhirRoute.get(
  "/tugas-akhir/mhs",
  authenticate,
  authorize("mahasiswa"),
  presentTugasAkhirByMhsId
);
tugasAkhirRoute.get(
  "/tugas-akhir/mhs/status/",
  authenticate,
  authorize("mahasiswa"),
  presentStatusTugasAkhirByMhsId
);
tugasAkhirRoute.get(
  "/tugas-akhir/:id_ta",
  authenticate,
  authorize("mahasiswa", "pengawas_tugas_akhir"),
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
