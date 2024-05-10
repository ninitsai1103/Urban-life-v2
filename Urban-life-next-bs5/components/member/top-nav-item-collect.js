import React, { useEffect, useState } from 'react'

export default function TopNavItemCollect(props) {
  const [activeStatus, setActiveStatus] = useState('收藏商品')
  const handleStatusClick = (status) => {
    setActiveStatus(status)
    
  }
  useEffect(() => {
    props.setCollectFilter(activeStatus)
  },[activeStatus])

  return (
    <>
      <ul className="nav nav-underline mb-3">
        <li
          className={`nav-item col ${
            activeStatus === '收藏商品' ? 'active' : ''
          }`}
        >
          <button
            className="nav-link"
            onClick={() => handleStatusClick('收藏商品')}
          >
            收藏商品
          </button>
        </li>
        <li
          className={`nav-item col ${
            activeStatus === '收藏課程' ? 'active' : ''
          }`}
        >
          <button
            className="nav-link"
            onClick={() => handleStatusClick('收藏課程')}
          >
            收藏課程
          </button>
        </li>
        <li
          className={`nav-item col ${
            activeStatus === '收藏文章' ? 'active' : ''
          }`}
        >
          <button
            className="nav-link"
            onClick={() => handleStatusClick('收藏文章')}
          >
           收藏文章
          </button>
        </li>
      </ul>

      <style jsx>{`
        .nav-item {
          text-align: center;
        }
        .nav-link {
          width: 100%;
        }
        .nav-item button:hover {
          color: #bd9250;
        }
        .nav-item.active .nav-link {
          color: #bd9250;
          border-bottom-color: #bd9250 !important;
        }
      `}</style>
    </>
  )
}
