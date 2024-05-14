import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import axiosInstance from '@/services/axios-instance'
import axios from 'axios'
import Step from '@/components/cart/step'
import styles from '@/components/cart/cart.module.css'
import toast, { Toaster } from 'react-hot-toast'
import Link from 'next/link'

export default function DonePage() {
  const router = useRouter()
  // 載入狀態(控制是否顯示載入中的訊息，和伺服器回傳時間點未完成不同步的呈現問題)
  const [isLoading, setIsLoading] = useState(true)

  const [result, setResult] = useState({
    returnCode: '',
    returnMessage: '',
  })

  const [orderInfo, setOrderInfo] = useState({
    order_id: '',
    date: '',
  })

  const handleConfirm = async (transactionId) => {
    const res = await axiosInstance.get(
      `/cart-to-linepay/confirm?transactionId=${transactionId}&orderId=${router.query.orderId}`
    )

    console.log('res data', res.data)
    console.log('res data data', res.data.data)
    // console.log("res data[0]", res.data[0])
    // console.log("res data[1]", res.data[1])

    if (res.data.status === 'success') {
      toast.success('付款成功')
    } else {
      toast.error('付款失敗')
    }

    if (res.data.data) {
      setResult(res.data.data)
    }

    setOrderInfo(res.data.data[1])

    // 處理完畢，關閉載入狀態
    setIsLoading(false)
  }
  // confirm回來用的
  useEffect(() => {
    if (router.isReady) {
      // 這裡確保能得到router.query值
      console.log(router.query)
      // http://localhost:3000/order?transactionId=2022112800733496610&orderId=da3b7389-1525-40e0-a139-52ff02a350a8
      // 這裡要得到交易id，處理伺服器通知line pay已確認付款，為必要流程
      // TODO: 除非為不需登入的交易，為提高安全性應檢查是否為會員登入狀態
      const { transactionId, orderId } = router.query

      // 如果沒有帶transactionId或orderId時，導向至首頁(或其它頁)
      if (!transactionId || !orderId) {
        // 關閉載入狀態
        setIsLoading(false)
        // 不繼續處理
        return
      }

      // 向server發送確認交易api
      handleConfirm(transactionId)
    }
    // eslint-disable-next-line
  }, [router.isReady])

  //移除勾選結帳的商品
  useEffect(() => {
    window.localStorage.removeItem('Checked-info')
  }, [])

  //移除items中具有checked屬性的資料
  useEffect(() => {
    // 1. 檢索 LocalStorage 中的特定鍵
    const key = 'items'
    let items = localStorage.getItem(key)

    // 2. 解析值，將其轉換為 JavaScript 物件或陣列
    if (items) {
      items = JSON.parse(items)
    } else {
      items = []
    }

    // 3. 從陣列中刪除具有 checked 屬性的物件
    const updatedItems = items.filter((item) => !item.checked)

    // 4. 將修改後的陣列重新儲存在 LocalStorage 中
    localStorage.setItem(key, JSON.stringify(updatedItems))
  }, [])

  return (
    <>
      <Toaster />
      <div className="container pt-3">
        <h2 className="text-center text-primary5">訂單完成</h2>
        <div className="d-flex justify-content-evenly mb-3">
          <Step
            step="1"
            title="購物車"
            circle_color={styles.circle_color_progressing}
          />
          <Step
            step="2"
            title="填寫資料"
            circle_color={styles.circle_color_progressing}
          />
          <Step
            step="3"
            title="完成訂單"
            circle_color={styles.circle_color_progressing}
          />
        </div>
        <div className="d-flex flex-column align-items-center">
          <div className={`d-flex flex-column align-items-center justify-content-center ${styles.done_card}`}>
            <h4 className="text-center">感謝您的訂購</h4>
            <div className="text-center text-grey-700">訂單編號: {orderInfo.order_id}</div>
            <div className="text-center text-grey-700">訂單成立時間: {orderInfo.date}</div>
            <div className='w-75'>
              <img
                src="/images/cart/character_danbo-ru_walk.png"
                alt="完成"
                className="img-fluid"
              />
            </div>
          </div>
          <div className="text-center my-3">
            <Link
              href="http://localhost:3000"
              className="btn btn-main"
              type="button"
            >
              回到首頁
            </Link>
            <Link
              href="http://localhost:3000/product/list"
              className="btn btn-main ms-3"
              type="button"
            >
              繼續購物
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
