import React, { useEffect, useState } from 'react'
import moment from 'moment'
import getWeeksInMonth from './utils'

export default function CalendarBody({ calendarMain, cardData }) {
  let weekContentList = getWeeksInMonth(calendarMain)
  const WeekDayNameList = ['Sun', 'Mon', 'Tue', 'Wen', 'Thr', 'Fri', 'Sat']
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
  const [myCalendarLectures, setMyCalandarLecture] = useState([])
  useEffect(() => {
    if (cardData.lecturename !== undefined) {
      const newMyCalendarLectures = [...myCalendarLectures, cardData]
      setMyCalandarLecture(newMyCalendarLectures)
      console.log(newMyCalendarLectures)
    }
  }, [cardData])

  // 加入到行事曆的狀態，判斷她要不要顯示刪除按鈕
  const [calandarLectureExist, setCalandarLectureExist] = useState(false)
  useEffect(()=>{

  },[calandarLectureExist])
  return (
    <>
      <div className="body mt-4">
        {/* MONDAY,TUESDAY, .....SUNDAY的呈現 */}
        <div className="d-flex justify-content-between ">
          {WeekDayNameList.map((day) => {
            return (
              <>
                <div className="day-block ">{day}</div>
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
          <div key={idx} className="d-flex justify-content-between ">
            {item.aWeek.map((day, dIdx) => (
              <div
                className="date-block"
                key={dIdx}
                onClick={day ? () => handleDateClick(day) : undefined}
              >
                <div>{day}</div>
                {/* 在這裡渲染 cardData */}
                <div>
                  {myCalendarLectures.map((myCalendarLecture) => {
                    return day == moment(myCalendarLecture.lecture_date).format('DD') ? (
                      <div className='myCalendarLecture'>{myCalendarLecture.lecturename}</div>
                    ) : (
                      <></>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      <style jsx>{`
        .day-block {
          width: 80px;
          height: 50px;
        }
        .date-block {
          width: 80px;
          height: 100px;
        }
        .myCalendarLecture{
          background-color:#f3b454;
          border-radius: 1rem;
          text-align: center;
        }
      `}</style>
    </>
  )
}
