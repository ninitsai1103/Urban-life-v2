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
