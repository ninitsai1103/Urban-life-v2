import React, { useState, useEffect } from 'react'
import AsideAccount from '@/components/member/aside-account'
import Page from '@/components/product/pagination'
import TopNavItem from '@/components/member/top-nav-item'
import CouponAdd from '@/components/member/coupon-add'
import CouponCard from '@/components/member/coupon-card'

import Swal from 'sweetalert2'

// 假資料測試
// import Coupons from '@/data/coupon.json'

import ReactDOM from 'react-dom'

export default function CouponMainPage() {
  // sweetalert跳出的框框
  const notifySA = (coupon) => {
    MySal.fire({
      title: '新增優惠券成功',
      text: coupon + `已成功加入您的優惠券`,
      icon: 'success',
    })
  }
  // top-nav-item 篩選資料的狀態: 可使用、已使用、已過期
  const [couponFilter, setCouponFilter] = useState('可使用')

  // coupons資料的狀態，加進去需要用到
  const [coupons, setCoupons] = useState([])

  // 接收coupon-add狀態的回調function
  const [couponAdd, setCouponAdd] = useState('')

  // 從前端寫接口將後端把user_coupon裡的資料拿過來
  const getCoupons = async () => {
    // 後端網址
    const url = 'http://localhost:3005/api/user_coupon'

    // fetch抓資料
    try {
      const res = await fetch(url)
      const data = await res.json()
      // 所有此user擁有的coupon
      const userCoupon = data.data.user_coupon
      // 先顯示"可使用"的coupon
      // const couponstatus = []
      // userCoupons.map((coupon) => {
      //   couponstatus
      //   if(coupon.status === '可使用'){
      //     couponstatus.push(coupon)
      //   }
      // })

      // 成功獲取資料就把資料設定到coupons狀態裡面
      if (Array.isArray(userCoupon)) {
        setCoupons(userCoupon)
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

  // 新增優惠券要從coupon資料庫找否有這張

  const addCoupon = async () => {
    const url = `http://localhost:3005/api/coupons`

    const res = await fetch(url)
    const data = await res.json()
    const coupons = data.data.coupons
    const couponsCode = coupons.map((coupon) => coupon.code)
    // 從coupon.code去判斷是否存在
    // couponAdd 搜尋元件傳過來的資料
    // 檢查 couponAdd 是否存在，如果存在就新增到user_coupon的資料庫
    if (couponsCode.includes(couponAdd)) {
      console.log(`${couponAdd} 優惠券存在`)
      let newCoupon = coupons.find((coupon) => coupon.code === couponAdd)
      console.log(JSON.stringify(newCoupon))

      try {
        // 新增此coupon到user_coupon資料庫裏面
        const url = `http://localhost:3005/api/user_coupon`
        // 不處理UPDATE從後端丟回來的東西，只是做叫後端更新資料的動作
        const res = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newCoupon),
        })
        setCouponAdd('')
        // 跳出來的框框
        notifySA(newCoupon)

        // 成功獲取資料就把資料設定到coupons狀態裡面
        // ....
        // ....
        // ....
      } catch (error) {
        console.log(error)
      }
    } else {
      console.log('根本就沒有')
      setCouponAdd('')
    }
  }
  const ty = 55
  // 新增完後再渲染一次
  useEffect(() => {
    const fetchData = async () => {
      await addCoupon()
      await getCoupons()
    }
    fetchData()
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
