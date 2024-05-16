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
  const { member } = useMemberInfo()
  const [userCoupons, setUserCoupons] = useState([])
  const [couponAdd, setCouponAdd] = useState('')
  const [couponFilter, setCouponFilter] = useState('可使用')

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

  const checkOrderCouponStatus = async () => {
    try {
      const url = `http://localhost:3005/api/order`
      const res = await fetch(url)
      const data = await res.json()
      const order = data.data.order
      
      for(let i = 0; i < order.length; i++) {
      if (order[i].coupon_id) {
        const couponUrl = `http://localhost:3005/api/user_coupon?coupon_id=${order[i].coupon_id}`
        const couponRes = await fetch(couponUrl, { method: 'PUT' })
        const couponData = await couponRes.json()
        console.log(couponData);
      }
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    checkOrderCouponStatus()
  }, [])

  useEffect(() => {
    if (member) {
      getCoupons(member.id)
    }
  }, [member])

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

  const checkCoupon = async (couponCode, id) => {
    try {
      const url = `http://localhost:3005/api/user_coupon?user_id=${id}`
      const res = await fetch(url)
      const data = await res.json()
      const userCoupons = data.data.user_coupon
      const userCouponsCode = userCoupons.map((userCoupon) => userCoupon.code)
      return userCouponsCode.includes(couponCode)
    } catch (error) {
      console.log(error)
    }
  }

  const addCoupon = async (id) => {
    try {
      const url = `http://localhost:3005/api/coupons`
      const res = await fetch(url)
      const data = await res.json()
      const coupons = data.data.coupons
      const couponsCode = coupons.map((coupon) => coupon.code)
      let newCoupon = null

      if (couponsCode.includes(couponAdd)) {
        newCoupon = coupons.find((coupon) => coupon.code === couponAdd)

        if (!(await checkCoupon(newCoupon.code, id))) {
          if (new Date(newCoupon.deadline) < new Date()) {
            notifyAddExpired(couponAdd)
            setCouponAdd('')
          } else {
            const userCouponUrl = `http://localhost:3005/api/user_coupon`
            const res = await fetch(userCouponUrl, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ user_id: id, newCoupon: newCoupon }),
            })

            notifyAddSuccess(newCoupon.name)
            setCouponAdd('')
            await getCoupons(id)
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

  const deleteCoupon = async (couponID, id) => {
    try {
      const url = `http://localhost:3005/api/user_coupon?user_id=${id}`
      const res = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: couponID }),
      })
      await getCoupons(id)
    } catch (error) {
      console.log(error)
    }
  }

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
                        return true
                    }
                  })
                  .map((filteredCoupon) => {
                    const {
                      id,
                      name,
                      code,
                      amount,
                      started_at,
                      created_at,
                      updated_at,
                      deadline,
                      status,
                      min_price,
                      condition,
                    } = filteredCoupon
                    return (
                      <div className="col-12 col-lg-6 g-2" key={code}>
                        <CouponCard
                          id={id}
                          name={name}
                          code={code}
                          amount={amount}
                          started_at={started_at}
                          created_at={created_at}
                          updated_at={updated_at}
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
