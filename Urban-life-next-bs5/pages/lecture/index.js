import { useEffect, useState } from 'react'
import LectureMyCard from '@/components/lecture/card'
import LectureMyCardNp from '@/components/lecture/card-np'
import LectureWish from '@/components/lecture/wish'
import Herosection from '@/components/lecture/herosection'

// CALENDER
import Calendar from '@/components/calendar/calendar'

// REACT BOOTSTRAP
import { Container } from 'react-bootstrap'
import Search from '@/components/lecture/search'
import QAList from '@/components/lecture/qacard'
import TeacherCardInfo from '@/components/lecture/teacher-infocard'
import useColloections from '@/hooks/product/useCollections'

// 引入課程hooks
import { UseLecture } from '@/hooks/use-lecture'
import { UseTeacherInfo } from '@/hooks/use-teacher'

export default function LectureHome() {
  // 把資料拿出來
  const { lectures } = UseLecture()
  const { teachers } = UseTeacherInfo()
  const { collections } = useColloections([])

  // 從calandar接到時間 (因為是最後的日期貼上去所以是接到這個月的月底時間)
  const [nowTime, setNowTime] = useState(new Date())

  const [renderLectures, setRenderLectures] = useState(lectures)
  const [selectedSortOption, setSelectedSortOption] = useState('')

  const [lectureCount, setLectureCount] = useState(0) // 增加一個狀態用於存儲課程數量

  //本月課程按鈕
  const handleThisMonth = () => {
    const today = new Date()
    const currentMonth = today.getMonth() + 1
    const lecturesThisMonth = lectures
      .filter((lecture) => {
        return lecture.lecture_date.slice(5, 7) == currentMonth
      })
      .sort((a, b) => new Date(a.lecture_date) - new Date(b.lecture_date))
    setRenderLectures(lecturesThisMonth)
    // 將排序設置為預設值，以避免影響後續的排序狀態
    setSelectedSortOption('')
    setLectureCount(lecturesThisMonth.length) // 更新課程數量
  }

  //即將開課按鈕
  const handleNextMonth = () => {
    const today = new Date()
    const currentMonth = today.getMonth() + 1
    const nextMonth = currentMonth === 12 ? 1 : currentMonth + 1 // 如果當前是12月，則下個月為1月，否則為當前月份加1
    const nextYear =
      currentMonth === 12 ? today.getFullYear() + 1 : today.getFullYear() // 如果當前是12月，則下個月的年份為當前年份加1，否則為當前年份
    const nextMonthString = nextMonth < 10 ? `0${nextMonth}` : `${nextMonth}` // 將下個月轉換為兩位數的字符串形式
    const nextMonthStart = `${nextYear}-${nextMonthString}-01` // 下個月的開始日期（假設為當月的第一天）
    const nextMonthEnd = `${nextYear}-${nextMonthString}-31` // 下個月的結束日期（假設為當月的最後一天）
    const lecturesNextMonth = lectures
      .filter((v, i) => {
        return (
          v.lecture_date >= nextMonthStart && v.lecture_date <= nextMonthEnd
        )
      })
      .sort((a, b) => new Date(a.lecture_date) - new Date(b.lecture_date)) // 過濾出下個月的講座
    setRenderLectures(lecturesNextMonth) // 更新渲染的講座列表
    setSelectedSortOption('')
    setLectureCount(lecturesNextMonth.length) // 更新課程數量
  }

  // 所有課程按鈕
  const handleAllLectures = () => {
    // 基於當前時間排序所有課程
    const sortedLectures = lectures.sort(
      (a, b) => new Date(a.lecture_date) - new Date(b.lecture_date)
    )
    // 設置為渲染的講座列表
    setRenderLectures(sortedLectures)
    setSelectedSortOption('')
    setLectureCount(sortedLectures.length) // 更新課程數量
  }

  // 從課程卡片拿出來的資料
  const [cardData, setCardData] = useState({})

  // 搜尋功能
  const handleSearch = (keyword) => {
    const filteredLectures = lectures.filter(
      (lecture) =>
        lecture.name.toLowerCase().includes(keyword.toLowerCase()) ||
        lecture.teacher_name.toLowerCase().includes(keyword.toLowerCase()) ||
        lecture.lecture_date.toLowerCase().includes(keyword.toLowerCase()) ||
        lecture.description.toLowerCase().includes(keyword.toLowerCase()) ||
        lecture.content.toLowerCase().includes(keyword.toLowerCase())
    )
    setRenderLectures(filteredLectures)
    // 更新課程數量
    setLectureCount(filteredLectures.length)
  }

  // 根據選擇的排序選項對課程進行排序
  const [selectedSortOptionDD, setSelectedSortOptionDD] = useState('')

  const handleSortDropdown = (sortBy) => {
    handleSort(sortBy) // 調用排序函式
    setSelectedSortOptionDD(sortBy) // 設置所選的排序方式為狀態
  }

  const handleSort = (sortBy) => {
    let sortedLectures = [...renderLectures]
    if (sortBy === 'priceHighToLow') {
      sortedLectures.sort((a, b) => b.price - a.price)
    } else if (sortBy === 'priceLowToHigh') {
      sortedLectures.sort((a, b) => a.price - b.price)
    } else if (sortBy === 'starHighToLow') {
      sortedLectures.sort((a, b) => b.star - a.star)
    } else if (sortBy === 'starLowToHigh') {
      sortedLectures.sort((a, b) => a.star - b.star)
    }
    setRenderLectures(sortedLectures)
    setSelectedSortOption(sortBy)
  }

  //講師陣容
  const [randomTeachers, setRandomTeachers] = useState([])

  // 生成隨機的教師卡片
  const generateRandomTeachers = () => {
    const shuffledTeachers = teachers.sort(() => Math.random() - 0.5)
    const selectedTeachers = shuffledTeachers.slice(0, 4)
    setRandomTeachers(selectedTeachers)
  }

  useEffect(() => {
    if (lectures.length > 0) {
      // 如果 lectures 不為空，則設置 renderLectures
      setRenderLectures(lectures)
      setLectureCount(lectures.length)
    }

    handleThisMonth() // 初次渲染時顯示本月課程
  }, [lectures])

  useEffect(() => {
    console.log('Teachers:', teachers) // 調試教師數據
    if (teachers.length > 0) {
      generateRandomTeachers()
    }
  }, [teachers])

  return (
    <>
      <section className="slider">
        <Container fluid className="p-0">
          <Herosection />
        </Container>
      </section>
      <div className="container">
        <section className="section1">
          <div className="search">
            <Search handleSearch={handleSearch} />
          </div>
          <div className="btngrp">
            <button className="btn btn-main-r" onClick={handleThisMonth}>
              本月課程
            </button>
            <button className="btn btn-main-r" onClick={handleAllLectures}>
              所有課程
            </button>
            <button className="btn btn-main-r" onClick={handleNextMonth}>
              即將開課
            </button>
          </div>
          <div className="bar">
            <div className="lecnum">共 {lectureCount} 門課程</div>
            <div className="dropdown">
              <button
                className="btn dropdown-toggle fs-6 sort-btn d-flex justify-content-center align-items-center sort-btn-size"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {selectedSortOption ? (
                  <>
                    {selectedSortOptionDD === 'priceHighToLow'
                      ? '價格由高到低'
                      : selectedSortOptionDD === 'priceLowToHigh'
                      ? '價格由低到高'
                      : selectedSortOptionDD === 'starHighToLow'
                      ? '評價由高到低'
                      : selectedSortOptionDD === 'starLowToHigh'
                      ? '評價由低到高'
                      : ''}
                  </>
                ) : (
                  '排序'
                )}
              </button>
              <ul
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton1"
              >
                <li>
                  <button
                    className="dropdown-item"
                    onClick={() => handleSortDropdown('priceHighToLow')}
                  >
                    價格由高到低
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item"
                    onClick={() => handleSortDropdown('priceLowToHigh')}
                  >
                    價格由低到高
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item"
                    onClick={() => handleSortDropdown('starHighToLow')}
                  >
                    評價由高到低
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item"
                    onClick={() => handleSortDropdown('starLowToHigh')}
                  >
                    評價由低到高
                  </button>
                </li>
              </ul>
            </div>
          </div>
          {renderLectures.length > 0 ? (
            <div className="cardgrp">
              {renderLectures.map((lecture) => (
                <LectureMyCard
                  key={lecture.id}
                  lecture={lecture}
                  collections={collections}
                />
              ))}
            </div>
          ) : (
            <p>No lectures available</p>
          )}
        </section>
        {/* 行事曆 */}
        <section className="section2">
          <h1 className="sectiontitle">開課日程</h1>
          <div className="calendercard">
            <div className="calender">
              <Calendar setNowTime={setNowTime} cardData={cardData} />
            </div>
            <div className="cardgrpnp">
              {lectures
                .filter((lecture) => {
                  // 取得講座報名截止日期的年份和月份
                  const deadlineYear = new Date(
                    lecture.lecture_date
                  ).getFullYear()
                  const deadlineMonth = new Date(
                    lecture.lecture_date
                  ).getMonth()

                  // 取得當前日期的年份和月份
                  const nowYear = nowTime.getFullYear()
                  const nowMonth = nowTime.getMonth()

                  // 檢查講座報名截止日期的年份和月份是否與當前日期的年份和月份相同
                  return deadlineYear === nowYear && deadlineMonth === nowMonth
                })
                .sort(
                  (a, b) => new Date(a.lecture_date) - new Date(b.lecture_date)
                )
                .map((lecture) => {
                  return (
                    <LectureMyCardNp
                      key={lecture.id}
                      lecture={lecture}
                      setCardData={setCardData}
                      collections={collections}
                    />
                  )
                })}
            </div>
          </div>
        </section>
        <section className="section3">
          <div className="notice">
            <h2 className="sectiontitle">學員注意事項</h2>
            <div className="noticeinfo">
              1.課程皆為週期性開課，使用行事曆功能，我們將於再次開課前通知您。
              <br />
              <br />
              2.課程費用均包含團體保險，敬請放心體驗豐富的課程內容。
              <br />
              <br />
              3.採果體驗課程時，各種水果的採果原則各不相同，請依照農場及果園的體驗規則，共同維護果園環境，有任何問題需要協助皆可隨時找工作人員、教師或者農場主人。
              <br />
              <br />
              4.體驗課程多於戶外進行，請務必做好保暖或防曬、防蚊措施，如遇颱風、地震等不可抗之天然災害，我們將暫停課程，取消或順延將於一周內通知，並協助您退費。
              <br />
              <br />
              5.課程限定5歲以上之孩童始可參加，並請報名之監護人妥善照顧孩童。
              <br />
              <br />
              以上說明還請您詳細參閱，未竟之處請詳閱購課之合約，如可接受再購買課程。
            </div>
          </div>

          <div className="wish">
            <LectureWish teachers={teachers} />
          </div>
        </section>
        <section className="section4">
          <h1 className="sectiontitle">常見問題</h1>
          <QAList />
        </section>
        {/* <section className="section5">
          <h1 className="sectiontitle">還在猶豫嗎？來看看好評推薦吧！</h1>
        </section> */}
        <section className="section6">
          <h1 className="sectiontitle">講師陣容</h1>
          <p className="teachertext">Our Teachers</p>
          <div style={{ maxWidth: '1296px', overflow: 'hidden' }}>
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
              <TeacherCardInfo teachers={randomTeachers} />
            </div>
            {/* 刷新按鈕 */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '30px',
              }}
            >
              <button className="btn btn-add" onClick={generateRandomTeachers}>
                發現其他講師
              </button>
            </div>
          </div>
        </section>
      </div>

      <style jsx>
        {`
          .section1 {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            align-self: stretch;
          }

          .section2 {
            display: flex;
            flex-direction: column;
            gap: 30px;
            justify-content: center;
            align-self: stretch;
            margin-top: 80px;
          }

          .section3 {
            display: flex;
            align-items: flex-start;
            gap: 15px;
            align-self: stretch;
            margin-top: 80px;
          }

          .section4 {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 30px;
            align-self: stretch;
            margin-top: 80px;
          }

          .section5 {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 30px;
            flex: 1 0 0;
            align-self: stretch;
            margin-top: 80px;
          }

          .section6 {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 30px;
            align-self: stretch;
            margin-top: 80px;
            margin-bottom: 50px;
          }

          .search {
            display: flex;
            padding: 15px 12px 10px 12px !important;
            align-items: flex-start;
            align-self: stretch;
          }

          .btngrp {
            display: flex;
            padding: 12px;
            flex-direction: row;
            align-items: center;
            gap: 14px;
            align-self: stretch;
            border-bottom-width: 1px;
            border-bottom-style: solid;
            border-bottom-color: #f;
          }

          .cardgrp {
            display: flex;
            align-items: flex-start;
            align-content: flex-start;
            gap: 10px;
            align-self: stretch;
            flex-wrap: wrap;
            padding-top: 5px;
          }

          .teachergrp {
            display: flex;
            align-items: flex-start;
            gap: 20px;
            flex: 1 0 0;
          }

          .calendercard {
            display: flex;
            align-items: center;
            gap: 15px;
            align-self: stretch;
          }

          .cardgrpnp {
            display: flex;
            width: 655px;
            align-items: flex-start;
            align-content: flex-start;
            gap: 15px;
            flex-wrap: wrap;
          }

          .bar {
            display: flex;
            padding: 10px 12px;
            justify-content: space-between;
            align-items: center;
            flex: 1 0 0;
            align-self: stretch;
          }

          .lecnum {
            color: var(--button-default, #bd9250);
            /* ZenKaku-h4 */
            font-family: 'Zen Kaku Gothic New';
            font-size: 24px;
            font-style: normal;
            font-weight: 700;
            line-height: normal;
          }

          .sectiontitle {
            text-align: center;
            color: var(--primary-5, #2f4715);

            /* ZenKaku-h3 */
            font-family: 'Zen Kaku Gothic New';
            font-size: 36px;
            font-style: normal;
            font-weight: 700;
            line-height: normal;
            margin-bottom: 0px;
          }

          .calender {
            display: flex;
            width: 631px;
            flex-direction: column;
            align-items: flex-start;
            align-self: stretch;
          }

          .notice {
            display: flex;
            width: 408px;
            height: 636.8px;
            flex-direction: column;
            align-items: center;
            gap: 20px;
          }

          .noticeinfo {
            display: flex;
            padding: 26px 17px 36px 17px;
            justify-content: center;
            align-items: flex-start;
            gap: 40px;
            flex-shrink: 0;
            align-self: stretch;
            border-radius: 8px;
            background: #fff;
          }

          .teachertext {
            color: var(--grey-700, #6b6b6b);
            /* Josefin-h4 */
            font-family: 'Josefin Sans';
            font-size: 24px;
            font-style: normal;
            font-weight: 700;
            line-height: normal;
            text-align: center;
            margin-top: 10px;
          }
        `}
      </style>
    </>
  )
}
