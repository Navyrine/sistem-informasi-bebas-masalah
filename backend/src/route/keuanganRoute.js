import express from "express";
import authenticate from "../middleware/authMiddleware.js";
import authorize from "../middleware/roleMiddleware.js";
import handleFileKeuangan from "../middleware/handleFileKeuangan.js";
import {
  presentKeuangan,
  presentKeuanganById,
  newKeuangan,
  changeKeuangan,
} from "../controller/keuanganController.js";

const keuanganRoute = express.Router();

keuanganRoute.get(
  "/keuangan",
  authenticate,
  authorize("mahasiswa"),
  presentKeuangan
);
keuanganRoute.get(
  "/keuangan/:id_keuangan",
  authenticate,
  authorize("mahasiswa"),
  presentKeuanganById
);
keuanganRoute.post(
  "/keuangan",
  authenticate,
  authorize("mahasiswa"),
  handleFileKeuangan.single("keuangan"),
  newKeuangan
);
keuanganRoute.put(
  "/keuangan/:id_keuangan",
  authenticate,
  authorize("mahasiswa"),
  handleFileKeuangan.single("keuangan"),
  changeKeuangan
);

export default keuanganRoute;
