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
import { useMemberInfo } from '@/hooks/use-member-info'

export default function LectureManagement() {
  // const [LecturesList, setLecturesList] = useState([])
  const { lectures } = useTeacherLectures()
  const { TeacherWish } = useTeacherWish()

  // member的hooks
  const { member } = useMemberInfo()

  // 判斷user是誰
  const [identityId, setUserIdentityId] = useState()
  useEffect(() => {
    const { identity_id, name, id} = JSON.parse(
      localStorage.getItem('member-info')
    )
    setUserIdentityId(id)
    console.log(name)
    console.log(identity_id)
  }, [])

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

  useEffect(() => {
    if (!identityId) return; // 等待 identityId 設置後再執行

    // 過濾符合條件的課程
    const filterWindowLectures = lectures.filter(lecture => lecture.teacher_id === identityId);

    // 更新分頁資訊
    const newWindowLecturesTotalPages = Math.ceil(filterWindowLectures.length / WindowLecturesPerpages);
    setWindowLecturesTotalPages(newWindowLecturesTotalPages);

    // 根據當前頁數更新展示的課程列表
    const WindowLecturesStartIndex = (WindowLecturesCurrentPage - 1) * WindowLecturesPerpages;
    const WindowLecturesEndIndex = Math.min(WindowLecturesStartIndex + WindowLecturesPerpages, filterWindowLectures.length);
    setWindowLecturesList(filterWindowLectures.slice(WindowLecturesStartIndex, WindowLecturesEndIndex));
  }, [WindowLecturesCurrentPage, lectures, identityId])

  const handleWindowLecturesPageChange = (WindowLecturesPage) => {
    setWindowLecturesCurrentPage(WindowLecturesPage)
  }

  // 手機板lecture分頁
  const [PhoneLecturesList, setPhoneLecturesList] = useState([])

  const [PhoneLecturesCurrentPage, setPhoneLecturesCurrentPage] = useState(1)
  const [PhoneLecturesTotalPages, setPhoneLecturesTotalPages] = useState(1)
  const PhoneLecturesPerpages = 6

  useEffect(() => {
    if (!identityId) return; // 等待 identityId 設置後再執行

    // 過濾符合條件的課程
    const filterPhoneLectures = lectures.filter(lecture => lecture.teacher_id === identityId);

    // 更新分頁資訊
    const newPhoneLecturesTotalPages = Math.ceil(filterPhoneLectures.length / PhoneLecturesPerpages);
    setPhoneLecturesTotalPages(newPhoneLecturesTotalPages);

    // 根據當前頁數更新展示的課程列表
    const PhoneLecturesStartIndex = (PhoneLecturesCurrentPage - 1) * PhoneLecturesPerpages;
    const PhoneLecturesEndIndex = Math.min(PhoneLecturesStartIndex + PhoneLecturesPerpages, filterPhoneLectures.length);
    setPhoneLecturesList(filterPhoneLectures.slice(PhoneLecturesStartIndex, PhoneLecturesEndIndex));

  }, [PhoneLecturesCurrentPage, lectures, identityId])
  const handlePhoneLecturesPageChange = (PhoneLecturesPage) => {
    setPhoneLecturesCurrentPage(PhoneLecturesPage)
  }



  // 桌機板wish分頁
  const [WindowWishList, setWindowWishList] = useState([])

  const [WindowWishCurrentPage, setWindowWishCurrentPage] = useState(1)
  const [WindowWishTotalPages, setWindowWishTotalPages] = useState(1)
  const WindowWishPerpages = 10

  useEffect(() => {
    if (!identityId) return; // 等待 identityId 設置後再執行

    // 過濾符合條件的許願清單
    const filterWindowWish = TeacherWish.filter(Wish => Wish.teacher_id === identityId);

    // 更新分頁資訊
    const newWindowWishTotalPages = Math.ceil(filterWindowWish.length / WindowWishPerpages);
    setWindowWishTotalPages(newWindowWishTotalPages);

    // 根據當前頁數更新展示的許願清單列表
    const WindowWishStartIndex = (WindowWishCurrentPage - 1) * WindowWishPerpages;
    const WindowWishEndIndex = Math.min(WindowWishStartIndex + WindowWishPerpages, filterWindowWish.length);
    setWindowWishList(filterWindowWish.slice(WindowWishStartIndex, WindowWishEndIndex));
  }, [WindowWishCurrentPage, TeacherWish, identityId])

  const handleWindowWishPageChange = (WindowWishPage) => {
    setWindowWishCurrentPage(WindowWishPage)
  }

  // 手機板wish分頁
  const [PhoneWishList, setPhoneWishList] = useState([])

  const [PhoneWishCurrentPage, setPhoneWishCurrentPage] = useState(1)
  const [PhoneWishTotalPages, setPhoneWishTotalPages] = useState(1)
  const PhoneWishPerpages = 6

  useEffect(() => {
    if (!identityId) return; // 等待 identityId 設置後再執行

    // 過濾符合條件的許願清單
    const filterPhoneWish = TeacherWish.filter(Wish => Wish.teacher_id === identityId);

    // 更新分頁資訊
    const newPhoneWishTotalPages = Math.ceil(filterPhoneWish.length / PhoneWishPerpages);
    setPhoneWishTotalPages(newPhoneWishTotalPages);

    // 根據當前頁數更新展示的許願清單列表
    const PhoneWishStartIndex = (PhoneWishCurrentPage - 1) * PhoneWishPerpages;
    const PhoneWishEndIndex = Math.min(PhoneWishStartIndex + PhoneWishPerpages, filterPhoneWish.length);
    setPhoneWishList(filterPhoneWish.slice(PhoneWishStartIndex, PhoneWishEndIndex));

    // let filterPhoneWish = TeacherWish
    // const newPhoneWishTotalPages = Math.ceil(
    //   filterPhoneWish.length / PhoneWishPerpages
    // )
    // setPhoneWishTotalPages(newPhoneWishTotalPages)
    // const PhoneWishStartIndex = (PhoneWishCurrentPage - 1) * PhoneWishPerpages
    // const PhoneWishEndIndex = Math.min(
    //   PhoneWishStartIndex + PhoneWishPerpages,
    //   filterPhoneWish.length
    // )
    // setPhoneWishList(
    //   filterPhoneWish.slice(PhoneWishStartIndex, PhoneWishEndIndex)
    // )
  }, [PhoneWishCurrentPage, TeacherWish, identityId])

  const handlePhoneWishPageChange = (PhoneWishPage) => {
    setPhoneWishCurrentPage(PhoneWishPage)
  }

  // lecture排序
  const [LectureSortOption, setLectureSortOption] = useState('LectureNewest') // 初始排序方式：根據課程時間由新到舊
  const handleLectureSortChange = (option) => {
    setLectureSortOption(option)
  }

  // lecture桌機板排序
  useEffect(() => {
    let filteredLectures = lectures.filter(lecture => lecture.teacher_id === identityId);

    // 根據排序選項重新排序
    switch (LectureSortOption) {
      case 'LectureNewest':
        filteredLectures.sort(
          (a, b) => new Date(b.lecture_date) - new Date(a.lecture_date)
        )
        break
      case 'LectureOldest':
        filteredLectures.sort(
          (a, b) => new Date(a.lecture_date) - new Date(b.lecture_date)
        )
        break
      case 'LectureUpdatedNewest':
        filteredLectures.sort(
          (a, b) => new Date(b.change_time) - new Date(a.change_time)
        )
        break
      case 'LectureUpdatedOldest':
        filteredLectures.sort(
          (a, b) => new Date(a.change_time) - new Date(b.change_time)
        )
        break
      default:
        break
    }

    // 更新課程列表
    const WindowLecturesStartIndex =
      (WindowLecturesCurrentPage - 1) * WindowLecturesPerpages
    const WindowLecturesEndIndex = Math.min(
      WindowLecturesStartIndex + WindowLecturesPerpages,
      filteredLectures.length
    )
    setWindowLecturesList(
      filteredLectures.slice(WindowLecturesStartIndex, WindowLecturesEndIndex)
    )

    // 更新總頁數
    const WindowLecturesTotalPages = Math.ceil(
      filteredLectures.length / WindowLecturesPerpages
    )
    setWindowLecturesTotalPages(WindowLecturesTotalPages)
  }, [WindowLecturesCurrentPage, lectures, LectureSortOption])

  // lecture手機板排序
  useEffect(() => {
    let filteredLectures = lectures.filter(lecture => lecture.teacher_id === identityId);

    // 根據排序選項重新排序
    switch (LectureSortOption) {
      case 'LectureNewest':
        filteredLectures.sort(
          (a, b) => new Date(b.lecture_date) - new Date(a.lecture_date)
        )
        break
      case 'LectureOldest':
        filteredLectures.sort(
          (a, b) => new Date(a.lecture_date) - new Date(b.lecture_date)
        )
        break
      case 'LectureUpdatedNewest':
        filteredLectures.sort(
          (a, b) => new Date(b.change_time) - new Date(a.change_time)
        )
        break
      case 'LectureUpdatedOldest':
        filteredLectures.sort(
          (a, b) => new Date(a.change_time) - new Date(b.change_time)
        )
        break
      default:
        break
    }

    // 更新課程列表
    const PhoneLecturesStartIndex =
      (PhoneLecturesCurrentPage - 1) * PhoneLecturesPerpages
    const PhoneLecturesEndIndex = Math.min(
      PhoneLecturesStartIndex + PhoneLecturesPerpages,
      filteredLectures.length
    )
    setPhoneLecturesList(
      filteredLectures.slice(PhoneLecturesStartIndex, PhoneLecturesEndIndex)
    )

    // 更新總頁數
    const PhoneLecturesTotalPages = Math.ceil(
      filteredLectures.length / PhoneLecturesPerpages
    )
    setPhoneLecturesTotalPages(PhoneLecturesTotalPages)
  }, [PhoneLecturesCurrentPage, lectures, LectureSortOption])

  // wish排序
  const [WishSortOption, setWishSortOption] = useState('WishNewest') // 初始排序方式：根據課程時間由新到舊
  const handleWishSortChange = (option) => {
    setWishSortOption(option)
  }

  // wish桌機板排序
  useEffect(() => {
    let filteredWish = TeacherWish.filter(TeacherWish => TeacherWish.teacher_id === identityId);

    // 根據排序選項重新排序
    switch (WishSortOption) {
      case 'WishNewest':
        filteredWish.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        )
        break
      case 'WishOldest':
        filteredWish.sort(
          (a, b) => new Date(a.created_at) - new Date(b.created_at)
        )
        break
      default:
        break
    }

    // 更新課程列表
    const WindowWishStartIndex =
      (WindowWishCurrentPage - 1) * WindowWishPerpages
    const WindowWishEndIndex = Math.min(
      WindowWishStartIndex + WindowWishPerpages,
      filteredWish.length
    )
    setWindowWishList(
      filteredWish.slice(WindowWishStartIndex, WindowWishEndIndex)
    )

    // 更新總頁數
    const WindowWishTotalPages = Math.ceil(
      filteredWish.length / WindowWishPerpages
    )
    setWindowWishTotalPages(WindowWishTotalPages)
  }, [WindowWishCurrentPage, TeacherWish, WishSortOption])

  // wish手機板排序
  useEffect(() => {
    let filteredWish = TeacherWish.filter(TeacherWish => TeacherWish.teacher_id === identityId);

    // 根據排序選項重新排序
    switch (WishSortOption) {
      case 'WishNewest':
        filteredWish.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        )
        break
      case 'WishOldest':
        filteredWish.sort(
          (a, b) => new Date(a.created_at) - new Date(b.created_at)
        )
        break
      default:
        break
    }

    // 更新課程列表
    const PhoneWishStartIndex = (PhoneWishCurrentPage - 1) * PhoneWishPerpages
    const PhoneWishEndIndex = Math.min(
      PhoneWishStartIndex + PhoneWishPerpages,
      filteredWish.length
    )
    setPhoneWishList(filteredWish.slice(PhoneWishStartIndex, PhoneWishEndIndex))

    // 更新總頁數
    const PhoneWishTotalPages = Math.ceil(
      filteredWish.length / PhoneWishPerpages
    )
    setPhoneWishTotalPages(PhoneWishTotalPages)
  }, [PhoneWishCurrentPage, TeacherWish, WishSortOption])

  // 刪除許願池清單code
  const deleteWish = async (wishID) => {
    const url = 'http://localhost:3005/api/teacher-wish'

    // fetch抓資料
    try {
      const res = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: wishID }),
      })
      const data = await res.json()
      console.log(data)

      // 在成功刪除優惠券後執行 getCoupon
      // await getWishs()

      return <div></div>
    } catch (error) {
      console.log(error)
      return <div></div>
    }
  }

  // 刪除課程清單code
  const deleteLecture = async (lectureID) => {
    const url = 'http://localhost:3005/api/teacher-lecture'

    // fetch抓資料
    try {
      const res = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: lectureID }),
      })
      const data = await res.json()
      console.log(data)

      // 在成功刪除優惠券後執行 getCoupon
      // await getWishs()

      return <div></div>
    } catch (error) {
      console.log(error)
      return <div></div>
    }
  }

  // 更新課程清單code
  const updateLecture = async (lectureId, updatedFields) => {
    const url = 'http://localhost:3005/api/teacher-lecture' // 請求的路由

    try {
      const res = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: lectureId, // 要更新的課程 ID
          ...updatedFields, // 包含要更新的字段的物件
        }),
      })

      const data = await res.json()
      console.log(data)

      // 在成功更新課程後可以進行其他操作，例如重新加載頁面
      if (res.ok) {
        // 如果更新成功，觸發頁面重整或重新加載
        window.location.reload() // 重新加載當前頁面
      } else {
        console.log('Update failed:', data)
        // 如果更新失敗，可以進行錯誤處理或其他操作
      }

      return data // 可根據需要返回特定的數據
    } catch (error) {
      console.log('Error updating lecture:', error)
      throw error // 可以根據需要處理錯誤或返回其他數據
    }
  }

  // 新增課程
  const addLecture = async (addFields) => {
    const url = 'http://localhost:3005/api/teacher-lecture' // 請求的路由

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // id: lectureId, // 要更新的課程 ID
          ...addFields, // 包含要更新的字段的物件
        }),
      })

      const data = await res.json()
      console.log(data)

      // 在成功更新課程後可以進行其他操作，例如重新加載頁面
      if (res.ok) {
        // 如果更新成功，觸發頁面重整或重新加載
        window.location.reload() // 重新加載當前頁面
      } else {
        console.log('Add failed:', data)
        // 如果更新失敗，可以進行錯誤處理或其他操作
      }

      return data // 可根據需要返回特定的數據
    } catch (error) {
      console.log('Error adding lecture:', error)
      throw error // 可以根據需要處理錯誤或返回其他數據
    }
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
                        <a
                          className="dropdown-item"
                          href="#"
                          onClick={() =>
                            handleLectureSortChange('LectureNewest')
                          }
                        >
                          上課時間由新到舊
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item"
                          href="#"
                          onClick={() =>
                            handleLectureSortChange('LectureOldest')
                          }
                        >
                          上課時間由舊到新
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item"
                          href="#"
                          onClick={() =>
                            handleLectureSortChange('LectureUpdatedNewest')
                          }
                        >
                          更新時間由新到舊
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item"
                          href="#"
                          onClick={() =>
                            handleLectureSortChange('LectureUpdatedOldest')
                          }
                        >
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
                            identityId={identityId}
                            deleteLecture={deleteLecture}
                            updateLecture={updateLecture}
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
                          identityId={identityId}
                          deleteLecture={deleteLecture}
                          updateLecture={updateLecture}
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
                        <a
                          className="dropdown-item"
                          href="#"
                          onClick={() => handleWishSortChange('WishNewest')}
                        >
                          建立時間由新到舊
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item"
                          href="#"
                          onClick={() => handleWishSortChange('WishOldest')}
                        >
                          建立時間由舊到新
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
                            identityId={identityId}
                            deleteWish={deleteWish}
                          />
                        ))}
                      </table>
                    </div>
                    <Page
                      totalPages={WindowWishTotalPages}
                      currentPage={WindowWishCurrentPage}
                      perpages={WindowWishPerpages}
                      onPageChange={handleWindowWishPageChange}
                    />
                  </div>

                  {/* 手機板許願池頁面 */}
                  <div className="lectureWish_body_phone d-none">
                    <div>
                      {PhoneWishList.map((TeacherWish) => (
                        <LectureWishContentPhone
                          key={TeacherWish.id}
                          TeacherWish={TeacherWish}
                          identityId={identityId}
                          deleteWish={deleteWish}
                        />
                      ))}
                    </div>
                    <Page
                      totalPages={PhoneWishTotalPages}
                      currentPage={PhoneWishCurrentPage}
                      perpages={PhoneWishPerpages}
                      onPageChange={handlePhoneWishPageChange}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 新增課程Modal導入 */}
      <LectureAddModal addLecture={addLecture} identityId={identityId} />

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
