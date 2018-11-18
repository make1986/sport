import express from "express";
import multer from "multer";
import path from "path";

const router = express.Router();

router.post("/add", (req, res) => {
  const storage = multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, "public/Uploads/Images");
    },
    filename: (req, file, callback) => {
      callback(null, Date.now() + path.extname(file.originalname));
    }
  });
  const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (req, file, callback) => {
      const ext = path.extname(file.originalname);
      if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
        const err = new Error("Extention");
        err.code = "EXTENTION";
        return callback(err);
      }
      callback(null, true);
    }
  }).single("file");

  upload(req, res, err => {
    let error = "";
    let filename = "";
    if (err) {
      if (err.code === "LIMIT_FILE_SIZE") {
        error = "Загружаемая картинка не должна превышать 5MB!";
      }
      if (err.code === "EXTENTION") {
        error = "Можно загружать файлы с расширениями JPG, JPEG, PNG!";
      }
      res.json({
        ok: false,
        err
      });
    } else {
      if (req.file && req.file.filename) {
        filename = req.file.filename;
      }
      res.json({
        ok: true,
        filename: filename
      });
    }
  });
});

module.exports = router;
