import { useState, useEffect } from 'react'
import useArticlesComment from '@/hooks/use-article-comment';

export default function Comment({ comment }) {
  console.log(comment)
  return (
    <>
      <div className="d-flex  mx-5 " key={comment.id}>
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
        <div className="col-10 ms-3 d-none d-sm-none d-lg-block">
          <h5 className="div-7">{comment.date}</h5>
          <p className="">
          {comment.comment}
          </p>
        </div>
        
      </div>

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
