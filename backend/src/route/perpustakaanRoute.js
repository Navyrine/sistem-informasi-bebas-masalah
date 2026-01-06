import express from "express";
import handleFilePerpustakaan from "../middleware/handleFilePerpustakaan.js";
import {
  presentPerpustakaan,
  presentPerpustakaanById,
  newPerpustakaan,
  changePerpustakaan,
} from "../controller/perpustakaanController.js";

const perpustakaanRoute = express.Router();

perpustakaanRoute.get("/perpustakaan", presentPerpustakaan);
perpustakaanRoute.get("/perpustakaan/:id_perpus", presentPerpustakaanById);
perpustakaanRoute.post(
  "/perpustakaan",
  handleFilePerpustakaan,
  newPerpustakaan
);
perpustakaanRoute.put(
  "/perpustakaan/id_perpus",
  handleFilePerpustakaan,
  changePerpustakaan
);

export default perpustakaanRoute;
