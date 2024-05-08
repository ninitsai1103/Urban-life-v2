//乾淨版
import { useEffect, useState } from 'react'
import Comment from '@/components/article/comment'
import { SlArrowLeft } from 'react-icons/sl'
import { FaRegHeart } from 'react-icons/fa'
import useArticles from '@/hooks/use-articles'
import { useRouter } from 'next/router';

export default function Detail() {
  // const { article } = useArticles()
  const { articles } = useArticles()
  
  
  const router = useRouter(); // 取得路由器實例用於導航和參數取得
  const {aid} = router.query; // 從URL取得文章ID
  const [article, setArticle] = useState(null); // 狀態：當前顯示的文章

  useEffect(() => {
    // 當aid或articles更新時觸發
    if (aid && articles.length > 0) {
        const fetchArticle = articles.find(item => item.id === parseInt(aid)); // 依照ID尋找文章
        setArticle(fetchArticle); // 設定當前文章狀態
        
    }
},[aid, articles]); // 依賴列表：僅當aid或articles變更時執行

console.log(article);
  return (
    <>
      <div className="container " >
        <div className="row mt-2 mx-2 " >
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
                <h1>{article && article.title}</h1>
                <button className="btn btn-add ms-3">{article && article.category_name}</button>
              </div>

              <button className="btn btn-like mt-3">
                <FaRegHeart />
              </button>
            </div>
            <div className="d-flex align-items-center mt-3">
              <h6 className="me-3">{article && article.created_at}</h6>
              <h6>作者:{article && article.author_name}</h6>
            </div>
          </div>
          {/* article content */}
          <button className="col-sm-12"></button>
          {/* 黑線 */}
          <div className="col-sm-12 black-bottom-border">
            <button className="btn btn-main my-3">編輯文章</button>
          </div>

          <div className="col" >
            <img
              src={`/images/article/article_img/${article &&  article.img}`}
              className="my-3 h-50"
              alt="..."
            />
            <p className="">
            {article && article.content}
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
