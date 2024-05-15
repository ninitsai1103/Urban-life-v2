import { useState, useEffect } from 'react'
import useArticlesComment from '@/hooks/use-article-comment'

export default function Comment({ comment }) {
  console.log(comment)
  return (
    <>
      <div className="d-flex  mx-5" key={comment.id}>
        {/* userimg  */}
        <div className="col-lg-1 col-md-1 userimg-col-12 ">
          <div className="img-container ">
            <img
              className="w-100  img-thumbnail"
              src="/images/article/usercomment.png"
            />
          </div>

          <span className=" ">{comment.user_id}</span>
        </div>
        {/* usercontent  */}
        <div className="col-10 ms-3 d-md-block d-lg-block">
          <h5
            className=""
            style={{ fontSize: '16px', color: '#6b6b6b', fontWeight: '400' }}
          >
            {comment.date}
          </h5>
          <p
            className=""
            style={{ fontSize: '16px', color: '#000', fontWeight: '400' }}
          >
            {comment.comment}
          </p>
        </div>
      </div>
      <hr style={{ margin: '1rem 40px', borderTop: '1px solid #D6D6D6' }} />

      <style jsx>{`
        .container {
          width: 1440px;
          padding: 10px;
        }

         {
          /* .border {
          border: 3px solid #d6d6d6;
        } */
        }

        .img-container {
          
           
          position: relative; 
          
          border-radius: 50%; /* 圓角 */
        }

        .img-thumbnail {
           {
            width: 100%;
          height: 100%; */
          }

          object-fit: cover; /* 保證圖像覆蓋整個容器，但不變形 */
          border-radius: 50%; /* 圓角 */
        }
        @media (max-width: 500px) {
          .col-12 {
            width: 100%;
          }

          .usercontent {
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
