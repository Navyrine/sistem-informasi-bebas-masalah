import express from "express";
import imageHandle from "../middleware/imageHandle.js";
import {
  presentBerita,
  presentBeritaById,
  newBerita,
  changeBerita,
  remove,
} from "../controller/beritaController.js";

const beritaRoute = express.Router();

beritaRoute.get("/berita", presentBerita);
beritaRoute.get("/berita/:id_berita", presentBeritaById);
beritaRoute.post("/berita", imageHandle.single("gambar"), newBerita);
beritaRoute.put(
  "/berita/:id_berita",
  imageHandle.single("gambar"),
  changeBerita
);
beritaRoute.delete("/berita/:id_berita", remove);

export default beritaRoute;
