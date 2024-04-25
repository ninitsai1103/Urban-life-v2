import React from 'react'
import AsideAccount from '@/components/member/aside-account'
import CollectLectures from '@/components/member/collect-lectures'
import CollectArticleCard from '@/components/member/collect-article-card'
import Page from '@/components/product/pagination'

export default function ArticleManagement() {
  return (
    <>
      {/* EBE3DB */}
      <div className="container">
        <div className="row margin-padding">
          <div className="col-lg-3 col-md-12 aside">
            <AsideAccount />
          </div>
          <div className="col-lg-9 col-md-12 main-content">
            <div className="d-flex align-items-center justify-content-between title-margin mb-3">
              <div className="title">我的收藏</div>
            </div>
            <ul className="nav nav-underline mb-3">
              <li className="nav-item col">
                <button className="nav-link">收藏商品</button>
              </li>
              <li className="nav-item col">
                <button className="nav-link">收藏課程</button>
              </li>
              <li className="nav-item col">
                <button className="nav-link">收藏文章</button>
              </li>
            </ul>
           <div >
           <CollectArticleCard/>
            <CollectLectures/>
            
           </div>
            <div>
              <Page />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
         {
          /* sm:576px, md:768, lg:992px,  */
        }

        .main-content{
          padding: 30px 70px;
          background-color: #ffffff;
          border-radius: 8px;
          border: 1px solid #ccc;
        }

        .title {
          font-size: 36px;
          font-weight: bold;
        }

        .title-margin {
          margin-bottom: 50px;
        }

  

        .margin-padding {
          margin: 20px;
          padding: 33px 0;
        }

      
        .nav-item {
          
          text-align: center;
          :hover {
            color: #bd9250;
          }
          button {
            width: 100%;
          }
        }

        @media (max-width: 992px) {
          .aside {
            padding: 0px;
            margin-bottom: 40px;
          }
        }

        @media (max-width: 768px) {
          .coupon {
            padding: 0px;
            background-color: #ebe3db;
          }
          .coupon-text-title {
            display: none;
          }
          .coupon {
            border: none;
          }

           {
            /* 要放哪裡?? */
          }
         
        }
      `}</style>
    </>
  )
}
