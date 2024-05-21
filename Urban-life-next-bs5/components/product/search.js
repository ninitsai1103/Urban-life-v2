import{useState} from 'react'
import { CiSearch } from 'react-icons/ci'

export default function Search({ searchedProducts, setInputText}) {

  return (
    <>
      <div className="search col-12 col-lg-5 ">
        <div className="input-group ">
          <input
            type="text"
            className="form-control"
            aria-label="Text input with button"
            onChange={e=>{
              setInputText(e.target.value) 
            }}
          />
          <button className="btn p-1 " type="button" >
            <CiSearch style={{fontSize:'30px'}}
            onClick={searchedProducts} 
            />
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
