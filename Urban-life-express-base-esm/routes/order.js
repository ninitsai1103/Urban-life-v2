import express from 'express'
const router = express.Router()

// 一般sql
import db from '#configs/mysql.js'
// 獲取所有訂單資料的API
router.get('/', async function (req, res) {
  // 判斷是否有傳入user_id (登入的使用者)
  let id
  if (req.query.user_id) {
    id = req.query.user_id
  } else {
    id = 42
  }

  const sqlOrder = `SELECT 
  order_detail.*,
  cart.*,
  product_lecture.amount AS product_lecture_amount,
  product_lecture.price,
  product_lecture.name,
  product_lecture.cover,
  product_lecture.pdlt_id
  FROM 
  order_detail 
  JOIN 
  cart ON order_detail.order_id = cart.order_id
  JOIN 
  product_lecture ON cart.product_id = product_lecture.id
  WHERE order_detail.user_id = ?;`

  try {
    const [rows, fields] = await db.query(sqlOrder, [id])

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
