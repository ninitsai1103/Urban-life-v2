import { useState } from 'react'

import styles from './star.module.css'

import Image from 'next/image'

export default function Order({
  order_id,
  user_id,
  pay,
  order_code,
  name,
  phone,
  address,
  email,
  total,
  date,
  coupon_id,
  items,
}) {
  // 點按時的評分，一開始是0分代表沒有評分
  const [rating, setRating] = useState(0)
  // 滑鼠游標懸停(hover)時候使用，一開始是0分代表沒有評分
  const [hoverRating, setHoverRating] = useState(0)

  // 商品評論的狀態
  const [productComment, setProductComment] = useState('')
  // 課程評論的狀態
  const [lectureComment, setLectureComment] = useState('')

  const handleProductTextAreaChange = (e) => {
    setProductComment(e.target.value)
  }
  const handleLectureTextAreaChange = (e) => {
    setLectureComment(e.target.value)
  }

  // 控制MODAL的開關
  const [modalIsOpen, setModalIsOpen] = useState(false)

  const openModal = () => {
    setModalIsOpen(true)
  }

  const closeModal = () => {
    setModalIsOpen(false)
  }

  return (
    <>
      <tbody>
        <tr className="align-middle tab">
          <td>{order_code}</td>
          <td>{new Date(date).toISOString().slice(0, 19).replace('T', ' ')}</td>
          <td>{total}</td>
          <td>
            <div className="button">
              <button
                className="btn btn-main"
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

      {/* 訂單細節的Modal */}
      <div
        className="modal fade"
        id="Detail"
        tabIndex={-1}
        aria-labelledby="DetailLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered ">
          <div className="modal-content modal-content-padding">
            <div className="modal-header border-0 p-0 px-3">
              <div className="modal-title fs-5" id="Detail">
                <p className="m-0" style={{ fontSize: '36px' }}>
                  {order_code}
                </p>
                <p style={{ fontSize: '14px' }}>
                  {new Date(date).toISOString().slice(0, 19).replace('T', ' ')}
                </p>
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
                    <th className="font-weight-bold p-0 px-2">商品</th>
                    {/* <th className={styles.d_td}>單價</th>
                    <th className={styles.d_td}>數量</th>
                    <th className="text-center">小計</th> */}
                  </tr>
                </thead>
                <tbody className="table-group-divider">
                  <tr className="align-middle ">
                    <td className="w-50">
                      <div className="d-flex align-items-center">
                        <div className="img me-3">
                          <Image
                            alt="product"
                            src="/images/product/product_img/Pi2401260932.jpg"
                            width={30}
                            height={30}
                          />
                        </div>
                        <div className="ps-sm-2">
                          <div>商品名稱</div>
                          {/* <div className={styles.d_cell_price}>
                            單價：NTD 100
                          </div>
                          <div className={styles.d_cell_amount}>
                            <span> 數量 </span>
                          </div> */}
                        </div>
                      </div>
                    </td>
                    <td>
                      <div>NTD 100</div>
                    </td>
                    <td>
                      <span> 數量 </span>
                    </td>
                    <td className="text-center">NTD 100</td>
                    <td>
                      <button
                        className="btn btn-main"
                        type="button"
                        data-bs-toggle="modal"
                        data-bs-target="#ProductRate"
                      >
                        商品評價
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table className="table">
                <thead>
                  <tr>
                    <th className="font-weight-bold p-0 px-2">課程</th>
                    {/* <th className={styles.d_td}>單價</th>
                    <th className={styles.d_td}>數量</th>
                    <th className="text-center">小計</th> */}
                  </tr>
                </thead>
                <tbody className="table-group-divider">
                  <tr className="align-middle">
                    <td className="w-50">
                      <div className="d-flex align-items-center">
                        <div className="img me-3">
                          <Image
                            alt="product"
                            src="/images/product/product_img/Pi2401260932.jpg"
                            width={30}
                            height={30}
                          />
                        </div>
                        <div className="ps-sm-2">
                          <div>商品名稱</div>
                          {/* <div className={styles.d_cell_price}>
                            單價：NTD 100
                          </div>
                          <div className={styles.d_cell_amount}>
                            <span> 數量 </span>
                          </div> */}
                        </div>
                      </div>
                    </td>
                    <td>
                      <div>NTD 100</div>
                    </td>
                    <td>
                      <span> 數量 </span>
                    </td>
                    <td className="text-center">NTD 100</td>
                    <td>
                      {' '}
                      <button
                        className="btn btn-main"
                        type="button"
                        data-bs-toggle="modal"
                        data-bs-target="#LectureRate"
                      >
                        課程評價
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="d-flex justify-content-end">
                <div>共 13 件</div>
              </div>
              <div className="row my-3">
                <div className="col-5">
                  <div
                    className="fw-bold  px-2 mb-1"
                    style={{ fontSize: '20px' }}
                  >
                    選擇送貨及付款方式
                  </div>
                  <div className=" px-2 mb-1">送貨地點 </div>
                  <div className=" px-2 mb-2">
                    桃園市中壢區陸光五街65號-71號
                  </div>
                  <div className=" px-2 mb-1">付款方式</div>
                  <div className=" px-2 mb-2">信用卡</div>
                </div>
                <div className="col-2"></div>
                <div className="col-5">
                  <div className="fw-bold mb-1" style={{ fontSize: '20px' }}>
                    訂單總額
                  </div>
                  <div className="">
                    <div className="mb-1 d-flex justify-content-between">
                      <div>小計：</div>
                      <div>78424元</div>
                    </div>
                    <div className="mb-1 d-flex justify-content-between">
                      <div>運費：</div>
                      <div> 60元</div>
                    </div>
                    <div className="mb-2 d-flex justify-content-between">
                      <div>優惠券折扣：</div>
                      <div> - 60元</div>
                    </div>

                    <hr />
                    <div className="mb-1">總金額： 78424元</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* 商品評價Modal */}
      <div
        className="modal fade"
        id="ProductRate"
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
                  {/* STAR RATING */}
                  {Array(5)
                    .fill(1)
                    .map((v, i) => {
                      // 每個按鈕的分數，相當於索引+1
                      const score = i + 1

                      return (
                        <button
                          key={i}
                          className={styles['star-btn']}
                          onClick={() => {
                            // 點按後設定分數
                            setRating(score)
                          }}
                          onMouseEnter={() => {
                            setHoverRating(score)
                          }}
                          onMouseLeave={() => {
                            setHoverRating(0)
                          }}
                        >
                          <span
                            className={
                              score <= rating || score <= hoverRating
                                ? styles['on']
                                : styles['off']
                            }
                          >
                            &#9733;
                          </span>
                        </button>
                      )
                    })}
                </div>
              </div>
              <div>
                <div className="body-title">詳細評價</div>
                <textarea
                  className="form-control"
                  rows="4"
                  value={productComment}
                  onChange={handleProductTextAreaChange}
                ></textarea>
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
      {/* 課程評價Modal */}
      <div
        className="modal fade"
        id="LectureRate"
        tabIndex={-1}
        aria-labelledby="RateLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered ">
          <div className="modal-content modal-content-padding">
            <div className="modal-header border-0">
              <div className="header-title">課程名稱-評價</div>
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
                  {/* STAR RATING */}
                  {Array(5)
                    .fill(1)
                    .map((v, i) => {
                      // 每個按鈕的分數，相當於索引+1
                      const score = i + 1

                      return (
                        <button
                          key={i}
                          className={styles['star-btn']}
                          onClick={() => {
                            // 點按後設定分數
                            setRating(score)
                          }}
                          onMouseEnter={() => {
                            setHoverRating(score)
                          }}
                          onMouseLeave={() => {
                            setHoverRating(0)
                          }}
                        >
                          <span
                            className={
                              score <= rating || score <= hoverRating
                                ? styles['on']
                                : styles['off']
                            }
                          >
                            &#9733;
                          </span>
                        </button>
                      )
                    })}
                </div>
              </div>
              <div>
                <div className="body-title">詳細評價</div>
                {/* 課程評論的欄位 */}
                <textarea
                  className="form-control"
                  rows="4"
                  value={lectureComment}
                  onChange={handleLectureTextAreaChange}
                ></textarea>
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
