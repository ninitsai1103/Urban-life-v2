import React from 'react'
import styles from '../cart/info-pay.module.css'
import Image from 'next/image'
export default function OrderCard() {
  return (
    <>
      {/* 訂單card */}
      <div className="col-12 ">
        <div className="card mb-3">
          <div className="row pb-2">
            <div className="col-6">訂單ID</div>
            <div className="col-6">#24535_63224</div>
          </div>
          <div className="row pb-2">
            <div className="col-6">訂單日期</div>
            <div className="col-6">October 17,2023</div>
          </div>
          <div className="row pb-2">
            <div className="col-6">金額</div>
            <div className="col-6">$1256</div>
          </div>
          <div className="button">
            <a className="btn btn-icon">查看訂單細節</a>
            <a className="btn btn-icon">訂單評價</a>
          </div>
        </div>
      </div>
      {/* 訂單細節 */}
      <div className="col-12 ">
        <div className="card mb-3">
          <div className="text-center">
            <p style={{ fontSize: '36px' }}>#3456_768</p>
            <p style={{ fontSize: '14px' }}>2024/4/2,3:00pm</p>
          </div>
          <hr />
          <div className="">
            <table>
              <tbody className="table-group-divider">
                <tr className="align-middle">
                  <td className="w-50">
                    <div className="d-flex align-items-center">
                      <div className="img me-3">
                        <Image
                          src="/images/product/slide/t1.jpg"
                          width={30}
                          height={30}
                        />
                      </div>
                      <div className="ps-sm-2">
                        <div className={styles.name}>商品名稱</div>
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
          </div>
          <hr />
          <div className="row text-center">
            <div className="col-12 ">
              <div className="fw-bold" style={{ fontSize: '20px' }}>
                選擇送貨及付款方式
              </div>
              <div>送貨地點</div>
              <div>桃園市中壢區陸光五街65號-71號</div>
              <div>付款方式</div>
              <div>信用卡</div>
              <hr />
            </div>
            <div className="col-12">
              <div>共 13 件</div>
              <div className="">
                <div>小計： 78424元</div>
                <div>運費： 60元</div>
                <div>優惠券折扣： - 60元</div>

                <div>總金額： 78424元</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* 訂單評價 */}
      <div className="col-12">
        <div className='text-center pb-3'>
        <div className="card mb-3">
          <div>評價</div>
          <div className="">
            <span className="good-style">&#9733;</span>
            <span>&#9733;</span>
            <span>&#9733;</span>
            <span>&#9733;</span>
            <span>&#9733;</span>
          </div>
          <div>
            <div className="">詳細評價</div>
            <textarea className="form-control" rows="4"></textarea>
          </div>
          <div className='mt-2'>
          <button type="button" className="btn btn-main">
                送出評價
              </button>
          </div>
         
        </div>
        </div>
      </div>
      <style jsx>{`
        table {
          border-collapse: none;
        }
        .img {
          width: 80px;
          height: 80px;
        }
        .card {
          border-radius: 8px;
          padding: 10px;
        }
        .button {
          display: flex;
          gap: 1rem;
          justify-content: center;
        }
      `}</style>
    </>
  )
}
