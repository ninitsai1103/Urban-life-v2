import React, { useEffect, useState } from 'react'
import { FaPlus } from 'react-icons/fa6'
import data from '@/data/coupon.json'

export default function CouponAdd(props) {
  const [newCoupon, setNewCoupon] = useState("")

  
 
  function handleSubmit() {
    // 在這裡處理提交邏輯，例如驗證優惠券代碼是否有效等
    console.log("優惠券代碼已提交:", newCoupon);
    // 清空輸入框
    setNewCoupon("");
    // 傳給coupon頁面的狀態
    // 傳給父元素
    props.setCouponAdd(newCoupon)
  }

  function setCoupon(e) {
    setNewCoupon(e.target.value)
  }

  // function addCoupon(newCoupon) {
  //   // 創立一個假資料試試看
  //   let url = './coupon.json'

  //   fetch(url, { method: 'POST' })
  //     .then((response) => response.json)
  //     .then((data) => console.log(data))
  //     .catch((err) => console.log(error))
  // }
  return (
    <>
      <div className="search col-12 col-lg-5 ">
        <div className="input-group ">
          <input
            type="text"
            className="form-control"
            aria-label="Text input with button"
            placeholder="請輸入優惠券代碼..."
            value={newCoupon}
            onChange={setCoupon}
            
          />
          <button className="btn p-1 " type="button" onClick={handleSubmit} >
            <FaPlus style={{ fontSize: '30px' }} />
          </button>
          <br />
        </div>
      </div>
      <style jsx>
        {`
          .set-border {
            font-size: 20px;
          }

          .search-btn-size {
            width: 28px;
            height: 28px;
          }
        `}
      </style>
    </>
  )
}
