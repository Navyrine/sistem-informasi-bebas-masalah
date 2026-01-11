import express from "express";
import handleFileAkademik from "../middleware/handleFileAkademik.js";
import authenticate from "../middleware/authMiddleware.js";
import authorize from "../middleware/roleMiddleware.js";
import {
  presentAkademik,
  presentAkademikById,
  presentStatusAkademikByMhsId,
  presentAkademikByMhsId,
  newAkademik,
  changeAkademik,
  changeStatusAkademik,
} from "../controller/akademikController.js";

const akademikRoute = express.Router();

akademikRoute.get(
  "/akademik",
  authenticate,
  authorize("pengawas_akademik"),
  presentAkademik
);
akademikRoute.get(
  "/akademik/mhs",
  authenticate,
  authorize("mahasiswa"),
  presentAkademikByMhsId
);
akademikRoute.get(
  "/akademik/mhs/status",
  authenticate,
  authorize("mahasiswa"),
  presentStatusAkademikByMhsId
);
akademikRoute.get(
  "/akademik/:id_akademik",
  authenticate,
  authorize("mahasiswa", "pengawas_akademik"),
  presentAkademikById
);
akademikRoute.post(
  "/akademik",
  authenticate,
  authorize("mahasiswa"),
  handleFileAkademik,
  newAkademik
);
akademikRoute.put(
  "/akademik/:id_akademik",
  authenticate,
  authorize("mahasiswa"),
  handleFileAkademik,
  changeAkademik
);
akademikRoute.put(
  "/akademik/status/:id_akademik",
  authenticate,
  authorize("pengawas_akademik"),
  changeStatusAkademik
);

export default akademikRoute;
