import express from 'express';
const router = express.Router();

// 檢查空物件, 轉換req.params為數字
// import { getIdParam } from '#db-helpers/db-tool.js'

// 資料庫使用
import sequelize from '#configs/db.js'
const { Article, UserTeacher } = sequelize.models
import { QueryTypes, Op } from 'sequelize'


import db from '#configs/mysql.js'

router.get('/', async function(req, res){
  // 使用 SQL 查詢關聯 lecture 表格
  let sqlLectures = 'SELECT * FROM product_lecture WHERE valid = 1 AND pdlt_id = 2';

  try {
    const [rows, fields] = await db.query(sqlLectures); // 將 sqlProducts 作為參數傳遞給 db.query()
    return res.json({
      status: 'success',
      data:{
        lectures:rows,
      },
  })
  } catch (error) {
    // 錯誤處理
    console.error( error);
    return res.status(500).json({
      status:'error',
      message:'Internal Server Error'
    });
  }
});

export default router