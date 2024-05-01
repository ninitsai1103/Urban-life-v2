import React from 'react'
import { MdArrowForwardIos, MdArrowBackIos } from 'react-icons/md'


export default function Page({ totalPages, currentPage, onPageChange }) {
  //須設定props=>  totalPages:總頁數,currentPage:當前所在頁數
  //函式可到list.js參考
  
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <>
      <nav aria-label="Page navigation example">

        <ul className="pagination d-flex justify-content-center align-items-center py-3 px-2  my-5">
          <li className="page-item ">
            <a className="page-link no-bg" href="#" onClick={(e) => {
              if(currentPage>1)onPageChange(currentPage-1)
            }}>
              <MdArrowBackIos className='pageIcon' />
            </a>
          </li>
          {pages.map(page => (
            <li className="page-item" key={page}>
              <a className={`page-link rounded-circle link-bg ${currentPage === page? 'active' : '' }`} href='#' onClick={(e) => {
                onPageChange(page)
              }} >
                {page}
              </a>
            </li>
          ))}
          <li className="page-item ">
            <a className="page-link no-bg" href="#" onClick={(e) => {
              if(currentPage<totalPages)onPageChange(currentPage+1)
            }}>
              <MdArrowForwardIos className='pageIcon' />
            </a>
          </li>
        </ul>
      </nav>
      <style jsx>
        {`
          .pagination {
            display: grid;
            grid-gap: 12px;
          }
          .page-link {
            border-radius: 50%;       
            width: 34px;              
            height: 34px;             
            text-align: center;       
            line-height: 40px;        
            padding: 0;               
            margin: 0 5px;            
            display: flex;            
            justify-content: center;  
            align-items: center;      
            font-family: Roboto;
            font-size:14px;
            font-weight: 700;
            border: none;
            color: #6b6b6b;
            &:hover {
              color: black;
            }
            &:focus {
              color: black;
              outline: none;
              box-shadow: none;
            }
          }
          .page-item:hover {
            background-color: transparent;
          }

          .link-bg {
            //設定頁碼hover樣式
            &:active,
            &:focus {
              background-color:#f3b454;
              color: black;
            }
          }
          .active {
            background-color:#f3b454;
            color: black;
          }

          .no-bg,
          .no-bg:hover,
          .no-bg:focus {
            //設定上下頁樣式
            background-color: transparent;
          }
        
          @media (max-width: 500px) {
            .pagination {
            display: grid;
            grid-gap: 6px;
          }
            
            .page-link {
              margin:0 2px;
              font-size:10px;
              width: 25px;              
            height: 25px;  
            }

        
          }
        `}
      </style>
    </>
  )
}
