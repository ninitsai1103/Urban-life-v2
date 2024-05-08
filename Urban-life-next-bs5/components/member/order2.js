import { useEffect, useState } from 'react'

import styles from './star.module.css'

import Image from 'next/image'
import useProducts from '@/hooks/product/useProducts'
import { ClientPageRoot } from 'next/dist/client/components/client-page'

export default function Order2({ order }) {
  const {
    id,
    order_id,
    user_id,
    name,
    order_code,
    date,
    items,
    phone,
    address,
    email,
    total,
    coupon_id,
    pay,
  } = order

  // 为每个商品和课程创建独立的评分和评论状态
  const [productRatings, setProductRatings] = useState({})
  const [lectureRatings, setLectureRatings] = useState({})
  const [productComments, setProductComments] = useState({})
  const [lectureComments, setLectureComments] = useState({})

  const handleProductRatingChange = (itemId, rating) => {
    setProductRatings({ ...productRatings, [itemId]: rating })
  }

  const handleLectureRatingChange = (itemId, rating) => {
    setLectureRatings({ ...lectureRatings, [itemId]: rating })
  }

  const handleProductCommentChange = (itemId, comment) => {
    setProductComments({ ...productComments, [itemId]: comment })
  }

  const handleLectureCommentChange = (itemId, comment) => {
    setLectureComments({ ...lectureComments, [itemId]: comment })
  }

  return (
    <>
      {/* 渲染订单信息 */}
      {/* ... */}

      {/* 渲染商品列表 */}
      {items.map((item) => {
        if (item.pdlt_id === 1) {
          return (
            <div key={item.id}>
              <div>{item.name}</div>
              {/* 商品评分和评论组件 */}
              <ProductRating
                itemId={item.id}
                rating={productRatings[item.id] || 0}
                comment={productComments[item.id] || ''}
                onRatingChange={handleProductRatingChange}
                onCommentChange={handleProductCommentChange}
              />
            </div>
          )
        }
      })}

      {/* 渲染课程列表 */}
      {items.map((item) => {
        if (item.pdlt_id === 2) {
          return (
            <div key={item.id}>
              <div>{item.name}</div>
              {/* 课程评分和评论组件 */}
              <LectureRating
                itemId={item.id}
                rating={lectureRatings[item.id] || 0}
                comment={lectureComments[item.id] || ''}
                onRatingChange={handleLectureRatingChange}
                onCommentChange={handleLectureCommentChange}
              />
            </div>
          )
        }
      })}
    </>
  )
}

// 商品评分和评论组件
function ProductRating({ itemId, rating, comment, onRatingChange, onCommentChange }) {
  return (
    <div>
      <div>Rating: {rating}</div>
      <input
        type="range"
        min="0"
        max="5"
        step="1"
        value={rating}
        onChange={(e) => onRatingChange(itemId, parseInt(e.target.value))}
      />
      <textarea
        value={comment}
        onChange={(e) => onCommentChange(itemId, e.target.value)}
      />
    </div>
  )
}

// 课程评分和评论组件
function LectureRating({ itemId, rating, comment, onRatingChange, onCommentChange }) {
  return (
    <div>
      <div>Rating: {rating}</div>
      <input
        type="range"
        min="0"
        max="5"
        step="1"
        value={rating}
        onChange={(e) => onRatingChange(itemId, parseInt(e.target.value))}
      />
      <textarea
        value={comment}
        onChange={(e) => onCommentChange(itemId, e.target.value)}
      />
    </div>
  )
}