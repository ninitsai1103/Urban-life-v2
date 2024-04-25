import React, { useState } from 'react';

export default function TopNavItem(props) {
  const [activeIndex, setActiveIndex] = useState("可使用");

  const handleItemClick = (index) => {
    setActiveIndex(index);
    props.setCouponFilter(activeIndex)
  };

  return (
    <>
      <ul className="nav nav-underline mb-3">
        <li className={`nav-item col ${activeIndex === "可使用" ? 'active' : ''}`}>
          <button className="nav-link" onClick={() => handleItemClick("可使用")}>可使用</button>
        </li>
        <li className={`nav-item col ${activeIndex === "已使用" ? 'active' : ''}`}>
          <button className="nav-link" onClick={() => handleItemClick("已使用")}>已使用</button>
        </li>
        <li className={`nav-item col ${activeIndex === "已過期" ? 'active' : ''}`}>
          <button className="nav-link" onClick={() => handleItemClick("已過期")}>已過期</button>
        </li>
      </ul>

      <style jsx>{`
        .nav-item {
          text-align: center;
        }
        .nav-link {
          width: 100%;
        }
        .nav-item.active .nav-link {
          color: #bd9250;
        }
      `}</style>
    </>
  );
}