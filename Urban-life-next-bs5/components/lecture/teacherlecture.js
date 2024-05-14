import { useState, useEffect } from 'react'
import styles from './teacherlecture.module.css'
import Link from 'next/link'
import toast, { Toaster } from 'react-hot-toast'
import { TbStarFilled } from 'react-icons/tb'
import { FaHeart } from 'react-icons/fa'
import { FaRegHeart } from 'react-icons/fa'
import useColloections from '@/hooks/product/useCollections'

export default function TeacherLectureCard({ lectures }) {
  return (
    <>
      {lectures && lectures.length > 0 ? (
        lectures.map((lecture) => (
      <div className={styles.card}>
        <div className="flex">
          <img
            loading="lazy"
            src={`http://localhost:3005/lecture_img/${lecture.cover}`}
            className={styles.img}
          />
        </div>
        <div className={styles.cardBody}>
          <div className={styles.cardBodyName}>
            <div className={styles.lectureName}>{lecture.name}</div>
            <button className="width-25 btn btn-like">
              <FaRegHeart />
            </button>
          </div>
          <div className={styles.cardBodyArea}>
            <div className="flex gap-2.5 font-medium">
              <div className={styles.lectureText}>
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/d3c2f7f38bd5ecac06bed75055428d2f11131e5b875663805124a8c6c6b704c4?"
                  className={styles.icon}
                />{' '}
                體驗人數：{lecture.amount}人
              </div>
            </div>
            <div className={styles.lectureText}>{lecture.lecture_date}</div>
          </div>
          <div className={styles.cardBodyPrice}>
            <div className={styles.priceText}>NT：{lecture.price}</div>
            <Link key={lecture.id} href={`/lecture/${lecture.id}`}>
              <button className="btn btn-detail">課程詳細資訊</button>
            </Link>
          </div>
        </div>
      </div>
    ))
      ) : (
        <p>目前沒有課程</p>
      )}
    </>
  )
}
