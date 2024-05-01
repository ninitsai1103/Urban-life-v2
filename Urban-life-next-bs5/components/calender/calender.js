import React from 'react'
import getWeeksInMonth from './utils' //<--加這個
import moment from 'moment'

import * as Styles from './styles'
function Header() {
  let handleLastMonthEvent = () => {
    console.log('click last month')
    return (e) => {}
  }
  let handleNextMonthEvent = () => {
    console.log('click next month')
    return (e) => {}
  }
}

export default function Calendar() {
  //   let result = getWeeksInMonth() //<--加這個
  //   console.log('result:', result)
  let weekContentList = getWeeksInMonth()
  const WeekDayNameList = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
  let result = []

  return (
    <>
      <h1>{'Calendar Demo'}</h1>
      <h1>{moment().format('YYYY-MM-DD')}</h1>
      <div className="container">
        <div className="header d-flex justify-content-between">
          <h1>Month-Year</h1>
          <div className="d-flex gap-3">
            <h4>{`<`}</h4>
            <h4>{`>`}</h4>
          </div>
        </div>
        <div className="body mt-4">
          <div className="d-flex justify-content-between ">
            {WeekDayNameList.map((day) => {
              return (
                <>
                  <div className="day-block ">{day}</div>
                </>
              )
            })}
          </div>
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
      </div>
      <style jsx>{`
        .container {
          border: 1px solid black;
          width: 800px;
        }
        .header {
          width: 100%;
        }
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
