import React from 'react'
import getWeeksInMonth from './utils'

export default function CalendarBody({ calendarMain }) {
  let weekContentList = getWeeksInMonth(calendarMain)
  const WeekDayNameList = ['Sun', 'Mon', 'Tue', 'Wen', 'Thr', 'Fri', 'Sat']
  let result = []
  return (
    <>
      <div className="body mt-4">
        {/* 星期幾的呈現 */}
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
        {weekContentList.map((week, wIdx) => {
          let aWeek = []
          week.map((day, dIdx) => aWeek.push(day === 0 ? '' : day))
          result.push({ aWeek })
        })}
        {result.map((item, idx) => (
          <div key={idx} className="d-flex justify-content-between ">
            {item.aWeek.map((day, dIdx) => (
              <div className="date-block" key={dIdx}>
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
