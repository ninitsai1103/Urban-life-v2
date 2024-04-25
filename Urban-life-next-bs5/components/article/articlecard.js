import React from 'react'
// import LoadingImageSvg from './loading-image-svg'
import Image from 'next/image'
import { FaHeart } from 'react-icons/fa'
import { FaRegHeart } from 'react-icons/fa'
import { TbStarFilled, TbStar, TbMessage } from 'react-icons/tb'

export default function ArticleCard({ item }) {
  return (
    <>
      {/* 列表1*/}
      <div className="container mb-5">
        <div className="row row-cols-2 row-cols-lg-4 g-4">
          <div className="col">
            <div className="card h-100">
              <img
                src="/images/article/article_phone_card_image.png"
                className="card-img-top"
                alt="..."
              />
              {/* 卡片下 */}
              <div className="card-body ">
                <div className="product-name ">
                  <span> 2024-03-12 | 課程分享</span>
                  <h5 className="card-title fs-6">2023帶狀課程圓滿結束</h5>
                </div>
                <span className="card-text text-overflow">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </span>
                <div className="card-end d-flex gap-3">
                  <div>
                    <FaRegHeart />
                    <p className="d-inline ms-1">20</p>
                  </div>
                  <div>
                    <TbMessage />
                    <p className="d-inline ms-1">20</p>
                  </div>
                </div>

                
              </div>
            </div>
          </div>
          {/* card2 */}
          <div className="col">
            <div className="card h-100">
              <img
                src="/images/article/article_phone_card_image.png"
                className="card-img-top"
                alt="..."
              />
              {/* 卡片下 */}
              <div className="card-body ">
                <div className="product-name ">
                  <span> 2024-03-12 | 課程分享</span>
                  <h5 className="card-title fs-6">2023帶狀課程圓滿結束</h5>
                </div>
                <span className="card-text text-overflow">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </span>
                <div className="card-end d-flex gap-3">
                  <div>
                    <FaRegHeart />
                    <p className="d-inline ms-1">20</p>
                  </div>
                  <div>
                    <TbMessage />
                    <p className="d-inline ms-1">20</p>
                  </div>
                </div>

                
              </div>
            </div>
          </div>

          <div className="col">
            <div className="card h-100">
              <img
                src="/images/article/article_phone_card_image.png"
                className="card-img-top"
                alt="..."
              />
              {/* 卡片下 */}
              <div className="card-body ">
                <div className="product-name ">
                  <span> 2024-03-12 | 課程分享</span>
                  <h5 className="card-title fs-6">2023帶狀課程圓滿結束</h5>
                </div>
                <span className="card-text text-overflow">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </span>
                <div className="card-end d-flex gap-3">
                  <div>
                    <FaRegHeart />
                    <p className="d-inline ms-1">20</p>
                  </div>
                  <div>
                    <TbMessage />
                    <p className="d-inline ms-1">20</p>
                  </div>
                </div>

                
              </div>
            </div>
          </div>

          <div className="col">
            <div className="card h-100">
              <img
                src="/images/article/article_phone_card_image.png"
                className="card-img-top"
                alt="..."
              />
              {/* 卡片下 */}
              <div className="card-body ">
                <div className="product-name ">
                  <span> 2024-03-12 | 課程分享</span>
                  <h5 className="card-title fs-6">2023帶狀課程圓滿結束</h5>
                </div>
                <span className="card-text text-overflow">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </span>
                <div className="card-end d-flex gap-3">
                  <div>
                    <FaRegHeart />
                    <p className="d-inline ms-1">20</p>
                  </div>
                  <div>
                    <TbMessage />
                    <p className="d-inline ms-1">20</p>
                  </div>
                </div>

                
              </div>
            </div>
          </div>
          
          
        </div>
      </div>
      {/* 列表2(橫版) */}
      {/* <div className="container mb-5 d-lg-none">
        <div className="card mb-3" >
          <div className="row g-0">
            <div className="col-6">
              <img src="/images/product/list/product.jpg" className="img-fluid rounded-start" alt="..." />
            </div>
            <div className="col-6">
              <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">
                  This is a wider card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                </p>
                <p className="card-text">
                  <small className="text-body-secondary">
                    Last updated 3 mins ago
                  </small>
                </p>
              </div>
            </div>
          </div>
        </div> */}
      {/* </div> */}

      <style jsx>{`
        span {
          font-size: 12px;
          font-weight: 500;
          color: #a9a6a6;
        }

        .card-text {
          font-size: 10px;
          font-weight: 300;
          color: #6b6b6b;
        }
        .text-overflow {
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
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
