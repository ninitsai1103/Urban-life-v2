import React, { useState } from 'react'
import TeacherAsideAccount from '@/components/member/teacher-aside-account'
import { Nav, Tab } from 'react-bootstrap'
import Page from '@/components/product/pagination'
import { IoAdd } from 'react-icons/io5'
import { FaCaretDown } from 'react-icons/fa'
import LectureContent from '@/components/member/lecture-content'
import LectureAddModal from '@/components/member/lecture-add-modal'
import LectureWishContent from '@/components/member/lecture-wish-content'

export default function LectureManagement() {
  // 浩雲的程式碼
  const [activeIndex, setActiveIndex] = useState('我的課程')

  const lectureItemClick = (index) => {
    setActiveIndex(index);
    // 以下這行是幹嘛的??
    // props.setCouponFilter(index);
  }

  return (
    <>
      <div className="container">
        <div className="row teacher-lecture-management">
          <div className="col-lg-3 col-md-12 teacher-aside">
            <TeacherAsideAccount />
          </div>
          <div className="col-lg-9 col-md-12 teacher-lecture">
            <div
              className="d-flex align-items-center justify-content-between teacher-margin w-100
            "
            >
              <div className="teacher-text-title">我的課程</div>
              <div className="add-lecture-btn">
                <button
                  type="button"
                  className="btn btn-main"
                  data-bs-toggle="modal"
                  data-bs-target="#addModal"
                >
                  <IoAdd />
                  新增課程
                </button>
              </div>
            </div>

            {/* 原本的ul */}
            {/* <ul className="nav nav-underline ul-margin">
              <li className="nav-item col">
                <button className="nav-link active111">我的課程</button>
              </li>
              <li className="nav-item col">
                <button className="nav-link">課程許願池</button>
              </li>
            </ul> */}

            {/* 浩雲的ul */}
            <ul className="nav nav-underline ul-margin">
              <li
                className={`nav-item col ${
                  activeIndex === '我的課程' ? 'active' : ''
                }`}
              >
                <button
                  className="nav-link"
                  onClick={() => lectureItemClick('我的課程')}
                >
                  我的課程
                </button>
              </li>
              <li
                className={`nav-item col ${
                  activeIndex === '課程許願池' ? 'active' : ''
                }`}
              >
                <button
                  className="nav-link"
                  onClick={() => lectureItemClick('課程許願池')}
                >
                  課程許願池
                </button>
              </li>
            </ul>

            <div>
              {/* <div className="lecture_content d-none">
                <LectureContent />
              </div>
              <div className="lecture_wish_content ">
                <LectureWishContent />
              </div> */}

              {activeIndex === '我的課程' ? (
                <div className="lecture_content">
                  <LectureContent />
                </div>
              ) : (
                <div className="lecture_wish_content">
                  <LectureWishContent />
                </div>
              )}
            </div>

            <Page />
          </div>
        </div>
      </div>

      {/* 新增課程Modal導入 */}
      <LectureAddModal />

      <style jsx>{`
        .teacher-lecture-management {
          margin: 20px;
          padding: 33px 0px;
           {
            /* margin: 20px 0px; */
          }
           {
            /* padding: 0px; */
          }
        }
        .teacher-lecture {
          padding: 30px 20px;
          background-color: #ffffff;
          border-radius: 8px;
          border: 1px solid #ccc;
        }
        .teacher-margin {
          margin: 0px 0px 50px 0px;
        }
        .teacher-text-title {
          padding: 0px 50px;
          font-size: 36px;
          font-weight: bold;
        }
        .add-lecture-btn {
          margin-right: 50px;
        }
        .ul-margin {
          margin-top: 50px;
          margin-bottom: 20px;
        }

         {
          /* 原本的ul樣式 */
        }
         {
          /* .nav-item {
          text-align: center;
        }
        .nav-item button {
          width: 100%;
        }
        .nav-item button:hover {
          color: #bd9250;
        }
        .nav-item {
          .active111 {
            color: #bd9250 !important;
            border-bottom-color: #bd9250 !important;
          }
        } */
        }

         {
          /* 浩雲的active */
        }
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
          color: #bd9250 !important;
          border-bottom-color: #bd9250 !important;
        }

        .lecture_body_window {
          height: 100vh;
        }

        @media (max-width: 992px) {
          .teacher-aside {
            padding: 0px;
            margin-bottom: 40px;
          }
        }

        @media (max-width: 768px) {
          .teacher-text-title {
            display: none;
          }
          .teacher-lecture {
            padding: 0px;
            background-color: #ebe3db;
            border: none;
          }
          .add-lecture-btn {
            margin-left: auto;
            margin-right: 0px;
          }
        }
      `}</style>
    </>
  )
}
