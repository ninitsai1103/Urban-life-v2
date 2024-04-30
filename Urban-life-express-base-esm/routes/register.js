import express from 'express';
import db from '#configs/mysql.js'; // 請確保正確導入資料庫模組

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { account, password } = req.body;

    // 在這裡執行資料庫操作，例如將新使用者資料新增到資料庫中
    const sql = 'INSERT INTO users (account, password) VALUES (?, ?)';
    await db.query(sql, [account, password]);

    // 回傳成功訊息
    res.json({ status: 'success', message: '使用者註冊成功' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', message: '發生內部錯誤' });
  }
});

export default router;
