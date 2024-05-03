import { useState } from 'react'

import moment from 'moment'

import reducers from './reducers'

import CalendarBody from './calendar-body'
import CalendarHeader from './calendar-header'

export default function Calendar() {
  // 接取 月份變化的東西後 moment()時間改變的狀態
  const [calendarMain, setCalendarMain] = useState(moment())
  // 還要傳到body去

  return (
    <>
      <h1>{'Calendar Demo'}</h1>

      <div className="container">
        <CalendarHeader setCalendarMain={setCalendarMain} />
        <CalendarBody calendarMain={calendarMain}/>
      </div>

      <style jsx>{`
        .container {
          border: 1px solid black;
          width: 800px;
        }
      `}</style>
    </>
  )
}
