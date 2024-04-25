import React from 'react'

export default function CheckoutCounter() {
  return (
    <>
      <div>共 13 件</div>
      <div className='text-end'>
        <div>小計： 78424元</div>
        <div>運費： 60元</div>
        <div>優惠券折扣： - 60元</div>
        <hr />
        <div>總金額： 78424元</div>
      </div>
    </>
  )
}
