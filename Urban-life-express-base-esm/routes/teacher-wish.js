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
  // 使用 SQL 查詢關聯 lecture 表格
  let sqlTeacherWish = 'SELECT * FROM wish WHERE valid = 1'

  try {
    const [rows, fields] = await db.query(sqlTeacherWish) // 將 sqlProducts 作為參數傳遞給 db.query()
    return res.json({
      status: 'success',
      data: {
        TeacherWish: rows,
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

// router.put('/', async function (req, res) {
  
//   // 使用 SQL 查詢關聯 lecture 表格
//   let sqlTeacherWish = `UPDATE wish
//   SET valid = 0
//   WHERE id = 9 `

//   try {
//     const [rows, fields] = await db.query(sqlTeacherWish) // 將 sqlProducts 作為參數傳遞給 db.query()
//     return res.json({
//       status: 'success',
//       data: {
//         TeacherWish: rows,
//       },
//     })
//   } catch (error) {
//     // 錯誤處理
//     console.error(error)
//     return res.status(500).json({
//       status: 'error',
//       message: 'Internal Server Error',
//     })
//   }
// })

router.delete('/', async function (req, res) {
 
  try {
    console.log(req.body)
    const wishID = req.body.id
    
    
    let deleteTeacherWish = `UPDATE wish
    SET valid = 0
    WHERE id = ? ;`
    
    const [rows, fields] = await db.query(deleteTeacherWish,[wishID])
    return res.json({
      status: 'success',
      data: {
        message: '老師的許願清單被刪除成功',
      },
    });
  } catch (error) {
    return res.json({
      status: 'error',
      data: {
        error: error,
      },
    })
  }
})

// 新增 wish
router.post('/', async function (req, res) {
  const { content, teacher_id, date, price } = req.body
  
  // 檢查必要的欄位是否提供
  if (!content || !teacher_id || !date || !price) {
    return res.status(400).json({
      status: 'error',
      message: 'Missing required fields: content, teacher_id, date, price'
    })
  }

  // 獲取當前時間
  const createdAt = new Date()

  const insertSql = `
    INSERT INTO wish (content, teacher_id, date, price, valid, created_at)
    VALUES (?, ?, ?, ?, 1, ?);
  `

  try {
    const [result] = await db.query(insertSql, [content, teacher_id, date, price, createdAt])
    res.status(201).json({
      status: 'success',
      message: 'Wish added successfully',
      wishId: result.insertId
    })
  } catch (error) {
    console.error('Failed to insert wish:', error)
    res.status(500).json({
      status: 'error',
      message: 'Database query failed'
    })
  }
})

export default router
