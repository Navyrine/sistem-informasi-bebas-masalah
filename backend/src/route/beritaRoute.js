import express from "express";
import imageHandle from "../middleware/imageHandle.js";
import authenticate from "../middleware/authMiddleware.js";
import authorize from "../middleware/roleMiddleware.js";
import {
  presentBerita,
  presentBeritaById,
  newBerita,
  changeBerita,
  remove,
} from "../controller/beritaController.js";

const beritaRoute = express.Router();

beritaRoute.get("/berita", authenticate, presentBerita);
beritaRoute.get(
  "/berita/:id_berita",
  authenticate,
  authorize("administrator"),
  presentBeritaById
);
beritaRoute.post(
  "/berita",
  authenticate,
  authorize("administrator"),
  imageHandle.single("gambar"),
  newBerita
);
beritaRoute.put(
  "/berita/:id_berita",
  authenticate,
  authorize("administrator"),
  imageHandle.single("gambar"),
  changeBerita
);
beritaRoute.delete(
  "/berita/:id_berita",
  authenticate,
  authorize("administrator"),
  remove
);

export default beritaRoute;
