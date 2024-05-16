import { useState, useEffect, useCallback } from 'react'
import styles from './teacherlecture.module.css'
import Link from 'next/link'
import { FaHeart } from 'react-icons/fa'
import { FaRegHeart } from 'react-icons/fa'
import useColloections from '@/hooks/product/useCollections'
import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'

export default function TeacherLectureCard({ lectures, collections = [] }) {
  const [isCollectedMap, setIsCollectedMap] = useState({})

  useEffect(() => {
    const initialCollectedMap = lectures.reduce((map, lecture) => {
      // 檢查這個講座是否在收藏列表中
      const isCollected = collections.some(
        (item) => item.product_id === lecture.id && item.valid === 1
      );
      // 根據檢查結果更新初始收藏狀態
      map[lecture.id] = isCollected;
      return map;
    }, {});
    setIsCollectedMap(initialCollectedMap);
  }, [lectures, collections]);

  const { addCollection, removeCollection } = useColloections()
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

  const toggleCollection = useCallback(
    (lectureId) => {
      setIsCollectedMap((prevMap) => {
        const newMap = { ...prevMap };
        const newCollected = !newMap[lectureId];
        newMap[lectureId] = newCollected;
        const lecture = lectures.find((item) => item.id === lectureId);
        if (lecture) {
          if (newCollected) {
            addCollection(lectureId);
            notifySA('成功收藏', `${lecture.name}已成功加入您的收藏!`, 'success');
          } else {
            removeCollection(lectureId);
            notifySA('取消收藏', `${lecture.name}已成功取消收藏!`, 'error');
          }
        }
        return newMap;
      });
    },
    [lectures, addCollection, removeCollection, notifySA]
  );

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
                <button
                  className="width-25 btn btn-like"
                  onClick={() => toggleCollection(lecture.id)}
                >
                  {isCollectedMap[lecture.id] ? (
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
