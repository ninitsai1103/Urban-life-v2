import express from 'express'
const router = express.Router()

// 資料庫使用
import sequelize from '#configs/db.js'
const { Coupon } = sequelize.models

// 上傳檔案用使用multer
import path from 'path'
import multer from 'multer'

router.post('/',async function(req,res){

    console.log(req.body)
    
    const{
        page=1,
        perpage=4,
        id,
        name,
        code,
        amount,
        startedAt,
        deadline,
        status,
        min_price,
        scope,
    }=req.body



     // 標準回傳JSON
  return res.json({
    status: 'success',
    data: {
      total,
      pageCount,
      products: rows,
    },
  })
})