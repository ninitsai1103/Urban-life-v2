import React from 'react'
import { useCheckout } from '@/hooks/use-checkout'

export default function CheckoutCounter({selectedCoupon}) {
  const {totalPrice, totalItems} = useCheckout()
  return (
    <>
      <div>共 {totalItems} 件</div>
      <div className='text-end'>
        <div>小計： {totalPrice}元</div>
        <div>運費： 60元</div>
        <div>優惠券折扣： - {selectedCoupon.amount}元</div>
        <hr />
        <div>總金額： 78424元</div>
      </div>
    </>
  )
}
