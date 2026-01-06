import express from "express";
import handleFileKeuangan from "../middleware/handleFileKeuangan.js";
import {
  presentKeuangan,
  presentKeuanganById,
  newKeuangan,
  changeKeuangan,
} from "../controller/keuanganController.js";

const keuanganRoute = express.Router();

keuanganRoute.get("/keuangan", presentKeuangan);
keuanganRoute.get("/keuangan/:id_keuangan", presentKeuanganById);
keuanganRoute.post("/keuangan", handleFileKeuangan, newKeuangan);
keuanganRoute.put("/keuangan/:id_keuangan", handleFileKeuangan, changeKeuangan);

export default keuanganRoute;
