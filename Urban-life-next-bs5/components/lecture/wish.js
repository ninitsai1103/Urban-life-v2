import { useState, useEffect, useCallback } from 'react'
import styles from './wish.module.css'
import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'

export default function LectureWish({ teachers }) {
  const [content, setContent] = useState('')
  const [teacherId, setTeacherId] = useState('')
  const [date, setDate] = useState('')
  const [price, setPrice] = useState('')
  const MySwal = withReactContent(Swal)

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

  const submitWish = async () => {
    const response = await fetch('http://localhost:3005/api/teacher-wish', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content, teacher_id: teacherId, date, price }),
    })
    const result = await response.json()
    if (result.status === 'success') {
      notifySA('許願成功', `您的願望我們收到了！`, 'success');
    } else {
      notifySA('許願失敗', `願望不完整，請再檢查一下！`, 'warning');
    }
  }

  const sortedTeachers = [...teachers].sort((a, b) => a.id - b.id);

  return (
    <>
      <div className={styles.card}>
        <div className={styles.wishTitle}>
          對什麼有興趣呢？許個有興趣的課程吧！
        </div>
        <div className={styles.wishInfo}>
          填寫表單，許下你的課程願望讓我們知道！
        </div>
        <div className="shrink-0 mt-3 h-px bg-black border border-black border-solid max-md:max-w-full" />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className={styles.textarea}
          rows="5"
          maxLength="200"
          placeholder="請以最多200字內稍微描述課程內容（0/200）"
        ></textarea>
        <div className="shrink-0 h-px bg-black border border-black border-solid max-md:max-w-full" />
        <div className={styles.wishArea}>
          希望哪一位講師帶課呢？
          <div className="arrange-select">
            <select
              value={teacherId}
              onChange={(e) => setTeacherId(e.target.value)}
              className="form-select"
              aria-label="Default select example"
            >
              <option value="" disabled selected>您希望的講師</option>
              {sortedTeachers.map((teacher) => (
                <option key={teacher.id} value={teacher.id}>
                  {teacher.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="shrink-0 h-px bg-black border border-black border-solid max-md:max-w-full" />
        <div className={styles.wishArea}>
          希望哪時候開課？
          <div className="arrange-select">
            <select
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="form-select"
              aria-label="Default select example"
            >
              <option value="" disabled selected>您希望的開課月分</option>
              {[...Array(12).keys()].map((month) => (
                <option key={month + 1} value={month + 1}>{`${month + 1}月`}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="shrink-0 h-px bg-black border border-black border-solid max-md:max-w-full" />
        <div className={styles.wishArea}>
          希望的課程費用？
          <div className="arrange-select">
            <select
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="form-select"
              aria-label="Default select example"
            >
              <option value="" disabled selected>您希望的課程費用</option>
              <option value="1~500">NTD：1~500</option>
              <option value="501~1000">NTD：501~1000</option>
              <option value="1001~1500">NTD：1001~1500</option>
              <option value="1501~">NTD：1501以上</option>
            </select>
          </div>
        </div>
        <div className="shrink-0 h-px bg-black border border-black border-solid max-md:max-w-full" />
        <div className={styles.wishBtn}>
          <button onClick={submitWish} className="btn btn-add px-5">課程許願</button>
        </div>
      </div>
    </>
  )
}