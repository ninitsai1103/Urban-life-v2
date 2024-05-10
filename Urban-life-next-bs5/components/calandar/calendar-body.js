import React from 'react'
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
  }

  // 檢查傳過來的訊息
  // console.log(cardData);
  // 接收到cardData存在後就加進行事曆裡面
  const lectureAdd = () => {
    if (cardData) {
      return
      ;<>
        <div key={index}>
          <h3>{cardData.lecture_name}</h3>
          <p>{cardData.start_date}</p>
        </div>
      </>
    } else {
      return null // 如果 cardData 不存在，返回 null 或其他你想要顯示的內容
    }
  }

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
                {day}
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
      `}</style>
    </>
  )
}
