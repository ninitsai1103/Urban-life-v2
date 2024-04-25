import React from 'react'
import AsideAccount from '@/components/member/aside-account'
import OrderList from '@/components/member/order'
import OrderCard from '@/components/member/order-card'
import Page from '@/components/product/pagination'
export default function Order() {
  return (
    <>
      <div className="container">
      <div className="row margin-padding">
          <div className="col-lg-3 col-md-12 aside">
            <AsideAccount />
          </div>
          <div className="col-lg-9 col-md-12 main-content">
            <div
              className="d-flex align-items-center justify-content-between title-margin
            "
            >
              <div className="title">訂單記錄</div>
            </div>
            <div className="content">
              <div className="row">
                {/* 桌面版顯示表格 */}
                <div className="col-lg-12 d-none d-lg-block ">
                  <OrderList/>
                </div>
                {/* 手機版顯示卡片 */}
                <div className="d-lg-none">
                  <OrderCard />   
                  <OrderCard />                                        
                </div>
              </div>
            </div>
            <div>
              <Page />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .margin-padding{
          margin: 20px;
          padding: 33px 0px;
        }
        .main-content {
          padding: 30px 20px;
          background-color: #ffffff;
          border-radius: 8px;
          border: 1px solid #ccc;
        }
        .title-margin {
          margin-bottom: 10px;
        }
        .title {
          padding: 0px 50px;
          font-size: 36px;
          font-weight: bold;
        }
        .content {
          padding: 0px 50px;
        }
        .button {
          display: flex;
          gap: 1rem;
          justify-content: center;
        }
        .card {
          border-radius: 8px;
          padding: 10px;
        }
        @media (max-width: 992px) {
          .aside {
            padding: 0px;
            margin-bottom: 40px;
          }
          .main-content {
            margin: 0px;
          }
        }

        @media (max-width: 768px) {
          table {
            display: none;
          }
          .aside {
            padding: 0px;
            margin-bottom: 40px;
          }
          .title {
            padding: 0;
            font-size: 20px;
          }
          .main-content {
            margin: 0px;
            background: none;
            border: none;
          }
          .content {
            padding: 0px;
           
          }
        }
      `}</style>
    </>
  )
}
