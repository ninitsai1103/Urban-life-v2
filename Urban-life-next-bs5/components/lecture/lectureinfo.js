import * as React from 'react'
import styles from './lectureinfo.module.css'
import { TbStarFilled } from 'react-icons/tb'
import { BsCart3 } from 'react-icons/bs'
import { GoHeart } from 'react-icons/go'
import { UseLecture } from '@/hooks/use-lecture'

export default function LectureInfo() {
  return (
    <>
      <div className={styles.infocard}>
        <div className={styles.lecturename}>生機農法-插秧體驗</div>
        <div className={styles.infotext}>
          鋤禾日當午，汗滴禾下土，體驗非機械式插秧，以雙手和雙腳深刻體驗土地的活力~!
          <div className={`${styles.infotext} pt-4`}>※請詳閱下方購課須知</div>
        </div>
        <div className={styles.infogroup}>
          <div className={styles.info}>
            <div className={styles.infotext}>NT： 888 </div>
            <div className="">
              <div className={styles.infotext}><img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/d3c2f7f38bd5ecac06bed75055428d2f11131e5b875663805124a8c6c6b704c4?"
                className={styles.icon}
              /> 體驗人數：1000人</div>
            </div>
            <div className="flex gap-2.5">
              <div className={styles.infotext}>
                評價 : 4.8 <TbStarFilled style={{ color: '#F6A404', fontSize: '20px' }} />
              </div>
            </div>
            <div className={styles.infotext}>已報名人數：</div>
          </div>
          <div className={styles.info}>
            <div className={styles.infotext}>開始報名</div>
            <div className={styles.infotext}>報名截止</div>
            <div className={styles.infotext}>上課日期</div>
            <div className={styles.infotext}>上課時間</div>
          </div>
        </div>
        <div className="input-group mb-1 w-75">
          <div className={styles.infotext}>報名人數：</div>
        </div>
        
        <div>
          <div className={styles.btnarea}>
            <button className="btn btn-add px-5 py-2">
              <BsCart3 className="me-2 " style={{ fontSize: '20px' }} />
              加入購物車
            </button>
            <button className="btn btn-add px-5 py-2">
              <GoHeart className="me-2" style={{ fontSize: '20px' }} />
              加入收藏
            </button>
          </div>
        </div>
        
      </div>
    </>
  )
}
