// import LoadingImageSvg from './loading-image-svg'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { FaHeart } from 'react-icons/fa'
import { FaRegHeart } from 'react-icons/fa'
import { TbStarFilled, TbStar, TbMessage } from 'react-icons/tb'
import useArticles from '@/hooks/use-articles'

export default function ArticleCard({ article }) {
  console.log(article)
  return (
    <>
      {/* 列表1*/}
      <div className="card " key={article.id}>
        {/* 卡片上 */}
        <div className="h-50">
          {' '}
          <img
            src={`http://localhost:3005/images/article/${article.img}`}
            alt="..."
            className="card-img-top  object-fit-cover "
          />
        </div>

        {/* 卡片下 */}
        <div className="card-body ">
          <div className="product-name ">
            <span>
              {' '}
              {article.date}| {article.category_name}
            </span>
            <h5 className="card-title fs-6 text-overflow">{article.title}</h5>
          </div>
          {/* <span className="card-text text-overflow">{article.content}</span> */}
          <div
            className="card-text text-overflow"
            dangerouslySetInnerHTML={{ __html: article?.content }}
          ></div>
          <div className="card-end d-flex gap-3">
            <div>
              <FaRegHeart />
              <p className="d-inline ms-1">{article.total_collections}</p>
            </div>
            <div>
              <TbMessage />
              <p className="d-inline ms-1">{article.total_comments}</p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .article_card_styles {
          border: 1px solid #ccc;
          border-radius: 8px;
          height: 170px;
          margin-bottom: 20px;
          background-color: #ffffff;
        }
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
          height: 300px; /* 可以根據需要調整高度 */
          display: flex;
          flex-direction: column;
        }
        card-img-top {
          flex: 1; /* 確保圖片和卡片本體分配相等的空間 */
          background-size: cover; /* 覆蓋整個可視區域 */
          background-position: center; /* 圖片居中 */
        }
        card-body {
          flex: 1; /* 確保圖片和卡片本體分配相等的空間 */
          overflow: auto; /* 添加滾動條如果內容過多 */
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
