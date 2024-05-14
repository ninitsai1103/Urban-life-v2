import React, { useEffect, useState } from 'react'

export default function TopNavItem(props) {
  const [activeStatus, setActiveStatus] = useState('可使用')
  const handleStatusClick = (status) => {
    setActiveStatus(status)
    
  }
  useEffect(() => {
    props.setCouponFilter(activeStatus)
  },[activeStatus])

  return (
    <>
      <ul className="nav nav-underline mb-3">
        <li
          className={`nav-item col ${
            activeStatus === '可使用' ? 'active' : ''
          }`}
        >
          <button
            className="nav-link"
            onClick={() => handleStatusClick('可使用')}
          >
            可使用
          </button>
        </li>
        <li
          className={`nav-item col ${
            activeStatus === '已使用' ? 'active' : ''
          }`}
        >
          <button
            className="nav-link"
            onClick={() => handleStatusClick('已使用')}
          >
            已使用
          </button>
        </li>
        <li
          className={`nav-item col ${
            activeStatus === '已過期' ? 'active' : ''
          }`}
        >
          <button
            className="nav-link"
            onClick={() => handleStatusClick('已過期')}
          >
            已過期
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
