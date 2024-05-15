import React, { useState, useEffect } from 'react'
import AsideAccount from '@/components/member/aside-account'
import Page from '@/components/product/pagination'
import TopNavItem from '@/components/member/top-nav-item'
import CouponAdd from '@/components/member/coupon-add'
import CouponCard from '@/components/member/coupon-card'

import Swal from 'sweetalert2'

// 引入HOOKS
// 連結user_coupon資料表
import { useUserCoupon } from '@/hooks/use-usercoupon'
// 取用localStorage裡的member-info
import { useMemberInfo } from '@/hooks/use-member-info'

// 假資料測試
// import Coupons from '@/data/coupon.json'

import ReactDOM from 'react-dom'

export default function CouponMainPage() {
  // 利用use-member-info的hooks抓取localStorage的會員資訊
  const { member } = useMemberInfo()

  // 20240508先暫時不去用use-usercoupon的鉤子
  // 因為自訂鉤子之間要使用參數有點麻煩
  //use-usercoupon要使用use-member-info抓取member(localStorage的會員資訊)
  // 利用use-usercoupon的hooks把要的東西拉過來
  // const { userCoupons, setUserCoupons, getCoupons } = useUserCoupon()

  //把use-usercoupon的hooks把要的東西拉過來
  // user_coupons資料的狀態，加進去需要用到
  const [userCoupons, setUserCoupons] = useState([])
  // 從user_coupon抓資料近來
  const getCoupons = async (id) => {
    // 後端網址

    // fetch抓資料
    try {
      const url = `http://localhost:3005/api/user_coupon?user_id=${id}`
      const res = await fetch(url)
      const data = await res.json()
      // 所有此user擁有的coupon
      const userCoupon = data.data.user_coupon

      // 成功獲取資料就把資料設定到coupons狀態裡面
      if (Array.isArray(userCoupon)) {
        setUserCoupons(userCoupon)
      } else {
        alert('伺服器回傳資料類型錯誤，無法設定到狀態中')
      }
    } catch (error) {
      console.log(error)
    }
  }

  // 連線伺服器後，才將coupon資料抓下來渲染頁面
  // 渲染完後才能使用localStorge的東西
  // 再use-usercoupon裡面member這個變數原本是null
  // 渲染完頁面以後她才會從localStorage取得member的資訊
  // 所以要使用member去控制她
  // 如果它存在的才執行getCoupons()
  useEffect(() => {
    if (member) {
      getCoupons(member.id)
    }
  }, [member])

  // sweetalert跳出的框框
  const notifyAddSuccess = (couponName) => {
    Swal.fire({
      title: `新增優惠券成功`,
      text: ` 『${couponName}』 已成功加入您的優惠券`,
      icon: 'success',
    })
  }

  const notifyAddFailed = (couponName) => {
    Swal.fire({
      title: `新增優惠券失敗`,
      text: ` 『${couponName}』 此優惠券您已經擁有`,
      icon: 'warning',
    })
  }

  const notifyAddExpired = (couponName) => {
    Swal.fire({
      title: `新增優惠券失敗`,
      text: ` 『${couponName}』 此優惠券早就過期了`,
      icon: 'warning',
    })
  }
  const notifyAddExist = (couponName) => {
    Swal.fire({
      title: `新增優惠券失敗`,
      text: ` 不存在『${couponName}』這個優惠券 `,
      icon: 'error',
    })
  }
  // top-nav-item 篩選資料的狀態: 可使用、已使用、已過期
  const [couponFilter, setCouponFilter] = useState('可使用')

  // user_coupons資料的狀態，加進去需要用到
  // const [userCoupons, setUserCoupons] = useState([])

  // 接收coupon-add狀態的回調function
  const [couponAdd, setCouponAdd] = useState('')

  // 新增優惠券要從coupon資料庫找是否有這張
  // 再跟user_coupon資料庫比對是否有相同的

  const checkCoupon = async (couponCode, id) => {
    const url = `http://localhost:3005/api/user_coupon?user_id=${id}`

    // fetch抓資料
    try {
      const res = await fetch(url)
      const data = await res.json()

      const userCoupons = data.data.user_coupon

      const userCouponsCode = userCoupons.map((userCoupon) => userCoupon.code)

      // console.log(userCouponsCode)

      return userCouponsCode.includes(couponCode)
    } catch (error) {
      console.log(error)
    }
  }
  const addCoupon = async (id) => {
    const url = `http://localhost:3005/api/coupons`

    const res = await fetch(url)

    const data = await res.json()
    const coupons = data.data.coupons

    const couponsCode = coupons.map((coupon) => coupon.code)
    let newCoupon = null // 在這裡初始化變量

    // 從coupon.code去判斷是否存在
    // couponAdd 搜尋元件傳過來的資料
    // 檢查 couponAdd 是否存在，如果存在就新增到user_coupon的資料庫
    if (couponsCode.includes(couponAdd)) {
      console.log(`${couponAdd} 優惠券存在`)
      newCoupon = coupons.find((coupon) => coupon.code === couponAdd)
      console.log(newCoupon)

      // 判斷user是不是有這張優惠券
      if ((await checkCoupon(newCoupon.code, id)) === false) {
        console.log('可以進行新增的動作')
        if (new Date(newCoupon.deadline) < new Date()) {
          notifyAddExpired(couponAdd)
          console.log('此優惠券已經過期了')
          setCouponAdd('')
        } else {
          try {
            // 新增此coupon到user_coupon資料庫裏面
            const url = `http://localhost:3005/api/user_coupon`

            // 不處理UPDATE從後端丟回來的東西，只是做叫後端更新資料的動作

            const res = await fetch(url, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ user_id: id, newCoupon: newCoupon }),
            })
            // 增加優惠券成功
            notifyAddSuccess(newCoupon.name)
            setCouponAdd('')

            // 成功獲取資料就把資料設定到coupons狀態裡面
            // ....
            // ....
            // ....
          } catch (error) {
            console.log(error)
          }
        }
      } else {
        // 使用者已經有這張優惠券
        notifyAddFailed(couponAdd)
        console.log('已經有此張優惠券啦')
        setCouponAdd('')
      }
    } else {
      notifyAddExist(couponAdd)
      console.log('此優惠券不存在')
      setCouponAdd('')
    }
  }

  const deleteCoupon = async (couponID,id) => {
    const url = `http://localhost:3005/api/user_coupon?user_id=${id}`

    // fetch抓資料
    try {
      const res = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: couponID }),
      })
      const data = await res.json()
      console.log(data)

      // 在成功刪除優惠券後執行 getCoupon
      await getCoupons(id)

      
    } catch (error) {
      console.log(error)
     
    }
  }

  // 新增完後再渲染一次
  useEffect(() => {
    const fetchData = async () => {
      if (member) {
        if (couponAdd !== '') {
          await addCoupon(member.id)
          await getCoupons(member.id)
        }
      }
    }
    fetchData()
  }, [couponAdd, member])

  // // 讓頁面知道他是哪個user
  // useEffect(() => {
  //   // 把localStorage裡的member-info拉出來
  //   const memberInfo = JSON.parse(localStorage.getItem('member-info'))

  //   if (memberInfo) {
  //     // member-info是物件需要解構下
  //     const { id } = memberInfo
  //     const userID = id
  //     console.log(userID)
  //   }
  // }, [])
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
                {userCoupons
                  .filter((coupon) => {
                    switch (couponFilter) {
                      case '可使用':
                        return (
                          coupon.status === '可使用' &&
                          new Date(coupon.deadline) > new Date()
                        )
                      case '已使用':
                        return coupon.status === '已使用'
                      case '已過期':
                        return (
                          coupon.status === '已過期' &&
                          new Date(coupon.deadline) < new Date()
                        )
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
                      started_at,
                      deadline,
                      status,
                      min_price,
                      condition,
                    } = filteredCoupon
                    {
                      /* console.log(filteredCoupon) */
                    }
                    return (
                      <div className="col-12 col-lg-6 g-2" key={code}>
                        <CouponCard
                          id={id}
                          name={name}
                          code={code}
                          amount={amount}
                          started_at={started_at}
                          deadline={deadline}
                          status={status}
                          min_price={min_price}
                          condition={condition}
                          deleteCoupon={deleteCoupon}
                        />
                      </div>
                    )
                  })}
              </div>
            </div>
            {/* <div>
              <Page />
            </div> */}
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
