import { useState, useEffect } from 'react'
import styles from './lectureinfo.module.css'
import { TbStarFilled } from 'react-icons/tb'
import { BsCart3 } from 'react-icons/bs'
import { FaHeart } from 'react-icons/fa'
import { FaRegHeart } from 'react-icons/fa'
import toast, { Toaster } from 'react-hot-toast'
import useColloections from '@/hooks/product/useCollections'
import { useCheckout } from '@/hooks/use-checkout'
import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'

export default function LectureInfo({ lecture, collections = [] }) {
  const [isCollected, setIsCollected] = useState(false)
  const { addCollection, removeCollection } = useColloections()

  const { addItem } = useCheckout()
  const MySwal = withReactContent(Swal)

  useEffect(() => {
    // 檢查當前講座是否在收藏列表中
    const obj = collections
    const arr = Object.keys(obj).map((id) => obj[id])
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

  const notifySA = (lecture) => {
    MySwal.fire({
      title: '成功加入',
      text: lecture.name + '已成功加入購物車!',
      icon: 'success',
    })
  }

  const handleAddToCart = () => {
    if (lecture) {
      addItem(lecture)
      notifySA(lecture)
    }
  }

  return (
    <>
      <div className={styles.infocard}>
        <div className={styles.lecturename}>{lecture.name}</div>
        <div className={styles.infotext}>
          {lecture.description}
          <div className={`${styles.infotext} pt-4`}>※請詳閱下方購課須知</div>
        </div>
        <div className={styles.infogroup}>
          <div className={styles.info}>
            <div className={styles.infotext}>NT： {lecture.price} </div>
            <div className="">
              <div className={styles.infotext}>
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/d3c2f7f38bd5ecac06bed75055428d2f11131e5b875663805124a8c6c6b704c4?"
                  className={styles.icon}
                />{' '}
                體驗人數：{lecture.amount} 人
              </div>
            </div>
            <div className="flex gap-2.5">
              <div className={styles.infotext}>
                評價 : {lecture.star}{' '}
                <TbStarFilled style={{ color: '#F6A404', fontSize: '20px' }} />
              </div>
            </div>
            <div className={styles.infotext}>開課人數：{lecture.amount} 人</div>
          </div>
          <div className={styles.info}>
            <div className={styles.infotext}>
              開始報名：{lecture.sign_up_starting.split(' ')[0]}
            </div>
            <div className={styles.infotext}>
              報名截止：{lecture.sign_up_deadline.split(' ')[0]}
            </div>
            <div className={styles.infotext}>
              上課日期：{lecture.lecture_date.split(' ')[0]}
            </div>
            <div className={styles.infotext}>
              上課時間：{lecture.starting_time.split('.')[0]}
            </div>
          </div>
        </div>
        <div className="input-group mb-1 w-75">
          <div className={styles.infotext}>報名人數：{lecture.amount} 人</div>
        </div>

        <div>
          <div className={styles.btnarea}>
            <button
              className="btn btn-add px-5 py-2"
              onClick={handleAddToCart}>
              <BsCart3 className="me-2 " style={{ fontSize: '20px' }} />
              加入購物車
            </button>
            <button
              className="btn btn-add px-5 py-2"
              onClick={toggleCollection}
            >
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
              加入收藏
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
