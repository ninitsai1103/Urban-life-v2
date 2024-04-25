import React from 'react'
import Comment from '@/components/article/comment'
import { SlArrowLeft } from 'react-icons/sl'
import { FaRegHeart } from 'react-icons/fa'

export default function Detail() {
  return (
    <>
      <div className="container ">
        <div className="row mt-2 mx-2">
          {/* breadcrumb */}
          <div className="col-sm-12">
            <SlArrowLeft />
            <a
              href="https://www.example.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-decoration-none mx-2"
            >
              返回上一頁
            </a>
          </div>

          {/* article title  */}
          <div className="col-sm-12 black-bottom-border">
            <div className="d-flex justify-content-between">
              <div className="d-flex align-items-center mt-3">
                <h1>2023帶狀課程圓滿結束</h1>
                <button className="btn btn-add ms-3">課程分享</button>
              </div>

              <button className="btn btn-like mt-3">
                <FaRegHeart />
              </button>
            </div>
            <div className="d-flex align-items-center mt-3">
              <h6 className="me-3">2020-12-08 13:22:49</h6>
              <h6>作者:小名</h6>
            </div>
          </div>
          {/* article content */}
          <button className="col-sm-12"></button>
          {/* 黑線 */}
          <div className="col-sm-12 black-bottom-border">
            <button className="btn btn-main my-3">編輯文章</button>
          </div>

          <div className="col">
            <img
              src="/images/article/article_phone_card_image.png"
              className="my-3 h-50"
              alt="..."
            />
            <p className="">
              時光飛逝，2023年快到尾聲，這一期的帶狀課程也要結束了。同學們學會做瓶中花園，老師也學會怎麼做出好吃的磅蛋糕。
              感謝同學百忙中抽空來上課，連續10個禮拜真的不容易，在匆匆進門時能聽到“來喝杯茶，吃個蛋糕”，洗滌一身疲憊，是真心的接待。
              訶梨勒是藥師佛手持藥草，象徵無比的祝福。訶梨勒藥草茶來自喜馬拉雅山2000公尺的高度，也是珍稀無比的存在。藥草的愛全程陪伴我們上完這一期的課程，帶入植物的樂趣。
            </p>
          </div>
        </div>
        {/* section2 */}
        <div className="row my-3 bg-light">
          <div className="col-sm-12  border-radius border ">
            <h4 className="text-center mb-5 mt-3">留言</h4>
            {/* 留言區 */}
            <Comment />
            <Comment />
            <Comment />

            <div className="mx-5">
              <label
                htmlFor="exampleFormControlTextarea1"
                className="form-label"
              ></label>
              <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                rows={3}
                defaultValue={''}
              />
            </div>

            <div className="d-flex justify-content-end my-3">
            <button class="btn btn-primary mx-5 my-3 ">確認新增</button>

            </div>
          </div>
        </div>
      </div>
    </>
  )
}

;<style jsx>{`
  .container {
    width: 1440px;
    padding: 10px;
  }
  .border-radius {
    border-radius: 10px;
  }
  .black-bottom-border {
    border-bottom: 1px solid black;
    padding-bottom: 10px;
  }

  .border-bottom {
    border-bottom: 1px solid #445c2d;
    text-decoration: underline;
    text-decoration-color: black; /* 或者使用 #000000 */
  }

  /* 428px 以下開始為 手機(直) 最小尺寸 */
  @media (min-width: 576px) { 
    


   }
  /* @media screen and (max-width : 428px ){
    .demo_style{
    
    }
  } */
`}</style>
