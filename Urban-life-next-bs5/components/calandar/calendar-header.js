import React, { useState } from 'react'
import moment from 'moment'

export default function CalendarHeader({setCalendarMain}) {
  
  const [calendarTime, setCalendarTime] = useState(moment())

  const handleLastMonthEvent = () => {
    console.log('click last month')
    const updatedTime=moment(calendarTime).subtract(1, 'month')
    setCalendarTime(updatedTime)
    setCalendarMain(updatedTime)
  }
  const handleNextMonthEvent = () => {
    console.log('click next month')
    const updatedTime=moment(calendarTime).add(1, 'month')
    setCalendarTime(updatedTime)
    setCalendarMain(updatedTime)
  }
  return (
    <>
      <div className="header d-flex justify-content-between">
        <h1>
          {calendarTime.format('MMM')}-{calendarTime.format('YYYY')}
        </h1>
        <div className="d-flex gap-3">
          <h4 onClick={handleLastMonthEvent}>{`<`}</h4>
          <h4 onClick={handleNextMonthEvent}>{`>`}</h4>
        </div>
      </div>
      <style jsx>{`
        .header {
          width: 100%;
        }
      `}</style>
    </>
  )
}
