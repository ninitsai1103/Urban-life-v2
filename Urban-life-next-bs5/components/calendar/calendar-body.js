import React, { useEffect, useState } from 'react'
import moment from 'moment'
import getWeeksInMonth from './utils'

export default function CalendarBody({ calendarMain, cardData }) {
  let weekContentList = getWeeksInMonth(calendarMain)
  const WeekDayNameList = ['Sun', 'Mon', 'Tue', 'Wen', 'Thr', 'Fri', 'Sat']
  const WeekDayNameListChinese = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
  let result = []

  // 點擊日期後的會出現當天日期的資訊
  const handleDateClick = (day) => {
    const clickedDate = moment(calendarMain).date(day)
    console.log('Clicked Date:', clickedDate.format('YYYY-MM-DD'))
    // console.log(typeof day)
  }

  // 檢查傳過來的訊息
  // console.log(cardData);
  // 接收到cardData存在後就加進行事曆裡面
  // console.log(typeof moment(cardData.lecture_date).format('DD'))

  // 接收到cardData存在後就加進課程的一個資料裡面
  const [myCalendarLectures, setMyCalendarLectures] = useState([])
  const handleAddtoCalandar = () => {
    if (cardData.lecturename !== undefined) {
      setMyCalendarLectures((prevLectures) => {
        // 檢查是否重複
        const isExist = prevLectures.some(
          (prevLecture) => prevLecture.lecturename === cardData.lecturename
        )

        // 不會新增相同的東西
        // if (!isExist) {
        //   return [...prevLectures, cardData]
        // }
        // return prevLectures

        // 做到新增刪除的功能
        if (isExist) {
          // 存在的話，就把他filter掉
          // filter跟他日期不一樣的資料
          return prevLectures.filter(
            (prevLecture) => prevLecture.lecturename !== cardData.lecturename
          )
        } else {
          // 不存在的話加入
          return [...prevLectures, cardData]
        }
      })
    }
  }
  useEffect(() => {
    handleAddtoCalandar()
  }, [cardData])

  return (
    <>
      <div className="body mt-4">
        {/* MONDAY,TUESDAY, .....SUNDAY的呈現 */}
        <div className="calendar">
          {WeekDayNameListChinese.map((day, index) => {
            return (
              <>
                <div className={`day-block day-${index}`}>{day}</div>
              </>
            )
          })}
        </div>

        {/* 日期加進去 */}
        {weekContentList.map((week) => {
          let aWeek = []
          week.map((day) => aWeek.push(day === 0 ? '' : day))
          result.push({ aWeek })
        })}
        {result.map((item, idx) => (
          <div key={idx} className="calendar">
            {item.aWeek.map((day, dIdx) => (
              <div
                className="date-block"
                key={dIdx}
                onClick={day ? () => handleDateClick(day) : undefined}
              >
                <div>{day}</div>
                {/* 在這裡渲染 cardData */}
                <div>
                  {/* 先filter月份的東西在渲染 */}
                  {myCalendarLectures
                    .filter((myCalendarLecture) =>
                      moment(myCalendarLecture.lecture_date).isSame(
                        calendarMain,
                        'month'
                      )
                    )
                    .map((myCalendarLecture, lIdx) =>
                      myCalendarLecture.isAddedtoCalendar &&
                      day === moment(myCalendarLecture.lecture_date).date() ? (
                        <div key={lIdx} className="myCalendarLecture fade-in">
                          {myCalendarLecture.lecturename}
                        </div>
                      ) : null
                    )}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      <style jsx>{`
        .calendar {
          display: flex;
          justify-content: space-between;
        }

        .day-block {
          width: 80px;
          height: 30px;
          text-align: center; /* 將文字置中 */ 
          font-family: 'Zen Kaku Gothic New';
          font-size: 20px;
          font-style: normal;
          font-weight: 700;
          line-height: normal;        
        }
        .date-block {
          width: calc(100% / 7); /* 平均分配寬度 */
          height: 125px;
          text-align: center; /* 將文字置中 */
          font-family: 'Zen Kaku Gothic New';
          font-size: 18px;
          font-style: normal;
          font-weight: 700;
          line-height: normal;
        }
        .myCalendarLecture {
          background-color: #f3b454;
          border-radius: 1rem;
          text-align: center;
          padding: 2px;
          animation: fadeIn 0.5s ease-in-out;
        }

        @media screen and (max-width: 1200px) {
          .day-block:not(:nth-child(1)):not(:nth-child(7)),
          .date-block:not(:nth-child(1)):not(:nth-child(7)) {
            display: none;
          }

          .day-block {
            order: initial;
          }
          .day-block:nth-child(1) {
            order: 2;
          }
          .day-block:nth-child(7) {
            order: 1;
          }
          .day-block {
            height: 40px;            
          }

          .date-block {
            order: initial;
          }
          .date-block:nth-child(1) {
            order: 2;
          }
          .date-block:nth-child(7) {
            order: 1;
          }
          .date-block {
            height: 100px;
          }

          .calendar {
            display: flex;
            justify-content: space-between; /* 將元素置於左右兩端 */
          }
          
          .calendar > * {
            flex-grow: 1; /* 平分寬度 */
          }
        }

         {
          /* @keyframes fadeIn {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          } 
        }  */
        }
      `}</style>
    </>
  )
}
