import * as React from 'react'
import styles from './card-np.module.css'
import { TbStarFilled } from 'react-icons/tb'
import { FaRegHeart } from 'react-icons/fa'

export default function LectureMyCardNp({ lecture, setCardData }) {
  const {
    content,
    name,
    star,
    description,
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

  // 點擊加入行事曆
  const handleAddtoCalandar = () => {
    const lectureData = {
      lecturename: name,
      start_date: sign_up_starting,
      ending_date: sign_up_deadline,
      lecture_date: lecture_date,
      starting_time: starting_time,
      ending_time: ending_time,
    }
    // console.log(lectureData)
    setCardData(lectureData)
  }

  return (
    <>
      <div className={styles.card}>
        <div className={styles.cardBodyName}>
          <div className={styles.lectureName}>{name}</div>
          <button className="btn btn-like">
            <FaRegHeart />
          </button>
        </div>
        <div className={styles.cardBodyArea}>
          <div className={styles.lectureText}>{teacher_name}</div>
          <div className={styles.lectureText}>{lecture_date}</div>
        </div>
        <div className={styles.cardBodyArea}>
          <div className="flex gap-2.5 font-medium">
            <div className={styles.lectureText}>
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/d3c2f7f38bd5ecac06bed75055428d2f11131e5b875663805124a8c6c6b704c4?"
                className={styles.img}
              />{' '}
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
          <button
            className="btn btn-main"
            onClick={() => {
              handleAddtoCalandar()
            }}
          >
            加入行事曆
          </button>
        </div>
      </div>
    </>
  )
}
