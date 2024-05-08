import * as React from 'react'
import styles from './article-card.module.css'
import { FaRegHeart } from 'react-icons/fa'

export default function ArticleCard() {
  return (
    <>
      <div className={styles.card}>
        <div className="flex">
          <img
            loading="lazy"
            srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/79e0ae364049cd60a3e49c593e4a7f0708340458641d5e605d73b998c6ada8df?apiKey=5675ca76094a4dbb93b999b9c5c7677d&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/79e0ae364049cd60a3e49c593e4a7f0708340458641d5e605d73b998c6ada8df?apiKey=5675ca76094a4dbb93b999b9c5c7677d&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/79e0ae364049cd60a3e49c593e4a7f0708340458641d5e605d73b998c6ada8df?apiKey=5675ca76094a4dbb93b999b9c5c7677d&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/79e0ae364049cd60a3e49c593e4a7f0708340458641d5e605d73b998c6ada8df?apiKey=5675ca76094a4dbb93b999b9c5c7677d&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/79e0ae364049cd60a3e49c593e4a7f0708340458641d5e605d73b998c6ada8df?apiKey=5675ca76094a4dbb93b999b9c5c7677d&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/79e0ae364049cd60a3e49c593e4a7f0708340458641d5e605d73b998c6ada8df?apiKey=5675ca76094a4dbb93b999b9c5c7677d&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/79e0ae364049cd60a3e49c593e4a7f0708340458641d5e605d73b998c6ada8df?apiKey=5675ca76094a4dbb93b999b9c5c7677d&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/79e0ae364049cd60a3e49c593e4a7f0708340458641d5e605d73b998c6ada8df?apiKey=5675ca76094a4dbb93b999b9c5c7677d&"
            className={styles.img}
          />
        </div>
        <div className={styles.cardBody}>
          <div className={styles.cardBodyName}>
            <div className={styles.articleText}>2024-03-12 22:20:54 </div>
            <button className="btn btn-like">
              <FaRegHeart />
            </button>
          </div>
          <div className={styles.cardBodyArea}>
            <div className={styles.articleName}>
              植物真好重 我根本不知道打甚麼
            </div>
          </div>
          <div className={styles.cardBodyPrice}>
            <div></div>
            <button className="btn btn-main">開始閱讀</button>
          </div>
        </div>
      </div>
    </>
  )
}
