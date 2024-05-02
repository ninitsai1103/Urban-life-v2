import { useState, useEffect } from 'react'
import Page from '@/components/product/pagination'
import Search from '@/components/product/search'
import ArticleCard from '@/components/article/articlecard'
import { FaFilter } from 'react-icons/fa'
// 使用自定義 Hook 來獲取文章資料
import useArticles from '@/hooks/use-articles'

export default function List() {
  // 從自定義 Hook useArticles 獲取文章數據，並使用 useState 來管理和更新這些數據的顯示狀態。在組件的其他部分，ArticleList 可用於顯示文章列表，而從 useArticles 獲取的 articles 數據可能會用於初始化或更新 ArticleList。
  const [list, setList] = useState([])
  const { articles } = useArticles()

  useEffect(() => {
    setList(articles)
    console.log(articles)
  }, [articles])
  return (
    <>
      <div className="container bg-color g-3 mt-5 my-2">
        <div className="row d-flex">
          {/*   類別按鈕列表  */}
          <div className="col-2 d-none d-lg-block d-md-none">
            <div className="sidenav ">
              <div className="list-group">
                <button
                  type="button"
                  className="list-group-item list-group-item-action active"
                  aria-current="true"
                >
                  文章分類
                </button>
                <button
                  type="button"
                  className="list-group-item list-group-item-action active"
                >
                  課程分享
                </button>
                <button
                  type="button"
                  className="list-group-item list-group-item-action"
                >
                  植栽照顧
                </button>
                <button
                  type="button"
                  className="list-group-item list-group-item-action"
                >
                  植物分享
                </button>
                <button
                  type="button"
                  className="list-group-item list-group-item-action"
                >
                  資材
                </button>
                <button
                  type="button"
                  className="list-group-item list-group-item-action"
                >
                  肥料
                </button>
                <button
                  type="button"
                  className="list-group-item list-group-item-action"
                >
                  書籍
                </button>
              </div>
            </div>
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
                      <h6>文章列表/課程分享</h6>
                      <h6>共 5 篇文章</h6>
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
                        >
                          <option selected="">排序依據</option>
                          <option value={1}>最多收藏</option>
                          <option value={2}>最多留言</option>
                          <option value={3}>最新文章</option>
                          <option value={3}>最舊文章</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 文章卡片 */}
              <div className="d-flex flex-wrap ">
                {articles.map((article) => (
                  <div className="col-md-3 p-2">
                    <ArticleCard key={article.id} article={article} />
                  </div>
                ))}
              </div>

              {/* 分頁 */}
              <Page />
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
  .card-end {
  }

  /* 428px 以下開始為 手機(直) 最小尺寸 */
  @media (max-width: 430px) {
    .d-custom-none {
      display: none !important;
    }
  }
`}</style>
