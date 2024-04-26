import React, { useState, useEffect } from 'react'
import AsideAccount from '@/components/member/aside-account'
import Page from '@/components/product/pagination'
import TopNavItem from '@/components/member/top-nav-item'
import CouponAdd from '@/components/member/coupon-add'
import CouponCard from '@/components/member/coupon-card'

import Coupons from '@/data/coupon.json'

import ReactDOM from 'react-dom'

export default function CouponMainPage() {
  // top-nav-item 篩選資料的狀態: 可使用、已使用、已過期
  const [couponFilter, setCouponFilter] = useState('+')

  // coupon資料的狀態，加進去需要用到
  const [coupons, setCoupons] = useState([])

  // 接收coupon-add狀態的回調function
  const [couponAdd, setCouponAdd] = useState()

  // 從前端寫街口將 後端把資料拿過來
  const getCoupons = async () => {
    // 後端網址
    const url = 'http://localhost:3005/api/coupons'

    // fetch抓資料
    try {
      const res = await fetch(url)
      const data = await res.json()

      console.log(data.data.coupons)

      if (Array.isArray(data.data.coupons)) {
        setCoupons(data.data.coupons)
      } else {
        alert('伺服器回傳資料類型錯誤，無法設定到狀態中')
      }
    } catch (error) {
      console.log(error)
    }
  }
// 連線伺服器後，才將coupon資料抓下來渲染頁面
  useEffect(() => {
    getCoupons()
  }, [])

  // 檢查 coupon 是否存在，如果存在就新增到資料庫
  useEffect(() => {
    const codeArray = Coupons.map((coupon) => coupon.code)
    console.log(codeArray)
    if (codeArray.includes(couponAdd)) {
      console.log(`${couponAdd} 優惠券存在`)
      let newCoupon = Coupons.find((coupon) => coupon.code === couponAdd)
      console.log(newCoupon)

      // 新增新的，並修改id
      const ids = Coupons.map((v) => v.id)
      const newId = Coupons.length > 0 ? Math.max(...ids) + 1 : 1

      newCoupon = { ...newCoupon, id: newId }
      console.log(newCoupon)

      // 新增到資料庫我不會做.....

      // setNewCoupons((prevCoupons) => [...prevCoupons, newCoupon])
    } else {
      console.log('根本就沒有')
    }
  }, [couponAdd])

  return (
    <>
      <div className="container coupon-management-body">
        <div className="row coupon-management">
          <div className="col-lg-3 col-md-12 coupon-aside">
            <AsideAccount />
          </div>
          <div className="col-lg-9 col-md-12 coupon">
            <div className="d-flex align-items-center justify-content-between coupon-margin-bottom mb-3">
              <div className="coupon-text-title">我的優惠券</div>
            </div>
            <TopNavItem setCouponFilter={setCouponFilter} />
            <div className="mb-2 ">
              <CouponAdd setCouponAdd={setCouponAdd} />
            </div>

            <div className="coupon-margin-bottom">
              <div className="row">
                {coupons
                  .filter((coupon) => {
                    switch (couponFilter) {
                      case '可使用':
                        return coupon.status === '可使用'
                      case '已使用':
                        return coupon.status === '已使用'
                      case '已過期':
                        return coupon.status === '已過期'
                      default:
                        return true // 如果沒有篩選條件，返回 true
                    }
                  })
                  .map((filteredCoupon) => {
                    const {
                      id,
                      name,
                      code,
                      amount,
                      startedAt,
                      deadline,
                      status,
                      min_price,
                      scope,
                    } = filteredCoupon

                    return (
                      <div className="col-12 col-lg-6 g-2" key={id}>
                        <CouponCard
                          name={name}
                          code={code}
                          amount={amount}
                          startedAt={startedAt}
                          deadline={deadline}
                          status={status}
                          min_price={min_price}
                          scope={scope}
                        />
                      </div>
                    )
                  })}
              </div>
            </div>
            <div>
              <Page />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
         {
          /* sm:576px, md:768, lg:992px,  */
        }

        .coupon {
          padding: 30px 70px;
          background-color: #ffffff;
          border-radius: 8px;
          border: 1px solid #ccc;
        }

        .coupon-text-title {
          font-size: 36px;
          font-weight: bold;
        }

        .coupon-margin-bottom {
          margin-bottom: 50px;
        }

        .add-btn {
          border-radius: 100px;
          border: none;
          padding: 4px 20px;
          color: white;
          background-color: #849474;
        }

        .coupon-management {
          margin: 20px;
          padding: 33px 0;
        }

        @media (max-width: 992px) {
          .coupon-aside {
            padding: 0px;
            margin-bottom: 40px;
          }
        }

        @media (max-width: 768px) {
          .coupon {
            padding: 0px;
            background-color: #ebe3db;
          }
          .coupon-text-title {
            display: none;
          }
          .coupon {
            border: none;
          }

           {
            /* 要放哪裡?? */
          }
          .add-btn {
            border-radius: 8px;
          }
        }
      `}</style>
    </>
  )
}
