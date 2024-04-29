import * as React from 'react'
import styles from './teacherlecture.module.css'
import { FaRegHeart } from "react-icons/fa";

export default function TeacherLectureCard() {
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
                        <div className={styles.lectureName}>梅開五福-採摘體驗</div>
                        <button className="width-25 btn btn-like"><FaRegHeart /></button>
                    </div>
                    <div className={styles.cardBodyArea}>
                        <div className="flex gap-2.5 font-medium">
                            <div className={styles.lectureText}><img
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/d3c2f7f38bd5ecac06bed75055428d2f11131e5b875663805124a8c6c6b704c4?"
                                className={styles.icon}
                            /> 體驗人數：1000人</div>
                        </div>
                        <div className={styles.lectureText}>2024/5/20</div>
                    </div>
                    <div className={styles.cardBodyPrice}>
                        <div className={styles.priceText}>NT：888</div>
                        <button className="btn btn-main">
                            加入購物車
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
