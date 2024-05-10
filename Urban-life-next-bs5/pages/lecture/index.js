import { useEffect, useState } from 'react'
import LectureMyCard from '@/components/lecture/card'
import LectureMyCardNp from '@/components/lecture/card-np'
import LectureWish from '@/components/lecture/wish'
import Herosection from '@/components/lecture/herosection'

// CALENDER
import Calendar from '@/components/calandar/calendar'

// REACT BOOTSTRAP
import { Container } from 'react-bootstrap'
import Search from '@/components/lecture/search'
import QAList from '@/components/lecture/qacard'
import TeacherCardInfo from '@/components/lecture/teacher-infocard'

// 引入課程hooks
import { UseLecture } from '@/hooks/use-lecture'
import { UseTeacherInfo } from '@/hooks/use-teacher'

export default function LectureHome() {
  // 把資料拿出來
  const { lectures } = UseLecture()
  const { teachers } = UseTeacherInfo()

  // 從calandar接到時間 (因為是最後的日期貼上去所以是接到這個月的月底時間)
  const [nowTime, setNowTime] = useState(new Date())
  // console.log(nowTime)

  // const [filterCondition, setFilterCondition] = useState({
  //   thisMonth: true,
  //   popular: false,
  //   upcoming: false,
  // })

  // const getFilteredLectures = () => {
  //   let filteredLectures = lectures.filter((lecture) => {
  //     const deadlineDate = new Date(lecture.deadline)
  //     const currentMonth = nowTime.getMonth()
  //     const deadlineMonth = deadlineDate.getMonth()
  //     return filterCondition.thisMonth && currentMonth === deadlineMonth
  //   })

  //   if (!filterCondition.thisMonth) {
  //     filteredLectures = lectures
  //   } else if (filterCondition.popular) {
  //     filteredLectures = lectures
  //       .sort((a, b) => b.amount - a.amount)
  //       .slice(0, 8)
  //   } else if (filterCondition.upcoming) {
  //     const nextMonth = nowTime.getMonth() + 1
  //     filteredLectures = lectures.filter((lecture) => {
  //       const deadlineDate = new Date(lecture.deadline)
  //       const deadlineMonth = deadlineDate.getMonth()
  //       return nextMonth === deadlineMonth
  //     })
  //   }

  //   return filteredLectures
  // }

  // const handleFilterButtons = (filterType) => {
  //   switch (filterType) {
  //     case '本月課程':
  //       setFilterCondition({ thisMonth: true, popular: false, upcoming: false })
  //       break
  //     case '所有課程':
  //       setFilterCondition({
  //         thisMonth: false,
  //         popular: false,
  //         upcoming: false,
  //       })
  //       break
  //     case '熱門課程':
  //       setFilterCondition({ thisMonth: true, popular: true, upcoming: false })
  //       break
  //     case '即將開課':
  //       setFilterCondition({ thisMonth: true, popular: false, upcoming: true })
  //       break
  //     default:
  //       break
  //   }
  // }

  // const filteredLectures = getFilteredLectures()
  // useEffect(() => {
  //   handleFilterButtons('本月課程')
  //   getFilteredLectures()
  // }, [])
  const [renderLectures, setRenderLectures] = useState(lectures)

  // useEffect(() => {
  //   console.log("=====================================================origin lectures", renderLectures);
  // }, [])


  //本月課程按鈕
  const handleThisMonth = () => {
    const today = new Date()
    // console.log(today.getMonth()+1);
    const currentMonth = today.getMonth() + 1;
    const lecturesThisMonth = lectures.filter((v, i) => {
      return v.lecture_date.slice(5, 7) == currentMonth
    })
    setRenderLectures(lecturesThisMonth)
  }
  //熱門課程按鈕
  const handlePopular = () => {}
  //即將開課按鈕
  const handleUpcoming = () => {}

  // 從課程卡片拿出來的資料
  const [cardData, setCardData] = useState({})

  //講師陣容

  const [randomTeachers, setRandomTeachers] = useState([])

  useEffect(() => {
    generateRandomTeachers()
  }, [])

  // 生成隨機的教師卡片
  const generateRandomTeachers = () => {
    // 將教師數組進行隨機排序
    const shuffledTeachers = teachers.sort(() => Math.random() - 0.5)
    // 只取前四個隨機卡片
    const selectedTeachers = shuffledTeachers.slice(0, 4)
    // 更新狀態以渲染隨機卡片
    setRandomTeachers(selectedTeachers)
  }

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
            <Search />
          </div>
          <div className="btngrp">
            <button
              className="btn btn-main-r"
              onClick={() => handleThisMonth()}
            >
              本月課程
            </button>
            <button
              className="btn btn-main-r"
              onClick={() => handleFilterButtons('所有課程')}
            >
              所有課程
            </button>
            <button
              className="btn btn-main-r"
              onClick={() => handlePopular()}
            >
              熱門課程
            </button>
            <button
              className="btn btn-main-r"
              onClick={() => handleUpcoming()}
            >
              即將開課
            </button>
          </div>
          <div className="bar">
            <div className="lecnum">共 8 門課程</div>
            <div className="dropdown">
              <button
                className="btn dropdown-toggle fs-6 sort-btn d-flex justify-content-center align-items-center sort-btn-size"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                排序
              </button>
              <ul
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton1"
              >
                <li>
                  <a className="dropdown-item" href="#">
                    價格由高到低
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    價格由舊到新
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    評價由高到低
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    評價由低到高
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="cardgrp">
            <LectureMyCard lectures={renderLectures} />
          </div>
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
                .map((lecture) => {
                  return (
                    <LectureMyCardNp
                      key={lecture.id}
                      lecture={lecture}
                      setCardData={setCardData}
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
            <LectureWish />
          </div>
        </section>
        <section className="section4">
          <h1 className="sectiontitle">常見問題</h1>
          <QAList />
        </section>
        <section className="section5">
          <h1 className="sectiontitle">還在猶豫嗎？來看看好評推薦吧！</h1>
        </section>
        <section className="section6">
          <h1 className="sectiontitle">講師陣容</h1>
          <p className="teachertext">Teacher</p>
          <div style={{ maxWidth: '1290px', overflow: 'hidden' }}>
            <div className="teachergrp">
              {randomTeachers.map((teacher) => (
                <TeacherCardInfo key={teacher.id} teacher={teacher} />
              ))}
            </div>
            {/* 刷新按鈕 */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '30px',
              }}
            >
              <button className='btn btn-add' onClick={generateRandomTeachers}>隨機發現還有哪些老師</button>
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
            padding: 0px 20px;
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
