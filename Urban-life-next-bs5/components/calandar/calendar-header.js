import React, { useState } from 'react'
import moment from 'moment'

export default function CalendarHeader({ setCalendarMain }) {
  const [calendarTime, setCalendarTime] = useState(moment())

  const handleLastMonthEvent = () => {
    console.log('click last month')
    const updatedTime = moment(calendarTime).subtract(1, 'month')
    setCalendarTime(updatedTime)
    setCalendarMain(updatedTime)
  }
  const handleNextMonthEvent = () => {
    console.log('click next month')
    const updatedTime = moment(calendarTime).add(1, 'month')
    setCalendarTime(updatedTime)
    setCalendarMain(updatedTime)
  }
  return (
    <>
      <div className="header d-flex justify-content-between align-items-center">
        <h4 className="flex-item" onClick={handleLastMonthEvent}>{`<`}</h4>
        <h1 className="flex-item">
          {calendarTime.format('MMM')}-{calendarTime.format('YYYY')}
        </h1>
        <h4 className="flex-item" onClick={handleNextMonthEvent}>{`>`}</h4>
      </div>

      <style jsx>{`
        .header {
          width: 100%;
        }
        .flex-item {
          flex: 1;
          text-align: center;
        }
      `}</style>
    </>
  )
}
