import { useState, useEffect } from 'react'
import { FaHeart } from 'react-icons/fa'
import { FaRegHeart } from 'react-icons/fa'
import { TbStarFilled, TbStar } from 'react-icons/tb'
import useColloections from '@/hooks/product/useCollections'
import toast, { Toaster } from 'react-hot-toast'

export default function ProductCard({ product, collections}) {
const [isCollected, setIsCollected] =useState([]) //商品是否有被收藏
const {addCollection, removeCollection} =useColloections();


// init IsCollected by collection -> valid
useEffect(() => {
  // 檢查當前商品是否在收藏列表中
setIsCollected(collections.find(item => item.product_id == product.id && item.valid == 1))
// console.log(isCollected);
},[collections, product.id])


//切換商品的收藏狀態
  const toggleCollection = () => {
    setIsCollected(!isCollected);
    const message = isCollected ? '商品已取消收藏!' : '商品已加入收藏!'
      toast.success(message, {
      })
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
          <div className="card-body">
            <div className="product-name d-flex justify-content-between">
              <h5 className="card-title fs-6">
                {product.id > 440 && product.id < 451
                  ? product.name
                  : `${product.name}(${product.size})`}
              </h5>
              <Toaster
                position="top-center"
                reverseOrder={false}
              />
             
              {isCollected ?
                (<FaHeart style={{ fontSize: '23px', cursor: 'pointer', color: '#ff4136' }}
                  onClick={e => {
                    e.preventDefault();
                    toggleCollection();
                    removeCollection(product.id);
                  }}
                     />) :
                (<FaRegHeart style={{ fontSize: '23px', cursor: 'pointer', color: '#ff4136' }}
                onClick={e => {
                  e.preventDefault();
                  addCollection(product.id)
                  .then(updatedData => {
                    toggleCollection();
                    console.log('Collection added:', updatedData);
                  })
                  .catch(error => {
                    alert("請先登入會員再進行收藏功能")
                    window.location.href = "/member/login";
                    console.error('Failed to add collection:', error.message);
                    // 在這裡根據 error.message 顯示適當的錯誤消息給用戶
                  });
                }} />)
              }
            </div>
            <div className="star d-flex">
              <TbStarFilled style={{ color: '#F6A404', fontSize: '20px' }} />
              <p className="ms-1 mb-0 fs-15">{product.star}</p>
            </div>
            <div className="price d-flex align-items-center mt-1">
              <p className="card-text mb-0 me-3 text-color2-nohover">
                NTD {product.price}
              </p>
              <p className="card-text text-through set-text-color3">
                NTD {product.price + 200}
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* 手機版:1 */}

      <div className="col d-lg-none gy-3" key={`mobile1-${product.id}`}>
        <div className="card h-100">
          <div className="imgWrap">
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
                style={{ fontSize: '25px' }}
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
                <TbStarFilled style={{ color: '#F6A404', fontSize: '19px' }} />
                <p className="ms-1 mb-0 fs-15">{product.star}</p>
              </div>
              {isCollected ?
              (<FaHeart style={{ fontSize: '20px', cursor: 'pointer', color: '#ff4136' }} 
                onClick={e => {
                    e.preventDefault();
                    toggleCollection();
                    removeCollection(product.id);
                  }}
              />):
              (<FaRegHeart style={{ fontSize: '20px', cursor: 'pointer' }}
              onClick={e => {
                  e.preventDefault();
                  toggleCollection();
                  addCollection(product.id);
                }} />)
              }
            </div>
          </div>
        </div>
      </div>

      {/* 手機版:2 */}
      <div div className="container d-none d-lg-none ">
        <div className="card mb-3" key={`mobile2-${product.id}`}>
          <div className="row g-0">
            <div className="col-5 imgWrap">
              <img
                src={`/images/product/product_cover/${product.cover}`}
                className="img-fluid rounded-start"
                alt="..."
              />
            </div>
            <div className="col-7 d-flex align-items-center position-relative ">
              <div className="card-body pb-0">
                <h5 className="card-title fs-6 mb-2">
                  {product.name}({product.size})
                </h5>
                <div className="price d-flex align-items-center mt-1 mb-2">
                  <p className="card-text newPrice mb-0 me-3 text-color2-nohover">
                    NTD {product.price}
                  </p>
                  <p className="card-text oldPrice text-through set-text-color3">
                    NTD {product.price + 200}
                  </p>
                </div>
                <div className="star d-flex">
                  <TbStarFilled
                    style={{ color: '#F6A404', fontSize: '19px' }}
                  />
                  <p className="ms-1 mb-0 fs-15">{product.star}</p>
                </div>
                <FaRegHeart
                  className="position-absolute"
                  style={{ fontSize: '25px', right: 10, bottom: 10 }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .card {
          border-radius: 8px;
        }
        .card-body {
          border-top: 1px solid #a9a6a6;
        }
        .imgWrap {
          width: 243px;
          height: 243px;
        }
        .imgWrap img {
          width: 100%;
          height: 100%;
          object-fit: cotain;
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
          .fs-15 {
            font-size: 14px;
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
