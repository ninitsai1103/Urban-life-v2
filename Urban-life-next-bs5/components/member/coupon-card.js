import React, { useState } from 'react'

// 連至user_coupon資料庫的useHook
import { useUserCoupon } from '@/hooks/use-usercoupon'

// REACT ICON
import { MdCancel } from 'react-icons/md'
import { CiHeart } from 'react-icons/ci'
import { FaCommentDots, FaArrowRight } from 'react-icons/fa6'
import styles from './member.module.css'

export default function CouponCard({
  id,
  name,
  code,
  amount,
  started_at,
  deadline,
  status,
  min_price,
  condition,
  deleteCoupon,
}) {
  return (
    <>
      <div
        className="card"
        style={
          status === '已過期' || status === '已使用'
            ? { backgroundColor: '#A9A6A6', color: '#d6d6d6' }
            : {}
        }
      >
        <div className="card-top d-flex justify-content-between">
          <h3 className="fw-bold">{name}</h3>
          <div className="button-cancel-container gap-2">
            {/* 按鈕樣式的判斷式:可使用:綠色的
                    已使用、已過期:灰色的 */}
            {status === '可使用' ? (
              <>
                <button className="btn btn-main">立即使用</button>
                {/* 出現刪除按鈕的判斷式: 已使用不會出現
                                    已過期會出現*/}
              </>
            ) : (
              <>
                <button
                  className={
                    status === '已使用'
                      ? 'btn btn-cantusecoupon'
                      : 'btn btn-delete'
                  }
                  onClick={() => (status === '已過期' ? deleteCoupon(id) : {})}
                >
                  {status === '已使用' ? '無法使用' : '刪除優惠券'}
                </button>
              </>
            )}
          </div>
        </div>
        <div className="card-bottom">
          <p>{code}</p>
          <div className="d-flex gap-3">
            <p>{amount >= 1 ? `折抵${amount}元` : `${amount * 10}折`}</p>
          </div>

          <p>
            {started_at} - {deadline}
          </p>
          <p>低消 {min_price} 元</p>
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
        .button-cancel-container {
          display: flex;
          align-items: center;
        }
      `}</style>
    </>
  )
}
