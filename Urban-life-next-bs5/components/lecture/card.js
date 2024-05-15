import { useState, useEffect, useCallback } from 'react'
import styles from './card.module.css'
import Link from 'next/link'
import toast from 'react-hot-toast'
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

  useEffect(() => {
    if (!lecture) return

    const { id } = lecture
    const { product_id, valid } = collections[id] || {}

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
        <img
          loading="lazy"
          src={`http://localhost:3005/lecture_img/${lecture.cover}`}
          alt={lecture.name}
          className={styles.img}
        />
        <div className={styles.cardBody}>
          <div className={styles.cardBodyName}>
            <div className={styles.lectureName}>{lecture.name}</div>
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
          </div>
          <div className={styles.cardBodyArea}>
            <div className={styles.lectureText}>{lecture.teacher_name}</div>
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
              體驗人數：{lecture.amount}人
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
