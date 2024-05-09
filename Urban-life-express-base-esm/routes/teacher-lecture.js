import express from 'express'
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';

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
    cb(null, 'public/lecture_img');
  },
  filename: function (req, file, cb) {
    const fileExt = path.extname(file.originalname);
    const filename = uuidv4() + fileExt;
    cb(null, filename);
  },
});

const upload = multer({ storage: storage });
const uploadFields = upload.fields([
  { name: 'selectedFiles1', maxCount: 1 },
  { name: 'selectedFiles2', maxCount: 1 },
  { name: 'selectedFiles3', maxCount: 1 },
  { name: 'selectedFiles4', maxCount: 1 }
]);


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
router.put('/', uploadFields,  async function (req, res) {
  try {
    console.log(req.body)
    console.log(req.files);
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
    } = req.body

    const files = req.files;

    // 獲取原始的圖片檔名值，如果沒有新的圖片，則保留原值
    let cover = req.body.cover;
    let lecture_img1 = req.body.lecture_img1;
    let lecture_img2 = req.body.lecture_img2;
    let lecture_img3 = req.body.lecture_img3;

    // if (files) {
    //   cover = files.selectedFiles1 ? `${files.selectedFiles1[0].filename}` : req.body.cover;
    //   lecture_img1 = files.selectedFiles2 ? `${files.selectedFiles2[0].filename}` : req.body.lecture_img1;
    //   lecture_img2 = files.selectedFiles3 ? `${files.selectedFiles3[0].filename}` : req.body.lecture_img2;
    //   lecture_img3 = files.selectedFiles4 ? `${files.selectedFiles4[0].filename}` : req.body.lecture_img3;
    // }

    // 檢查是否有接收到新的圖片檔案，有則更新相應的圖片檔名
    if (files) {
      if (files.selectedFiles1) {
        cover = `${files.selectedFiles1[0].filename}`;
      }
      if (files.selectedFiles2) {
        lecture_img1 = `${files.selectedFiles2[0].filename}`;
      }
      if (files.selectedFiles3) {
        lecture_img2 = `${files.selectedFiles3[0].filename}`;
      }
      if (files.selectedFiles4) {
        lecture_img3 = `${files.selectedFiles4[0].filename}`;
      }
    }

    // 獲取原始的圖片檔名值，如果沒有新的圖片，則保留原值
    // const cover = files.selectedFiles1 ? `${files.selectedFiles1[0].filename}` : req.body.cover;
    // const lecture_img1 = files.selectedFiles2 ? `${files.selectedFiles2[0].filename}` : req.body.lecture_img1;
    // const lecture_img2 = files.selectedFiles3 ? `${files.selectedFiles3[0].filename}` : req.body.lecture_img2;
    // const lecture_img3 = files.selectedFiles4 ? `${files.selectedFiles4[0].filename}` : req.body.lecture_img3;


    // const cover = files.selectedFiles1 ? `${files.selectedFiles1[0].filename}` : null;
    // const lecture_img1 = files.selectedFiles2 ? `${files.selectedFiles2[0].filename}` : null;
    // const lecture_img2 = files.selectedFiles3 ? `${files.selectedFiles3[0].filename}` : null;
    // const lecture_img3 = files.selectedFiles4 ? `${files.selectedFiles4[0].filename}` : null;

    // 只更新不是空的圖片欄位
// const updateValues = {
//   name,
//   description,
//   content,
//   location_id,
//   lecture_date,
//   starting_time,
//   ending_time,
//   sign_up_starting,
//   sign_up_deadline,
//   price,
//   amount,
//   date,
// };

// if (cover !== '') {
//   updateValues.cover = cover;
// }
// if (lecture_img1 !== '') {
//   updateValues.lecture_img1 = lecture_img1;
// }
// if (lecture_img2 !== '') {
//   updateValues.lecture_img2 = lecture_img2;
// }
// if (lecture_img3 !== '') {
//   updateValues.lecture_img3 = lecture_img3;
// }


    let date = new Date()

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
      date,
      cover,
      lecture_img1,
      lecture_img2,
      lecture_img3,
      id, // 確保 id 是最後一個參數，對應 WHERE 子句中的 id = ?
    ])
    // const [rows, fields] = await db.query(updateTeacherLecture, [
    //   ...Object.values(updateValues),
    //   id,
    // ]);


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

// 使用 POST 方法來新增課程
router.post('/', uploadFields,async function (req, res) {
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

    const files = req.files;
    const cover = files.selectedFiles1 ? `${files.selectedFiles1[0].filename}` : null;
    const lecture_img1 = files.selectedFiles2 ? `${files.selectedFiles2[0].filename}` : null;
    const lecture_img2 = files.selectedFiles3 ? `${files.selectedFiles3[0].filename}` : null;
    const lecture_img3 = files.selectedFiles4 ? `${files.selectedFiles4[0].filename}` : null;

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
