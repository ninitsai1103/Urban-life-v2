import { useState, useEffect } from 'react'
import styles from './card.module.css'
import Link from 'next/link'
import toast, { Toaster } from 'react-hot-toast'
import { TbStarFilled } from 'react-icons/tb'
import { FaHeart } from 'react-icons/fa'
import { FaRegHeart } from 'react-icons/fa'
import { UseLecture } from '@/hooks/use-lecture'
import useColloections from '@/hooks/product/useCollections'

export default function LectureMyCard({ lecture, collections=[] }) {
  const [isCollected, setIsCollected] = useState(false)
  const { addCollection, removeCollection } = useColloections()

  useEffect(() => {
    // 檢查當前講座是否在收藏列表中
    console.log('collections', collections)
    console.log('0000000000000000000000', typeof collections)
    const obj = collections
    const arr =  Object.keys(obj).map((id) => obj[id])
    console.log("arrrrrr", arr);
    console.log("arrrrrr00000000", typeof arr);
    const data = arr.some(
      (item) => item.product_id === lecture.id && item.valid === 1
    )
    setIsCollected(data)
  }, [collections, lecture.id])

  const toggleCollection = () => {
    setIsCollected(!isCollected)
    const message = isCollected ? '講座已取消收藏!' : '講座已加入收藏!'
    toast.success(message)
    if (lecture && lecture.id) {
      if (isCollected) {
        removeCollection(lecture.id)
      } else {
        addCollection(lecture.id)
      }
    } else {
      console.error('Lecture is undefined or has no id property')
    }
  }

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
