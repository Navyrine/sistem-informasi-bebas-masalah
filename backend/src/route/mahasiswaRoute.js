import express from "express";
import {
  presentMahsiswa,
  presentMahsiswaById,
  newMahasiswa,
  changeMahasiswa,
  remove,
} from "../controller/mahasiswaController.js";

const mahasiswaRouter = express.Router();

mahasiswaRouter.get("/mahasiswa", presentMahsiswa);
mahasiswaRouter.get("/mahasiswa/:id_mhs", presentMahsiswaById);
mahasiswaRouter.post("/mahasiswa", newMahasiswa);
mahasiswaRouter.patch("/mahasiswa/:id_mhs", changeMahasiswa);
mahasiswaRouter.delete("/mahasiswa/:id_mhs", remove);

export default mahasiswaRouter;
