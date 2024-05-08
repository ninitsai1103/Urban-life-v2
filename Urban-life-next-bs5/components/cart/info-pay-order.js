import { useState,useEffect } from 'react'
import styles from './cart-checkout.module.css'

export default function InfoPayOrder() {
  const [checkedInfo, setCheckedInfo] = useState([])
  useEffect(() => {
    const CheckedInfo = window.localStorage.getItem('Checked-info')
    setCheckedInfo(JSON.parse(CheckedInfo))
  }, [])
  return (
    <>
      <h4 className='bg-primary1 text-light p-2 mt-2'>訂單內容</h4>
      {checkedInfo.filter((item) => item.pdlt_id === 1).length > 0 &&
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
        {checkedInfo.filter((item) => item.pdlt_id === 1).map((item) => (
          <tr className="align-middle" key={item.id}>
            <td className="w-50">
              <div className="d-flex align-items-center">
                <div className={styles.d_img}>
                  <img
                    src={item.cover}
                    className="img-fluid"
                  />
                </div>
                <div className="ps-sm-2">
                  <div className={styles.name}>{item.name} ({item.size})</div>
                  <div className={styles.d_cell_price}>單價：NTD {item.price}</div>
                  <div className={styles.d_cell_amount}>
                    <span>數量 {item.qty} </span>
                  </div>
                </div>
              </div>
            </td>
            <td className={styles.d_td}>
              <div className={styles.d_cell}>NTD {item.price}</div>
            </td>
            <td className={styles.d_td}>
              <span> {item.qty} </span>
            </td>
            <td className="text-center">NTD {item.price}</td>
          </tr>
        ))}
        </tbody>
      </table>
      }
      {checkedInfo.filter((item) => item.pdlt_id === 2).length > 0 && (
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
        {checkedInfo.filter((item) => item.pdlt_id === 2).map((item) => (
          <tr className="align-middle" key={item.id}>
            <td className="w-50">
              <div className="d-flex align-items-center">
                <div className={styles.d_img}>
                  <img
                    src={item.cover}
                    className="img-fluid"
                  />
                </div>
                <div className="ps-sm-2">
                  <div className={styles.name}>{item.name} ({item.starting_date})</div>
                  <div className={styles.d_cell_price}>單價：NTD {item.price}</div>
                  <div className={styles.d_cell_amount}>
                    <span>數量 {item.qty} </span>
                  </div>
                </div>
              </div>
            </td>
            <td className={styles.d_td}>
              <div className={styles.d_cell}>NTD {item.price}</div>
            </td>
            <td className={styles.d_td}>
              <span> {item.qty} </span>
            </td>
            <td className="text-center">NTD {item.price}</td>
          </tr>
        ))}
        </tbody>
      </table>
      )}
    </>
  )
}
