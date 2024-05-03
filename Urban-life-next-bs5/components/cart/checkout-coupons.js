import { useState, useEffect } from 'react'
import styles from './cart-checkout.module.css'
// import coupons from '@/data/coupon.json'
import { useCheckout } from '@/hooks/use-checkout'
// import category from '@/data/products-lectures-test/product-category.json'

export default function CheckoutCouponsSelect({ coupons, sendSelectedCoupon }) {
  // const { items, totalPrice } = useCheckout()

  // 過濾出未過期且可使用的優惠券
  const couponNotExpired = coupons.filter(
    (v) => new Date(v.deadline) > new Date() && v.status === '可使用'
  )
  // 狀態用於存儲所選擇的優惠券
  const [selectedCoupon, setSelectedCoupon] = useState([])
  // 處理當使用者選擇優惠券時的函數
  const handleSelectedCoupon = (e) => {
    setSelectedCoupon(e)
    sendSelectedCoupon(e)
  }
  // const [couponCanUse, setCouponCanUse] = useState(couponNotExpired)

  // useEffect(() => {
  //   const nextCouponCanUse = couponCanUse.map((v) => {
  //     if (v.category === category.id &&
  //         v.scope === category.primary_name &&
  //         totalPrice >= v.min_price)
  //           return { ...v, disabled: false }
  //   })
  //   console.log(nextCouponCanUse)
  //   setCouponCanUse(nextCouponCanUse)
  // }, [totalPrice])

  // const handleCouponCanUse = () => {
  //   const nextCouponCanUse = items.map((v) => {
  //     if(v.category === category.id && coupons.scope === category.primary_name && totalPrice >= coupons.min_price){
  //       return { ...v, disabled: false }
  //     }else{
  //       return { ...v, disabled: true }
  //     }
  //   })
  //   setCouponCanUse(nextCouponCanUse)
  // }

  //localStorage
  //getItem
  useEffect(() => {
    const data = window.localStorage.getItem('coupon')
    if (data !== null) setSelectedCoupon(JSON.parse(data))
  }, [])
  //setItem
  useEffect(() => {
    window.localStorage.setItem('coupon', JSON.stringify(selectedCoupon))
  }, [selectedCoupon])

  return (
    <>
      {/* <div className="input-group mb-2">
        <input
          type="text"
          className="form-control"
          placeholder="輸入優惠代碼"
        />
        <button className="btn btn-main-r" type="button">
          使用
        </button>
      </div> */}
      <div>
        <div className="fs-5 fw-bold">我有的優惠券</div>
        <div className="d-none">
          <p>沒有優惠卷</p>
        </div>
        {/* 只顯示未過期且還沒使用的優惠卷 */}
        {couponNotExpired.map((v, i) => {
          return (
            <div className="row  py-2" key={i}>
              <div
                className="form-check-label d-flex align-items-center col-3"
                htmlFor={`coupon${i}`}
              >
                <input
                  className="form-check-input"
                  type="radio"
                  name="couponRadios"
                  id={`coupon${i}`}
                  value={v.id}
                  //如果當前迴圈遍歷到的優惠券的 ID 等於被選擇的優惠券的 ID，則表示這個 radio 按鈕應該被選中，因此 checked 屬性設置為 true；否則，則為 false。
                  checked={selectedCoupon.id === v.id}
                  onChange={() => handleSelectedCoupon(v)}
                />
                <div className={styles.coupon_name}>{v.name}</div>
              </div>
              <div
                className={`col-3 ${styles.coupon_detail}`}
                htmlFor={`coupon${i}`}
              >
                {v.amount > 1 ? `${v.amount}元` : `${v.amount*10}折`}
              </div>
              <div
                className={`col-3 ${styles.coupon_detail}`}
                htmlFor={`coupon${i}`}
              >
                低消：{v.min_price}元
              </div>
              <div
                className={`col-3 ${styles.coupon_detail}`}
                htmlFor={`coupon${i}`}
              >
                有效期限：{v.deadline}
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}
