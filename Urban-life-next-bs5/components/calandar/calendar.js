import { useEffect, useState } from 'react'

import moment from 'moment'

import reducers from './reducers'

import CalendarBody from './calendar-body'
import CalendarHeader from './calendar-header'

export default function Calendar({ setNowTime, cardData }) {
  // 接取 月份變化的東西後 moment()時間改變的狀態
  const [calendarMain, setCalendarMain] = useState(moment())

  // 傳到主頁面當中
  useEffect(() => {
    setNowTime(calendarMain.toDate())
  }, [calendarMain])

  // 可以抓到元件傳過來的東西
  // console.log(cardData)
  return (
    <>
      <div className="container">
        <CalendarHeader setCalendarMain={setCalendarMain} />
        <CalendarBody calendarMain={calendarMain} cardData={cardData} />
      </div>

      <style jsx>{`
        .container {
          border: 1px solid black;
        }
      `}</style>
    </>
  )
}
