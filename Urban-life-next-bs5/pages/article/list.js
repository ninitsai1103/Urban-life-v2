import { useState, useEffect } from 'react'
import Page from '@/components/product/pagination'
import Search from '@/components/product/search'
import ArticleCard from '@/components/article/articlecard'
import Sidebar from '@/components/article/sidenav'
import { FaFilter } from 'react-icons/fa'
import { IoAdd } from 'react-icons/io5'
import Link from 'next/link'
import { useMemberInfo } from '@/hooks/use-member-info'

// 使用自定義 Hook 來獲取文章資料
import useArticles from '@/hooks/use-articles'
// import fi from '@/node_modules 2/moment/dist/locale/fi'

export default function List() {
  const [list, setList] = useState([])
  const { articles } = useArticles()
  console.log(articles)
  const [filter, setFilter] = useState('ALL')
  const [sort, setSort] = useState('')
  
  // member的hooks
  const { member } = useMemberInfo()

  // 判斷user是誰
  const [identityId, setUserIdentityId] = useState()
  useEffect(() => {
    const { identity_id, name, id } = JSON.parse(
      localStorage.getItem('member-info')
    )
    setUserIdentityId(identity_id)
    console.log(name)
    console.log(identity_id)
    console.log(id)
  }, [])

  // 設定按鈕是否顯示的狀態
  const shouldShowButton = identityId === 2;

  //分頁
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  // const totalItems = 40;
  const perpages = 12 //一頁幾筆資料

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const handleSortChange = (e) => {
    console.log(e.target.value)
    setSort(e.target.value)
  }
  useEffect(() => {
    const filteredArticles = articles.filter((article) => {
      if (filter == 'ALL') {
        return true
      } else {
        return article.category_name == filter
      }
    })
    const sortedArticles = filteredArticles.sort((a, b) => {
      if (sort === '4') {
        // Sort by date
        return new Date(a.date) - new Date(b.date)
      } else if (sort === '3') {
        // Sort by date
        return -(new Date(a.date) - new Date(b.date))
      } else if (sort === '2') {
        // Sort by total comments
        return b.total_comments - a.total_comments
      } else if (sort === '1') {
        // Sort by total collections
        return b.total_collections - a.total_collections
      } else return true
    })
    const totalPages = Math.ceil(sortedArticles.length / perpages)
    setTotalPages(totalPages)
    //更新列表
    const startIndex = (currentPage - 1) * perpages
    const endIndex = Math.min(startIndex + perpages, sortedArticles.length)

    setList(sortedArticles.slice(startIndex, endIndex))
    console.log(articles, totalPages)
  }, [currentPage, articles, filter, sort])
  console.log('39', list)
  return (
    <>
      <div className="container bg-color g-3 mt-5 my-2">
        <div className="row d-flex">
          {/*   類別按鈕列表  */}
          <div className="col-2 d-none d-lg-block d-md-none">
            <Sidebar filter={filter} setFilter={setFilter} />
          </div>
          {/* 搜尋與文章列表  */}

          <div className="col col-lg-10  col-sm-12">
            <div className="product-list">
              <div className="search mx-2">
                <Search />
              </div>

              <div className="breadcrumb-amount-arrange-bar mx-2">
                <div className="">
                  <div className="d-flex justify-content-between my-3">
                    <div className="breadcrumb-amount-bar mt-3">
                      <h6>文章列表/{filter}</h6>
                      <h6 style={{ color: '#bd9250' }}>
                        共{' '}
                        {
                          articles.filter((article) => {
                            if (filter == 'ALL') {
                              return true
                            } else {
                              return article.category_name == filter
                            }
                          }).length
                        }{' '}
                        篇文章
                      </h6>
                    </div>
                    <div className="d-flex ">
                      <button
                        className="btn btn-main mx-3 rounded-circle d-lg-none d-md-block"
                        style={{ width: '40px', height: '40px' }}
                      >
                        <FaFilter />
                      </button>

                      <div className="arrange-select ">
                        <select
                          className="form-select"
                          aria-label="Default select example"
                          // onClick={handleFilter}
                          onChange={handleSortChange}
                        >
                          <option selected="">排序依據</option>
                          <option value={1}>最多收藏</option>
                          <option value={2}>最多留言</option>
                          <option value={3}>最新文章</option>
                          <option value={4}>最舊文章</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mx-2 ">
                <Link href="/article/add" className={`btn btn-main ${shouldShowButton ? '' : 'd-none'}`}>
                  <IoAdd />
                  新增文章
                </Link>
              </div>

              {/* 文章卡片 */}
              <div className="d-flex flex-wrap ">
                {list
                  .filter((article) => {
                    if (filter == 'ALL') {
                      return true
                    } else {
                      return article.category_name == filter
                    }
                  })
                  .map((article) => (
                    <div className="col-md-3 p-2">
                      <Link
                        className="text-decoration-none"
                        key={article.id}
                        href={`/article/${article.id}`}
                      >
                        <ArticleCard key={article.id} article={article} />
                      </Link>
                    </div>
                  ))}
              </div>

              {/* 分頁 */}
              <Page
                perpages={perpages}
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        </div>
        {/* Bootstrap JavaScript Libraries */}
      </div>
    </>
  )
}

;<style jsx>{`
  .container {
    width: 1440px;
    padding: 10px;
  }
  body {
    background-color: #ebe3db;
  }

  .gray-500 {
    background-color: #a9a6a6;
  }

  .active {
    background-color: #849474;
  }

  .w-305 {
    width: 305px;
  }
  p {
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

  h6 {
    font-size: 16px;
  }
  .grey-300 {
    color: #6b6b6b;
  }
  .card {
    width: 250px;
    height: 340px;
  }
  .card-body {
    background-color: #ffffff;
    border-radius: 0 0 10px 10px;
  }

  /* 428px 以下開始為 手機(直) 最小尺寸 */
  @media (max-width: 430px) {
    .d-custom-none {
      display: none !important;
    }
  }
`}</style>
