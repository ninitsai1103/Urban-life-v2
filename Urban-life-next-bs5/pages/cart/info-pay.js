import { useState, useEffect } from 'react'
import Step from '@/components/cart/step'
import styles from '@/components/cart/cart.module.css'
import InfoPayOrder from '@/components/cart/info-pay-order'
import InfoPayInfo from '@/components/cart/info-pay-info'
import InfoPayPay from '@/components/cart/info-pay-pay'
import InfoPayCounter from '@/components/cart/info-pay-counter'
import Link from 'next/link'
import { useMemberInfo } from '@/hooks/use-member-info'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export default function InfoPayPage() {
  const [pricePayable, setPricePayable] = useState(0)
  useEffect(() => {
    const pricePayable = window.localStorage.getItem('pricePayable')
    setPricePayable(pricePayable)
  })

  const [checkedInfo, setCheckedInfo] = useState([])
  useEffect(() => {
    const CheckedInfo = window.localStorage.getItem('Checked-info')
    setCheckedInfo(JSON.parse(CheckedInfo))
  }, [])

  const [coupon, setCoupon] = useState({})
  useEffect(() => {
    const data = window.localStorage.getItem('selectedCoupon')
    setCoupon(JSON.parse(data))
  }, [])

  const { member } = useMemberInfo()

  const [orderToLinepay, setOrderToLinepay] = useState('')
  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = {
      name: e.target.elements.receiverName.value,
      phone: e.target.elements.receiverPhone.value,
      address: e.target.elements.receiverAddress.value,
      email: e.target.elements.receiverEmail.value,
      pay: e.target.elements.pay.value,
      coupon_id: coupon.id,
      products: checkedInfo,
      user_id: member.id,
      total: pricePayable,
    }
    console.log(formData)

    try {
      const response = await fetch(
        'http://localhost:3005/api/cart-to-linepay',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      )
      if (response.ok) {
        // 處理成功回應
        console.log('表單提交成功！')
        const responseData = await response.json()
        console.log('responseData', responseData)
        setOrderToLinepay(responseData)
        // 在這裡觸發 notifySA
        notifySA(responseData)
      } else {
        // 處理錯誤回應
        console.error('表單提交失敗')
      }
    } catch {
      console.error('表單提交失敗')
    }
  }

  const MySwal = withReactContent(Swal)
  const notifySA = async (orderToLinepay) => {
    MySwal.fire({
      title: '前往付款？',
      text: '前往LINE pay',
      color: '#2f4715',
      icon: 'question',
      iconColor: '#62a60a',
      background: '#ebe3db',
      confirmButtonColor: '#bd9250',
      confirmButtonText: '前往',
      cancelButtonText: '取消',
      showCancelButton: true,
      cancelButtonColor: '#e53939',
    }).then((result) => {
      console.log('orderToLinepay', orderToLinepay)
      if (result.isConfirmed) {
        const orderId = `orderId=${orderToLinepay.data.linepayOrder.orderId}`
        fetch(`http://localhost:3005/api/cart-to-linepay/reserve?${orderId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((response) => {
            if (response.ok) {
              return response.json() // 解析 JSON
            }
            throw new Error('Network response was not ok.')
          })
          .then((data) => {
            console.log('成功收到後端回傳的資料', data)
            window.location.href = data // 將頁面導向到後端回傳的付款網址
          })
          .catch((error) => {
            console.error('發生錯誤', error)
          })
      }
    })
  }
  return (
    <>
      <div className="container pt-3">
        <Link href="./" className="btn btn-main" type="button">
          返回購物車
        </Link>
        <h2 className="text-center text-primary5">填寫資料</h2>
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
            circle_color={styles.circle_color_undo}
          />
        </div>
        <form onSubmit={handleSubmit}>
          <InfoPayOrder />
          <InfoPayInfo />
          <InfoPayPay />
          <InfoPayCounter />
          <div className="w-100 text-center my-3">
            <button
              type="submit"
              className="btn btn-add w-50"
              // onClick={() => {
              //   notifySA()
              // }}
            >
              確認付款
            </button>
          </div>
        </form>
      </div>
    </>
  )
}
