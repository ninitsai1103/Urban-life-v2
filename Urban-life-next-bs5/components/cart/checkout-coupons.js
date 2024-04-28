import { useState, useEffect } from 'react'
import styles from './cart-checkout.module.css'
// import coupons from '@/data/coupon.json'
import { useCheckout } from '@/hooks/use-checkout'
// import category from '@/data/products-lectures-test/product-category.json'

export default function CheckoutCouponsSelect({ coupons, sendSelectedCoupon }) {
  // const { items, totalPrice } = useCheckout()

  const couponNotExpired = coupons.filter(
    (v) => new Date(v.deadline) > new Date() && v.status === '可使用'
  )

  const [selectedCoupon, setSelectedCoupon] = useState([])
  const handleSendSelectedCoupon = (e) => {
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
                  checked={selectedCoupon.id === v.id}
                  onChange={() => handleSendSelectedCoupon(v)}
                />
                <div className={styles.coupon_name}>{v.name}</div>
              </div>
              <div
                className={`col-3 ${styles.coupon_detail}`}
                htmlFor={`coupon${i}`}
              >
                折扣：{v.amount}元
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
