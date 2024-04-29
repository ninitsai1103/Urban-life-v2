import * as React from 'react'
import styles from './card-np.module.css'
import { TbStarFilled } from 'react-icons/tb'
import { FaRegHeart } from "react-icons/fa";

export default function LectureMyCardNp() {
    return (
        <>
            <div className={styles.card}>
                <div className={styles.cardBodyName}>
                    <div className={styles.lectureName}>梅開五福-採摘體驗</div>
                    <button className="btn btn-like"><FaRegHeart /></button>
                </div>
                <div className={styles.cardBodyArea}>
                    <div className={styles.lectureText}>教師名字</div>
                    <div className={styles.lectureText}>2024/5/20</div>
                </div>
                <div className={styles.cardBodyArea}>
                    <div className="flex gap-2.5 font-medium">
                        <div className={styles.lectureText}><img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/d3c2f7f38bd5ecac06bed75055428d2f11131e5b875663805124a8c6c6b704c4?"
                            className={styles.img}
                        /> 體驗人數：1000人</div>
                    </div>
                    <div className={styles.cardBodyArea}>
                        <div className={styles.lectureText}>
                            評價 : 4.8 <TbStarFilled style={{ color: '#F6A404', fontSize: '20px' }} />
                        </div>
                    </div>
                </div>
                <div className={styles.cardBodyPrice}>
                    <div className={styles.priceText}>NT：888</div>
                    <button className="btn btn-main">
                        加入行事曆
                    </button>
                </div>
            </div>
        </>
    )
}
