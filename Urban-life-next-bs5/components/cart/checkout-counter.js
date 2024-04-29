import {useState, useEffect} from 'react'
import { useCheckout } from '@/hooks/use-checkout'

export default function CheckoutCounter({selectedCoupon}) {
  const {totalPrice, totalItems} = useCheckout()

  const [shippingFee, setShippingFee] = useState(60)

  useEffect(() => {
    handleShippingFee()
  }, [totalPrice])

  const handleShippingFee = () => {
    if (totalPrice>=1000){
      setShippingFee(0)
    }else{
      setShippingFee(60)
    }
  }

  const pricePayable = totalPrice + shippingFee - selectedCoupon.amount
  return (
    <>
      <div>共 {totalItems} 件</div>
      <div className='text-end'>
        <div>小計： {totalPrice}元</div>
        {/*  <div> 元素並不支援 onChange 事件，需要用useEffect來處理 */}
        <div>運費： {shippingFee}元</div>
        <div>優惠券折扣： - {selectedCoupon.amount}元</div>
        <hr />
        <div>總金額：{pricePayable}元</div>
      </div>
    </>
  )
}
