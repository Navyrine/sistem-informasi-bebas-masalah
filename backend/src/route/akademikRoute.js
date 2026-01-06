import express from "express";
import handleFileAkademik from "../middleware/handleFileAkademik.js";
import {
  presentAkademik,
  presentAkademikById,
  newAkademik,
  changeAkademik,
} from "../controller/akademikController.js";

const akademikRoute = express.Router();

akademikRoute.get("/akademik", presentAkademik);
akademikRoute.get("/akademik/:id_akademik", presentAkademikById);
akademikRoute.post("/akademik", handleFileAkademik, newAkademik);
akademikRoute.patch(
  "/akademik/:id_akademik",
  handleFileAkademik,
  changeAkademik
);

export default akademikRoute;
