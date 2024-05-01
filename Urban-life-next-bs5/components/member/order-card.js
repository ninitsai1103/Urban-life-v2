import React from 'react'
import styles from '../cart/info-pay.module.css'
import Image from 'next/image'
export default function OrderCard() {
  return (
    <>
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
      {/* 訂單細節的Modal */}
      <div
        className="modal fade"
        id="MobileDetail"
        tabIndex={-1}
        aria-labelledby="DetailLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered ">
          <div className="modal-content modal-content-padding">
            <div className="modal-header border-0 p-0 px-3">
              <div className="modal-title fs-5" id="Detail">
                <p className="m-0" style={{ fontSize: '36px' }}>
                  3456_768
                </p>
                <p style={{ fontSize: '14px' }}>2024/04/23:00pm</p>
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

      {/* 訂單card */}
      <div className="col-12 ">
        <div className="card mb-3">
          <div className="row px-3 pt-3 pb-2">
            <div className="col-6">訂單ID</div>
            <div className="col-6">#24535_63224</div>
          </div>
          <div className="row pb-2 px-3">
            <div className="col-6">訂單日期</div>
            <div className="col-6">October 17,2023</div>
          </div>
          <div className="row pb-2 px-3">
            <div className="col-6">金額</div>
            <div className="col-6">$1256</div>
          </div>
          <div className="button mt-3 mb-2 d-flex justify-content-end">
            <button
              className="btn btn-main"
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#MobileDetail"
            >
              訂單細節
            </button>
          </div>
        </div>
      </div>

      

      {/* 訂單細節 */}
      {/* <div className="col-12 ">
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
                          src="/images/product/product_img/Pi2401260932.jpg"
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
      </div> */}
      {/* 訂單評價 */}
      {/* <div className="col-12">
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
      </div> */}
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
