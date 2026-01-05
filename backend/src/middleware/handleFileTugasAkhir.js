import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/upload/tugas-akhir");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

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
