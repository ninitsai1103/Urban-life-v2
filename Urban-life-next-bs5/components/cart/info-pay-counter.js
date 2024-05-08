import { useState, useEffect } from 'react'
import { useCheckout } from '@/hooks/use-checkout'

export default function InfoPayCounter() {
  const { totalPriceChecked, totalItemsChecked } = useCheckout()

  const [shippingFee, setShippingFee] = useState(60)

  useEffect(() => {
    handleShippingFee()
  }, [totalPriceChecked])
  const handleShippingFee = () => {
    if (totalPriceChecked >= 1000) {
      setShippingFee(0)
    } else {
      setShippingFee(60)
    }
  }

  // const [discount, setDiscount] = useState(0)
  const [couponDiscount, setcouponDiscount] = useState(0)

  useEffect(() => {
    const data = window.localStorage.getItem('selectedCoupon')
    console.log('data', data)
    const couponDiscount = JSON.parse(data).amount
    console.log('couponDiscount', couponDiscount)
    setcouponDiscount(couponDiscount)
    // let discount
    // if (couponDiscount>1 || couponDiscount === 0) {
    //   discount = couponDiscount
    //   console.log('final discount:', discount)
    //   setDiscount(discount)
    // }else{
    //   discount = totalPriceChecked-totalPriceChecked*couponDiscount
    //   console.log('final discount:', discount)
    //   setDiscount(discount)
    // }
  }, [])

  let discount
  if (couponDiscount > 1 || couponDiscount === 0) {
    discount = couponDiscount
    console.log('final discount:', discount)
  } else {
    discount = totalPriceChecked - totalPriceChecked * couponDiscount
    console.log('final discount:', discount)
  }

  const pricePayable = totalPriceChecked + shippingFee - discount

  useEffect(() => {
    window.localStorage.setItem('pricePayable', pricePayable)
  }, [pricePayable])

  return (
    <>
      <h4 className="text-light bg-primary4 p-2 mt-2">實付金額</h4>
      <div>共 {totalItemsChecked} 件</div>
      <div className="text-end">
        <div>小計： {totalPriceChecked}元</div>
        {/*  <div> 元素並不支援 onChange 事件，需要用useEffect來處理 */}
        <div>運費： {shippingFee}元</div>
        <div>優惠券折扣： - {discount}元</div>
        <hr />
        <div id="pricePayable">總金額：{pricePayable}元</div>
      </div>
    </>
  )
}
