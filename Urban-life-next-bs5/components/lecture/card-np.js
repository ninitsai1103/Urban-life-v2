import * as React from 'react'
import styles from './card-np.module.css'
import { AiFillStar } from 'react-icons/ai'
import { FaRegHeart } from "react-icons/fa";

export default function MyCardNp() {
  return (
    <>
      <div className={styles.card}>
        <img
          loading="lazy"
          srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/79e0ae364049cd60a3e49c593e4a7f0708340458641d5e605d73b998c6ada8df?apiKey=5675ca76094a4dbb93b999b9c5c7677d&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/79e0ae364049cd60a3e49c593e4a7f0708340458641d5e605d73b998c6ada8df?apiKey=5675ca76094a4dbb93b999b9c5c7677d&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/79e0ae364049cd60a3e49c593e4a7f0708340458641d5e605d73b998c6ada8df?apiKey=5675ca76094a4dbb93b999b9c5c7677d&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/79e0ae364049cd60a3e49c593e4a7f0708340458641d5e605d73b998c6ada8df?apiKey=5675ca76094a4dbb93b999b9c5c7677d&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/79e0ae364049cd60a3e49c593e4a7f0708340458641d5e605d73b998c6ada8df?apiKey=5675ca76094a4dbb93b999b9c5c7677d&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/79e0ae364049cd60a3e49c593e4a7f0708340458641d5e605d73b998c6ada8df?apiKey=5675ca76094a4dbb93b999b9c5c7677d&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/79e0ae364049cd60a3e49c593e4a7f0708340458641d5e605d73b998c6ada8df?apiKey=5675ca76094a4dbb93b999b9c5c7677d&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/79e0ae364049cd60a3e49c593e4a7f0708340458641d5e605d73b998c6ada8df?apiKey=5675ca76094a4dbb93b999b9c5c7677d&"
          className={styles.img}
        />
        <div className={styles.cardBody}>
          <div className={styles.cardBodyName}>
            <div className={styles.lecturName}>梅開五福-採摘體驗</div>
            <button className="btn btn-like"><FaRegHeart /></button>
          </div>
          <div className={styles.cardBodyArea}>
            <div className={styles.lecturText}>教師名字</div>
            <div className={styles.lecturText}>2024/5/20</div>
          </div>
          <div className={styles.cardBodyArea}>
            <div className={styles.lecturText}>
              評價 : 4.8 <AiFillStar />
            </div>
          </div>
          <div className={styles.cardBodyArea}>
            <div className={styles.lecturText}>體驗人數：1000人</div>
            <div className="btn btn-detail">課程詳細資訊</div>
          </div>
        </div>
      </div>
    </>
  )
}
