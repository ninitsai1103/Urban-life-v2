import {useState} from 'react'
import CheckoutProductsTable from '@/components/cart/checkout-products-table'
import CheckoutLecturesTable from '@/components/cart/checkout-lectures-table'
import Step from '@/components/cart/step'
import CheckoutCouponsSelect from '@/components/cart/checkout-coupons'
import CheckoutCounter from '@/components/cart/checkout-counter'
import styles from '@/components/cart/cart.module.css'
import Link from 'next/link'
import AddProducts from '@/components/cart/add-products'
import coupons from '@/data/coupon.json'

export default function CheckoutPage() {
  // 使用 useState hook 創建 couponSelected 狀態，初始值為空陣列
  const [couponSelected, setCouponSelected] = useState([])
  // 定義處理選擇優惠券的函數
  const handleCouponSelected = (coupon) => {
    // 將選擇的優惠券設定為 couponSelected 狀態
    setCouponSelected(coupon)
  }
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
              選擇優惠券
            </h4>
            <CheckoutCouponsSelect coupons={coupons} sendSelectedCoupon={handleCouponSelected}/>
          </div>
          <div className="flex-fill">
            <h4 className="text-light bg-primary4 p-2 mt-2">訂單資訊</h4>
            <CheckoutCounter selectedCoupon={couponSelected}/>
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
