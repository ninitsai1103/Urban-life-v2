import { useState, useEffect } from 'react'
import { useCheckout } from '@/hooks/use-checkout'

export default function CheckoutCounter({ selectedCoupon }) {
  const { totalPrice, totalItems } = useCheckout()

  const [shippingFee, setShippingFee] = useState(60)

  useEffect(() => {
    handleShippingFee()
  }, [totalPrice])

  const handleShippingFee = () => {
    if (totalPrice >= 1000) {
      setShippingFee(0)
    } else {
      setShippingFee(60)
    }
  }

  let discount = 0
  let pricePayable = totalPrice + shippingFee
  if (selectedCoupon && totalPrice >= selectedCoupon.min_price) {
    if (selectedCoupon.amount > 1) {
      discount = selectedCoupon.amount
      pricePayable = totalPrice + shippingFee - selectedCoupon.amount
    } else {
      pricePayable = totalPrice * selectedCoupon.amount + shippingFee
      discount = totalPrice - totalPrice * selectedCoupon.amount
    }
  }

  const [showWarning, setShowWarning] = useState(false)
  useEffect(() => {
    if (selectedCoupon && totalPrice < selectedCoupon.min_price) {
      setShowWarning(true)
    } else {
      setShowWarning(false)
    }
  }, [totalPrice, selectedCoupon])

  return (
    <>
      <div>共 {totalItems} 件</div>
      <div className="text-end">
        <div>小計： {totalPrice}元</div>
        {/*  <div> 元素並不支援 onChange 事件，需要用useEffect來處理 */}
        <div>運費： {shippingFee}元</div>
        <div>優惠券折扣： - {discount}元</div>
        {showWarning && (
          <div className="text-danger">
            無法使用優惠券，最低消費金額不得低於 {selectedCoupon.min_price}
          </div>
        )}
        <hr />
        <div>總金額：{pricePayable}元</div>
      </div>
    </>
  )
}
