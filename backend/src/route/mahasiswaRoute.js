import express from "express";
import authenticate from "../middleware/authMiddleware.js";
import authorize from "../middleware/roleMiddleware.js";
import {
  presentMahsiswa,
  presentMahsiswaById,
  presentProfileMahasiswa,
  newMahasiswa,
  changeMahasiswa,
  remove,
} from "../controller/mahasiswaController.js";

const mahasiswaRouter = express.Router();

mahasiswaRouter.get(
  "/mahasiswa",
  authenticate,
  authorize("administrator"),
  presentMahsiswa
);
mahasiswaRouter.get(
  "/mahasiswa/profile",
  authenticate,
  authorize("mahasiswa"),
  presentProfileMahasiswa
);
mahasiswaRouter.get(
  "/mahasiswa/:id_mhs",
  authenticate,
  authorize("administrator"),
  presentMahsiswaById
);
mahasiswaRouter.post(
  "/mahasiswa",
  authenticate,
  authorize("administrator"),
  newMahasiswa
);
mahasiswaRouter.put(
  "/mahasiswa/:id_mhs",
  authenticate,
  authorize("administrator"),
  changeMahasiswa
);
mahasiswaRouter.delete(
  "/mahasiswa/:id_mhs",
  authenticate,
  authorize("administrator"),
  remove
);

export default mahasiswaRouter;
