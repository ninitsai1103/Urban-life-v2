import React from 'react'
import Step from '@/components/cart/step'
import styles from '@/components/cart/cart.module.css'

export default function DonePage() {
  return (
    <>
      <div className="container pt-3">
        <h2 className="text-center text-primary5">訂單完成</h2>
        <div className="d-flex justify-content-evenly mb-3">
          <Step step="1" title="購物車" circle_color={styles.circle_color_progressing}/>
          <Step step="2" title="填寫資料" circle_color={styles.circle_color_progressing} />
          <Step step="3" title="完成訂單" circle_color={styles.circle_color_progressing}/>
        </div>
        <div className='d-flex flex-column align-items-center'>
          <div className={styles.done_card}>
            <h4 className="text-center">感謝您的訂購</h4>
            <div className="text-center text-grey-700">訂單編號</div>
            <div className="text-center text-grey-700">訂單完成時間</div>
            <img src="/images/cart/character_danbo-ru_walk.png" alt="完成" className='img-fluid'/>
          </div>
          <div className="text-center my-3">
            <button className="btn btn-main me-3">回到首頁</button>
            <button className="btn btn-main">繼續購物</button>
          </div>
        </div>
      </div>
    </>
  )
}
