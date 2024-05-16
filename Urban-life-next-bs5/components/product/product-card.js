import { useState, useEffect } from 'react'
import { FaHeart } from 'react-icons/fa'
import { FaRegHeart } from 'react-icons/fa'
import { TbStarFilled, TbStar } from 'react-icons/tb'
import useColloections from '@/hooks/product/useCollections'
import toast, { Toaster } from 'react-hot-toast'

export default function ProductCard({ product, collections, isIconChange }) {
  const [isCollected, setIsCollected] = useState(false) //商品是否有被收藏
  const { addCollection, removeCollection } = useColloections()

  // const hasSearchResults = products && products.length > 0

  // init IsCollected by collection -> valid
  useEffect(() => {
    // 檢查當前商品是否在收藏列表中
    setIsCollected(
      collections.find(
        (item) => item.product_id == product.id && item.valid == 1
      )
    )
  }, [collections])

  //切換商品的收藏狀態
  const toggleCollection = () => {
    setIsCollected(!isCollected)
    const message = isCollected ? '商品已取消收藏!' : '商品已加入收藏!'
    toast.success(message, {})
  }

  return (
    <>
      {/* 桌機版*/}

      <div className="col  d-none d-lg-block" key={`desktop-${product.id}`}>
       
        <div className="card h-100">
          <div className="imgWrap">
            <img
              src={`/images/product/product_cover/${product.cover}`}
              className="img-fluid card-img-top"
              alt={product.name}
            />
          </div>
          <div
            className="card-body"
            data-tooltip={
              product.id > 440 && product.id < 451
                ? product.name
                : `${product.name}(${product.size})`
            }
          >
            <div className="product-name d-flex justify-content-between">
              <h5 className="card-title fs-6">
                {product.id > 440 && product.id < 451
                  ? product.name
                  : `${product.name}(${product.size})`}
              </h5>
            </div>
            <div className="star d-flex">
              <TbStarFilled style={{ color: '#F6A404', fontSize: '20px' }} />
              <p className="ms-1 mb-0 fs-15">{product.star}</p>
            </div>
            <div className="price d-flex align-items-center justify-content-between mt-1">
            <Toaster position="top-center" reverseOrder={false} />
              <div className="d-flex">
                <p className="card-text mb-0 me-3 text-color2-nohover">
                  NTD {product.price}
                </p>
                <p className="card-text text-through set-text-color3">
                  NTD {product.price + 200}
                </p>
              </div>
              {isCollected ? (
                <FaHeart
                  style={{
                    fontSize: '23px',
                    cursor: 'pointer',
                    color: '#ff4136',
                  }}
                  onClick={(e) => {
                    e.preventDefault()
                    removeCollection(product.id)
                    toggleCollection()
                    // console.log(isCollected)
                  }}
                />
              ) : (
                <FaRegHeart
                  style={{
                    fontSize: '23px',
                    cursor: 'pointer',
                    color: '#ff4136',
                  }}
                  onClick={(e) => {
                    e.preventDefault()
                    addCollection(product.id)
                      .then((updatedData) => {
                        console.log('Collection added:', updatedData)
                        toggleCollection()
                        // console.log(isCollected)
                      })
                      .catch((error) => {
                        alert('請先登入會員再進行收藏功能')
                        window.location.href = '/member/login'
                        console.error(
                          'Failed to add collection:',
                          error.message
                        )
                      })
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {isIconChange ? (
        <div div className="col d-lg-none" id="mobile2">
          <div className="card mb-3" key={`mobile2-${product.id}`}>
            <div className="row g-0 ">
              <div className="col-6 imgWrap2">
                <img
                  src={`/images/product/product_cover/${product.cover}`}
                  className="img-fluid rounded-start"
                  alt="..."
                />
              </div>
              {/* <div className="col-7 d-flex align-items-center position-relative "> */}
              <div className="card-body col-6 pb-0  position-relative">
                <h5 className="card-title fs-6 my-2">
                  {product.name}({product.size})
                </h5>
                <div className="price d-flex align-items-center mt-1 my-3 ">
                  <p className="card-text newPrice mb-0 me-3 text-color2-nohover fs-6">
                    NTD {product.price}
                  </p>
                  <p className="card-text oldPrice text-through set-text-color3 fs-6">
                    NTD {product.price + 200}
                  </p>
                </div>
                <div className="star d-flex">
                  <TbStarFilled
                    className="mt-1"
                    style={{ color: '#F6A404', fontSize: '19px' }}
                  />
                  <p className="ms-1 mb-0 fs-6">{product.star}</p>
                </div>
                {isCollected ? (
                  <FaHeart
                    className="position-absolute"
                    style={{
                      fontSize: '22px',
                      cursor: 'pointer',
                      color: '#ff4136',
                      bottom: '20px',
                      right: '20px',
                    }}
                    onClick={(e) => {
                      e.preventDefault()
                      toggleCollection()
                      removeCollection(product.id)
                    }}
                  />
                ) : (
                  <FaRegHeart
                    className="position-absolute "
                    style={{
                      fontSize: '22px',
                      cursor: 'pointer',
                      color: '#ff4136',
                      bottom: '20px',
                      right: '20px',
                    }}
                    onClick={(e) => {
                      e.preventDefault()
                      toggleCollection()
                      addCollection(product.id)
                    }}
                  />
                )}
              </div>
              {/* </div> */}
            </div>
          </div>
        </div>
      ) : (
        <div
          className="col  d-lg-none gy-3"
          key={`mobile1-${product.id}`}
          id="mobile1"
        >
          <div className="card h-100">
            <div className="imgWrap2">
              <img
                src={`/images/product/product_cover/${product.cover}`}
                className="img-fluid card-img-top"
                alt="..."
              />
            </div>
            <div className="card-body ">
              <div className="product-name d-flex justify-content-between">
                <h5 className="card-title fs-6">
                  {product.name}({product.size})
                </h5>
                <FaRegHeart
                  className="d-none d-lg-block"
                  style={{ fontSize: '25px', color: '#ff4136' }}
                />
              </div>
              <div className="star d-lg-flex d-none d-lg-block ">
                <TbStarFilled style={{ color: '#F6A404', fontSize: '20px' }} />
                <p className="ms-1 mb-0 fs-15">{product.star}</p>
              </div>
              <div className="price d-flex align-items-center mt-1">
                <p className="card-text newPrice mb-0 me-3 text-color2-nohover">
                  NTD {product.price}
                </p>
                <p className="card-text oldPrice text-through set-text-color3">
                  NTD {product.price + 200}
                </p>
              </div>
              <div className="d-flex justify-content-between d-lg-none mt-2">
                <div className="star d-flex">
                  <TbStarFilled
                    style={{ color: '#F6A404', fontSize: '19px' }}
                  />
                  <p className="ms-1 mb-0 fs-15">{product.star}</p>
                </div>
                {isCollected ? (
                  <FaHeart
                    style={{
                      fontSize: '20px',
                      cursor: 'pointer',
                      color: '#ff4136',
                    }}
                    onClick={(e) => {
                      e.preventDefault()
                      toggleCollection()
                      removeCollection(product.id)
                    }}
                  />
                ) : (
                  <FaRegHeart
                    style={{
                      fontSize: '20px',
                      cursor: 'pointer',
                      color: '#ff4136',
                    }}
                    onClick={(e) => {
                      e.preventDefault()
                      toggleCollection()
                      addCollection(product.id)
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      <style jsx>{`
        .card {
          border-radius: 8px;
        }
        .card-title {
          white-space: nowrap; /* 保持文字在一行內 */
          overflow: hidden; /* 隱藏超出容器部分的內容 */
          text-overflow: ellipsis; /* 使用省略號表示文字被截斷 */
          position: relative; /* 為了 tooltip 的絕對定位 */
        }
        .card-body:hover::after {
          content: attr(data-tooltip); /* 使用自定義屬性來設置 tooltip 文字 */
          position: absolute;
          width: auto; /* 自動寬度 */
          white-space: normal; /* 恢復正常換行 */
          background-color: black; /* 背景顏色 */
          color: white; /* 文字顏色 */
          padding: 4px 8px; /* 內邊距 */
          border-radius: 4px; /* 圓角 */
          top: 60%; /* 在元素下方顯示 */
          left: 0; /* 從左邊開始 */
          z-index: 1000; /* 確保顯示在最上層 */
        }

        .card-body {
          border-top: 1px solid #a9a6a6;
        }
        .imgWrap {
          width: 243px;
          height: 243px;
          background-color: black;
          display: flex;
          justify-content: center;
        }

        .imgWrap img {
          width: auto;
          height: 100%;
          object-fit: contain;
        }
        .text-through {
          text-decoration: line-through;
        }
        .set-fs12 {
          font-size: 12px;
        }
        .text-color2-nohover {
          color: $button-default;
        }
        .star-color {
          color: #f6a404;
        }
        .fs-15 {
          font-size: 15px;
        }
        .set-text-color3 {
          color: $grey-700;
        }
         {
          /* .heart {
          bottom:20px;
          right:0;
        } */
        }

        @media (max-width: 1200px) {
          .imgWrap {
            width: 168px;
            height: 168px;
          }
        }
        @media (max-width: 500px) {
          .card-text {
            font-size: 14px;
          }
           {
            /* .fs-15 {
            font-size: 14px;
          } */
          }
          .imgWrap {
            width: 177px;
            height: 177px;
          }
        }
      `}</style>
    </>
  )
}
