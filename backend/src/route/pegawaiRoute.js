import express from "express";
import authenticate from "../middleware/authMiddleware.js";
import authorize from "../middleware/roleMiddleware.js";
import {
  presentPegawai,
  presentPegawaiById,
  newPegawai,
  changePegawai,
  remove,
} from "../controller/pegawaiController.js";

const pegawaiRouter = express.Router();

pegawaiRouter.get(
  "/pegawai",
  authenticate,
  authorize("administrator"),
  presentPegawai
);
pegawaiRouter.get(
  "/pegawai/:id_pegawai",
  authenticate,
  authorize("administrator"),
  presentPegawaiById
);
pegawaiRouter.post(
  "/pegawai",
  authenticate,
  authorize("administrator"),
  newPegawai
);
pegawaiRouter.put(
  "/pegawai/:id_pegawai",
  authenticate,
  authorize("administrator"),
  changePegawai
);
pegawaiRouter.delete(
  "/pegawai/:id_pegawai",
  authenticate,
  authorize("administrator"),
  remove
);

export default pegawaiRouter;
