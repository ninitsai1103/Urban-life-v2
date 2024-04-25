import React from 'react'
import { MdArrowForwardIos, MdArrowBackIos } from 'react-icons/md'

export default function Page() {
  return (
    <>
      <nav aria-label="Page navigation example">
        <ul className="pagination d-flex justify-content-center align-items-center py-3 px-2  my-5">
          <li className="page-item ">
            <a className="page-link no-bg" href="#">
              <MdArrowBackIos />
            </a>
          </li>
          <li className="page-item">
            <a className="page-link rounded-circle set-fs12 link-bg" href="#">
              1
            </a>
          </li>
          <li className="page-item ">
            <a className="page-link rounded-circle set-fs12 link-bg" href="#">
              2
            </a>
          </li>
          <li className="page-item">
            <a className="page-link rounded-circle set-fs12 link-bg" href="#">
              3
            </a>
          </li>
          <li className="page-item ">
            <a className="page-link no-bg" href="#">
              <MdArrowForwardIos />
            </a>
          </li>
        </ul>
      </nav>
      <style jsx>
        {`
          .pagination {
            display: grid;
            grid-gap: 20px;
          }
          .page-link {
            font-family: Roboto;
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

          .no-bg,
          .no-bg:hover,
          .no-bg:focus {
            //設定上下頁樣式
            background-color: transparent;
          }
        `}
      </style>
    </>
  )
}
