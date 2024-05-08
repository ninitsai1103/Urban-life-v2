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
  // let sqlLectures = 'SELECT * FROM product_lecture WHERE valid = 1 AND pdlt_id = 2';
  let sqlLectures = `
  SELECT 
    product_lecture.*,
    location.name AS location_name 
  FROM 
    product_lecture
  LEFT JOIN
    location
  ON
    product_lecture.location_id = location.id
  WHERE 
    valid = 1 AND pdlt_id = 2
    `;

  try {
    const [rows, fields] = await db.query(sqlLectures) // 將 sqlProducts 作為參數傳遞給 db.query()
    return res.json({
      status: 'success',
      data: {
        lectures: rows,
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

router.delete('/', async function (req, res) {
  try {
    console.log(req.body)
    const lectureID = req.body.id

    let deleteTeacherLecture = `UPDATE product_lecture
    SET valid = 0
    WHERE id = ? ;`

    const [rows, fields] = await db.query(deleteTeacherLecture, [lectureID])
    return res.json({
      status: 'success',
      data: {
        message: '老師的課程被刪除成功',
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

// 使用 PUT 方法來更新資源（完整替換）
router.put('/', async function (req, res) {
  try {
    console.log(req.body)
    // const lectureID = req.body.id
    // 從請求體中獲取要更新的課程資料
    const {
      id,
      name,
      description,
      content,
      location_id,
      lecture_date,
      starting_time,
      ending_time,
      sign_up_starting,
      sign_up_deadline,
      price,
      amount,
      change_time,
      cover,
      lecture_img1,
      lecture_img2,
      lecture_img3,
    } = req.body

    let updateTeacherLecture = `UPDATE product_lecture
    SET name = ?, description = ?, content = ?,location_id = ?,  lecture_date = ?, starting_time = ?, ending_time = ?, sign_up_starting = ?, sign_up_deadline = ?, price = ?, amount = ?, change_time = ?, cover = ?, lecture_img1 = ?, lecture_img2 = ?, lecture_img3 = ?
    WHERE id = ? ;`

    // 執行 SQL 更新操作
    const [rows, fields] = await db.query(updateTeacherLecture, [
      name,
      description,
      content,
      location_id,
      lecture_date,
      starting_time,
      ending_time,
      sign_up_starting,
      sign_up_deadline,
      price,
      amount,
      change_time,
      cover,
      lecture_img1,
      lecture_img2,
      lecture_img3,
      id, // 確保 id 是最後一個參數，對應 WHERE 子句中的 id = ?
    ])

    // const [rows, fields] = await db.query(updateTeacherLecture,[lectureID])
    return res.json({
      status: 'success',
      data: {
        message: '課程更新成功',
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

// 使用 POST 方法來更新資源（完整替換）
router.post('/', async function (req, res) {
  try {
    console.log(req.body)
    // const lectureID = req.body.id
    // 從請求體中獲取要更新的課程資料
    const {
      name,
      description,
      content,
      location_id,
      lecture_date,
      starting_time,
      ending_time,
      sign_up_starting,
      sign_up_deadline,
      price,
      amount,
      change_time,
      teacher_id,
      cover,
      lecture_img1,
      lecture_img2,
      lecture_img3,
    } = req.body

    let addTeacherLecture = `INSERT INTO product_lecture (name, description, content, location_id, lecture_date, starting_time, ending_time, sign_up_starting, sign_up_deadline, price, amount, change_time, teacher_id, cover, lecture_img1, lecture_img2, lecture_img3, pdlt_id, valid)VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,2,1);`

    // 執行 SQL 更新操作
    const [rows, fields] = await db.query(addTeacherLecture, [
      name,
      description,
      content,
      location_id,
      lecture_date,
      starting_time,
      ending_time,
      sign_up_starting,
      sign_up_deadline,
      price,
      amount,
      change_time,
      teacher_id,
      cover,
      lecture_img1,
      lecture_img2,
      lecture_img3,
      // id // 確保 id 是最後一個參數，對應 WHERE 子句中的 id = ?
    ])

    // const [rows, fields] = await db.query(updateTeacherLecture,[lectureID])
    return res.json({
      status: 'success',
      data: {
        message: '課程新增成功',
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
