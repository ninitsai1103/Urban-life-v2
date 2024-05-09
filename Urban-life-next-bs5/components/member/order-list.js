import { useEffect, useState } from 'react'

import styles from './star.module.css'

import Image from 'next/image'

// 評價的MODAL
import ProductRating from './product-rating-modal'
import LectureRating from './lecture-rating-modal'

export default function Order({ order }) {
  const {
    id,
    order_id,
    user_id,
    name,
    order_code,
    date,
    items,
    phone,
    address,
    email,
    total,
    coupon_id,
    pay,
  } = order

  // // 點按時的評分，一開始是0分代表沒有評分
  // const [productRating, setProductRating] = useState(0)
  // // 點按時的評分，一開始是0分代表沒有評分
  // const [lectureRating, setLectureRating] = useState(0)
  // // 滑鼠游標懸停(hover)時候使用，一開始是0分代表沒有評分
  // const [hoverRating, setHoverRating] = useState(0)
  // // 商品評論的狀態
  // const [productComment, setProductComment] = useState('')
  // // 課程評論的狀態
  // const [lectureComment, setLectureComment] = useState('')

  // const handleProductTextAreaChange = (e) => {
  //   setProductComment(e.target.value)
  // }
  // const handleLectureTextAreaChange = (e) => {
  //   setLectureComment(e.target.value)
  // }

  // 每個商品與課程都有獨立的評分狀態
  const [productRatings, setProductRatings] = useState({})
  const [lectureRatings, setLectureRatings] = useState({})
  const [productComments, setProductComments] = useState({})
  const [lectureComments, setLectureComments] = useState({})

  const handleProductRatingChange = (itemName, rating) => {
    setProductRatings({ ...productRatings, [itemName]: rating })
  }

  const handleLectureRatingChange = (itemName, rating) => {
    setLectureRatings({ ...lectureRatings, [itemName]: rating })
  }

  const handleProductCommentChange = (itemName, comment) => {
    setProductComments({ ...productComments, [itemName]: comment })
  }

  const handleLectureCommentChange = (itemName, comment) => {
    setLectureComments({ ...lectureComments, [itemName]: comment })
  }

  // 獲取商品資料
  // const { products } = useProducts()

  const totalAmount = items.reduce((acc, item) => {
    return acc + 1
  }, 0)

  // useEffect(() => {
  //   // 狀態更新後執行的操作
  //   console.log('Product rating updated:', productRating)
  // }, [productRating])

  return (
    <>
      <tbody>
        <tr className="align-middle tab">
          <td>{order_id}</td>
          <td>{new Date(date).toISOString().slice(0, 19).replace('T', ' ')}</td>
          <td>{total}</td>
          <td>
            <div className="button">
              <button
                className="btn btn-main"
                type="button"
                data-bs-toggle="modal"
                data-bs-target={`#Detail${address}`}
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
        id={`Detail${address}`}
        tabIndex={-1}
        aria-labelledby="DetailLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered ">
          <div className="modal-content modal-content-padding">
            <div className="modal-header border-0 p-0 px-3">
              <div className="modal-title fs-5" id="Detail">
                <p className="m-0" style={{ fontSize: '36px' }}>
                  {order_id}
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
                  <tr className="border-bottom border-black">
                    <th className="p-0 px-2">商品</th>
                    <th className=" p-0 px-2">單價</th>
                    <th className=" p-0 px-2">數量</th>
                    <th className=" p-0 px-2">小計</th>
                    <th></th>
                  </tr>
                </thead>
                {/* 訂單購買的商品 */}
                {items.map((item) => {
                  if (item.pdlt_id === 1) {
                    return (
                      <tbody key={item.id}>
                        <tr className="align-middle ">
                          <td className="w-50">
                            <div className="d-flex align-items-center">
                              <div className="img me-3">
                                <Image
                                  alt={item.cover}
                                  src={`/images/product/product_cover/${item.cover}`}
                                  width={30}
                                  height={30}
                                />
                              </div>
                              <div className="ps-sm-2">
                                <div>{item.name}</div>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div>NTD {item.price}</div>
                          </td>
                          <td className="text-center">
                            <span> {item.amount} </span>
                          </td>
                          <td className="text-center">
                            NTD {item.price * item.amount}
                          </td>
                          <td>
                            {/* <button
                              className="btn btn-main"
                              type="button"
                              data-bs-toggle="modal"
                              data-bs-target="#ProductRate"
                            >
                              商品評價
                            </button> */}
                            <ProductRating
                              itemId={item.id}
                              itemName={item.name}
                              rating={productRatings[item.name] || 0}
                              comment={productComments[item.name] || ''}
                              onRatingChange={handleProductRatingChange}
                              onCommentChange={handleProductCommentChange}
                            ></ProductRating>
                          </td>
                        </tr>
                      </tbody>
                    )
                  }
                })}
              </table>
              <table className="table">
                <thead>
                  <tr className="border-bottom border-black">
                    <th className="font-weight-bold p-0 px-2">課程</th>
                    <th className="font-weight-bold p-0 px-2">單價</th>
                    <th className="font-weight-bold p-0 px-2">數量</th>
                    <th className="font-weight-bold p-0 px-2">小計</th>
                    <th></th>
                  </tr>
                </thead>
                {/* 訂單購買的課程 */}
                {items.map((item) => {
                  if (item.pdlt_id === 2) {
                    return (
                      <tbody key={item.id}>
                        <tr className="align-middle">
                          <td className="w-50">
                            <div className="d-flex align-items-center">
                              <div className="img me-3">
                                <Image
                                  alt="product"
                                  src={`/images/lecture/lecture_img/${item.cover}`}
                                  width={30}
                                  height={30}
                                />
                              </div>
                              <div className="ps-sm-2">
                                <div>{item.name}</div>
                              </div>
                            </div>
                          </td>
                          <td className="text-center">
                            <div>NTD {item.price}</div>
                          </td>
                          <td className="text-center">
                            <span> {item.amount} </span>
                          </td>
                          <td className="text-center">
                            NTD {item.price * item.amount}
                          </td>
                          <td>
                            {/* <button
                              className="btn btn-main"
                              type="button"
                              data-bs-toggle="modal"
                              data-bs-target="#LectureRate"
                            >
                              課程評價
                            </button> */}
                            <LectureRating
                              itemId={item.id}
                              itemName={item.name}
                              rating={lectureRatings[item.name] || 0}
                              comment={lectureComments[item.name] || ''}
                              onRatingChange={handleLectureRatingChange}
                              onCommentChange={handleLectureCommentChange}
                            ></LectureRating>
                          </td>
                        </tr>
                      </tbody>
                    )
                  }
                })}
              </table>
              <div className="d-flex justify-content-end">
                <div>共 {totalAmount} 件</div>
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
                  <div className=" px-2 mb-2">{address}</div>
                  <div className=" px-2 mb-1">付款方式</div>
                  <div className=" px-2 mb-2">{pay}</div>
                </div>
                <div className="col-2"></div>
                <div className="col-5">
                  <div className="fw-bold mb-1" style={{ fontSize: '20px' }}>
                    訂單總額
                  </div>
                  <div className="">
                    <div className="mb-1 d-flex justify-content-between">
                      <div>小計：</div>
                      <div>{total}元</div>
                    </div>

                    <div className="mb-1 d-flex justify-content-between">
                      <div>運費：</div>
                      {total < 1000 ? (
                        <>
                          <div> 60元</div>
                        </>
                      ) : (
                        <div>0元</div>
                      )}
                    </div>
                    <div className="mb-2 d-flex justify-content-between">
                      {coupon_id !== 0 ? (
                        <>
                          <div>優惠券折扣：</div>
                          <div> - 60元</div>
                        </>
                      ) : (
                        <div></div>
                      )}
                    </div>

                    <hr />
                    <div className="mb-1 d-flex justify-content-between">
                      <div>總金額： </div>
                      <div>{total}</div>
                    </div>
                  </div>
                </div>
              </div>
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
