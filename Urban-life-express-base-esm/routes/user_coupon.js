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
  // user_coupon資料庫 SQL
  let sqlUserCoupons = `SELECT * FROM user_coupon JOIN coupon ON user_coupon.coupon_id =coupon.id 
  `
  try {
    const [rows, fields] = await db.query(sqlUserCoupons)

    // 標準回傳JSON
    return res.json({
      status: 'success',
      data: {
        user_coupon: rows,
      },
    })
  } catch (error) {
    console.log(error)
  }
})

router.post('/', async function (req, res) {
 
  try {
    console.log(req.body)
    const couponID = req.body.id
    let userID = 43
    
    let addtoUserCoupon = `INSERT INTO user_coupon (user_id,coupon_id,valid)VALUES(?,?,1)`
    const values = [userID, couponID]
    const [rows, fields] = await db.query(addtoUserCoupon, values)
    return res.json({
      status: 'success',
      data: {
        user_coupon: rows,
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
