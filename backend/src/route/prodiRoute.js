import express from "express";
import authenticate from "../middleware/authMiddleware.js";
import authorize from "../middleware/roleMiddleware.js";
import {
  presentProdi,
  presentProdibyId,
  newProdi,
  changeProdi,
  remove,
} from "../controller/prodiController.js";

const prodiRouter = express.Router();

prodiRouter.get(
  "/prodi",
  authenticate,
  authorize("administrator"),
  presentProdi
);
prodiRouter.get(
  "/prodi/:id_prodi",
  authenticate,
  authorize("administrator"),
  presentProdibyId
);
prodiRouter.post("/prodi", authenticate, authorize("administrator"), newProdi);
prodiRouter.put(
  "/prodi/:id_prodi",
  authenticate,
  authorize("administrator"),
  changeProdi
);
prodiRouter.delete(
  "/prodi/:id_prodi",
  authenticate,
  authorize("administrator"),
  remove
);

export default prodiRouter;
