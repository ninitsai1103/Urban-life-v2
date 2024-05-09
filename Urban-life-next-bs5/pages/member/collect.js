import { useState, useEffect } from 'react'
import AsideAccount from '@/components/member/aside-account'
import TopNavItemCollect from '@/components/member/top-nav-item-collect'
import CollectLectures from '@/components/member/collect-lectures'
import CollectArticleCard from '@/components/member/collect-article-card'
import { useMemberInfo } from '@/hooks/use-member-info'


export default function Collect({

}) {
  const { member } = useMemberInfo()

  const [userCollects, setUserCollects] = useState([])
  // collect資料表
  const getCollects = async (id) => {
    // 後端網址

    // fetch抓資料
    try {
      const url = `http://localhost:3005/api/collection1?user_id=${id}`
      const res = await fetch(url)
      const data = await res.json()
      // 所有此user擁有的collect
      const userCollect = data.data.id

      if (Array.isArray(userCollect)) {
        setUserCollects(userCollect)
      } else {
        alert('伺服器回傳資料類型錯誤，無法設定到狀態中')
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    if (member) {
      getCollects(member.id)
    }
  }, [member])

  // top-nav-item 篩選資料的狀態: 收藏商品、收藏課程、收藏文章
  const [collectFilter, setCollectFilter] = useState('收藏商品')
  return (
    <>
      <div className="container">
        <div className="row margin-padding">
          <div className="col-lg-3 col-md-12 aside">
            <AsideAccount />
          </div>
          <div className="col-lg-9 col-md-12 main-content">
            <div className="d-flex align-items-center justify-content-between title-margin mb-3">
              <div className="title">我的收藏</div>
            </div>
            <TopNavItemCollect setCollectFilter={setCollectFilter} />
            {collectFilter === '收藏商品' && <CollectLectures />
            }
            {collectFilter === '收藏課程' && <CollectLectures />}
            {/* {collectFilter === '收藏文章' && <CollectArticleCard key={article.id} article={article}/>} */}
           
            
          </div>
        </div>
      </div>

      <style jsx>{`
        .main-content {
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

        @media (max-width: 992px) {
          .aside {
            padding: 0px;
            margin-bottom: 40px;
          }
        }
      `}</style>
    </>
  )
}
