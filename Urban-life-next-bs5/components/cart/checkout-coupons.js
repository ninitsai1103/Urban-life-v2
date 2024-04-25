import React from 'react'
import styles from './cart-checkout.module.css'
import { FaCircleQuestion } from 'react-icons/fa6'

export default function CheckoutCouponsSelect() {
  return (
    <>
      <div className="input-group mb-2">
        <input
          type="text"
          className="form-control"
          placeholder="輸入優惠代碼"
        />
        <button className="btn btn-main-r" type="button">
          使用
        </button>
      </div>
      <div>
        <div className="fs-5 fw-bold">我有的優惠券</div>
        <div className="d-none">
          <p>沒有優惠卷</p>
        </div>
        <div className="d-flex justify-content-between py-2">
          <div
            className="form-check-label d-flex align-items-center"
            for="exampleRadios1"
          >
            <input
              className="form-check-input"
              type="checkbox"
              name="exampleRadios"
              id="exampleRadios1"
              value="option1"
            />
            <div className={styles.coupon_name}>優惠券名稱</div>
          </div>
          <div className={styles.coupon_detail} for="exampleRadios1">
            低銷金額
          </div>
          <div className={styles.coupon_detail} for="exampleRadios1">
            有效期限
          </div>
          <div className={styles.coupon_question} for="exampleRadios1">
            <button className="btn btn-detail d-flex">
              <div>
                <FaCircleQuestion />
              </div>
              <div className={styles.coupon_limit}>使用限制</div>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
