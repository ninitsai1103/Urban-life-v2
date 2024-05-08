import express from 'express';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';

const router = express.Router();

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'public/images/article')
  },
  filename: function(req, file, cb) {
    const fileExt = path.extname(file.originalname);
    const filename = uuidv4() + fileExt;
    cb(null, filename);
  }
});

const upload = multer({ storage: storage });

router.post('/', upload.single('articleImage'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "檔案未上傳成功" });
    }
    let params = {
      message: "檔案上傳成功",
      url: "/images/article/" + req.file.filename
    };
    res.status(200).json(params);
  } catch (error) {
    console.error("處理過程中發生錯誤:", error);
    res.status(500).json({ message: "伺服器錯誤" });
  }
});

export default router;
