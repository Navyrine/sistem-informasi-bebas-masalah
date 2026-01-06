import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/upload/akademik");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const uploadFileAkademik = multer({ storage }).fields([
  {
    name: "khs_sem_1",
    maxCount: 1,
  },
  {
    name: "khs_sem_2",
    maxCount: 1,
  },
  {
    name: "khs_sem_3",
    maxCount: 1,
  },
  {
    name: "khs_sem_4",
    maxCount: 1,
  },
  {
    name: "khs_sem_5",
    maxCount: 1,
  },
  {
    name: "khs_sem_6",
    maxCount: 1,
  },
  {
    name: "lembar_sp",
    maxCount: 1,
  },
]);

export default uploadFileAkademik;
