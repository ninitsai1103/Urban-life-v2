//文章細節頁
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
import { useMemberInfo } from '@/hooks/use-member-info'
import Link from 'next/link'

export default function Detail() {
  const { articles } = useArticles()
  const router = useRouter()
  const { aid } = router.query
  const [article, setArticle] = useState(null) // 文章状态
  const [commentText, setCommentText] = useState('') // 绑定输入框用于新增评论
  const { articleComments } = useArticlesComment(aid) // 使用 Hook 获取评论
  const [isCollected, setIsCollected] = useState(null)
  const [comments, setComments] = useState([]) //存放當前文章留言

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
  const shouldShowButton = identityId === 2

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

  useEffect(() => {
    if (aid && articles.length > 0) {
      const fetchComment = articleComments.find(
        (item) => item.id === parseInt(aid, 10)
      )
      setComments(fetchComment) // 設置當前文章
    }
  }, [comments, aid])

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
      // refresh
      window.location.reload()
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
      .then((result) => {
        console.log(result)
        router.push('/article/list')
      })

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

          <div className="col-sm-12 mt-3" onClick={() => router.back()}>
            <SlArrowLeft />
            <span className="text-decoration-none mx-2">返回上一頁</span>
          </div>

          <div className="col-sm-12 black-bottom-border">
            <div className="d-flex justify-content-between">
              <div className="d-flex align-items-center mt-3">
                <h1>{article?.title}</h1>
              </div>
            </div>
            <div className="d-flex  justify-content-between align-items-center ">
              <div className="d-flex align-items-center mt-2">
                <h6
                  className="mx-3  col"
                  style={{ fontSize: '19px', fontWeight: 300 }}
                >
                  {article?.category_name}
                </h6>

                <h6
                  className="me-3  col"
                  style={{ fontSize: '14px', fontWeight: 400 }}
                >
                  {article?.created_at}
                </h6>
                <h6
                  className=" col"
                  style={{ fontSize: '19px', fontWeight: 200 }}
                >
                  作者:{article?.author_name}
                </h6>
              </div>
              <div className="d-flex align-items-center  ">
                {/* Toggle collection button */}
                {isCollected ? (
                  <span
                    className="btn-hover2"
                    onClick={(e) => {
                      e.preventDefault()
                      toggleCollection()
                      removeArticleCollection(article.id)
                    }}
                  >
                    <GoHeartFill
                      className="me-1 mb-1"
                      style={{ fontSize: '25px', color: '#ff4136' }}
                    />
                  </span>
                ) : (
                  <span
                    className=" "
                    onClick={(e) => {
                      e.preventDefault()
                      toggleCollection()
                      addArticleCollection(article.id)
                    }}
                  >
                    <GoHeart
                      className="me-1 mb-1"
                      style={{ fontSize: '25px', color: '#ff4136' }}
                    />
                  </span>
                )}
              </div>
            </div>
            <div className="d-flex justify-content-end align-items-center mt-1">
              <button
                className={`btn btn-add-r me-3 ${
                  shouldShowButton ? '' : 'd-none'
                }`}
                onClick={del_article}
              >
                刪除文章
              </button>
              <Link
                className={`btn btn-add-r ${shouldShowButton ? '' : 'd-none'}`}
                href={`/article/edit/${aid}`}
              >
                編輯文章
              </Link>
            </div>
          </div>
          <div className="">
            <div className="d-flex justify-content-center  w-auto">
              <img
                src={`http://localhost:3005/images/article/${article?.img}`}
                className="m-3 "
                alt={article?.title || 'Article Image'}
              />
            </div>

            {/* <p className="m-5">{article?.content}</p> */}
            <div
              className="m-5 article-content "
              style={{
                maxWidth: '100%',
                wordWrap: 'break-word',
                margin: '0 auto',
                overflow: 'hidden',
              }}
              dangerouslySetInnerHTML={{ __html: article?.content }}
            ></div>
          </div>
        </div>
        <div className="col-sm-12 ">
          <div className="border-radius border bg-light m-3">
            <h4 className="text-start m-5">留言</h4>
            {articleComments.map((comment) => (
              <Comment key={comment.id} comment={comment} />
            ))}
            <div className="m-5">
              <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                rows={3}
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              />
              <div className="d-flex justify-content-end">
                <button className="btn btn-main  m-3" onClick={add_comment}>
                  新增留言
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
