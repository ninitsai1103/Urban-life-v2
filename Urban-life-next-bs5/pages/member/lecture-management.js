import React, { useState } from 'react'
import TeacherAsideAccount from '@/components/member/teacher-aside-account'
import { Nav, Tab } from 'react-bootstrap'
import Page from '@/components/product/pagination'
import { IoAdd } from 'react-icons/io5'
import { FaCaretDown } from 'react-icons/fa'
import LectureContentTbody from '@/components/member/lecture-content'
import LectureAddModal from '@/components/member/lecture-add-modal'
import LectureWishContent from '@/components/member/lecture-wish-content'
import useTeacherLectures from '@/hooks/use- teacherlectures'
import LectureContentPhone from '@/components/member/lecture-content-phone'

export default function LectureManagement() {
  // const [LecturesList, setLecturesList] = useState([])
  const { lectures } = useTeacherLectures()

  // 浩雲的程式碼
  const [activeIndex, setActiveIndex] = useState('我的課程')

  const lectureItemClick = (index) => {
    setActiveIndex(index)
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
                  {/* 我的課程排序 */}
                  <div className="dropdown">
                    <button
                      className="btn dropdown-toggle fs-6 d-flex justify-content-center align-items-center"
                      type="button"
                      id="lectureDropdown1"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      排序
                    </button>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="lectureDropdown1"
                    >
                      <li>
                        <a className="dropdown-item" href="#">
                          上課時間由新到舊
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          上課時間由舊到新
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          更新時間由新到舊
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          更新時間由舊到新
                        </a>
                      </li>
                    </ul>
                  </div>

                  {/* 我的課程頁面 */}
                  <div className="lecture_window_table">
                    <table className="table">
                      <thead className="text-center">
                        <tr>
                          <th scope="col">課程名稱</th>
                          <th scope="col">上課日期</th>
                          <th scope="col" className="nodisplay_992px">
                            報名截止時間
                          </th>
                          <th scope="col">上課人數</th>
                          <th scope="col">價錢</th>
                          <th></th>
                        </tr>
                      </thead>
                      {lectures.map((lecture) => (
                        <LectureContentTbody
                          key={lecture.id}
                          lecture={lecture}
                        />
                      ))}
                    </table>
                  </div>

                  {/* 手機板課程頁面 */}
                  <div className="lecture_body_phone d-none">
                    {lectures.map((lecture) => (
                      <LectureContentPhone key={lecture.id} lecture={lecture} />
                    ))}
                  </div>
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

         {
          /* lecture content 的css */
        }
        .dropdown {
          margin-bottom: 20px;
          button {
            margin-left: auto;
            background-color: #ffffff;
            padding: 5px 50px;
          }
        }
        @media (max-width: 992px){
          .nodisplay_992px {
            display: none;
          }
        }
        @media (max-width: 768px) {
          .dropdown {
            button {
              border: 1px solid #ccc;
              padding: 5px 0px;
              width: 50%;
            }
          }
          
          .lecture_window_table {
            display: none;
          }
        }
        @media (max-width: 576px) {
          .lecture_window_table table {
            th {
              font-size: 10px;
            }
            td {
              font-size: 10px;
            }
            button {
              font-size: 10px;
            }
          }
        }

         {
          /* kecture-content-phone的css */
        }

        @media (max-width: 768px) {
          .lecture_body_phone {
            display: block !important;
          }
        }
      `}</style>
    </>
  )
}
