import express from 'express'
const router = express.Router()

// 檢查空物件, 轉換req.params為數字
import { getIdParam } from '#db-helpers/db-tool.js'

import authenticate from '#middlewares/authenticate.js'
import sequelize from '#configs/db.js'
const { Collection } = sequelize.models

// 獲得某會員id的有加入到我的收藏清單中的id們
// 此路由只有登入會員能使用
router.get('/', authenticate, async (req, res) => {
  const userId = req.decoded.id
  const collections = await Collection.findAll({
    attributes: ['user_id', 'product_id', 'pdltat_id', 'article_id', 'valid'],
    where: {
      user_id: userId,
    },
    raw: true, //只需要資料
  })

  // 將結果中的pid取出變為一個純資料的陣列
  // const collection = product_ids.map((v) => v.product_id)

  res.json({ status: 'success', data: { collections } })
})

//增加商品收藏
router.get('/add/:product_id', authenticate, async (req, res) => {
  const userId = req.decoded.id //從解碼JWT中取得用戶ID
  const  productId  = parseInt(req.params.product_id, 10) // 從路由參數中取得商品ID
  try {
    // 檢查資料表是否已經有該商品
    const existingCollection = await Collection.findOne({
      attributes: ['user_id', 'product_id', 'pdltat_id', 'article_id', 'valid'],
      where: {
        user_id: userId,
        product_id: productId,
      },
    })
    if (existingCollection) {//如果有
      if (existingCollection.valid) { //如果商品valid欄位為1，代表商品已經是收藏的狀態
        return res
        .status(409)
        .json({ status: 'fail', message: 'Product already in collection.' })
      } else {  
        //否則將valid從0更新為1
        const result = await Collection.update({valid:1},{
          attributes: ['user_id', 'product_id', 'pdltat_id', 'article_id', 'valid'],
          where: {
            user_id: userId,
            product_id: productId,
            pdltat_id: 1,
            valid:0
          },
        })
        //重新查詢更新後的紀錄
        const updatedCollection = await Collection.findOne({
          where: {
            user_id: userId,
            product_id: productId,
            pdltat_id: 1
          }
        });
        // 將更新後的資料發送給前端
        return res
        .status(200)
        .json({ status: 'success', message: `Update valid to 1 successfully, where product id = ${productId}.`, data:updatedCollection })
      }
    } else {  
      //新增收藏到資料庫
      const newCollection = await Collection.create({
        user_id: userId,
        product_id: productId,
        pdltat_id: 1,
        article_id: 0,
        valid: 1,
      })
    
      res.json({ status: 'success', data: newCollection })
    }
  } catch (error) {
    console.log('新增收藏失敗', error)
    console.log(error)
    res
      .status(500)
      .json({ status: 'error', message: 'Error adding product to collection.' })
  }
})

//取消商品收藏
router.get('/remove/:product_id', authenticate, async (req, res) => {
  const userId = req.decoded.id //從解碼JWT中取得用戶ID
  const  productId  = parseInt(req.params.product_id, 10) // 從路由參數中取得商品ID

  try {
    //檢查是否有收藏該商品
    const result = await Collection.update({valid:0},{
      where: {
        user_id: userId,
        product_id: productId,
        pdltat_id: 1,
        valid:1
      },
    })
    let msg = ''
    if (result[0] === 0) {
      msg = 'already removed.'
    } else [
      msg = 'removed.'
    ]

    res.json({ status: 'success', message: msg})
  } catch (error) {
    console.error('移除收藏失敗', error)
    res
      .status(500)
      .json({
        status: 'error',
        message: 'Error removing product from collection.',
      })
  }
})


export default router
