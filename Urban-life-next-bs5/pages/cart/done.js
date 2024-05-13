import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import axiosInstance from '@/services/axios-instance'
import Step from '@/components/cart/step'
import styles from '@/components/cart/cart.module.css'
import toast, { Toaster } from 'react-hot-toast'

export default function DonePage() {
  const router = useRouter()
  // 載入狀態(控制是否顯示載入中的訊息，和伺服器回傳時間點未完成不同步的呈現問題)
  const [isLoading, setIsLoading] = useState(true)

  const [result, setResult] = useState({
    returnCode: '',
    returnMessage: '',
  })

  const handleConfirm = async (transactionId) => {
    const res = await axiosInstance.get(
      `/cart-to-linepay/confirm?transactionId=${transactionId}&orderId=${router.query.orderId}`
    )

    console.log(res.data)

    if (res.data.status === 'success') {
      toast.success('付款成功')
    } else {
      toast.error('付款失敗')
    }

    if (res.data.data) {
      setResult(res.data.data)
    }

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

  return (
    <>
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
          <div className={styles.done_card}>
            <h4 className="text-center">感謝您的訂購</h4>
            <div className="text-center text-grey-700">訂單編號</div>
            <div className="text-center text-grey-700">訂單完成時間</div>
            <img
              src="/images/cart/character_danbo-ru_walk.png"
              alt="完成"
              className="img-fluid"
            />
          </div>
          <div className="text-center my-3">
            <button className="btn btn-main me-3">回到首頁</button>
            <button className="btn btn-main">繼續購物</button>
          </div>
        </div>
      </div>
    </>
  )
}
