import express from 'express'
const router = express.Router()

// 檢查空物件, 轉換req.params為數字
import { getIdParam } from '#db-helpers/db-tool.js'

// 資料庫使用
import sequelize from '#configs/db.js'
const { coupon } = sequelize.models

// 一般sql
import db from '#configs/mysql.js'




router.get('/', async function (req, res) {
  // coupon資料庫 SQL
  let sqlCoupons = 'SELECT * FROM coupon'
  

  try {
    const [rows, fields] = await db.query(sqlCoupons)
    // 標準回傳JSON
    return res.json({
      status: 'success',
      data: {
        coupons: rows,
      },
    })
  } catch (err) {
    console.log(error)
  }
})



export default router
