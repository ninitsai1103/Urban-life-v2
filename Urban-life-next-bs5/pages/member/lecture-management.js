import React, { useState, useEffect } from 'react'
import TeacherAsideAccount from '@/components/member/teacher-aside-account'
import { Nav, Tab } from 'react-bootstrap'
import Page from '@/components/product/pagination'
import { IoAdd } from 'react-icons/io5'
import { FaCaretDown } from 'react-icons/fa'
import LectureContentTbody from '@/components/member/lecture-content'
import LectureAddModal from '@/components/member/lecture-add-modal'
import LectureWishContent from '@/components/member/lecture-wish-content'
import LectureContentPhone from '@/components/member/lecture-content-phone'
import LectureWishContentPhone from '@/components/member/lecture-wish-content-phone'
import useTeacherLectures from '@/hooks/use- teacherlectures'
import useTeacherWish from '@/hooks/use-teacherwish'

export default function LectureManagement() {
  // const [LecturesList, setLecturesList] = useState([])
  const { lectures } = useTeacherLectures()
  const { TeacherWish } = useTeacherWish()

  // 浩雲的程式碼
  const [activeIndex, setActiveIndex] = useState('我的課程')

  const lectureItemClick = (index) => {
    setActiveIndex(index)
    // 以下這行是幹嘛的??
    // props.setCouponFilter(index);
  }

  // 桌機板lecture分頁
  const [WindowLecturesList, setWindowLecturesList] = useState([])

  const [WindowLecturesCurrentPage, setWindowLecturesCurrentPage] = useState(1)
  const [WindowLecturesTotalPages, setWindowLecturesTotalPages] = useState(1)
  const WindowLecturesPerpages = 10

  const handleWindowLecturesPageChange = (WindowLecturesPage) => {
    setWindowLecturesCurrentPage(WindowLecturesPage)
  }

  useEffect(() => {
    let filterWindowLectures = lectures
    const newWindowLecturesTotalPages = Math.ceil(
      filterWindowLectures.length / WindowLecturesPerpages
    )
    setWindowLecturesTotalPages(newWindowLecturesTotalPages)
    const WindowLecturesStartIndex =
      (WindowLecturesCurrentPage - 1) * WindowLecturesPerpages
    const WindowLecturesEndIndex = Math.min(
      WindowLecturesStartIndex + WindowLecturesPerpages,
      filterWindowLectures.length
    )
    setWindowLecturesList(
      filterWindowLectures.slice(
        WindowLecturesStartIndex,
        WindowLecturesEndIndex
      )
    )
  }, [WindowLecturesCurrentPage, lectures])


  // 手機板lecture分頁
  const [PhoneLecturesList, setPhoneLecturesList] = useState([])

  const [PhoneLecturesCurrentPage, setPhoneLecturesCurrentPage] = useState(1)
  const [PhoneLecturesTotalPages, setPhoneLecturesTotalPages] = useState(1)
  const PhoneLecturesPerpages = 8

  const handlePhoneLecturesPageChange = (PhoneLecturesPage) => {
    setPhoneLecturesCurrentPage(PhoneLecturesPage)
  }

  useEffect(() => {
    let filterPhoneLectures = lectures
    const newPhoneLecturesTotalPages = Math.ceil(
      filterPhoneLectures.length / PhoneLecturesPerpages
    )
    setPhoneLecturesTotalPages(newPhoneLecturesTotalPages)
    const PhoneLecturesStartIndex =
      (PhoneLecturesCurrentPage - 1) * PhoneLecturesPerpages
    const PhoneLecturesEndIndex = Math.min(
      PhoneLecturesStartIndex + PhoneLecturesPerpages,
      filterPhoneLectures.length
    )
    setPhoneLecturesList(
      filterPhoneLectures.slice(PhoneLecturesStartIndex, PhoneLecturesEndIndex)
    )
  }, [PhoneLecturesCurrentPage, lectures])


  // 桌機板wish分頁
  const [WindowWishList, setWindowWishList] = useState([])

  const [WindowWishCurrentPage, setWindowWishCurrentPage] = useState(1)
  const [WindowWishTotalPages, setWindowWishTotalPages] = useState(1)
  const WindowWishPerpages = 10

  const handleWindowWishPageChange = (WindowWishPage) => {
    setWindowWishCurrentPage(WindowWishPage)
  }

  useEffect(() => {
    let filterWindowWish = TeacherWish
    const newWindowWishTotalPages = Math.ceil(
      filterWindowWish.length / WindowWishPerpages
    )
    setWindowWishTotalPages(newWindowWishTotalPages)
    const WindowWishStartIndex =
      (WindowWishCurrentPage - 1) * WindowWishPerpages
    const WindowWishEndIndex = Math.min(
      WindowWishStartIndex + WindowWishPerpages,
      filterWindowWish.length
    )
    setWindowWishList(
      filterWindowWish.slice(
        WindowWishStartIndex,
        WindowWishEndIndex
      )
    )
  }, [WindowWishCurrentPage, TeacherWish])


  // 手機板wish分頁
  const [PhoneWishList, setPhoneWishList] = useState([])

  const [PhoneWishCurrentPage, setPhoneWishCurrentPage] = useState(1)
  const [PhoneWishTotalPages, setPhoneWishTotalPages] = useState(1)
  const PhoneWishPerpages = 8

  const handlePhoneWishPageChange = (PhoneWishPage) => {
    setPhoneWishCurrentPage(PhoneWishPage)
  }

  useEffect(() => {
    let filterPhoneWish = TeacherWish
    const newPhoneWishTotalPages = Math.ceil(
      filterPhoneWish.length / PhoneWishPerpages
    )
    setPhoneWishTotalPages(newPhoneWishTotalPages)
    const PhoneWishStartIndex =
      (PhoneWishCurrentPage - 1) * PhoneWishPerpages
    const PhoneWishEndIndex = Math.min(
      PhoneWishStartIndex + PhoneWishPerpages,
      filterPhoneWish.length
    )
    setPhoneWishList(
      filterPhoneWish.slice(PhoneWishStartIndex, PhoneWishEndIndex)
    )
  }, [PhoneWishCurrentPage, TeacherWish])



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
                    <div>
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
                        {WindowLecturesList.map((lecture) => (
                          <LectureContentTbody
                            key={lecture.id}
                            lecture={lecture}
                          />
                        ))}
                      </table>
                    </div>
                    <Page
                      totalPages={WindowLecturesTotalPages}
                      currentPage={WindowLecturesCurrentPage}
                      perpages={WindowLecturesPerpages}
                      onPageChange={handleWindowLecturesPageChange}
                    />
                  </div>

                  {/* 手機板課程頁面 */}
                  <div className="lecture_body_phone d-none">
                    <div>
                      {PhoneLecturesList.map((lecture) => (
                        <LectureContentPhone
                          key={lecture.id}
                          lecture={lecture}
                        />
                      ))}
                    </div>
                    <Page
                      totalPages={PhoneLecturesTotalPages}
                      currentPage={PhoneLecturesCurrentPage}
                      perpages={PhoneLecturesPerpages}
                      onPageChange={handlePhoneLecturesPageChange}
                    />
                  </div>
                </div>
              ) : (
                <div className="lecture_wish_content">
                  {/* 許願池排序 */}
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

                  {/* 我的許願池頁面 */}
                  <div className="lecture_wish_window_table">
                    <div>
                      <table className="table">
                        <thead className="text-center">
                          <tr>
                            {/* <th scope="col">期望課程名稱：</th> */}
                            <th scope="col">期望上課時間：</th>
                            <th scope="col" className="">
                              課程內容：
                            </th>
                            <th scope="col">期望價錢：</th>
                            <th scope="col">建立時間：</th>
                            {/* <th scope="col" className="nodisplay_768px">建立時間</th> */}
                            <th></th>
                          </tr>
                        </thead>
                        {WindowWishList.map((TeacherWish) => (
                          <LectureWishContent
                            key={TeacherWish.id}
                            TeacherWish={TeacherWish}
                          />
                        ))}
                      </table>
                    </div>
                    <Page totalPages={WindowWishTotalPages}
                      currentPage={WindowWishCurrentPage}
                      perpages={WindowWishPerpages}
                      onPageChange={handleWindowWishPageChange}/>
                  </div>

                  {/* 手機板許願池頁面 */}
                  <div className="lectureWish_body_phone d-none">
                    <div>
                      {PhoneWishList.map((TeacherWish) => (
                        <LectureWishContentPhone
                          key={TeacherWish.id}
                          TeacherWish={TeacherWish}
                        />
                      ))}
                    </div>
                    <Page totalPages={PhoneWishTotalPages}
                      currentPage={PhoneWishCurrentPage}
                      perpages={PhoneWishPerpages}
                      onPageChange={handlePhoneWishPageChange}/>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 新增課程Modal導入 */}
      <LectureAddModal />

      <style jsx>{`
        .teacher-lecture-management {
          margin: 20px;
          padding: 33px 0px;
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
        @media (max-width: 992px) {
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
          /* lecture-content-phone的css */
        }

        @media (max-width: 768px) {
          .lecture_body_phone {
            display: block !important;
          }
        }

         {
          /* lecture-wish-content的css */
        }
        @media (max-width: 768px) {
          .lecture_wish_window_table {
            display: none;
          }
        }

         {
          /* lecture-wish-content的Phone的css */
        }
        @media (max-width: 768px) {
          .lectureWish_body_phone {
            display: block !important;
          }
        }
      `}</style>
    </>
  )
}
