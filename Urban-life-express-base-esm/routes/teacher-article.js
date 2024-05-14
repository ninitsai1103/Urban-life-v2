import express from 'express'
const router = express.Router()

// 檢查空物件, 轉換req.params為數字
// import { getIdParam } from '#db-helpers/db-tool.js'

// 資料庫使用
import sequelize from '#configs/db.js'
const { Article, UserTeacher } = sequelize.models
import { QueryTypes, Op } from 'sequelize'

import db from '#configs/mysql.js'

router.get('/', async function (req, res) {
  // let sqlArticles = 'SELECT * FROM article WHERE valid = 1';
  // const sqlArticles = `SELECT * FROM article JOIN user_teacher ON article.user_id =user_teacher.id
  // WHERE article.valid = 1
  // `

  try {
    // 使用 SQL 查詢關聯 article 和 user_teacher 表格
    const sqlArticles = `
      SELECT 
        article.*, 
        user_teacher.name AS author_name,
        COUNT(DISTINCT article_comment.id) AS total_comments,
        COUNT(DISTINCT collection.id) AS total_collections
      FROM 
        article 
      LEFT JOIN 
        user_teacher 
      ON 
        article.user_id = user_teacher.id
      LEFT JOIN 
        article_comment 
      ON 
        article.id = article_comment.article_id AND article_comment.valid = 1
      LEFT JOIN 
        collection 
      ON 
        article.id = collection.article_id AND collection.valid = 1
      WHERE 
        article.valid = 1
      GROUP BY 
        article.id;
    `

    // 計算文章總數量
    const sqlTotalCount = `
      SELECT 
        COUNT(*) AS total_count
      FROM 
        article
      WHERE 
        valid = 1
    `

    // 計算文章總數量
    const [totalCountRows, _] = await db.query(sqlTotalCount)
    const totalCount = totalCountRows[0].total_count // 從結果中獲取總數量

    const [rows, fields] = await db.query(sqlArticles) // 將 sqlProducts 作為參數傳遞給 db.query()
    return res.json({
      status: 'success',
      data: {
        articles: rows,
        total: totalCount, // 將總數量包含在回應中
      },
    })
  } catch (error) {
    // 錯誤處理
    console.error(error)
    return res.status(500).json({
      status: 'error',
      message: 'Internal Server Error',
    })
  }
})

export default router
