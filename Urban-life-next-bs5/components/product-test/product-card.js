import { useState, useEffect } from 'react'
// import LoadingImageSvg from './loading-image-svg'
import Image from 'next/image'
import { FaHeart } from 'react-icons/fa'
import { FaRegHeart } from 'react-icons/fa'
import { TbStarFilled, TbStar } from 'react-icons/tb'

export default function ProductCard({ item }) {

  //抓資料
  useEffect(() => {
    fetch('') //後端路由
      .then((response) => response.json())
      .then((data) => setList(data))
      .catch((error) => console.log(error))
  },[])//空陣列代表只在組件掛載時執行一次

  return (
    <>
      {/* 桌機版*/}
      <div className="container mb-3 d-none d-lg-block">
        <div className="row row-cols-4 g-4 ">
        {ProductStateList.map(product => (
          <div className="col">
            <div className="card h-100">
              <img
                src="/images/product/list/product.jpg"
                className="card-img-top"
                alt="..."
              />
              <div className="card-body ">
                <div className="product-name d-flex justify-content-between">
                  <h5 className="card-title fs-6">初雪 ('EarliSnow')</h5>
                  <FaRegHeart

                    style={{ fontSize: '25px',cursor:'pointer' }}
                  />
                </div>
                <div className="star d-flex  ">
                  <TbStarFilled
                    style={{ color: '#F6A404', fontSize: '20px' }}
                  />
                  <p className="ms-1 mb-0 fs-15">4.7</p>
                </div>
                <div className="price d-flex align-items-center mt-1">
                  <p className="card-text mb-0 me-3 text-color2-nohover">
                    NTD 300
                  </p>
                  <p className="card-text text-through set-text-color3">
                    NTD 400
                  </p>
                </div>
              </div>
            ))}
            </div>
          </div>
          {/* <div className="col">
            <div className="card h-100">
              <img
                src="/images/product/list/product.jpg"
                className="card-img-top"
                alt="..."
              />
              <div className="card-body ">
                <div className="product-name d-flex justify-content-between">
                  <h5 className="card-title fs-6">初雪 ('EarliSnow')</h5>
                  <FaRegHeart

                    style={{ fontSize: '25px',cursor:'pointer' }}
                  />
                </div>
                <div className="star d-flex  ">
                  <TbStarFilled
                    style={{ color: '#F6A404', fontSize: '20px' }}
                  />
                  <p className="ms-1 mb-0 fs-15">4.7</p>
                </div>
                <div className="price d-flex align-items-center mt-1">
                  <p className="card-text newPrice mb-0 me-3 text-color2-nohover">
                    NTD 300
                  </p>
                  <p className="card-text oldPrice text-through set-text-color3">
                    NTD 400
                  </p>
                </div>
              </div>
            </div>
          </div> */}
          {/* <div className="col">
            <div className="card h-100">
              <img
                src="/images/product/list/product.jpg"
                className="card-img-top"
                alt="..."
              />
              <div className="card-body ">
                <div className="product-name d-flex justify-content-between">
                  <h5 className="card-title fs-6">初雪 ('EarliSnow')</h5>
                  <FaRegHeart

                    style={{ fontSize: '25px',cursor:'pointer' }}
                  />
                </div>
                <div className="star d-flex  ">
                  <TbStarFilled
                    style={{ color: '#F6A404', fontSize: '20px' }}
                  />
                  <p className="ms-1 mb-0 fs-15">4.7</p>
                </div>
                <div className="price d-flex align-items-center mt-1">
                  <p className="card-text newPrice mb-0 me-3 text-color2-nohover">
                    NTD 300
                  </p>
                  <p className="card-text oldPrice text-through set-text-color3">
                    NTD 400
                  </p>
                </div>
              </div>
            </div>
          </div> */}
          {/* <div className="col">
            <div className="card h-100">
              <img
                src="/images/product/list/product.jpg"
                className="card-img-top"
                alt="..."
              />
              <div className="card-body ">
                <div className="product-name d-flex justify-content-between">
                  <h5 className="card-title fs-6">初雪 ('EarliSnow')</h5>
                  <FaRegHeart

                    style={{ fontSize: '25px',cursor:'pointer' }}
                  />
                </div>
                <div className="star d-flex  ">
                  <TbStarFilled
                    style={{ color: '#F6A404', fontSize: '20px' }}
                  />
                  <p className="ms-1 mb-0 fs-15">4.7</p>
                </div>
                <div className="price d-flex align-items-center mt-1">
                  <p className="card-text newPrice mb-0 me-3 text-color2-nohover">
                    NTD 300
                  </p>
                  <p className="card-text oldPrice text-through set-text-color3">
                    NTD 400
                  </p>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
      {/* 手機版:1 */}
      <div className="container d-lg-none">
        <div className="row row-cols-2 g-4 mb-4">
          <div className="col gy-3">
            <div className="card h-100">
              <img
                src="/images/product/list/product.jpg"
                className="card-img-top"
                alt="..."
              />
              <div className="card-body ">
                <div className="product-name d-flex justify-content-between">
                  <h5 className="card-title fs-6">初雪 ('EarliSnow')</h5>
                  <FaRegHeart
                    className="d-none d-lg-block"
                    style={{ fontSize: '25px' }}
                  />
                </div>
                <div className="star d-lg-flex d-none d-lg-block ">
                  <TbStarFilled
                    style={{ color: '#F6A404', fontSize: '20px' }}
                  />
                  <p className="ms-1 mb-0 fs-15">4.7</p>
                </div>
                <div className="price d-flex align-items-center mt-1">
                  <p className="card-text newPrice mb-0 me-3 text-color2-nohover">
                    NTD 300
                  </p>
                  <p className="card-text oldPrice text-through set-text-color3">
                    NTD 400
                  </p>
                </div>
                <div className="d-flex justify-content-between d-lg-none mt-2">
                  <div className="star d-flex">
                    <TbStarFilled
                      style={{ color: '#F6A404', fontSize: '19px' }}
                    />
                    <p className="ms-1 mb-0 fs-15">4.7</p>
                  </div>
                  <FaRegHeart style={{ fontSize: '25px' }} />
                </div>
              </div>
            </div>
          </div>
          <div className="col gy-3">
            <div className="card h-100">
              <img
                src="/images/product/list/product.jpg"
                className="card-img-top"
                alt="..."
              />
              <div className="card-body ">
                <div className="product-name d-flex justify-content-between">
                  <h5 className="card-title fs-6">初雪 ('EarliSnow')</h5>
                  <FaRegHeart
                    className="d-none d-lg-block"
                    style={{ fontSize: '25px' }}
                  />
                </div>
                <div className="star d-lg-flex d-none d-lg-block ">
                  <TbStarFilled
                    style={{ color: '#F6A404', fontSize: '20px' }}
                  />
                  <p className="ms-1 mb-0 fs-15">4.7</p>
                </div>
                <div className="price d-flex align-items-center mt-1">
                  <p className="card-text newPrice mb-0 me-3 text-color2-nohover">
                    NTD 300
                  </p>
                  <p className="card-text oldPrice text-through set-text-color3">
                    NTD 400
                  </p>
                </div>
                <div className="d-flex justify-content-between d-lg-none mt-2">
                  <div className="star d-flex">
                    <TbStarFilled
                      style={{ color: '#F6A404', fontSize: '19px' }}
                    />
                    <p className="ms-1 mb-0 fs-15">4.7</p>
                  </div>
                  <FaRegHeart style={{ fontSize: '25px' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      {/* 手機版:2 */}
      <div className="container d-none d-lg-none ">
        <div className="card mb-3" >
          <div className="row g-0">
            <div className="col-5 ">
              <img src="/images/product/list/product.jpg" className="img-fluid rounded-start" alt="..." />
            </div>
            <div className="col-7 d-flex align-items-center position-relative ">
              <div className="card-body pb-0">
                <h5 className="card-title fs-6 mb-2">初雪 ('EarliSnow')</h5>
                <div className="price d-flex align-items-center mt-1 mb-2">
                  <p className="card-text newPrice mb-0 me-3 text-color2-nohover">
                    NTD 300
                  </p>
                  <p className="card-text oldPrice text-through set-text-color3">
                    NTD 400
                  </p>
                </div>
                <div className="star d-flex">
                  <TbStarFilled
                    style={{ color: '#F6A404', fontSize: '19px' }}
                  />
                  <p className="ms-1 mb-0 fs-15">4.7</p>
                </div>
                <FaRegHeart className='position-absolute' style={{ fontSize: '25px', right: 10, bottom: 10 }} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .card {
          border-radius: 8px;
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
        .set-text-color3{
          color:$grey-700;
        }
        @media (max-width: 500px) {
          .card-text {
            font-size: 14px;
          }
          .fs-15 {
            font-size: 14px;
          }
        }
      `}</style>
    </>
  )
}
