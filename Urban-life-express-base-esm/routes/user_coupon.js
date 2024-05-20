import express from 'express'
const router = express.Router()

// 檢查空物件, 轉換req.params為數字
import { getIdParam } from '#db-helpers/db-tool.js'

// 資料庫使用
import sequelize from '#configs/db.js'
const { coupon } = sequelize.models

// 一般sql
import db from '#configs/mysql.js'

// 獲取該會員擁有的優惠券API
router.get('/', async function (req, res) {
  // 判斷是否有傳入user_id (登入的使用者)
  let user_id
  if (req.query.user_id) {
    user_id = req.query.user_id
  } else {
    user_id = 42
  }

  const sqlUserCoupons = `SELECT * FROM user_coupon 
  JOIN coupon ON user_coupon.coupon_id =coupon.id 
  WHERE user_coupon.valid = 1 AND user_id=?
  `
  try {
    const [rows, fields] = await db.query(sqlUserCoupons, [user_id])

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
// 新增優惠券的API
router.post('/', async function (req, res) {
  try {
    console.log(req.body)
    const couponID = req.body.newCoupon.id
    let userID = req.body.user_id

    let addtoUserCoupon = `INSERT INTO user_coupon (user_id,coupon_id,status,valid)VALUES(?,?,"可使用",1)`
    const values = [userID, couponID]
    const [rows, fields] = await db.query(addtoUserCoupon, values)
    return res.json({
      status: 'success',
      data: {
        // user_coupon: rows,
        message: '新增優惠券成功',
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

// 檢查訂單是否使用優惠券API
router.put('/', async function (req, res) {
  try {
    const couponID = req.query.coupon_id

    const changeCouponStatus = `UPDATE user_coupon 
                                SET status = '已使用' 
                                WHERE coupon_id = ?`

    const [rows, fields] = await db.query(changeCouponStatus, [couponID])

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
        error: error.message,
      },
    })
  }
})

// 刪除優惠券的PI
router.delete('/', async function (req, res) {
  try {
    console.log(req.body)
    const couponID = req.body.id

    let addtoUserCoupon = `UPDATE user_coupon
    SET valid = 0
    WHERE coupon_id = ? ;`

    const [rows, fields] = await db.query(addtoUserCoupon, [couponID])
    return res.json({
      status: 'success',
      data: {
        message: '使用者的coupon被刪除成功',
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
