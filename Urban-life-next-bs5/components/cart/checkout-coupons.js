import { useState, useEffect } from 'react'
import styles from './cart-checkout.module.css'
// import coupons from '@/data/coupon.json'
import { useCheckout } from '@/hooks/use-checkout'
// import category from '@/data/products-lectures-test/product-category.json'

export default function CheckoutCouponsSelect({ coupons, sendSelectedCoupon }) {
  const { totalPriceChecked } = useCheckout()

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
  const handleNoCouponSelected = () => {
    // window.localStorage.setItem('discount', 0)
    
    setSelectedCoupon([])
    // sendSelectedCoupon([])
    // setSelectedCoupon({"id":1,"user_id":43,"coupon_id":1,"valid":1,"name":"註冊優惠券","code":"VIP666","amount":0.1,"started_at":"2024-04-24","deadline":"2024-05-31","created_at":"2024-01-01 00:00:00","updated_at":"2024-01-19 00:00:00","status":"可使用","min_price":500,"condition":"資材"})
    sendSelectedCoupon({"id":99,"user_id":43,"coupon_id":99,"valid":1,"name":"不選擇優券","code":"NOCOUPON","amount":Number(0),"started_at":"2024-04-24","deadline":"2024-05-31","created_at":"2024-01-01 00:00:00","updated_at":"2024-01-19 00:00:00","status":"可使用","min_price":0,"condition":"資材"})
    // window.localStorage.setItem('coupon', JSON.stringify([]))
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
  // useEffect(() => {
  //   const data = window.localStorage.getItem('coupon')
  //   if (data) {setSelectedCoupon(JSON.parse(data))}
  // }, [])
  // //setItem
  // useEffect(() => {
  //   if(selectedCoupon.length > 0) {
  //     window.localStorage.setItem('coupon', JSON.stringify(selectedCoupon))
  //   }
  // }, [selectedCoupon])

  // localStorage selectedCoupon
  // useEffect(() => {
  //   const data = window.localStorage.getItem('selectedCoupon')
  //   if (data) {
  //     setSelectedCoupon(JSON.parse(data))
  //   }
  // }, [])
  useEffect(() => {
    if(totalPriceChecked>=selectedCoupon.min_price) {
      window.localStorage.setItem(
        'selectedCoupon',
        JSON.stringify(selectedCoupon)
      )
    }else{
      window.localStorage.setItem('selectedCoupon', JSON.stringify([]))
    }
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
        <div
          className="form-check-label d-flex align-items-center col-4"
          htmlFor="none"
        >
          <input
            className="form-check-input"
            type="radio"
            name="couponRadios"
            id="none"
            value="none"
            checked={selectedCoupon.length === 0}
            onChange={handleNoCouponSelected}
          />
          <div className={styles.coupon_name}>不選擇優惠券</div>
        </div>
        {couponNotExpired.map((v, i) => {
          return (
            <div className="row py-2" key={i}>
              <div
                className="form-check-label d-flex align-items-center col-4"
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
                className={`col-2 ${styles.coupon_detail}`}
                htmlFor={`coupon${i}`}
              >
                {v.amount > 1 ? `${v.amount}元` : `${v.amount * 10}折`}
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
