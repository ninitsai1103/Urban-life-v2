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
  const isBeforeToday = new Date(sign_up_deadline) < new Date()

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
  }

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

  return (
    <>
      <div className={styles.card}>
        <div className={styles.cardBodyName}>
          <div className={styles.lectureName}><a href={`/lecture/${lecture.id}`} style={{ textDecoration: 'none' }}>{lecture.name}</a></div>
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
        </div>
        <div className={styles.cardBodyArea}>
          <div className={styles.lectureText}><a href={`/teacher/${lecture.teacher_id}`} style={{ textDecoration: 'none' }}>{lecture.teacher_name}</a></div>
          <div className={styles.lectureText}>{lecture_date}</div>
        </div>
        <div className={styles.cardBodyArea}>
          <div className="flex gap-2.5 font-medium">
            <div className={styles.lectureText}>
              體驗人數：{amount}
            </div>
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
          {/* 根據日期是否在今天之前來決定按鈕樣式 */}
          {isAddedtoCalendar ? (
            <button
              className="btn btn-main"
              style={{ maxWidth: '106px' }}
              onClick={handleAddtoCalendar}
            >
              加入行事曆
            </button>
          ) : (
            <button
              className="btn btn-delete"
              style={{ maxWidth: '106px' }}
              onClick={handleAddtoCalendar}
            >
              刪除
            </button>
          )}
        </div>
      </div>
    </>
  )
}
