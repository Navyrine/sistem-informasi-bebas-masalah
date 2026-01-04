import multer from "multer";
import path from "path";
import BadRequestError from "../error/BadRequestError.js";

const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, "src/upload/tugas-akhir");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const allowedField = [
  "lembar_persetujuan",
  "lembar_pengesahan",
  "lembar_konsul_1",
  "lembar_konsul_2",
  "lembar_revisi",
];

const uploadFile = multer({ storage }).fields([
  {
    name: "lembar_persetujuan",
    maxCount: 1,
  },
  {
    name: "lembar_pengesahan",
    maxCount: 1,
  },
  {
    name: "lembar_konsul_1",
    maxCount: 1,
  },
  {
    name: "lembar_konsul_2",
    maxCount: 1,
  },
  {
    name: "lembar_revisi",
    maxCount: 1,
  },
]);

export default uploadFile;
