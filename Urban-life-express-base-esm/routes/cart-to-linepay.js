import express from 'express'
const router = express.Router()

// line pay使用npm套件
import { createLinePayClient } from 'line-pay-merchant'

// 產生uuid用
import { v4 as uuidv4 } from 'uuid'

// 存取`.env`設定檔案使用
import 'dotenv/config.js'

// 資料庫使用
import sequelize from '#configs/db.js'
const { cart } = sequelize.models
const { order_detail } = sequelize.models

// 一般sql
import db from '#configs/mysql.js'

// 定義安全的私鑰字串
const linePayClient = createLinePayClient({
  channelId: process.env.LINE_PAY_CHANNEL_ID,
  channelSecretKey: process.env.LINE_PAY_CHANNEL_SECRET,
  env: process.env.NODE_ENV,
})

router.post('/', async function (req, res) {
  //確認前端傳來的資料
  //console.log(req.body)
  try {
    //擷取req.body中的products
    const products = req.body.products

    //產生 orderId與packageId
    const orderId = uuidv4()
    const packageId = uuidv4()

    //訂單成立時間
    const orderDate = new Date()

    //將products中的值對應資料庫中的欄位
    const dbCart = products.map((product) => {
      return {
        order_id: orderId,
        product_id: product.id,
        amount: product.qty,
      }
    })

    // 轉換為資料庫儲存所需格式
    const dbOrderDetail = [
      orderId,
      req.body.user_id,
      req.body.name,
      req.body.phone,
      req.body.address,
      req.body.email,
      req.body.pay,
      req.body.coupon_id,
      req.body.total, // 應付金額
      orderDate,
      '', // transaction_id
      'pending', // status
      '', // order_info
      '', // reservation
      '', // confirm
      '', // return_code
    ]
    console.log(dbCart)
    console.log(dbOrderDetail)

    // 轉換為陣列格式
    const dbCartArray = dbCart.map((item) => [
      item.order_id,
      item.product_id,
      item.amount,
    ])

    // 加入資料庫sql語法
    const addtoCart = `INSERT INTO cart (order_id, product_id, amount) VALUES (?,?,?)`
    const addtoOrderDetail = `INSERT INTO order_detail (order_id, user_id, name, phone, address, email, pay, coupon_id, total, date, transaction_id, status, order_info, reservation, confirm, return_code) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`

    //用for迴圈將資料存入資料庫
    for (let i = 0; i < dbCartArray.length; i++) {
      const [cartRows, fields] = await db.query(addtoCart, dbCartArray[i])
    }

    // 儲存到資料庫
    const [orderRows, fields] = await db.query(addtoOrderDetail, dbOrderDetail)

    // 要傳送給line pay的訂單資訊
    const linepayOrder = {
      orderId: orderId,
      currency: 'TWD',
      amount: req.body.total,
      // packages: [
      //   {
      //     id: packageId,
      //     amount: req.body.total,
      //     products: req.body.products,
      //   },
      // ],
      options: { display: { locale: 'zh_TW' } },
    }

    return res.json({
      status: 'success',
      data: {
        // cart: cartRows,
        // order: orderRows,
        linepayOrder: linepayOrder,
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
