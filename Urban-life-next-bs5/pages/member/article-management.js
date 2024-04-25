import React from 'react'
import ArticleCard from '@/components/member/article-card'
import TeacherAsideAccount from '@/components/member/teacher-aside-account'
import Page from '@/components/product/pagination'
import { IoAdd } from 'react-icons/io5'

export default function ArticleManagement() {
  return (
    <>
      {/* EBE3DB */}
      <div className="container teacher-article-management-body">
        <div className="row teacher-article-management">
          <div className="col-lg-3 col-md-12 teacher-aside">
            <TeacherAsideAccount />
          </div>
          <div className="col-lg-9 col-md-12 teacher-article">
            <div className="d-flex justify-content-between align-items-center teacher-margin-bottom">
              <div className="teacher-text-title">我的文章</div>
              <div className="add-article-btn">
                <button className="btn btn-main">
                  <IoAdd />
                  新增文章
                </button>
              </div>
            </div>
            <div className="teacher-margin-bottom">
              <ArticleCard />
              <ArticleCard />
              <ArticleCard />
              <ArticleCard />
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

        .teacher-article {
          padding: 30px 70px;
          background-color: #ffffff;
          border-radius: 8px;
          border: 1px solid #ccc;
        }

        .teacher-text-title {
          font-size: 36px;
          font-weight: bold;
        }

        .teacher-margin-bottom {
          margin-bottom: 50px;
        }

         {
          /* .add-article-btn{
          border-radius: 100px;
          border: none;
          padding: 4px 20px;
          color: white;
          background-color: #849474;
          right: 0;
        } */
        }

        .teacher-article-management {
          margin: 20px;
          padding: 33px 0;
          {/* margin: 20px 0px; */}
          {/* padding: 0px; */}
        }

        @media (max-width: 992px) {
          .teacher-aside {
            padding: 0px;
            margin-bottom: 40px;
          }
        }

        @media (max-width: 768px) {
          .teacher-article {
            padding: 0px;
            background-color: #ebe3db;
            border: none;
          }
          .teacher-text-title {
            display: none;
          }

           {
            /* 要放哪裡?? */
          }
          .add-article-btn {
            margin-left: auto;
          }
        }
      `}</style>
    </>
  )
}
