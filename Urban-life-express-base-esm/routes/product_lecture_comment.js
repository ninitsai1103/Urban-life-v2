// 商品評價跟課程評價取用的路由

import express from 'express'
const router = express.Router()

// 檢查空物件, 轉換req.params為數字
import { getIdParam } from '#db-helpers/db-tool.js'

// 資料庫使用
import sequelize from '#configs/db.js'

// 一般sql
import db from '#configs/mysql.js'

// 獲取商品或課程評價的路由
router.get('/', async function (req, res) {
  let commentSQL = 'SELECT * FROM product_lecture_comment'
  try {
    const [rows, fields] = await db.query(sqlCoupons)
    // 標準回傳JSON
    return res.json({
      status: 'success',
      data: {
        comments: rows,
      },
    })
  } catch (err) {
    console.log(err)
  }
})

// 接收商品或課程評價的路由
router.post('/', async function (req, res) {
  try {
    const { user_id, comment, star, product_lecture_id } = req.body
    let userID = 43
    let date = new Date()
    let addtoCommentCoupon = `INSERT INTO product_lecture_comment (user_id,comment,star,product_lecture_id,created_at,valid)VALUES(?,?,?,?,?,1)`
    const values = [userID, comment, star, product_lecture_id, date]
    const [rows, fields] = await db.query(addtoCommentCoupon, values)
    return res.json({
      status: 'success',
      data: {
        new_comment: rows,
      },
    })
  } catch (error) {
    return res.json({
      status: 'error',
      data: {
        error: error,
      },
    })
  }
})

export default router
