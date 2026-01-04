import express from "express";
import uploadFile from "../middleware/handleFileTugasAkhir.js";
import {
  presentTugasAkhir,
  presentTugasAkhirById,
  newTugasAkhir,
  changeTugasAkhir,
} from "../controller/tugasAkhirController.js";

const tugasAkhirRoute = express.Router();

tugasAkhirRoute.get("/tugas-akhir", presentTugasAkhir);
tugasAkhirRoute.get("/tugas-akhir/:id_ta", presentTugasAkhirById);
tugasAkhirRoute.post("/tugas-akhir", uploadFile, newTugasAkhir);
tugasAkhirRoute.patch("/tugas-akhir/:id_ta", uploadFile, changeTugasAkhir);

export default tugasAkhirRoute;
