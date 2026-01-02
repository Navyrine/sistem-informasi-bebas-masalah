import express from "express";
import {
  presentPegawai,
  presentPegawaiById,
  newPegawai,
  changePegawai,
  remove,
} from "../controller/pegawaiController.js";

const pegawaiRouter = express.Router();

pegawaiRouter.get("/pegawai", presentPegawai);
pegawaiRouter.get("/pegawai/:id_pegawai", presentPegawaiById);
pegawaiRouter.post("/pegawai", newPegawai);
pegawaiRouter.patch("/pegawai/:id_pegawai", changePegawai);
pegawaiRouter.delete("/pegawai/:id_pegawaid", remove);

export default pegawaiRouter;
