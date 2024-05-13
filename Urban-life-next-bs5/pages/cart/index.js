import { useState, useEffect } from 'react'
import CheckoutProductsTable from '@/components/cart/checkout-products-table'
import CheckoutLecturesTable from '@/components/cart/checkout-lectures-table'
import Step from '@/components/cart/step'
import CheckoutCouponsSelect from '@/components/cart/checkout-coupons'
import CheckoutCounter from '@/components/cart/checkout-counter'
import styles from '@/components/cart/cart.module.css'
import Link from 'next/link'
import AddProducts from '@/components/cart/add-products'
// import coupons from '@/data/coupon.json'
import { useUserCoupon } from '@/hooks/use-usercoupon'
import { useCheckout } from '@/hooks/use-checkout'

export default function CheckoutPage() {
  // 使用 useState hook 創建 couponSelected 狀態，初始值為空陣列
  const [couponSelected, setCouponSelected] = useState([])
  //抓取會員所有的優惠券
  const { userCoupons, setUserCoupons, getCoupons } = useUserCoupon()

  const { totalItems, totalItemsChecked } = useCheckout()

  useEffect(() => {
    getCoupons()
    console.log(userCoupons)
  }, [])
  const coupons = userCoupons

  const [goToPayBtn, setGoToPayBtn] = useState(false)
  const linkTo = '../cart/info-pay'
  useEffect(() => {
    if (totalItemsChecked > 0) {
      setGoToPayBtn(true)
    } else {
      setGoToPayBtn(false)
    }
  }, [totalItemsChecked])

  // 傳遞勾選的商品陣列物件
  // const [selectedProductsToPay, setSelectedProductsToPay] = useState([])
  // 傳遞勾選的課程陣列物件
  // const [selectedLecturesToPay, setSelectedLecturesToPay] = useState([])
  //合併勾選的商品及課程陣列物件
  // const selectedToPay = [...selectedProductsToPay,...selectedLecturesToPay]

  // useEffect (() => {
  //   console.log("selectedToPay", selectedToPay);
  // }, [selectedToPay])

  return (
    <>
      <AddProducts />
      {totalItems > 0 ? (
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
          <CheckoutProductsTable
          // setSelectedProductsToPay={setSelectedProductsToPay}
          />
          <CheckoutLecturesTable
          //setSelectedLecturesToPay={setSelectedLecturesToPay}
          />
          <section className="d-sm-flex justify-content-between mb-3">
            <div className="flex-fill me-sm-3">
              <h4 className="text-light bg-primary4 p-2 mt-2">選擇優惠券</h4>
              <CheckoutCouponsSelect
                coupons={coupons}
                sendSelectedCoupon={setCouponSelected}
              />
            </div>
            <div className="flex-fill">
              <h4 className="text-light bg-primary4 p-2 mt-2">訂單資訊</h4>
              <CheckoutCounter
                selectedCoupon={couponSelected}
                //selectedToPay={selectedToPay}
              />
              <div className="text-end mt-3">
                {goToPayBtn ? (
                  <Link type="button" className="btn btn-main" href={linkTo}>
                    結帳去
                  </Link>
                ) : (
                  <button type="button" className="btn btn-main" disabled>
                    結帳去
                  </button>
                )}
              </div>
            </div>
          </section>
        </div>
      ) : (
        <div className="container pt-3 d-flex flex-column align-items-center justify-content-center">
          <div className={`text-center text-primary5 d-flex flex-column align-items-center justify-content-center ${styles.done_card}`}>
            <h4 className='my-3'>購物車是空的～</h4>
            <h4 className='my-3'>去購物吧！</h4>
            <div className="w-75 mb-3">
              <img src="/images/cart/shopping_reji_kago_brown.png"
                alt="購物車是空的"
                className="img-fluid" />
            </div>
            <Link type="button" className="btn btn-main" href="../product/list">
              去購物
            </Link>
          </div>
        </div>
      )}
    </>
  )
}
