import express from 'express'
const router = express.Router()

// 檢查空物件, 轉換req.params為數字
import { getIdParam } from '#db-helpers/db-tool.js'

import authenticate from '#middlewares/authenticate.js'
import sequelize from '#configs/db.js'
const { Collection } = sequelize.models

// 獲得某會員id的有加入到我的最愛清單中的商品id們
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

//增加收藏
router.get('/add/:product_id', authenticate, async (req, res) => {
  const userId = req.decoded.id //從解碼JWT中取得用戶ID
  const  productId  = parseInt(req.params.product_id, 10) // 從路由參數中取得商品ID
  try {
    // 檢查是否已經收藏了該商品
    const existingCollection = await Collection.findOne({
      attributes: ['user_id', 'product_id', 'pdltat_id', 'article_id', 'valid'],
      where: {
        user_id: userId,
        product_id: productId,
      },
    })
    if (existingCollection) {
      if (existingCollection.valid) {
        return res
        .status(409)
        .json({ status: 'fail', message: 'Product already in collection.' })
      } else {
        // update valid to 1
        const result = await Collection.update({valid:1},{
          where: {
            user_id: userId,
            product_id: productId,
            pdltat_id: 1
          },
        })
        return res
        .status(200)
        .json({ status: 'success', message: `Update valid to 1 successfully, where product id = ${productId}.` })
      }
    } else {
      //新增收藏到資料庫
      const newCollection = await Collection.create({
        attributes: ['user_id', 'product_id', 'pdltat_id', 'article_id', 'valid'],
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

//取消收藏
router.get('/remove/:product_id', authenticate, async (req, res) => {
  const userId = req.decoded.id //從解碼JWT中取得用戶ID
  const  productId  = parseInt(req.params.product_id, 10) // 從路由參數中取得商品ID
  console.log(userId, productId)
  try {
    //檢查是否有收藏該商品
    const result = await Collection.update({valid:0},{
      where: {
        user_id: userId,
        product_id: productId,
        pdltat_id: 1
      },
    })
    let msg = ''
    if (result[0] === 0) {
      msg = 'already removed.'
    } else [
      msg = 'removed.'
    ]

    res.json({ status: 'success', message: msg })
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

// router.put('/:id', authenticate, async (req, res, next) => {
//   const pid = getIdParam(req)
//   const uid = req.user.id

//   const existFav = await Favorite.findOne({ where: { pid, uid } })
//   if (existFav) {
//     return res.json({ status: 'error', message: '資料已經存在，新增失敗' })
//   }

//   const newFav = await Favorite.create({ pid, uid })

//   // console.log(newFav.id)

//   // 沒有新增到資料
//   if (!newFav.id) {
//     return res.json({
//       status: 'error',
//       message: '新增失敗',
//     })
//   }

//   return res.json({ status: 'success', data: null })
// })

// router.delete('/:id', authenticate, async (req, res, next) => {
//   const pid = getIdParam(req)
//   const uid = req.user.id

//   const affectedRows = await Favorite.destroy({
//     where: {
//       pid,
//       uid,
//     },
//   })

//   // 沒有刪除到任何資料 -> 失敗或沒有資料被刪除
//   if (!affectedRows) {
//     return res.json({
//       status: 'error',
//       message: '刪除失敗',
//     })
//   }

//   // 成功
//   return res.json({ status: 'success', data: null })
// })

export default router
