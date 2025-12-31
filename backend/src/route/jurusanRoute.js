import express from "express";
import {
  presentJurusan,
  newJurusan,
  changeJurusan,
} from "../controller/jurusanController";

const jurusanRouter = express.Router();

jurusanRouter.get("/jurusan", presentJurusan);
jurusanRouter.post("/jurusan", newJurusan);
jurusanRouter.put("/jurusan", changeJurusan);

export default jurusanRouter;
