import * as React from 'react'
import styles from './message-card.module.css' 

export default function MessageCard() {
    return (
        <>
            <div className={styles.messagecard}>
                <div className={styles.cardBody}>
                    <div className="flex flex-col w-[16%] max-md:ml-0 max-md:w-full">
                        <div className={styles.stdbody}>
                            <img className={styles.img} />
                            <div className={styles.stdName}>王小明</div>
                        </div>
                    </div>
                    <div className="flex flex-col ml-5 w-[84%] max-md:ml-0 max-md:w-full">
                        <div className="flex flex-col grow max-md:mt-8 max-md:max-w-full">
                            <div className={styles.time}>
                                2024/04/24 11:03
                            </div>
                            <div className={styles.message}>
                                COMMENT美貓校學元肉荷怎天兌裝主化麼杯三有，士雪着原公具。娘國鴨讀里美細蛋乙送爬用占，亮讀拉來方蛋抓和固，以枝停候穴以古馬鴨安是明歌起錯隻扒石止珠，子道呢。新冰第躲話。寺荷麻巾員告要氣又教不枝童，室休頁話早汗跑斥買禾昌事英欠鳥珠！歌路別想？動雨助土尼枝才屋村？紅光羽。交已朵相花位常那個乍澡山肉畫，安乞背乞三汁，巾找中做雪孝已忍在造喜吹六娘習昔要。現細個書采王音。右頭事員爬歌。
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}