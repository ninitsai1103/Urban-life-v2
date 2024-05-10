import * as React from 'react'
import styles from './card.module.css'
import Link from 'next/link'
import { TbStarFilled } from 'react-icons/tb'
import { FaRegHeart } from 'react-icons/fa'
import { UseLecture } from '@/hooks/use-lecture'

export default function LectureMyCard({lectures}) {
  // const { lectures } = UseLecture()
  console.log("origin lectures in card", lectures);

  return (
    <>
      {lectures.map((lectures) => {
        return (
          <div className={styles.card} key={lectures.id}>
            <img
              loading="lazy"
              src={`http://localhost:3005/lecture_img/${lectures.cover}`}
              alt={lectures.name}
              className={styles.img}
            />
            <div className={styles.cardBody}>
              <div className={styles.cardBodyName}>
                <div className={styles.lectureName}>{lectures.name}</div>
                <button className="btn btn-like">
                  <FaRegHeart />
                </button>
              </div>
              <div className={styles.cardBodyArea}>
                <div className={styles.lectureText}>{lectures.teacher_name}</div>
                <div className={styles.lectureText}>{lectures.lecture_date}</div>
              </div>
              <div className={styles.cardBodyArea}>
                <div className={styles.lectureText}>
                  評價 : {lectures.star}{' '}
                  <TbStarFilled
                    style={{ color: '#F6A404', fontSize: '20px' }}
                  />
                </div>
              </div>
              <div className={styles.cardBodyArea}>
                <div className={styles.lectureText}>體驗人數：{lectures.amount}人</div>
                  <Link key={lectures.id} href={`/lecture/detail/${lectures.id}`}>
                  <button className="btn btn-detail">課程詳細資訊</button>
                   </Link>                
              </div>
            </div>
          </div>
        )
      })}
    </>
  )
}
