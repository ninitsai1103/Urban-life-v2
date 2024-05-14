import express from 'express'
import multer from 'multer'
import path from 'path'

const router = express.Router()

// 檢查空物件, 轉換req.params為數字
// import { getIdParam } from '#db-helpers/db-tool.js'

// 資料庫使用
import sequelize from '#configs/db.js'
const { Article, UserTeacher } = sequelize.models
import { QueryTypes, Op } from 'sequelize'

import db from '#configs/mysql.js'

router.get('/', async function (req, res) {
  let sqlLectures = `
  SELECT * FROM user_teacher
  WHERE 
  user_teacher.valid = 1 AND user_teacher.identity_id = 2
    `

  try {
    const [rows, fields] = await db.query(sqlLectures)
    return res.json({
      status: 'success',
      data: {
        teachers: rows,
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
