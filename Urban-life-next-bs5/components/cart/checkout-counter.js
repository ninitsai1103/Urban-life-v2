import { useState, useEffect } from 'react'
import { useCheckout } from '@/hooks/use-checkout'

export default function CheckoutCounter({ selectedCoupon }) {
  const { totalPriceChecked, totalItemsChecked } = useCheckout()

  const [shippingFee, setShippingFee] = useState(60)

  // const selectedToPayPrice = selectedToPay.reduce(
  //   (total, item) => total + item.price * item.qty, 0
  // )

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
  const [discount, setDiscount] = useState(0)
  const [pricePayable, setPricePayable] = useState(
    totalPriceChecked + shippingFee
  )
  useEffect(() => {
    let updatedDiscount = window.localStorage.getItem('discount')
    let updatedPrice = window.localStorage.getItem('pricePayable')
    // let updatedDiscount = 0
    // let updatedPrice = totalPriceChecked + shippingFee

    if (selectedCoupon && totalPriceChecked >= selectedCoupon.min_price) {
      if (selectedCoupon.amount > 1) {
        updatedDiscount = selectedCoupon.amount
        updatedPrice = totalPriceChecked + shippingFee - selectedCoupon.amount
      } else {
        updatedDiscount =
          totalPriceChecked - totalPriceChecked * selectedCoupon.amount
        updatedPrice = totalPriceChecked * selectedCoupon.amount + shippingFee
      }
    }
    // else {
    //   updatedDiscount = 0
    //   updatedPrice = totalPriceChecked + shippingFee
    // }

    setDiscount(updatedDiscount)
    setPricePayable(updatedPrice)
  }, [totalPriceChecked, shippingFee, selectedCoupon])

  // const [discount, setDiscount] = useState(0)
  // let pricePayable = totalPriceChecked + shippingFee

  //   if (selectedCoupon && totalPriceChecked >= selectedCoupon.min_price) {
  //     if (selectedCoupon.amount > 1) {
  //       setDiscount(selectedCoupon.amount)
  //       pricePayable = totalPriceChecked + shippingFee - selectedCoupon.amount
  //     } else {
  //       pricePayable = totalPriceChecked * selectedCoupon.amount + shippingFee
  //       setDiscount(totalPriceChecked - totalPriceChecked * selectedCoupon.amount)
  //     }
  //   }
  // let discount = 0
  // let pricePayable = totalPriceChecked + shippingFee
  // if (selectedCoupon && totalPriceChecked >= selectedCoupon.min_price) {
  //   if (selectedCoupon.amount > 1) {
  //     discount = selectedCoupon.amount
  //     pricePayable = totalPriceChecked + shippingFee - selectedCoupon.amount
  //   } else {
  //     pricePayable = totalPriceChecked * selectedCoupon.amount + shippingFee
  //     discount = totalPriceChecked - totalPriceChecked * selectedCoupon.amount
  //   }
  // }

  // const [payable, setPayable] = useState(pricePayable)
  // const handlePayable = () => {
  //   if (selectedCoupon && totalPriceChecked >= selectedCoupon.min_price) {
  //     if (selectedCoupon.amount > 1) {
  //       discount = selectedCoupon.amount
  //       pricePayable = totalPriceChecked + shippingFee - selectedCoupon.amount
  //     } else {
  //       pricePayable = totalPriceChecked * selectedCoupon.amount + shippingFee
  //       discount = totalPriceChecked - totalPriceChecked * selectedCoupon.amount
  //     }
  //   }
  //   setPayable(pricePayable)
  // }
  // useEffect(() => {

  //   handlePayable()
  // }, [totalPriceChecked, selectedCoupon, shippingFee])

  // // localStorage payable
  // useEffect(() => {
  //   const data = window.localStorage.getItem('payable')
  //   setPayable(JSON.parse(data))
  // })
  // useEffect(() => {
  //   window.localStorage.setItem('payable', JSON.stringify(payable))
  // }, [payable])

  // localStorage pricePayable
  useEffect(() => {
    window.localStorage.setItem('pricePayable', pricePayable)
  })


  // localStorage discount
  // useEffect(() => {
  //   const data = window.localStorage.getItem('discount')
  //   console.log('discount', data)
  //   setDiscount(data)
  // }, [])
  useEffect(() => {
    if (discount >= 0) {
      window.localStorage.setItem('discount', discount)
    }
  }, [discount])

  // // localStorage selectedCoupon
  // useEffect(() => {
  //   if (selectedCoupon) {
  //     window.localStorage.setItem(
  //       'selectedCoupon',
  //       JSON.stringify(selectedCoupon)
  //     )
  //   }
  // }, [selectedCoupon])

  //不需要，因為不是用狀態控制
  // useEffect(() => {
  //   window.localStorage.getItem("pricePayable")
  // }, [])

  const [showWarning, setShowWarning] = useState(false)
  useEffect(() => {
    if (selectedCoupon && totalPriceChecked < selectedCoupon.min_price) {
      setShowWarning(true)
    } else {
      setShowWarning(false)
    }
  }, [totalPriceChecked, selectedCoupon])

  //localStorage
  //getItem warning
  useEffect(() => {
    const data = window.localStorage.getItem('warning')
    if (data !== null) setShowWarning(JSON.parse(data))
  }, [])
  //setItem warning
  useEffect(() => {
    window.localStorage.setItem('warning', JSON.stringify(showWarning))
  }, [showWarning])

  return (
    <>
      <div>共 {totalItemsChecked} 件</div>
      <div className="text-end">
        <div>小計： {totalPriceChecked}元</div>
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
