import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, "src/upload/gambar-berita");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const uploadImage = multer({ storage });

export default uploadImage;
