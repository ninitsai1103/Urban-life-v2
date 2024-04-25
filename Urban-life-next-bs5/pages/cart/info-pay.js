import React from 'react'
import Step from '@/components/cart/step'
import styles from '@/components/cart/cart.module.css'
import InfoPayOrder from '@/components/cart/info-pay-order'
import InfoPayInfo from '@/components/cart/info-pay-info'
import InfoPayPay from '@/components/cart/info-pay-pay'
import CheckoutCounter from '@/components/cart/checkout-counter'

export default function InfoPayPage() {
  return (
    <>
      <div className="container pt-3">
      <button className="btn btn-main">上一步</button>
        <h2 className="text-center text-primary5">填寫資料</h2>
        <div className="d-flex justify-content-evenly mb-3">
          <Step step="1" title="購物車" circle_color={styles.circle_color_progressing}/>
          <Step step="2" title="填寫資料" circle_color={styles.circle_color_progressing} />
          <Step step="3" title="完成訂單" circle_color={styles.circle_color_undo}/>
        </div>
        <InfoPayOrder />
        <InfoPayInfo />
        <InfoPayPay />
        <h4 className="text-light bg-primary4 p-2 mt-2">實付金額</h4>
        <CheckoutCounter />
        <div className="w-100 text-center">
          <button type="submit" className="btn btn-add w-50">確認付款</button>
        </div>
      </div>
    </>
  )
}
