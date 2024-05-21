import { useState, useEffect, useCallback } from 'react'
import styles from './card-np.module.css'
import toast, { Toaster } from 'react-hot-toast'
import { TbStarFilled } from 'react-icons/tb'
import { FaHeart } from 'react-icons/fa'
import { FaRegHeart } from 'react-icons/fa'
import useColloections from '@/hooks/product/useCollections'
import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'

export default function LectureMyCardNp({
  lecture,
  setCardData,
  collections = [],
}) {
  const {
    id,
    content,
    name,
    star,
    description,
    teacher_id,
    teacher_name,
    lecture_date,
    starting_time,
    ending_time,
    location_id,
    price,
    amount,
    cover,
    lecture_img1,
    lecture_img2,
    lecture_img3,
    sign_up_starting,
    sign_up_deadline,
  } = lecture

  // 確認日期是否在今天之前
  const isBeforeToday = new Date(lecture_date) < new Date()

  // 新增一個狀態，切換商品是否有加入行事曆，進而去改變它的按鈕
  const [isAddedtoCalendar, setIsAddedtoCalendar] = useState(true)
  // 點擊加入行事曆
  const handleAddtoCalendar = () => {
    const lectureData = {
      lecturename: name,
      start_date: sign_up_starting,
      ending_date: sign_up_deadline,
      lecture_date: lecture_date,
      starting_time: starting_time,
      ending_time: ending_time,
      isAddedtoCalendar: isAddedtoCalendar,
    }
    setCardData(lectureData)
    setIsAddedtoCalendar(!isAddedtoCalendar)

    // localStorage.setItem("calendarLecture", JSON.stringify({[name]:!isAddedtoCalendar}))// 从localStorage获取已存在的日历讲座
    const calendarLectures =
      JSON.parse(localStorage.getItem('calendarLectures')) || []

    const index = calendarLectures.findIndex((lecture) =>
      lecture.hasOwnProperty(name)
    )

    if (index !== -1) {
      calendarLectures[index][name] = !calendarLectures[index][name]
    } else {
      calendarLectures.push({ [name]: !isAddedtoCalendar })
    }

    // 更新localStorage
    localStorage.setItem('calendarLectures', JSON.stringify(calendarLectures))
  }

  const localStorageLecture =
    JSON.parse(localStorage.getItem('calendarLectures')) || []
  // console.log(localStorageLecture)

  const getLectureValue = (name) => {
    for (const lecture of localStorageLecture) {
      if (lecture.hasOwnProperty(name)) {
        // console.log(!lecture[name])
        return !lecture[name]
      }
    }
  }

  // useEffect(() => {
  //   return () => {
  //     localStorage.removeItem("calendarLecture")
  //   }
  // }, [])

  const [isCollected, setIsCollected] = useState([]) //商品是否有被收藏
  const { addCollection, removeCollection } = useColloections()
  const MySwal = withReactContent(Swal)

  //切換商品的收藏狀態
  const notifySA = useCallback(
    (title, text, icon) => {
      MySwal.fire({
        title,
        text,
        icon,
      })
    },
    [MySwal]
  )

  const toggleCollection = useCallback(() => {
    setIsCollected((prev) => !prev)
    if (lecture && lecture.id) {
      if (isCollected) {
        removeCollection(lecture.id)
        notifySA('取消收藏', `${lecture.name}已成功取消收藏!`, 'error')
      } else {
        addCollection(lecture.id)
        notifySA('成功收藏', `${lecture.name}已成功加入您的收藏!`, 'success')
      }
    } else {
      console.error('Lecture is undefined or has no id property')
    }
  }, [isCollected, lecture, addCollection, removeCollection, notifySA])

  useEffect(() => {
    // 檢查當前商品是否在收藏列表中
    setIsCollected(
      collections.find(
        (item) => item.product_id == lecture.id && item.valid == 1
      )
    )
  }, [collections, lecture.id])

  //兆妮修正
  const [canCollect, setCanCollect] = useState(false)

  useEffect(() => {
    const memberInfo = JSON.parse(localStorage.getItem('member-info'))
    if (memberInfo !== null && memberInfo !== undefined) {
      setCanCollect(true)
    } else {
      setCanCollect(false)
    }
  })

  const handleReminder = () => {
    notifySA(
      '尚未登入',
      '幫您轉跳登入頁面，登入後才能使用收藏功能喔！',
      'error'
    )
    setTimeout(() => {
      window.location.href = '/member/login'
    }, 3000) // 等待3秒（3000毫秒）
  }

  //兆妮修正完畢

  return (
    <>
      <div className={styles.card}>
        <div className={styles.cardBodyName}>
          <div className={styles.lectureName}>
            <a
              href={`/lecture/${lecture.id}`}
              style={{ textDecoration: 'none' }}
            >
              {lecture.name}
            </a>
          </div>
          {canCollect ? (
            <button className="btn btn-like">
              {isCollected ? (
                <FaHeart
                  style={{
                    fontSize: '23px',
                    cursor: 'pointer',
                    color: '#ff4136',
                  }}
                  onClick={(e) => {
                    e.preventDefault()
                    toggleCollection(lecture)
                  }}
                />
              ) : (
                <FaRegHeart
                  style={{
                    fontSize: '23px',
                    cursor: 'pointer',
                    color: '#ff4136',
                  }}
                  onClick={(e) => {
                    e.preventDefault()
                    toggleCollection(lecture)
                  }}
                />
              )}
            </button>
          ) : (
            <button className="btn btn-like" onClick={handleReminder}>
              <FaRegHeart
                style={{
                  fontSize: '23px',
                  cursor: 'pointer',
                  color: '#ff4136',
                }}
              />
            </button>
          )}
        </div>
        <div className={styles.cardBodyArea}>
          <div className={styles.lectureText}>
            <a
              href={`/teacher/${lecture.teacher_id}`}
              style={{ textDecoration: 'none' }}
            >
              {lecture.teacher_name}
            </a>
          </div>
          <div className={styles.lectureText}>{lecture_date}</div>
        </div>
        <div className={styles.cardBodyArea}>
          <div className="flex gap-2.5 font-medium">
            <div className={styles.lectureText}>報名人數上限：{amount}</div>
          </div>
          <div className={styles.cardBodyArea}>
            <div className={styles.lectureText}>
              評價 : {star}{' '}
              <TbStarFilled style={{ color: '#F6A404', fontSize: '20px' }} />
            </div>
          </div>
        </div>
        <div className={styles.cardBodyPrice}>
          <div className={styles.priceText}>NT：{price}</div>
          {isBeforeToday ? (
            <button
              className="btn btn-cantusecoupon"
              style={{ maxWidth: '106px' }}
            >
              已過期
            </button>
          ) : !getLectureValue(name) ? (
            <button
              className="btn btn-main"
              style={{ maxWidth: '106px' }}
              onClick={() => {
                handleAddtoCalendar()
                getLectureValue(name)
              }}
            >
              加入行事曆
            </button>
          ) : (
            <button
              className="btn btn-delete"
              style={{ maxWidth: '106px' }}
              onClick={() => {
                handleAddtoCalendar()
                getLectureValue(name)
              }}
            >
              刪除
            </button>
          )}
        </div>
      </div>
    </>
  )
}
