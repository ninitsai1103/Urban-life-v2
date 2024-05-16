import * as React from 'react'
import styles from './lecturedetail.module.css'

export default function Lecturedetail({ lecture }) {
  const text2jsx = (text) => {
    return text.split('\n\n').map((v, i) => (
      <div className="article-section" key={i}>
        {v.split('\n').map((v2, i2) => (
          <div className="article-p" key={`${i}-${i2}`}>{v2}</div>
        ))}
      </div>
    ))
  }
  
  return (
    <>
      <div className={styles.infogroup}>
        <div className={styles.imginfo}>
          <div>
            <img src={`http://localhost:3005/lecture_img/${lecture.cover}`} />
          </div>
          <div>
            <img
              src={`http://localhost:3005/lecture_img/${lecture.lecture_img1}`}
            />
          </div>
          <div>
            <img
              src={`http://localhost:3005/lecture_img/${lecture.lecture_img2}`}
            />
          </div>
          <div>
            <img
              src={`http://localhost:3005/lecture_img/${lecture.lecture_img3}`}
            />
          </div>
        </div>
        <div className={styles.lectureinfo}>
          <div className={styles.infotext}>
            <div className={styles.infotext}>{text2jsx(lecture.content)}</div>
          </div>
        </div>
      </div>
    </>
  )
}
