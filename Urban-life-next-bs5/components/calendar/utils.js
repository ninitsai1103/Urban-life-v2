// utils.js
import React from 'react'
import moment from 'moment'

// 建立一個通用變數，存放一週有7天
const SEVENDAYS = 7

// 處理這個月份，上個月跟下個月的日期(未完成)

// 處理每週的資訊
function processWeekDays(mmt, isFirstWeek = false) {
  const totalDays = mmt.daysInMonth()

  // mmt 就是當下的時間
  // isFirstDay=true, 取得第一週的第一天，在星期幾，快速建立一第一週的資訊
  // isFirstDay=false, 直接從0，也就是Sunday開始，禮拜六是6
  const startDay = isFirstWeek ? mmt.startOf('month').day() : 0

  // 先建立一週的Array，內容先放0
  const weekDays = Array(SEVENDAYS).fill(0)
  // 通知上一層函式的迴圈是否結束
  let isFinished = false
  for (let d = startDay; d < SEVENDAYS; d++) {
    // 我們控制了startDay，若以2024.4.17是星期四來說，第一週的部分直接從 Array的 d = 4 開始放日期
    weekDays[d] = mmt.date()

    if (mmt.date() !== totalDays)
      // 使用moment的函示，一天一天加上去
      mmt.add(1, 'day')
    else {
      // 如果處理的天數已經是最後一天了，就離開回圈
      isFinished = true
      break
    }
  }

  return { weekDays, isFinished } //<-- 回傳weekDays & isFinished
}

// 取得當月每週的資訊
export default function getWeeksInMonth(calendarMain) {
  // calendarMain是從會跟header傳過來的
  // 讓整個元件都會以那邊的moment()為主
  const mmt = calendarMain
  const weekDayList = [] //<-- 建立一個Array，負責存放每週的日期

  // 由於每月的第一天不見得是在星期天，故我們需要先處理第一週的部分
  const { weekDays } = processWeekDays(mmt, true)
  
  weekDayList.push(weekDays)
  
  // 其他的部份可以靠Loop來依序回傳每週的日期
  let loopStatus = false
  while (!loopStatus) {
    let result = processWeekDays(mmt)
    const { weekDays } = result
    weekDayList.push(weekDays)
    loopStatus = result['isFinished']
    // console.log(weekDayList);
  }

  return weekDayList // 回傳完整的日期
}
