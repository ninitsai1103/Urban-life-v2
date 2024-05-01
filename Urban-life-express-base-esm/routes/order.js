import express from 'express'
const router = express.Router()

// 檢查空物件, 轉換req.params為數字
import { getIdParam } from '#db-helpers/db-tool.js'

// 資料庫使用
import sequelize from '#configs/db.js'

// 一般sql
import db from '#configs/mysql.js'

router.get('/', async function (req, res) {
  // user_coupon資料庫 SQL
  const sqlOrder = `SELECT * FROM order_detail 
    JOIN cart ON order_detail.id =cart.order_id
    `
  try {
    const [rows, fields] = await db.query(sqlOrder)

    // 標準回傳JSON
    return res.json({
      status: 'success',
      data: {
        order: rows,
      },
    })
  } catch (error) {
    console.log(error)
  }
})

export default router
