import React from 'react'
import styles from './cart-checkout.module.css'

export default function InfoPayOrder() {
  return (
    <>
      <h4 className='bg-primary1 text-light p-2 mt-2'>訂單內容</h4>
      <table className="table">
        <thead>
          <tr>
            <th>商品</th>
            <th className={styles.d_td}>單價</th>
            <th className={styles.d_td}>數量</th>
            <th className="text-center">小計</th>
          </tr>
        </thead>
        <tbody className="table-group-divider">
          <tr className="align-middle">
            <td className="w-50">
              <div className="d-flex align-items-center">
                <div className={styles.d_img}>
                  <img
                    src="/images/product/slide/t1.jpg"
                    className="img-fluid"
                  />
                </div>
                <div className="ps-sm-2">
                  <div className={styles.name}>商品名稱</div>
                  <div className={styles.d_cell_price}>單價：NTD 100</div>
                  <div className={styles.d_cell_amount}>
                    <span> 數量 </span>
                  </div>
                </div>
              </div>
            </td>
            <td className={styles.d_td}>
              <div className={styles.d_cell}>NTD 100</div>
            </td>
            <td className={styles.d_td}>
              <span> 數量 </span>
            </td>
            <td className="text-center">NTD 100</td>
          </tr>
        </tbody>
      </table>
      <table className="table">
        <thead>
          <tr>
            <th>課程</th>
            <th className={styles.d_td}>單價</th>
            <th className={styles.d_td}>數量</th>
            <th className="text-center">小計</th>
          </tr>
        </thead>
        <tbody className="table-group-divider">
          <tr className="align-middle">
            <td className="w-50">
              <div className="d-flex align-items-center">
                <div className={styles.d_img}>
                  <img
                    src="/images/product/slide/t1.jpg"
                    className="img-fluid"
                  />
                </div>
                <div className="ps-sm-2">
                  <div className={styles.name}>課程名稱</div>
                  <div className={styles.d_cell_price}>單價：NTD 100</div>
                  <div className={styles.d_cell_amount}>
                    數量
                  </div>
                </div>
              </div>
            </td>
            <td className={styles.d_td}>
              <div className={styles.d_cell}>NTD 100</div>
            </td>
            <td className={styles.d_td}>
              數量
            </td>
            <td className="text-center">NTD 100</td>
          </tr>
        </tbody>
      </table>
    </>
  )
}
