// 商品評價跟課程評價取用的路由

import express from 'express'
const router = express.Router()

// 檢查空物件, 轉換req.params為數字
import { getIdParam } from '#db-helpers/db-tool.js'

// 資料庫使用
import sequelize from '#configs/db.js'

// 一般sql
import db from '#configs/mysql.js'

// 獲取商品或課程評價以及評價會員的路由
router.get('/', async function (req, res) {
  let commentSQL = 'SELECT pc.*, ut.email, ut.img ,pl.name,pl.pdlt_id FROM product_lecture_comment pc JOIN user_teacher ut ON pc.user_id = ut.id JOIN product_lecture pl ON pc.product_lecture_id = pl.id WHERE pc.valid = 1'
  try {
    const [rows, fields] = await db.query(commentSQL)
    const userOfComments = rows.map(comment =>{
      return {
        ...comment,
        email:formatEmail(comment.email)
      }
    })
    // 標準回傳JSON
    return res.json({
      status: 'success',
      data: {
        comments: userOfComments
      },
    })
  } catch (err) {
    console.log(err)
  }
  //取email@前面的帳號
  function formatEmail(email){
    const atIndex = email.indexOf('@');
    const account = email.substring(0, atIndex);
    return account
  }
})

// 接收商品或課程評價的API
router.post('/', async function (req, res) {
  try {
    const { user_id, comment, star, product_lecture_id } = req.body
    
    let date = new Date()
    let addtoCommentCoupon = `INSERT INTO product_lecture_comment (user_id,comment,star,product_lecture_id,created_at,valid)VALUES(?,?,?,?,?,1)`
    const values = [user_id, comment, star, product_lecture_id, date]
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
