import express from "express";
import {
  presentProdi,
  presentProdibyId,
  newProdi,
  changeProdi,
  remove,
} from "../controller/prodiController.js";

const prodiRouter = express.Router();

prodiRouter.get("/prodi", presentProdi);
prodiRouter.get("/prodi/:id_prodi", presentProdibyId);
prodiRouter.post("/prodi", newProdi);
prodiRouter.patch("/prodi/:id_prodi", changeProdi);
prodiRouter.delete("/prodi/:id_prodi", remove);

export default prodiRouter;
