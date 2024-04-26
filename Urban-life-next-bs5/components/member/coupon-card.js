import React, { useState } from 'react'
import { CiHeart } from 'react-icons/ci'
import { FaCommentDots, FaArrowRight } from 'react-icons/fa6'
import { RxCrossCircled } from 'react-icons/rx'

import data from '@/data/coupon.json'
export default function CouponCard({
  name,
  code,
  amount,
  started_at,
  deadline,
  status,
  min_price,
  condition,
}) {
  const [coupon, setCoupon] = useState()
  return (
    <>
      <div className="card">
        <div className="card-top d-flex justify-content-between">
          <h3 className="fw-bold">{name}</h3>
          <div>
            <button className="btn btn-main">立即使用</button>
          </div>
        </div>
        <div className="card-bottom">
          <p>{code}</p>
          <div className="d-flex gap-3">
            <p>{condition}</p>
            <p>{amount >= 1 ? amount : amount * 10 + '折'}</p>
          </div>

          <p>
            {started_at} - {deadline}
          </p>
          <p>低消 {min_price}</p>
        </div>
      </div>

      <style jsx>{`
        .card {
          padding: 20px 30px;
          border-radius: 8px;
        }
        .card-bottom {
          p {
            margin: 0;
          }
        }
      `}</style>
    </>
  )
}
