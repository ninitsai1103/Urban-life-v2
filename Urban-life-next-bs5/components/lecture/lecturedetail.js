import * as React from 'react'
import styles from './lecturedetail.module.css'

export default function Lecturedetail() {
    return (
        <>
            <div className={styles.infogroup}>
                <div className={styles.imginfo}>
                    <div>
                    <img src="/images/lecture/lecture_1.jpg" />
                    </div>
                    <div>
                    <img src="/images/lecture/lecture_2.jpg" />
                    </div>
                    <div>
                    <img src="/images/lecture/lecture_3.jpg" />
                    </div>
                    <div>
                    <img src="/images/lecture/lecture_4.jpg" />
                    </div>
                </div>
                <div className={styles.lectureinfo}>
                    <div className={styles.infotext}>
                        一、認識稻米稻子的一生<br/>
                        1.春天插秧體驗。<br/>
                        2.夏天割稻體驗。<br/>
                        3.秋天及冬天採果，休耕農事體驗。<br/>
                        活動目的<br/>
                        1、讓小朋友認識在地農產品~稻米。<br/>
                        2、了解自然農法對環境生態地助益。<br/>
                        3、在稻米生產種植的農事活動中，體驗農夫地辛勞。<br/>
                        <br/>
                        二、認識稻米文化~米食DIY體驗<br/>
                        1.石磨磨粿體驗<br/>
                        2.手做米苔目米食DIY<br/>
                        活動目的<br/>
                        1.認識傳統米食的製作器具及方法<br/>
                        2.提供小朋友的食農及食品安全的正確觀念<br/>
                        <br/>
                        三、農場餐點~傳統農村午餐<br/>
                        1.自助式~割稻飯<br/>
                        2.吃飽飽碗公飯<br/>
                        活動目的<br/>
                        1.食材得之不易,珍惜食物<br/>
                        <br/>
                        四、鴨子生態導覽解說<br/>
                        1.鴨子生態觀察~按摩小鴨~母鴨孵蛋~餵大鴨<br/>
                        2.撿鴨蛋體驗<br/>
                        活動目的<br/>
                        1.讓小朋友認識在地特色家禽~鴨子生態<br/>
                        2.了解養鴨利用自然農法的益處<br/>
                        3.接近小動物可陶冶小朋友性情<br/>
                        <br/>
                        五、手做紀念品：愛的榖粒~許願瓶DIY<br/>
                        活動目的<br/>
                        1.運用莊園裡收成的榖粒許下自己的願望，然後努力實現<br/>
                    </div>
                </div>
            </div>
        </>
    )
}
