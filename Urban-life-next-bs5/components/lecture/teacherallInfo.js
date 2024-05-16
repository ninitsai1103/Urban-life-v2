import { useState, useEffect } from 'react'
import styles from './teacherallInfo.module.css'

export default function TeacherAllInfo({ teacher }) {
  return (
    <>
      <div className={styles.card}>
        <div className="flex">
          <img
            loading="lazy"
            src={`/images/teacher/${teacher.img}`}
            className={styles.img}
          />
        </div>
        <div className={styles.cardBody}>
          <div className={styles.teachername}>{teacher.name}  講師</div>
          <div className={styles.cardBodyArea}>
            <div className={styles.email}>Email：{teacher.email}</div>
            <div className={styles.phone}>電話：{teacher.phone}</div>
            <div className={styles.teacherinfo}>
              講師簡介：
              <br />
              <hr />
              {teacher.intro}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
