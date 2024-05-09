import express from 'express'
const router = express.Router()

// 資料庫使用
import sequelize from '#configs/db.js'
const { coupon } = sequelize.models
// 一般sql
import db from '#configs/mysql.js'

// 抓老師的資料
router.get('/', async function (req, res) {
    // user_teacher資料庫 SQL
    
    const identity_id=2
    const sqlTeachers = `SELECT * FROM user_teacher  WHERE identity_id=?`
    try {
      const [rows, fields] = await db.query(sqlTeachers,[identity_id])
  
      // 標準回傳JSON
      return res.json({
        status: 'success',
        data: {
          user_teacher: rows,
        },
      })
    } catch (error) {
      console.log(error)
    }
  })

  export default router
  