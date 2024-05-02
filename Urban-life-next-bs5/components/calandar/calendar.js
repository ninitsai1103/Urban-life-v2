import { useState } from 'react'

import moment from 'moment'

import reducers from './reducers'

import CalendarBody from './calendar-body'
import CalendarHeader from './calendar-header'

export default function Calendar() {
  const [calendarMain, setCalendarMain] = useState(moment())

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
