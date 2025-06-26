import multer from "multer";
import path from "path";

// Basic Multer Method for locally

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

//For imageKit

// const storage = multer.memoryStorage();

const upload = multer({ storage });

export { upload };
