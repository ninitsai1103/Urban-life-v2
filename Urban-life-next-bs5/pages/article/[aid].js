import { useState, useEffect } from 'react'
import Comment from '@/components/article/comment'
import { SlArrowLeft } from 'react-icons/sl'
import { FaRegHeart } from 'react-icons/fa'
import { GoHeartFill, GoHeart } from 'react-icons/go'
import useArticles from '@/hooks/use-articles'
import useArticlesComment from '../../hooks/use-article-comment'
import { useRouter } from 'next/router'
import useCollections from '@/hooks/product/useCollections' // Import useCollections hook
import toast, { Toaster } from 'react-hot-toast'
import Link from 'next/link'

export default function Detail() {
  const { articles } = useArticles()
  const router = useRouter()
  const { aid } = router.query
  const [article, setArticle] = useState(null) // 文章状态
  const [commentText, setCommentText] = useState('') // 绑定输入框用于新增评论
  const { articleComments } = useArticlesComment(aid) // 使用 Hook 获取评论
  const [isCollected, setIsCollected] = useState(null)
  const { collections, addArticleCollection, removeArticleCollection } =
    useCollections()

  useEffect(() => {
    if (aid && articles.length > 0) {
      const fetchArticle = articles.find(
        (item) => item.id === parseInt(aid, 10)
      )
      setArticle(fetchArticle) // 設置當前文章
    }
  })

    // 檢查當前文章是否在收藏列表中
    // const isFound = collections.find(
    //   (item) => item.article_id === parseInt(aid, 10) && item.valid === 1
    // )

    useEffect(() => {
      // 檢查當前文章是否在收藏列表中
      setIsCollected(
        collections.find((item) => item.article_id == aid && item.valid == 1)
      )
    }, [collections])
  
  //   const isFound = collections.find((id) => id === parseInt(aid, 10))
  //   setIsCollected(Boolean(isFound))
  // }, [aid, articles, collections])

  //call api
  const add_comment = async () => {
    var myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')
    // get userid from localstorage
    const member_text = localStorage.getItem('member-info')
    const member_json = JSON.parse(member_text)
    const userId = member_json.id
    var raw = JSON.stringify({
      articleId: aid,
      userId: userId,
      commentText: commentText,
    })

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    }

    try {
      const response = await fetch(
        'http://localhost:3005/api/article-comment',
        requestOptions
      )
      const result = await response.text()
      console.log(result)
    } catch (error) {
      console.log('error', error)
    }
  }

  const del_article = () => {
    var myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')

    var raw = JSON.stringify({
      articleId: aid,
    })

    var requestOptions = {
      method: 'DELETE',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    }

    fetch('http://localhost:3005/api/del', requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log('error', error))
  }

  // 切換文章的收藏狀態
  // const toggleCollection = async () => {
  //   try {
  //     const newIsCollected = !isCollected
  //     if (newIsCollected) {
  //       await addArticleCollection(aid)
  //       toast.success('文章已加入收藏!')
  //     } else {
  //       await removeArticleCollection(article.id) // 確保使用正確的 ID
  //       toast.success('文章已取消收藏!')
  //     }
  //     setIsCollected(newIsCollected)
  //   } catch (error) {
  //     console.error('Error toggling collection:', error)
  //     toast.error('操作失敗')
  //   }
  // }

  //切換文章的收藏狀態
  const toggleCollection = () => {
    setIsCollected(!isCollected)
    const message = isCollected ? '文章已取消收藏!' : '文章已加入收藏!'
    toast.success(message, {})
  }

  return (
    <>
      <div className="container">
        <div className="row mt-2 mx-2">
          <Toaster position="top-center" reverseOrder={false} />

          <div className="col-sm-12">
            <SlArrowLeft onClick={() => router.back()} />
            <span className="text-decoration-none mx-2">返回上一頁</span>
          </div>
          <div className="col-sm-12 black-bottom-border">
            <div className="d-flex justify-content-between">
              <div className="d-flex align-items-center mt-3">
                <h1>{article?.title}</h1>
              </div>
              {/* Toggle collection button */}
              {isCollected ? (
                <button
                  className="btn btn-add btn-hover2"
                  onClick={(e) => {
                    e.preventDefault()
                    toggleCollection()
                    removeArticleCollection(article.id)
                  }}
                >
                  <GoHeartFill
                    className="me-1 mb-1"
                    style={{ fontSize: '19px', color: '#ff4136' }}
                  />
                  取消收藏
                </button>
              ) : (
                <Link
                  href="#"
                  className="btn-hover2"
                  onClick={(e) => {
                    e.preventDefault()
                    toggleCollection()
                    addArticleCollection(article.id)
                  }}
                >
                  <GoHeart className="me-1 mb-1" style={{ fontSize: '19px' }} />
                  加入收藏
                </Link>
              )}
            </div>
            <div className="d-flex align-items-center ">
              <button className="btn btn-add mx-3">
                {article?.category_name}
              </button>

              <h6 className="me-3">{article?.created_at}</h6>
              <h6>作者:{article?.author_name}</h6>
              <button className="btn btn-add mx-3" onClick={del_article}>
                刪除文章
              </button>
              <Link className="btn btn-add mx-3" href={`/article/edit/${aid}`}>
                編輯文章
              </Link>
            </div>
          </div>
          <div className="col">
            <img
              src={`http://localhost:3005/images/article/${article?.img}`}
              className="my-3 h-50"
              alt={article?.title || 'Article Image'}
            />
            <p>{article?.content}</p>
          </div>
        </div>
        <div className="row my-3 bg-light">
          <div className="col-sm-12  border-radius border">
            <h4 className="text-center mb-5 mt-3">留言</h4>
            {articleComments.map((comment) => (
              <Comment key={comment.id} comment={comment} />
            ))}
            <div className="mx-5">
              <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                rows={3}
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              />
              <button
                className="btn btn-primary mx-5 my-3"
                onClick={add_comment}
              >
                新增留言
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
