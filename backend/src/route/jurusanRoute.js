import express from "express";
import authenticate from "../middleware/authMiddleware.js";
import authorize from "../middleware/roleMiddleware.js";
import {
  presentJurusan,
  presentJurusanById,
  newJurusan,
  changeJurusan,
} from "../controller/jurusanController.js";

const jurusanRouter = express.Router();

jurusanRouter.get(
  "/jurusan",
  authenticate,
  authorize("administrator"),
  presentJurusan
);
jurusanRouter.get(
  "/jurusan/:id_jurusan",
  authenticate,
  authorize("administrator"),
  presentJurusanById
);
jurusanRouter.post(
  "/jurusan",
  authenticate,
  authorize("administrator"),
  newJurusan
);
jurusanRouter.put(
  "/jurusan/:id_jurusan",
  authenticate,
  authorize("administrator"),
  changeJurusan
);

export default jurusanRouter;
