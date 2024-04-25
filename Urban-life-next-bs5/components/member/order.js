import { useState } from 'react'
import styles from '../cart/info-pay.module.css'
import Image from 'next/image'
export default function Order() {
  // 點按時的評分，一開始是0分代表沒有評分
  const [rating, setRating] = useState(0)
  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">訂單ID</th>
            <th scope="col">訂單日期</th>
            <th scope="col">金額</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr className="align-middle tab">
            <td>#24535_63224</td>
            <td>October 17,2023</td>
            <td>$1256</td>
            <td>
              <div className="button">
                <button
                  className="btn btn-icon"
                  type="button"
                  data-bs-toggle="modal"
                  data-bs-target="#Detail"
                >
                  查看訂單細節
                </button>
               
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      {/* Detail */}
      <div
        className="modal fade"
        id="Detail"
        tabIndex={-1}
        aria-labelledby="DetailLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered ">
          <div className="modal-content modal-content-padding">
            <div className="modal-header border-0">
              <div className="modal-title fs-5" id="Detail">
                <p style={{ fontSize: '36px' }}>#3456_768</p>
                <p style={{ fontSize: '14px' }}>2024/4/2,3:00pm</p>
              </div>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <p style={{ fontSize: '14px' }}>訂單資訊</p>
              {/*訂單資訊 */}
              <table className="table">
                <thead>
                  <tr>
                    <th>商品</th>
                    <th className={styles.d_td}>單價</th>
                    <th className={styles.d_td}>數量</th>
                    <th className="text-center">小計</th>
                    <th></th>
                  </tr>
                </thead>
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
                          {/* <div className={styles.d_cell_price}>
                            單價：NTD 100
                          </div>
                          <div className={styles.d_cell_amount}>
                            <span> 數量 </span>
                          </div> */}
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
                    <td> <button
                  className="btn btn-icon"
                  type="button"
                  data-bs-toggle="modal"
                  data-bs-target="#Rate"
                >
                  商品評價
                </button></td>
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
                        <div className="img me-3">
                          <Image
                            src="/images/product/slide/t1.jpg"
                            width={30}
                            height={30}
                          />
                        </div>
                        <div className="ps-sm-2">
                          <div className={styles.name}>商品名稱</div>
                          {/* <div className={styles.d_cell_price}>
                            單價：NTD 100
                          </div>
                          <div className={styles.d_cell_amount}>
                            <span> 數量 </span>
                          </div> */}
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
              <div className="row">
                <div className="col-6">
                  <div className='fw-bold' style={{ fontSize: '20px' }}>選擇送貨及付款方式</div>
                  <div>送貨地點</div>
                  <div>桃園市中壢區陸光五街65號-71號</div>
                  <div>付款方式</div>
                  <div>信用卡</div>
                </div>
                <div className="col-6">
                  <div>共 13 件</div>
                  {/* <div className="text-end">
                    <div>小計： 78424元</div>
                    <div>運費： 60元</div>
                    <div>優惠券折扣： - 60元</div>
                    <hr />
                    <div>總金額： 78424元</div>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Rate*/}
      <div
        className="modal fade"
        id="Rate"
        tabIndex={-1}
        aria-labelledby="RateLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered ">
          <div className="modal-content modal-content-padding">
            <div className="modal-header border-0">
              <div className="header-title">商品名稱-評價</div>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <div className="rate-star">
                <div className="body-title">評價</div>
                <div className="">
                  <span className="good-style">&#9733;</span>
                  <span>&#9733;</span>
                  <span>&#9733;</span>
                  <span>&#9733;</span>
                  <span>&#9733;</span>
                </div>
              </div>
              <div>
                <div className="body-title">詳細評價</div>
                <textarea className="form-control" rows="4"></textarea>
              </div>
            </div>
            <div className="modal-footer d-flex justify-content-center border-0">
              <button type="button" className="btn btn-main">
                送出評價
              </button>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .img {
          width: 80px;
          height: 80px;
        }
        .button {
          display: flex;
          gap: 1rem;
          justify-content: center;
        }
        .modal-content-padding {
          padding: 20px 50px;
        }
        .header-title {
          font-size: 24px;
          font-weight: bold;
          margin: 0;
        }
         {
          /* modat-rate */
        }
        .body-title {
          color: #6c7275;
          font-size: 16px;
        }
        .rate-star {
          margin-bottom: 10px;
        }
        .good-style {
          color: #f7871b;
        }
      `}</style>
    </>
  )
}
