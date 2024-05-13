//文章刪除api
import express from 'express'

import db from '#configs/mysql.js'
const router = express.Router()

// 刪除文章的路由
router.delete('/', async function (req, res) {
  const { articleId } = req.body // 從URL中取得文章ID

  try {
    let deleteArticleSql = `UPDATE article SET valid = 0 WHERE id = ?`

    // 執行SQL查詢，傳遞文章ID到查詢中
    const [result] = await db.query(deleteArticleSql, [articleId])

    if (result.affectedRows === 0) {
      // 如果沒有刪除任何行，表示文章ID不存在
      return res.status(404).json({
        status: 'error',
        message: 'Article not found',
      })
    }

    return res.json({
      status: 'success',
      message: 'Article deleted successfully',
    })
  } catch (error) {
    console.error('Error deleting article:', error)
    return res.status(500).json({
      status: 'error',
      message: 'Failed to delete article',
      data: { error: error.message },
    })
  }
})

export default router
