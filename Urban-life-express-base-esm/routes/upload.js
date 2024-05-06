import { createRouter } from 'next-connect'
import multer from 'multer'
import { v4 as uuidv4 } from 'uuid'
import path from 'path'
import db from '#configs/mysql.js'

const router = createRouter()

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/avatar')
  },
  filename: function (req, file, cb) {
    const fileExt = path.extname(file.originalname)
    const filename = uuidv4() + fileExt
    cb(null, filename)
  },
})

const upload = multer({ storage: storage })


router.use(upload.single('avatar')).post(async (req, res) => {
  try {
    const userId = req.body.userId;
    const img = req.file.filename;
    // console.log(userId);
    const sqlUpdate = 'UPDATE `user_teacher` SET `img` = ? WHERE `id` = ?';
    

    await db.query(sqlUpdate, [img, userId], (error, results) => {
      if (error) {
        console.error('更新失敗:', error);
        res.status(500).json({ message: '更新失敗' });
      } else {
        console.log('更新成功:', results);
        res.status(200).json({ message: '檔案上傳成功' });
      }
    });

  } catch (error) {
    console.error('操作失败:', error);
    res.status(500).json({ message: '操作失败' });
  }
});

export const config = {
  api: {
    bodyParser: false, // 關掉 body parsing, multer 會代為處理
  },
}

export default router.handler({
  onError: (err, req, res) => {
    console.error(err.stack)
    res.status(err.statusCode || 500).end(err.message)
  },
})
