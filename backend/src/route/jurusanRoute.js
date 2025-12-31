import express from "express";
import {
  presentJurusan,
  newJurusan,
  changeJurusan,
} from "../controller/jurusanController.js";

const jurusanRouter = express.Router();

jurusanRouter.get("/jurusan", presentJurusan);
jurusanRouter.post("/jurusan", newJurusan);
jurusanRouter.put("/jurusan/:id_jurusan", changeJurusan);

export default jurusanRouter;
