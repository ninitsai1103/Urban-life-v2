import * as React from 'react'
import styles from './teacherallInfo.module.css'

export default function TeacherAllInfo() {
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
                    <div className={styles.teachername}>講師姓名</div>
                    <div className={styles.cardBodyArea}>
                        <div className={styles.email}>
                            Email：nini@test.com
                        </div>
                        <div className={styles.phone}>電話： 0920-424-424</div>
                        <div className={styles.teacherinfo}>
                            講師簡介：
                            <br />
                            講師簡介講師簡介講師簡介講師簡介講師簡介講師簡介講師簡介講師簡介講師簡介講師簡介講師簡介講師簡介講師簡介講師簡介講師簡介講師簡介講師簡介講師簡介講師簡介講師簡介講師簡介講師簡介講師簡介講師簡介講師簡介講師簡介講師簡介講師簡介講師簡介講師簡介講師簡介講師簡介講師簡介講師簡介講師簡介講師簡介講師簡介講師簡介
                            講師簡介講師簡介講師簡介講師簡介講師簡介講師簡介講師簡介講師簡介講師簡介講師簡介講師簡介講師簡介講師簡介講師簡介講師簡介講師簡介講師簡介講師簡介講師簡介講師簡介講師簡介講師簡介講師簡介講師簡介講師簡介講師簡介講師簡介講師簡介講師簡介講師簡介講師簡介講師簡介講師簡介講師簡介講師簡介講師簡介講師簡介講師簡介講師簡介講師簡介講師簡介講師簡介講師簡介講師簡介講師簡介
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
