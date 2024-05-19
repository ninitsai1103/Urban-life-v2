import React, { useState } from 'react'
import { CiSearch } from 'react-icons/ci'

export default function Search({ handleSearch }) {
  const [keyword, setKeyword] = useState('');

  const handleChange = (event) => {
    setKeyword(event.target.value);
  };

  const handleClick = () => {
    handleSearch(keyword);
  };

  const handleKeyDown = (event) => {
    // 如果按下的是 Enter 鍵，並且關鍵字不為空，則執行搜索
    if (event.key === 'Enter' && keyword.trim() !== '') {
      handleSearch(keyword);
    }
  };

  return (
    <>
      <div className="search col-12 col-lg-5 ">
        <div className="input-group ">
          <input
            type="text"
            className="form-control"
            aria-label="Text input with button"
            placeholder="請輸入關鍵字"
            value={keyword}
            onChange={handleChange}
            onKeyDown={handleKeyDown} // 新增 onKeyDown 事件監聽器
          />
          <button className="btn p-1 " type="button" onClick={handleClick}>
            <CiSearch style={{ fontSize: '30px' }} />
          </button>
          <br />
        </div>
      </div>
      <style jsx>
        {`
          .search-btn-size {
            width: 28px;
            height: 28px;
          }
        `}
      </style>
    </>
  )
}
