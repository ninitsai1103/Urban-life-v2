import { useState, useEffect } from 'react'
import styles from './card-np.module.css'
import toast, { Toaster } from 'react-hot-toast'
import { TbStarFilled } from 'react-icons/tb'
import { FaHeart } from 'react-icons/fa'
import { FaRegHeart } from 'react-icons/fa'
import useColloections from '@/hooks/product/useCollections'

export default function LectureMyCardNp({ lecture, product, setCardData, collections }) {
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

  // 確認日期是否在今天之前
  const isBeforeToday = new Date(lecture_date) < new Date();

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
    setCardData(lectureData)
  }

  const [isCollected, setIsCollected] = useState([]) //商品是否有被收藏
  const { addCollection, removeCollection } = useColloections();

  // useEffect(() => {
  //   // 檢查當前商品是否在收藏列表中
  //   setIsCollected(collections.find(item => item.product_id == product.id && item.valid == 1))
  // }, [collections, product.id])

  //切換商品的收藏狀態
  const toggleCollection = () => {
    setIsCollected(!isCollected);
    const message = isCollected ? '商品已取消收藏!' : '商品已加入收藏!'
    toast.success(message)
    if (lecture && lecture.id) {
      if (isCollected) {
        removeCollection(lecture.id); // 取消收藏時將課程 ID 傳遞給 removeCollection 函數
      } else {
        addCollection(lecture.id); // 加入收藏時將課程 ID 傳遞給 addCollection 函數
      }
    } else {
      console.error('lecture is undefined or has no id property');
    }
  }

  return (
    <>
      <div className={styles.card}>
        <div className={styles.cardBodyName}>
          <div className={styles.lectureName}>{name}</div>
          <button className="btn btn-like">
          {isCollected ?
                (<FaHeart
                  style={{ fontSize: '23px', cursor: 'pointer', color: '#ff4136' }}
                  onClick={(e) => {
                    e.preventDefault();
                    toggleCollection(lecture);
                  }}
                />) :
                (<FaRegHeart
                  style={{ fontSize: '23px', cursor: 'pointer', color: '#ff4136' }}
                  onClick={(e) => {
                    e.preventDefault();
                    toggleCollection(lecture);
                  }}
                />)}
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
          {/* 根據日期是否在今天之前來決定按鈕樣式 */}
          {isBeforeToday ? (
            <button className="btn btn-main" style={{ maxWidth: '106px' }} onClick={handleAddtoCalandar}>
              加入行事曆
            </button>
          ) : (
            <button className="btn btn-add" style={{ maxWidth: '106px' }} onClick={handleAddtoCalandar}>
              加入購物車
            </button>
          )}
        </div>
      </div>
    </>
  )
}
