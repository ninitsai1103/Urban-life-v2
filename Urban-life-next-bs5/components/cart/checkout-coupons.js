import { useState, useEffect } from 'react'
import styles from './cart-checkout.module.css'
import { FaCircleQuestion } from 'react-icons/fa6'
import coupons from '@/data/coupon.json'
import { useCheckout } from '@/hooks/use-checkout'
import category from '@/data/products-lectures-test/product-category.json'

export default function CheckoutCouponsSelect() {
  const { items, totalPrice } = useCheckout()

  const couponNotExpired = coupons.filter(
    (v) => new Date(v.deadline) > new Date() && v.status === '可使用'
  )

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
                htmlFor="exampleRadios1"
              >
                <input
                  className="form-check-input"
                  type="radio"
                  name="exampleRadios"
                  id="exampleRadios1"
                  value="option1"
                  disabled={v.disabled}
                />
                <div className={styles.coupon_name}>{v.name}</div>
              </div>
              <div
                className={`col-3 ${styles.coupon_detail}`}
                htmlFor="exampleRadios1"
              >
                低消：{v.min_price}元
              </div>
              <div
                className={`col-3 ${styles.coupon_detail}`}
                htmlFor="exampleRadios1"
              >
                有效期限：{v.deadline}
              </div>
              <div
                className={`col-3 ${styles.coupon_question}`}
                htmlFor="exampleRadios1"
              >
                <button className="btn btn-detail d-flex">
                  <div>
                    <FaCircleQuestion />
                  </div>
                  <div className={styles.coupon_limit}>使用限制</div>
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}
