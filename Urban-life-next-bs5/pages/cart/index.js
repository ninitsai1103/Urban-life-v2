import React from 'react'
import CheckoutProductsTable from '@/components/cart/checkout-products-table'
import CheckoutLecturesTable from '@/components/cart/checkout-lectures-table'
import Step from '@/components/cart/step'
import CheckoutCouponsSelect from '@/components/cart/checkout-coupons'
import CheckoutCounter from '@/components/cart/checkout-counter'
import styles from '@/components/cart/cart.module.css'
import Link from 'next/link'
import AddProducts from '@/components/cart/add-products'

export default function CheckoutPage() {

  return (
    <>
      <AddProducts />
      <div className="container pt-3">
        <Link type="button" className="btn btn-main" href="../product/list">
          繼續購物
        </Link>
        <h2 className="text-center text-primary5">購物車</h2>
        <div className="d-flex justify-content-evenly mb-3">
          <Step
            step="1"
            title="購物車"
            circle_color={styles.circle_color_progressing}
          />
          <Step
            step="2"
            title="填寫資料"
            circle_color={styles.circle_color_undo}
          />
          <Step
            step="3"
            title="完成訂單"
            circle_color={styles.circle_color_undo}
          />
        </div>
        <CheckoutProductsTable/>
        <CheckoutLecturesTable />
        <section className="d-sm-flex justify-content-between mb-3">
          <div className="flex-fill me-sm-3">
            <h4 className="text-light bg-primary4 p-2 mt-2">
              選擇優惠券或輸入優惠代碼
            </h4>
            <CheckoutCouponsSelect />
          </div>
          <div className="flex-fill">
            <h4 className="text-light bg-primary4 p-2 mt-2">訂單資訊</h4>
            <CheckoutCounter />
            <div className="text-end mt-3">
              <button className="btn btn-main" type="button" onClick={() => {}}>
                結帳去
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
