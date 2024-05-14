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

    // 要傳送給line pay的訂單資訊
    const linepayOrder = {
      orderId: orderId,
      currency: 'TWD',
      amount: req.body.total,
      packages: [
        {
          id: packageId,
          amount: req.body.total,
          products: [
            {
              name: '全部商品',
              quantity: 1,
              price: req.body.total,
            },
          ],
        },
      ],
      options: { display: { locale: 'zh_TW' } },
    }

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
      JSON.stringify(linepayOrder), // order_info
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

router.get(`/reserve`, async function (req, res) {
  console.log('reserve', req.query)
  // return res.json({ status: 'success' })
  if (!req.query) {
    return res.json({ status: 'error', message: 'order id不存在' })
  }

  const orderId = req.query.orderId
  console.log('orderId', orderId)

  // 設定重新導向與失敗導向的網址
  const redirectUrls = {
    confirmUrl: process.env.REACT_REDIRECT_CONFIRM_URL,
    cancelUrl: process.env.REACT_REDIRECT_CANCEL_URL,
  }

  // 從資料庫取得訂單資料
  const getOrderRecordSql = `SELECT * FROM order_detail WHERE order_id = ?`
  try {
    const [orderRecord] = await db.query(getOrderRecordSql, [orderId])
    console.log('orderRecord', orderRecord)
    // 在這裡使用 orderRecord 進行後續操作
    const order = JSON.parse(orderRecord[0].order_info) // orderRecord[0].order_info
    console.log('order', order)

    try {
      // 向line pay傳送的訂單資料
      const linePayResponse = await linePayClient.request.send({
        body: { ...order, redirectUrls },
      })

      console.log('linePayResponse', linePayResponse)

      // 深拷貝一份order資料
      const reservation = JSON.parse(JSON.stringify(order))

      reservation.returnCode = linePayResponse.body.returnCode
      reservation.returnMessage = linePayResponse.body.returnMessage
      reservation.transactionId = linePayResponse.body.info.transactionId
      reservation.paymentAccessToken =
        linePayResponse.body.info.paymentAccessToken

      console.log(`預計付款資料(Reservation)已建立。資料如下:`)
      console.log(reservation)

      // 在db儲存reservation資料
      const reservationSql = `UPDATE order_detail SET reservation = ?, transaction_id = ? WHERE order_id = ?`
      const result = await db.query(reservationSql, [
        JSON.stringify(reservation),
        reservation.transactionId,
        orderId,
      ])

      console.log(result)

      // 導向到付款頁面， line pay回應後會帶有info.paymentUrl.web為付款網址
      res.json(linePayResponse.body.info.paymentUrl.web)
      console.log(
        'linePayResponse.body.info.paymentUrl.web',
        linePayResponse.body.info.paymentUrl.web
      )
    } catch (e) {
      console.log('error', e)
    }
  } catch (error) {
    console.error('查詢訂單資料時出錯', error)
    return res.json({ status: 'error', message: '查詢訂單資料時出錯' })
  }
})

router.get(`/confirm`, async function (req, res) {
  console.log('confirm', req.query)
  // 網址上需要有transactionId
  const transactionId = req.query.transactionId

  // 從資料庫取得交易資料
  const getDbOrderSql = `SELECT * FROM order_detail WHERE transaction_id = ?`
  const [dbOrder] = await db.query(getDbOrderSql, [transactionId])

  console.log('dbOrder', dbOrder)

  //訂單編號
  const order_id = dbOrder[0].order_id
  console.log("order_id", order_id);

  //訂單成立時間
  const date = dbOrder[0].date
  console.log("date", date);

  // 交易資料
  const transaction = JSON.parse(dbOrder[0].reservation)

  console.log('transaction', transaction)

  // 交易金額
  const amount = transaction.amount

  try {
    // 最後確認交易
    const linePayResponse = await linePayClient.confirm.send({
      transactionId: transactionId,
      body: {
        currency: 'TWD',
        amount: amount,
      },
    })

    // linePayResponse.body回傳的資料
    console.log('linePayResponse', linePayResponse)

    const order_info = {
      order_id: order_id,
      date: date
    }

    console.log("order_info", order_info);

    let status = 'paid'

    if (linePayResponse.body.returnCode !== '0000') {
      status = 'fail'
    }
    // 更新資料庫的訂單狀態
    const updateSql = `UPDATE order_detail SET status = ? WHERE transaction_id = ?`
    const result = await db.query(updateSql, [status, transactionId])

    return res.json({ status: 'success', data: [linePayResponse.body, order_info] })
  } catch (error) {
    return res.json({ status: 'fail', data: error.data })
  }
})

// router.get('/order-info', async function (req, res) {
//   const transactionId = req.query.transactionId
//   try {
//     //取得資料庫訂單時間與編號
//     const getOrderInfoSql = `SELECT order_id, date FROM order_detail WHERE  WHERE transaction_id = ?`
//     const [dbOrderInfo] = await db.query(getOrderInfoSql, [transactionId])

//     console.log('dborderInfo', dbOrderInfo)

//     return res.json({ status: 'success', data: dbOrderInfo })
//   } catch (error){
//     return res.json({ status: 'fail', data: error.data })
//   }
// })

// 檢查交易用
//其實用不到，後台修改資料時才會用
router.get('/check-transaction', async (req, res) => {
  const transactionId = req.query.transactionId

  try {
    const linePayResponse = await linePayClient.checkPaymentStatus.send({
      transactionId: transactionId,
      params: {},
    })

    // 範例:
    // {
    //   "body": {
    //     "returnCode": "0000",
    //     "returnMessage": "reserved transaction."
    //   },
    //   "comments": {}
    // }

    res.json(linePayResponse.body)
  } catch (e) {
    res.json({ error: e })
  }
})
export default router
