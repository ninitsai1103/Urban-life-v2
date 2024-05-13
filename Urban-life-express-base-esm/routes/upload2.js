// 引入必要的模塊
import express from 'express';
import multer from 'multer';  // multer是一個中間件，用於處理multipart/form-data類型的表單數據，主要用於上傳文件
import { v4 as uuidv4 } from 'uuid';  // 引入uuid，用於生成唯一的ID
import path from 'path';  // path模塊提供了一些工具用於處理文件與目錄的路徑

const router = express.Router();

// 設定 multer 的存儲配置
const storage = multer.diskStorage({
  // 目標位置設定函數
  destination: function(req, file, cb) {
    // 存儲位置為'public/images/article'文件夾
    cb(null, 'public/images/article')
  },
  // 文件名設定函數
  filename: function(req, file, cb) {
    // 獲取上傳文件的擴展名
    const fileExt = path.extname(file.originalname);
    // 生成新的文件名（使用uuid生成唯一標識符，避免文件名重覆）
    const filename = uuidv4() + fileExt;
    // 設定新的文件名
    cb(null, filename);
  }
});

// 創建 multer 實例，指定存儲配置
const upload = multer({ storage: storage });

// 路由處理 POST 請求，只處理單個文件上傳（字段名為'articleImage'）
router.post('/', upload.single('articleImage'), (req, res) => {
  try {
    // 如果沒有文件被上傳，返回錯誤
    if (!req.file) {
      return res.status(400).json({ message: "檔案未上傳成功" });
    }
    // 文件上傳成功，返回成功訊息和文件訪問URL
    let params = {
      message: "檔案上傳成功",
      url: "/images/article/" + req.file.filename  // 使用上傳後的文件名創建訪問URL
    };
    res.status(200).json(params);
  } catch (error) {
    // 處理中發生錯誤，記錄錯誤並返回伺服器錯誤訊息
    console.error("處理過程中發生錯誤:", error);
    res.status(500).json({ message: "伺服器錯誤" });
  }
});

// 導出路由器
export default router;
