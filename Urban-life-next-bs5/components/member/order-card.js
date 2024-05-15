import { useEffect, useState } from 'react'

import styles from './star.module.css'

import Image from 'next/image'
export default function OrderCard({ order }) {
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
  // 商品課程評論的資料
  const [comments, setComments] = useState([])

  // 每個商品與課程都有獨立的評分狀態
  const [productRatings, setProductRatings] = useState({})
  const [lectureRatings, setLectureRatings] = useState({})
  const [productComments, setProductComments] = useState({})
  const [lectureComments, setLectureComments] = useState({})

  // 滑鼠游標懸停(hover)時候使用，一開始是0分代表沒有評分
  const [hoverRating, setHoverRating] = useState({})

  // 紀錄當前商品評論的打開狀態
  const [currentProduct, setCurrentProduct] = useState({})
  // 紀錄當前課程評論的打開狀態
  const [currentLecture, setCurrentLecture] = useState({})

  // 獲取評論資料function
  const getComments = async () => {
    let url = 'http://localhost:3005/api/product_lecture_comment'
    try {
      const res = await fetch(url)
      const data = await res.json()

      const newComments = data.data.comments

      setComments(newComments)
      console.log(newComments)

      // newComments.map((newComment) => {
      //   handleProductRatingChange(newComment.name, newComment.star)
      //   handleLectureRatingChange(newComment.name, newComment.star)
      // })

      // 讀取資料的評論內容並設定到狀態裡面
      setProductRatings((prevRatings) => {
        const newRatings = { ...prevRatings }
        newComments.forEach((newComment) => {
          if (newComment.pdlt_id == 1) {
            newRatings[newComment.name] = newComment.star
          }
        })
        return newRatings
      })
      setProductComments((prevRatings) => {
        const newCommentsState = { ...prevRatings }
        newComments.forEach((newComment) => {
          if (newComment.pdlt_id == 1) {
            newCommentsState[newComment.name] = newComment.comment
          }
        })
        return newCommentsState
      })

      setLectureRatings((prevRatings) => {
        const newRatings = { ...prevRatings }
        newComments.forEach((newComment) => {
          if (newComment.pdlt_id === 2) {
            newRatings[newComment.name] = newComment.star
          }
        })
        return newRatings
      })

      setLectureComments((prevRatings) => {
        const newCommentsState = { ...prevRatings }
        newComments.forEach((newComment) => {
          if (newComment.pdlt_id === 2) {
            newCommentsState[newComment.name] = newComment.comment
          }
        })
        return newCommentsState
      })
    } catch (error) {
      console.error('Error fetching comments:', error)
    }
  }

  useEffect(() => {
    getComments()
  }, [])

  const handleHoverRatingChange = (itemName, rating) => {
    setHoverRating({ ...hoverRating, [itemName]: rating })
  }
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

  // 點擊評論按鈕，可以開啟該商品的評論
  const handleShowrating = (itemName) => {
    setCurrentProduct({
      ...currentProduct,
      [itemName]: !currentProduct[itemName],
    })
    setCurrentLecture({
      ...currentLecture,
      [itemName]: !currentLecture[itemName],
    })
  }

  // 提交評論
  const handleSubmit = async (rating, comment, id) => {
    let url = 'http://localhost:3005/api/product_lecture_comment'
    console.log(rating, comment, id)

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: 43,
          star: rating,
          comment: comment,
          product_lecture_id: id,
        }),
      })

      if (!res.ok) {
        throw new Error('Failed to submit comment and rating')
      }
      await getComments()
      const data = await res.json()
      console.log('Comment submitted successfully:', data)
    } catch (error) {
      console.error('Error submitting comment:', error.message)
    }
  }
  const realTotal = items.reduce(
    (total, item) => (total += item.price * item.amount),
    0
  )
  // 統計訂單所有商品
  const totalAmount = items.reduce((acc, item) => {
    return acc + 1
  }, 0)
  return (
    <>
      {/* 訂單card */}
      <div className="col-12 ">
        <div className="card mb-3">
          <div className="row px-3 pt-3 pb-2">
            <div className="col-6 fw-bold">訂單ID</div>
            <div className="col-6">{order_id}</div>
          </div>
          <div className="row pb-2 px-3">
            <div className="col-6 fw-bold">訂單日期</div>
            <div className="col-6">
              {new Date(date).toISOString().slice(0, 19).replace('T', ' ')}
            </div>
          </div>
          <div className="row pb-2 px-3">
            <div className="col-6 fw-bold">金額</div>
            <div className="col-6">{total}</div>
          </div>
          <div className="button mt-3 mb-2 d-flex justify-content-end">
            <button
              className="btn btn-main"
              type="button"
              data-bs-toggle="modal"
              data-bs-target={`#MobileDetail${order_id}`}
            >
              查看訂單細節
            </button>
          </div>
        </div>
      </div>

      {/* 訂單細節的Modal */}
      <div
        className="modal fade"
        id={`MobileDetail${order_id}`}
        tabIndex={-1}
        aria-labelledby="DetailLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-xl modal-dialog-centered ">
          <div className="modal-content modal-content-padding">
            <div className="modal-header border-0 p-0 px-1">
              <div className="modal-title fs-5" id="Detail">
                <p className=" m-0 mt-2 fw-bold" style={{ fontSize: '16px' }}>
                  {order_id}
                </p>

                <p className="m-0" style={{ fontSize: '11px' }}>
                  {new Date(date).toISOString().slice(0, 19).replace('T', ' ')}
                </p>
              </div>
            </div>
            <div className="modal-body px-1 py-1">
              <p className="m-0" style={{ fontSize: '12px' }}>
                訂單資訊
              </p>
              {/*訂單資訊 */}
              {/* ----------------商品TABLE START---------------- */}
              <table className="table mb-0">
                <thead>
                  <tr className="productTR border-bottom border-black">
                    <th className="p-0 px-2 ">商品</th>
                    <th className=" p-0 px-2 ">單價</th>
                    <th className=" p-0 px-2 text-center">數量</th>
                    <th className=" p-0 px-2 text-center">小計</th>
                    <th></th>
                  </tr>
                </thead>
                {/* 訂單購買商品 */}
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
                                <span>{item.name}</span>
                              </div>
                            </div>
                          </td>
                          <td>
                            <span>{item.price}</span>
                          </td>
                          <td className="text-center">
                            <span> {item.amount} </span>
                          </td>
                          <td className="text-center">
                            <span>{item.price * item.amount}</span>
                          </td>
                          {/* 把商品評論導入近來 */}
                          <td>
                            {comments.some(
                              (comment) =>
                                comment.product_lecture_id === item.product_id
                            ) ? (
                              comments
                                .filter(
                                  (comment) =>
                                    comment.product_lecture_id ===
                                    item.product_id
                                )
                                .map((comment) => (
                                  <>
                                    <div key={comment.id}>
                                      <div className="rate-star mb-1">
                                        <div
                                          className="body-title"
                                          style={{ fontSize: '12px' }}
                                        >
                                          評價
                                        </div>
                                        {Array(5)
                                          .fill(1)
                                          .map((v, i) => {
                                            // 每個按鈕的分數，相當於索引+1
                                            const score = i + 1

                                            return (
                                              <button
                                                key={i}
                                                className={styles['star-btn']}
                                              >
                                                <span
                                                  className={
                                                    score <=
                                                    productRatings[item.name]
                                                      ? styles['on']
                                                      : styles['off']
                                                  }
                                                  style={{ fontSize: '12px' }}
                                                >
                                                  &#9733;
                                                </span>
                                              </button>
                                            )
                                          })}
                                      </div>
                                      <div className="rate-comment">
                                        <input
                                          style={{
                                            fontSize: '12px',
                                            overFlow: 'hidden',
                                          }}
                                          className="form-control p-0"
                                          disabled
                                          defaultValue={
                                            productComments[item.name]
                                          }
                                        ></input>
                                      </div>
                                    </div>
                                  </>
                                ))
                            ) : !currentProduct[item.name] ? (
                              <button
                                style={{ fontSize: '12px' }}
                                className="btn btn-main"
                                onClick={() => {
                                  handleShowrating(item.name)
                                }}
                              >
                                評價
                              </button>
                            ) : (
                              <div className="rate">
                                <div className="rate-star mb-1">
                                  <div
                                    className="body-title"
                                    style={{ fontSize: '12px' }}
                                  >
                                    評價
                                  </div>
                                  {Array(5)
                                    .fill(1)
                                    .map((v, i) => {
                                      // 每個按鈕的分數，相當於索引+1
                                      const score = 1 + i

                                      return (
                                        <button
                                          key={i}
                                          className={styles['star-btn']}
                                          onClick={() =>
                                            handleProductRatingChange(
                                              item.name,
                                              score
                                            )
                                          }
                                          onMouseEnter={() => {
                                            handleHoverRatingChange(
                                              item.name,
                                              score
                                            )
                                          }}
                                          onMouseLeave={() => {
                                            setHoverRating(0)
                                          }}
                                        >
                                          <span
                                            style={{ fontSize: '12px' }}
                                            className={
                                              score <=
                                                productRatings[item.name] ||
                                              score <= hoverRating[item.name]
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
                                <div>
                                  {/* <div className="body-title">詳細評價</div> */}
                                  <input
                                    style={{ fontSize: '12px' }}
                                    className="form-control p-0"
                                    defaultValue={productComments[item.name]}
                                    onChange={(e) => {
                                      handleProductCommentChange(
                                        item.name,
                                        e.target.value
                                      )
                                    }}
                                  ></input>
                                </div>
                                <button
                                  style={{ fontSize: '12px' }}
                                  className="btn btn-main"
                                  onClick={() =>
                                    handleSubmit(
                                      productRatings[item.name],
                                      productComments[item.name],
                                      item.product_id
                                    )
                                  }
                                >
                                  送出
                                </button>
                              </div>
                            )}
                          </td>
                        </tr>
                      </tbody>
                    )
                  }
                })}
              </table>
              {/* ----------------商品TABLE END------------------ */}

              {/* ----------------課程TABLE START---------------- */}
              <table className="table">
                <thead>
                  <tr className="productTR border-bottom border-black">
                    <th className="p-0 px-2">課程</th>
                    <th className=" p-0 px-2 ">單價</th>
                    <th className="p-0 px-2 text-center">數量</th>
                    <th className="p-0 px-2 text-center">小計</th>
                    <th></th>
                  </tr>
                </thead>
                {/* 訂單購買課程 */}
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
                                <span>{item.name}</span>
                              </div>
                            </div>
                          </td>
                          <td className="text-center">
                            <span>{item.price}</span>
                          </td>
                          <td className="text-center">
                            <span> {item.amount} </span>
                          </td>
                          <td className="text-center">
                            <span>{item.price * item.amount}</span>
                          </td>
                          <td>
                            {comments.some(
                              (comment) =>
                                comment.product_lecture_id === item.product_id
                            ) ? (
                              comments
                                .filter(
                                  (comment) =>
                                    comment.product_lecture_id ===
                                    item.product_id
                                )
                                .map((comment) => (
                                  <>
                                    <div key={comment.id}>
                                      <div className="rate-star mb-1">
                                        <div
                                          className="body-title"
                                          style={{ fontSize: '12px' }}
                                        >
                                          評價
                                        </div>
                                        {Array(5)
                                          .fill(1)
                                          .map((v, i) => {
                                            // 每個按鈕的分數，相當於索引+1
                                            const score = i + 1

                                            return (
                                              <button
                                                key={i}
                                                className={styles['star-btn']}
                                              >
                                                <span
                                                  style={{ fontSize: '12px' }}
                                                  className={
                                                    score <=
                                                    lectureRatings[item.name]
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
                                      <div className="rate-comment">
                                        <input
                                          style={{
                                            fontSize: '12px',
                                            overFlow: 'hidden',
                                          }}
                                          className="form-control p-0"
                                          disabled
                                          defaultValue={
                                            lectureComments[item.name]
                                          }
                                        ></input>
                                      </div>
                                    </div>
                                  </>
                                ))
                            ) : !currentLecture[item.name] ? (
                              <button
                                className="btn btn-main"
                                type="button"
                                onClick={() => {
                                  handleShowrating(item.name)
                                }}
                              >
                                評價
                              </button>
                            ) : (
                              <div className="rate-star mb-1">
                                <div
                                  className="body-title"
                                  style={{ fontSize: '12px' }}
                                >
                                  評價
                                </div>
                                {Array(5)
                                  .fill(1)
                                  .map((v, i) => {
                                    // 每個按鈕的分數，相當於索引+1
                                    const score = i + 1

                                    return (
                                      <button
                                        key={i}
                                        className={styles['star-btn']}
                                        onClick={() =>
                                          handleLectureRatingChange(
                                            item.name,
                                            score
                                          )
                                        }
                                        onMouseEnter={() => {
                                          handleHoverRatingChange(
                                            item.name,
                                            score
                                          )
                                        }}
                                        onMouseLeave={() => {
                                          setHoverRating(0)
                                        }}
                                      >
                                        <span
                                          style={{ fontSize: '12px' }}
                                          className={
                                            score <=
                                              lectureRatings[item.name] ||
                                            score <= hoverRating[item.name]
                                              ? styles['on']
                                              : styles['off']
                                          }
                                        >
                                          &#9733;
                                        </span>
                                      </button>
                                    )
                                  })}
                                <div>
                                  {/* <div className="body-title">詳細評價</div> */}
                                  <input
                                    style={{ fontSize: '12px' }}
                                    className="form-control p-0"
                                    value={lectureComments[item.name]}
                                    onChange={(e) =>
                                      handleLectureCommentChange(
                                        item.name,
                                        e.target.value
                                      )
                                    }
                                  ></input>
                                  <button
                                    style={{ fontSize: '12px' }}
                                    className="btn btn-main"
                                    onClick={() =>
                                      handleSubmit(
                                        lectureRatings[item.name],
                                        lectureComments[item.name],
                                        item.product_id
                                      )
                                    }
                                  >
                                    送出評論
                                  </button>
                                </div>
                              </div>
                            )}
                          </td>
                        </tr>
                      </tbody>
                    )
                  }
                })}
              </table>
              {/* ----------------課程TABLE END------------------ */}
              <div className="d-flex justify-content-end">
                <div style={{ fontSize: '12px' }}>共 {totalAmount} 件</div>
              </div>
              <div className="row my-3">
                <div className="col-5">
                  <div
                    className="fw-bold  px-2 mb-1"
                    style={{ fontSize: '12px' }}
                  >
                    選擇送貨及付款方式
                  </div>
                  <div className=" px-2 mb-1" style={{ fontSize: '12px' }}>
                    送貨地點{' '}
                  </div>
                  <div className=" px-2 mb-2" style={{ fontSize: '12px' }}>
                    {address}
                  </div>
                  <div className=" px-2 mb-1" style={{ fontSize: '12px' }}>
                    付款方式
                  </div>
                  <div className=" px-2 mb-2" style={{ fontSize: '12px' }}>
                    {pay}
                  </div>
                </div>
                <div className="col-2"></div>
                <div className="col-5">
                  <div className="fw-bold mb-1" style={{ fontSize: '12px' }}>
                    訂單總額
                  </div>
                  <div className="">
                    <div className="mb-1 d-flex justify-content-between">
                      <div style={{ fontSize: '12px' }}>小計：</div>
                      <div style={{ fontSize: '12px' }}>{realTotal} 元</div>
                    </div>

                    <div className="mb-1 d-flex justify-content-between">
                      <div style={{ fontSize: '12px' }}>運費：</div>
                      {total < 1000 ? (
                        <>
                          <div style={{ fontSize: '12px' }}> 60 元</div>
                        </>
                      ) : (
                        <div style={{ fontSize: '12px' }}>0 元</div>
                      )}
                    </div>
                    <div className="mb-2 d-flex justify-content-between">
                      {coupon_id !== 0 ? (
                        <>
                          <div style={{ fontSize: '12px' }}>優惠券折扣：</div>
                          <div style={{ fontSize: '12px' }}> {total - realTotal} 元</div>
                        </>
                      ) : (
                        <div></div>
                      )}
                    </div>

                    <hr />
                    <div className="mb-1 d-flex justify-content-between">
                      <div style={{ fontSize: '12px' }}>總金額： </div>
                      <div style={{ fontSize: '12px' }}>{total} 元</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        table {
          border-collapse: none;
        }
        .img {
          width: 40px;
          height: 40px;
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

        .button {
          display: flex;
          gap: 1rem;
          justify-content: center;
        }
        .modal-content-padding {
          padding: 10px 20px;
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

         {
          /* MODAL裡面的東西 */
        }
        .productTR {
          th {
            font-size: 12px;
          }
        }
        div > span {
          font-size: 12px;
        }
        td > span {
          font-size: 12px;
        }

         {
          /* @media (max-width: 992px) {
          .img{
            display: none;
          }
        } */
        }
      `}</style>
    </>
  )
}
