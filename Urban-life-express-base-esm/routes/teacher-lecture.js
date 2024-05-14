import express from 'express'
import multer from 'multer'
import { v4 as uuidv4 } from 'uuid'
import path from 'path'

const router = express.Router()

// 檢查空物件, 轉換req.params為數字
// import { getIdParam } from '#db-helpers/db-tool.js'

// 資料庫使用
import sequelize from '#configs/db.js'
const { Article, UserTeacher } = sequelize.models
import { QueryTypes, Op } from 'sequelize'

import db from '#configs/mysql.js'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/lecture_img')
  },
  filename: function (req, file, cb) {
    const fileExt = path.extname(file.originalname)
    const filename = uuidv4() + fileExt
    cb(null, filename)
  },
})

const upload = multer({ storage: storage })
const uploadFields = upload.fields([
  { name: 'selectedFiles1', maxCount: 1 },
  { name: 'selectedFiles2', maxCount: 1 },
  { name: 'selectedFiles3', maxCount: 1 },
  { name: 'selectedFiles4', maxCount: 1 },
])

router.get('/', async function (req, res) {
  // 使用 SQL 查詢關聯 lecture 表格
  // let sqlLectures = 'SELECT * FROM product_lecture WHERE valid = 1 AND pdlt_id = 2';
  let sqlLectures = `
  SELECT 
    product_lecture.*,
    location.name AS location_name,
    COALESCE(SUM(cart.amount), 0) AS total_bought
  FROM 
    product_lecture
  LEFT JOIN
    location
  ON
    product_lecture.location_id = location.id
  LEFT JOIN
    cart
  ON
    product_lecture.id = cart.product_id
  WHERE 
    product_lecture.valid = 1 AND product_lecture.pdlt_id = 2
  GROUP BY 
    product_lecture.id, location.name;
  `

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
router.put('/', uploadFields, async function (req, res) {
  try {
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
    } = req.body

    let date = new Date()

    // 初始化圖片檔名為 null，表示未更新
    let cover = null
    let lecture_img1 = null
    let lecture_img2 = null
    let lecture_img3 = null

    // 檢查是否有新的檔案上傳
    if (req.files) {
      const files = req.files
      // 根據新上傳的檔案更新相應的欄位值，或保留原始檔案名稱
      cover = files.selectedFiles1 ? files.selectedFiles1[0].filename : null
      lecture_img1 = files.selectedFiles2
        ? files.selectedFiles2[0].filename
        : null
      lecture_img2 = files.selectedFiles3
        ? files.selectedFiles3[0].filename
        : null
      lecture_img3 = files.selectedFiles4
        ? files.selectedFiles4[0].filename
        : null
    }

    // 更新操作只針對有值的欄位
    let updateValues = {}
    if (name) updateValues.name = name
    if (description) updateValues.description = description
    if (content) updateValues.content = content
    if (location_id) updateValues.location_id = location_id
    if (lecture_date) updateValues.lecture_date = lecture_date
    if (starting_time) updateValues.starting_time = starting_time
    if (ending_time) updateValues.ending_time = ending_time
    if (sign_up_starting) updateValues.sign_up_starting = sign_up_starting
    if (sign_up_deadline) updateValues.sign_up_deadline = sign_up_deadline
    if (price) updateValues.price = price
    if (amount) updateValues.amount = amount
    if (cover) updateValues.cover = cover
    if (lecture_img1) updateValues.lecture_img1 = lecture_img1
    if (lecture_img2) updateValues.lecture_img2 = lecture_img2
    if (lecture_img3) updateValues.lecture_img3 = lecture_img3
    updateValues.change_time = date

    // 構建 SQL 更新操作的 SET 子句
    let updateClause = Object.keys(updateValues)
      .map((field) => `${field} = ?`)
      .join(', ')

    // 執行 SQL 更新操作
    let updateTeacherLecture = `UPDATE product_lecture
                                SET ${updateClause}
                                WHERE id = ?`

    const values = Object.values(updateValues)
    values.push(id) // 將 id 加入 values 陣列中

    const [updateRows, updateFields] = await db.query(
      updateTeacherLecture,
      values
    )

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

// 使用 POST 方法來新增課程
router.post('/', uploadFields, async function (req, res) {
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
      teacher_id,
    } = req.body

    const files = req.files
    const cover = files.selectedFiles1
      ? `${files.selectedFiles1[0].filename}`
      : null
    const lecture_img1 = files.selectedFiles2
      ? `${files.selectedFiles2[0].filename}`
      : null
    const lecture_img2 = files.selectedFiles3
      ? `${files.selectedFiles3[0].filename}`
      : null
    const lecture_img3 = files.selectedFiles4
      ? `${files.selectedFiles4[0].filename}`
      : null

    let date = new Date()

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
      date,
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
