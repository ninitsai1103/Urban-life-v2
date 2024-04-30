import { useState, useEffect } from 'react'
import ArticleCard from '@/components/member/article-card'
import TeacherAsideAccount from '@/components/member/teacher-aside-account'
import Page from '@/components/product/pagination'
import { IoAdd } from 'react-icons/io5'
import useTeacherArticles from '@/hooks/use-teacherarticle'

export default function ArticleManagement() {
  
  const { articles, totalArticles } = useTeacherArticles()

  // 到底要不要
  const [articleCurrentPage, setarticleCurrentPage] = useState(1);
  const ArticleTotalItems = totalArticles;
  const ArticlePerpages = 5;

  const [ArticleManagement, setArticleManagement] = useState([])

  // 處理頁碼變更事件
  const handleArticlePageChange = (articlePage) => {
    setarticleCurrentPage(articlePage);
  }

  useEffect(() => {
    if (articles.length > 0) {
      const startIndex = (articleCurrentPage - 1) * ArticlePerpages;
      const endIndex = Math.min(startIndex + ArticlePerpages, articles.length);
      setArticleManagement(articles.slice(startIndex, endIndex));
      console.log(ArticleManagement);
    }
  }, [articleCurrentPage, articles, ArticlePerpages])

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
              {articles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
            <div>
              <Page
                totalItems={ArticleTotalItems}
                currentPage={articleCurrentPage}
                perpages={ArticlePerpages}
                onPageChange={handleArticlePageChange}
              />
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
           {
            /* margin: 20px 0px; */
          }
           {
            /* padding: 0px; */
          }
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
