import React, { useState, useEffect } from 'react'
import AsideAccount from '@/components/member/aside-account'
import Page from '@/components/product/pagination'
import TopNavItem from '@/components/member/top-nav-item'
import CouponAdd from '@/components/member/coupon-add'
import CouponCard from '@/components/member/coupon-card'

import Swal from 'sweetalert2'

import { useUserCoupon } from '@/hooks/use-usercoupon'
import { useMemberInfo } from '@/hooks/use-member-info'

export default function CouponMainPage() {
  // 會員資訊 (從localStorge取得user的所有資料)
  const { member } = useMemberInfo()
  // 使用者擁有的優惠券狀態
  const [userCoupons, setUserCoupons] = useState([])
  // 接收優惠券代碼的狀態(從coupon-add傳過來)
  const [couponAdd, setCouponAdd] = useState('')
  // 優惠券篩選的狀態(最初是"可使用")
  const [couponFilter, setCouponFilter] = useState('可使用')

  // 從該登入的會員去抓他所擁有的優惠券，執行完一個動作以後也要再抓一次
  const getCoupons = async (id) => {
    try {
      const url = `http://localhost:3005/api/user_coupon?user_id=${id}`
      const res = await fetch(url)
      const data = await res.json()
      const userCoupon = data.data.user_coupon

      if (Array.isArray(userCoupon)) {
        setUserCoupons(userCoupon)
      } else {
        alert('伺服器回傳資料類型錯誤，無法設定到狀態中')
      }
    } catch (error) {
      console.log(error)
    }
  }

  // 檢查各訂單是否有使用過優惠券，如果有把優惠券的狀態改成"已使用"
  const checkOrderCouponStatus = async () => {
    try {
      const url = `http://localhost:3005/api/order`
      const res = await fetch(url)
      const data = await res.json()
      const order = data.data.order

      for (let i = 0; i < order.length; i++) {
        if (order[i].coupon_id) {
          const couponUrl = `http://localhost:3005/api/user_coupon?coupon_id=${order[i].coupon_id}`
          const couponRes = await fetch(couponUrl, { method: 'PUT' })
          // const couponData = await couponRes.json()
          // console.log(couponData);
        }
      }
    } catch (error) {
      console.log(error)
    }
  }
  // 檢查增加的優惠券是否存在在使用者的資料庫裏面
  const checkCoupon = async (couponCode, userID) => {
    try {
      const url = `http://localhost:3005/api/user_coupon?user_id=${userID}`
      const res = await fetch(url)
      const data = await res.json()
      const userCoupons = data.data.user_coupon
      const userCouponsCode = userCoupons.map((userCoupon) => userCoupon.code)
      return userCouponsCode.includes(couponCode)
    } catch (error) {
      console.log(error)
    }
  }

  const addCoupon = async (userID) => {
    try {
      // 先檢查優惠券使否存在總優惠券資料庫當中
      const url = `http://localhost:3005/api/coupons`
      const res = await fetch(url)
      const data = await res.json()
      const coupons = data.data.coupons
      // 將資料庫所有的優惠券的code集合在一個陣列當中
      const couponsCodes = coupons.map((coupon) => coupon.code)

      let newCoupon
      if (couponsCodes.includes(couponAdd)) {
        // 尋找第一個符合條件的優惠券
        newCoupon = coupons.find((coupon) => coupon.code === couponAdd)

        // 先檢查使用者是否擁有該優惠券
        if (!(await checkCoupon(newCoupon.code, userID))) {
          // 如果優惠券過期的話就掰掰
          if (new Date(newCoupon.deadline) < new Date()) {
            notifyAddExpired(couponAdd)
            setCouponAdd('')
          } else {
            // 沒有過的話就可以增加啦~
            const userCouponUrl = `http://localhost:3005/api/user_coupon`
            const res = await fetch(userCouponUrl, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ user_id: userID, newCoupon: newCoupon }),
            })

            notifyAddSuccess(newCoupon.name)
            setCouponAdd('')
            await getCoupons(userID)
          }
        } else {
          notifyAddFailed(couponAdd)
          setCouponAdd('')
        }
      } else {
        notifyAddExist(couponAdd)
        setCouponAdd('')
      }
    } catch (error) {
      console.log(error)
    }
  }
  // 刪除優惠券
  const deleteCoupon = async (couponID, memberID) => {
    try {
      const url = `http://localhost:3005/api/user_coupon?user_id=${memberID}`
      const res = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: couponID }),
      })
      const data = await res.json()
      // console.log(data.data.message);

      // 執行刪除的動作以後，還要再抓一次使用者擁有甚麼valid=1的優惠券
      await getCoupons(memberID)
    } catch (error) {
      console.log(error)
    }
  }
  // 獲取優惠券
  useEffect(() => {
    if (member) {
      getCoupons(member.id)
      checkOrderCouponStatus()
    }
  }, [member])

  // 新增優惠券
  useEffect(() => {
    const fetchData = async () => {
      if (member && couponAdd) {
        await addCoupon(member.id)
        await getCoupons(member.id)
      }
    }
    fetchData()
  }, [couponAdd, member])

  // 提醒的東西~
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
  // 依照status篩選過後的優惠券
  const filteredCoupons = userCoupons.filter((coupon) => {
    const now = new Date()
    switch (couponFilter) {
      case '可使用':
        return coupon.status === '可使用' && new Date(coupon.deadline) > now
      case '已使用':
        return coupon.status === '已使用'
      case '已過期':
        return new Date(coupon.deadline) < now
      default:
        return true
    }
  })

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
                {filteredCoupons.map((filteredCoupon, i) => {
                  return (
                    <div className="col-12 col-lg-6 g-2" key={i}>
                      <CouponCard
                        filteredCoupon={filteredCoupon}
                        deleteCoupon={deleteCoupon}
                      />
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
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
          .add-btn {
            border-radius: 8px;
          }
        }
      `}</style>
    </>
  )
}
