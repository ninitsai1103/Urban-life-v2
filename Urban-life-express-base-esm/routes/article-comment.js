import express from 'express';
const router = express.Router();

import { getIdParam } from '#db-helpers/db-tool.js';
import sequelize from '#configs/db.js'; // 雖然沒有使用，但保留引入以便將來可能的擴展
import db from '#configs/mysql.js';

router.get('/:articleId', async function (req, res) {
  const articleId = req.params.articleId;

  let commentSQL = `
    SELECT c.* FROM article_comment AS c
    JOIN article AS a ON c.article_id = a.id
    WHERE c.article_id = ?;
  `; // 移除了冗餘的 WHERE 條件

  try {
    const [rows, fields] = await db.query(commentSQL, [articleId]);
    return res.json({
      status: 'success',
      data: {
        comments: rows,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      status: 'error',
      message: 'Database query failed',
    });
  }
});

// POST 路由，用于新增评论
router.post('/', async (req, res) => {
  const { articleId, userId, commentText } = req.body;
  

  // 确保所有必要的字段都被提供
  if (!articleId || !userId || !commentText) {
    return res.status(400).json({
      status: 'error',
      message: 'Missing required fields: articleId, userId, and commentText.'
    });
  }

  const insertSql = `
    INSERT INTO article_comment (article_id, user_id, comment, date, valid)
    VALUES (?, ?, ?, NOW(), 1);
  `; // 設置valid為1表示有效

  try {
    const result = await db.query(insertSql, [articleId, userId, commentText]);
    res.status(201).json({
      status: 'success',
      message: 'Comment added successfully',
      commentId: result.insertId // 返回新插入的评论的 ID
    });
  } catch (error) {
    console.error('Failed to insert comment:', error);
    res.status(500).json({
      status: 'error',
      message: 'Database query failed'
    });
  }
});

export default router;