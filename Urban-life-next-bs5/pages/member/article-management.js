import { useState, useEffect } from 'react'
import ArticleCard from '@/components/member/article-card'
import TeacherAsideAccount from '@/components/member/teacher-aside-account'
import Page from '@/components/product/pagination'
import { IoAdd } from 'react-icons/io5'
import useTeacherArticles from '@/hooks/use-teacherarticle'
import { useMemberInfo } from '@/hooks/use-member-info'

export default function ArticleManagement() {
  const [ArticlesList, setArticlesList] = useState([])
  const { articles } = useTeacherArticles()

  // member的hooks
  const { member } = useMemberInfo()

  //分頁
  const [articleCurrentPage, setArticleCurrentPage] = useState(1)
  const [ArticleTotalPages, setArticleTotalPages] = useState(1)
  const ArticlePerpages = 5
  

  // 判斷user是誰
  const [identityId, setUserIdentityId] = useState()
  useEffect(() => {
    const { identity_id, name, id } = JSON.parse(
      localStorage.getItem('member-info')
    )
    setUserIdentityId(id)
    console.log(name)
    console.log(identity_id)
    console.log(id);
  }, [])


  useEffect(() => {
    if (!identityId) return; // 等待 identityId 設置後再執行

    // 過濾符合條件的文章
    const filteredArticles = articles.filter(article => article.user_id === identityId);

    // 更新分頁資訊
    const newArticleTotalPages = Math.ceil(filteredArticles.length / ArticlePerpages);
    setArticleTotalPages(newArticleTotalPages);

    // 根據當前頁數更新展示的文章列表
    const ArticleStartIndex = (articleCurrentPage - 1) * ArticlePerpages;
    const ArticleEndIndex = Math.min(ArticleStartIndex + ArticlePerpages, filteredArticles.length);
    setArticlesList(filteredArticles.slice(ArticleStartIndex, ArticleEndIndex));
  }, [articleCurrentPage, articles, identityId])

  const handleArticlePageChange = (articlePage) => {
    setArticleCurrentPage(articlePage)
  }

  // article排序
  const [ArticleSortOption, setArticleSortOption] = useState('ArticleNewest') // 初始排序方式：根據課程時間由新到舊
  const handleArticleSortChange = (option) => {
    setArticleSortOption(option)
  }

  useEffect(() => {
    let filteredArticles = articles.filter(article => article.user_id === identityId);

    // 根據排序選項重新排序
    switch (ArticleSortOption) {
      case 'ArticleNewest':
        filteredArticles.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        )
        break
      case 'ArticleOldest':
        filteredArticles.sort(
          (a, b) => new Date(a.created_at) - new Date(b.created_at)
        )
        break
        case 'ArticleNewest':
        filteredArticles.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        )
        break
      case 'ArticleOldest':
        filteredArticles.sort(
          (a, b) => new Date(a.created_at) - new Date(b.created_at)
        )
        break
      case 'ArticleUpdateNewest':
        filteredArticles.sort(
          (a, b) => new Date(b.updated_at) - new Date(a.updated_at)
        )
        break
      case 'ArticleUpdateOldest':
        filteredArticles.sort(
          (a, b) => new Date(a.updated_at) - new Date(b.updated_at)
        )
        break
      case 'TotalCollectionsMost':
        filteredArticles.sort((a,b) => b.total_collections - a.total_collections);
        break
      case 'TotalCommentsMost':
        filteredArticles.sort((a,b) => b.total_comments - a.total_comments);
        break
      default:
        break
    }

    // 更新課程列表
    const ArticleStartIndex =
      (articleCurrentPage - 1) * ArticlePerpages
    const ArticleEndIndex = Math.min(
      ArticleStartIndex + ArticlePerpages,
      filteredArticles.length
    )
    setArticlesList(
      filteredArticles.slice(ArticleStartIndex, ArticleEndIndex)
    )

    // 更新總頁數
    const ArticleTotalPages = Math.ceil(
      filteredArticles.length / ArticlePerpages
    )
    setArticleTotalPages(ArticleTotalPages)
  }, [articleCurrentPage, articles, ArticleSortOption])



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
                <a className="btn btn-main" href="/article/add">
                  <IoAdd />
                  新增文章
                </a>
              </div>
            </div>
            <div className="dropdown">
                    <button
                      className="btn dropdown-toggle fs-6 d-flex justify-content-center align-items-center"
                      type="button"
                      id="articleDropdown1"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      排序
                    </button>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="articleDropdown1"
                    >
                    <li>
                        <a
                          className="dropdown-item"
                          href="#"
                          onClick={() =>
                            handleArticleSortChange('ArticleNewest')
                          }
                        >
                          建立時間由新到舊
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item"
                          href="#"
                          onClick={() =>
                            handleArticleSortChange('ArticleOldest')
                          }
                        >
                          建立時間由舊到新
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item"
                          href="#"
                          onClick={() =>
                            handleArticleSortChange('ArticleUpdateNewest')
                          }
                        >
                          更新時間由新到舊
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item"
                          href="#"
                          onClick={() =>
                            handleArticleSortChange('ArticleUpdateOldest')
                          }
                        >
                          更新時間由舊到新
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item"
                          href="#"
                          onClick={() =>
                            handleArticleSortChange('TotalCollectionsMost')
                          }
                        >
                          收藏數最多
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item"
                          href="#"
                          onClick={() =>
                            handleArticleSortChange('TotalCommentsMost')
                          }
                        >
                          留言數最多
                        </a>
                      </li>
                    </ul>
                  </div>
            <div className="teacher-margin-bottom">
              {ArticlesList.map((article) => (
                <ArticleCard key={article.id} article={article} identityId={identityId}/>
              ))}
            </div>
            <div>
              <Page
                totalPages={ArticleTotalPages}
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

        .dropdown {
          margin-bottom: 20px;
          button {
            margin-left: auto;
            background-color: #ffffff;
            padding: 5px 50px;
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
          .dropdown {
            button {
              border: 1px solid #ccc;
              padding: 5px 0px;
              width: 50%;
            }
          }
        }
      `}</style>
    </>
  )
}
