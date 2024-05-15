import React from 'react'
import { CiHeart } from 'react-icons/ci'
import { FaCommentDots, FaArrowRight } from 'react-icons/fa6'

export default function ArticleCard({ article,identityId }) {
  // 檢查是否符合條件，只顯示符合 identityId 的文章
  // if (article.user_id !== identityId) {
  //   return null; // 不符合條件，不顯示該文章
  // }

  const handleCardClick = () => {
    window.location.href = `/article/${article.id}`;
  };
  const handleArticleClick = () => {
    // event.stopPropagation(); // 阻止事件冒泡
    window.location.href = `/article/edit/${article.id}`;
  };

  return (
    <>
      <div className="article_card_styles w-100 d-flex" key={article.id}>
        <img alt='' src={`http://localhost:3005/images/article/${article.img}`} onClick={handleCardClick}></img>
        <div className="article_card_text_group">
          <div className="d-flex article_card_text_time_group article_card_margin_bottom">
            <div className="article_card_text_time_time">{article.created_at}</div>
            <div className="article_card_text_time_author">
              {article.author_name}
            </div>
          </div>
          <div className="article_card_title article_card_margin_bottom" onClick={handleCardClick}>
            {article.title}
          </div>
          <div className="article_card_content article_card_margin_bottom">
            {article.content}
          </div>
          <div className="article_card_bottom d-flex justify-content-between w-100">
            <div className="article_card_left_bottom d-flex">
              <div className="article_card_bottom_collect d-flex align-items-center">
                <CiHeart style={{ color: 'red' }} />
                <div className="article_card_bottom_left_margin">{article.total_collections}</div>
              </div>
              <div className="d-flex align-items-center">
                <FaCommentDots style={{ color: '#9EA78B' }} />
                <div className="article_card_bottom_left_margin">{article.total_comments}</div>
              </div>
            </div>
            <div className="d-flex">
              {/* <button className="article_card_right_bottom article_more_margin d-flex align-items-center">
                <div className="article_more_text">查看文章</div>
                <div>
                  <FaArrowRight />
                </div>
              </button> */}
              {/* <button className="article_card_right_bottom d-flex align-items-center article_more_margin ">
                <div className="article_update_text">修改</div>
              </button>
              <button className="article_card_right_bottom d-flex align-items-center">
                <div className="article_update_text">刪除</div>
              </button> */}
              <button className="btn btn-detail d-flex align-items-center article_more_margin" onClick={handleArticleClick}>
                <div className="article_update_text">修改</div>
              </button>
              {/* <button className="btn btn-main d-flex align-items-center">
                <div className="article_update_text">刪除</div>
              </button> */}
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
        img {
          width: 150px;
          height: 100%;
          border-radius: 8px 0px 0px 8px;
          cursor:pointer;
        }
        .article_card_text_group {
          padding: 15px 20px;
          flex: 1;
        }
        .article_card_text_time_group {
          color: #6b6b6b;
          font-size: 10px;
        }
        .article_card_margin_bottom {
          margin-bottom: 10px;
        }
        .article_card_text_time_time {
          margin-right: 10px;
        }
        .article_card_title {
          max-width: 300px;
          color: #445c2d;
          font-size: 16px;
          font-weight: bold;
          cursor:pointer;
          white-space: nowrap; /* 防止文字換行 */
          overflow: hidden; /* 隱藏超出範圍的文字 */
          text-overflow: ellipsis; /* 顯示省略號 */
        }
        .article_card_content {
          max-height: 30px;
          font-size: 10px;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .article_card_left_bottom {
          font-size: 14px;
          color: #000000;
        }
        .article_card_bottom_collect {
          margin-right: 15px;
        }
        .article_card_bottom_left_margin {
          margin-left: 5px;
        }
        .article_card_right_bottom {
          border-radius: 100px;
          border: 1px solid #445c2d;
          padding: 0px 15px;
          background-color: #ffffff;
          color: #445c2d;
          font-size: 14px;
          font-weight: 500; /* 改不了 */
        }
        .article_more_margin {
          margin-right: 5px;
        }
        .article_more_text {
          margin-right: 10px;
        }

         {
          /* 576???? */
        }
        @media (max-width: 768px) {
          .article_card_styles {
            display: flex;
            flex-direction: column;
            padding: 10px;
            height: auto;
          }
          img {
            border-radius: 8px;
            width: 100%;
            max-height: 200px;
          }
        }

        @media (max-width: 576px) {
          .article_card_right_bottom {
            font-size: 10px;
            padding: 0px 12px;
          }
          .article_card_left_bottom {
            font-size: 15px;
          }
          .article_card_title {
            font-size: 18px;
          }
        }
      `}</style>
    </>
  )
}
