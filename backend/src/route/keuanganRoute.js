import express from "express";
import authenticate from "../middleware/authMiddleware.js";
import authorize from "../middleware/roleMiddleware.js";
import handleFileKeuangan from "../middleware/handleFileKeuangan.js";
import {
  presentKeuangan,
  presentStatusKeuanganByMhsId,
  presentKeuanganById,
  presentKeuanganByMhsId,
  newKeuangan,
  changeKeuangan,
  changeStatusKeuangan,
} from "../controller/keuanganController.js";

const keuanganRoute = express.Router();

keuanganRoute.get(
  "/keuangan",
  authenticate,
  authorize("pengawas_keuangan"),
  presentKeuangan
);
keuanganRoute.get(
  "/keuangan/mhs",
  authenticate,
  authorize("mahasiswa"),
  presentKeuanganByMhsId
);
keuanganRoute.get(
  "/keuangan/mhs/status",
  authenticate,
  authorize("mahasiswa"),
  presentStatusKeuanganByMhsId
);
keuanganRoute.get(
  "/keuangan/:id_keuangan",
  authenticate,
  authorize("mahasiswa", "pengawas_keuangan"),
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
  "/keuangan/status/:id_keuangan",
  authenticate,
  authorize("pengawas_keuangan"),
  changeStatusKeuangan
);
keuanganRoute.put(
  "/keuangan/:id_keuangan",
  authenticate,
  authorize("mahasiswa"),
  handleFileKeuangan.single("keuangan"),
  changeKeuangan
);

export default keuanganRoute;
