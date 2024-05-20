import { useState, useEffect, useCallback } from 'react'
import styles from './card.module.css'
import Link from 'next/link'
import { TbStarFilled } from 'react-icons/tb'
import { FaHeart } from 'react-icons/fa'
import { FaRegHeart } from 'react-icons/fa'
import useColloections from '@/hooks/product/useCollections'
import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'

export default function LectureMyCard({ lecture, collections = [] }) {
  const [isCollected, setIsCollected] = useState(false)
  const { addCollection, removeCollection } = useColloections()
  const MySwal = withReactContent(Swal)

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
    notifySA('尚未登入', '幫您轉跳登入頁面，登入後才能使用收藏功能喔！', 'error');
    setTimeout(() => {
        window.location.href = '/member/login';
    }, 3000); // 等待3秒（3000毫秒）
}
  
  //兆妮修正完畢

  useEffect(() => {
    if (!lecture) return

    const { id } = lecture
    const { product_id, valid } =
      collections.find((item) => item.product_id === id) || {}

    setIsCollected(product_id === id && valid === 1)
  }, [collections, lecture])

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

  return (
    <>
      <div className={styles.card}>
        <a className={styles.img} href={`/lecture/${lecture.id}`}>
          <img
            loading="lazy"
            src={`http://localhost:3005/lecture_img/${lecture.cover}`}
            alt={lecture.name}
            className={styles.img}
          />
        </a>
        <div className={styles.cardBody}>
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
            <button className="btn btn-like" onClick={toggleCollection}>
              {isCollected ? (
                <FaHeart
                  style={{
                    fontSize: '23px',
                    cursor: 'pointer',
                    color: '#ff4136',
                  }}
                />
              ) : (
                <FaRegHeart
                  style={{
                    fontSize: '23px',
                    cursor: 'pointer',
                    color: '#ff4136',
                  }}
                />
              )}
            </button>
            ):(
              <>
              <button className="btn btn-like" onClick={handleReminder}>
              <FaRegHeart
                  style={{
                    fontSize: '23px',
                    cursor: 'pointer',
                    color: '#ff4136',
                  }}
                />
              </button>
              </>
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
            <div className={styles.lectureText}>{lecture.lecture_date}</div>
          </div>
          <div className={styles.cardBodyArea}>
            <div className={styles.lectureText}>
              評價 : {lecture.star}{' '}
              <TbStarFilled style={{ color: '#F6A404', fontSize: '20px' }} />
            </div>
          </div>
          <div className={styles.cardBodyArea}>
            <div className={styles.lectureText}>
              報名人數上限：{lecture.amount}人
            </div>
            <Link key={lecture.id} href={`/lecture/${lecture.id}`}>
              <button className="btn btn-detail">課程詳細資訊</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
