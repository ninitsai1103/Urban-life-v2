import { useState, useEffect } from 'react'
import Comment from '@/components/article/comment'
import { SlArrowLeft } from 'react-icons/sl'
import { FaRegHeart } from 'react-icons/fa'
import useArticles from '@/hooks/use-articles'
import useArticlesComment from '../../hooks/use-article-comment'
import { useRouter } from 'next/router'

export default function Detail() {
  const { articles } = useArticles()
  const router = useRouter()
  const { aid } = router.query
  const [article, setArticle] = useState(null) // 文章状态
  const [commentText, setCommentText] = useState('') // 绑定输入框用于新增评论
  const { articleComments } = useArticlesComment(aid) // 使用 Hook 获取评论

  useEffect(() => {
    if (aid && articles.length > 0) {
      const fetchArticle = articles.find((item) => item.id === parseInt(aid))
      setArticle(fetchArticle) // 设置当前文章
    }
  }, [aid, articles])

  const handleCommentSubmit = async () => {
    const userId = 1 // 假设用户 ID，实际应从用户状态或环境中获取
    try {
      const response = await fetch(
        'http://localhost:3005/api/article-comment',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ articleId: aid, userId, commentText }),
        }
      )

      const data = await response.json()
      if (response.ok) {
        alert('Comment added successfully!')
        setCommentText('') // 清空输入框
      } else {
        throw new Error(data.message || 'Failed to add comment')
      }
    } catch (error) {
      console.error('Error submitting comment:', error)
      alert(error.message)
    }
  }

  return (
    <>
      <div className="container">
        <div className="row mt-2 mx-2">
          <div className="col-sm-12">
            <SlArrowLeft onClick={() => router.back()} />
            <span className="text-decoration-none mx-2">返回上一頁</span>
          </div>
          <div className="col-sm-12 black-bottom-border">
            <div className="d-flex justify-content-between">
              <div className="d-flex align-items-center mt-3">
                <h1>{article?.title}</h1>
              </div>
              <button className="btn btn-like mt-3">
                <FaRegHeart />
              </button>
            </div>
            <div className="d-flex align-items-center ">
              <button className="btn btn-add mx-3">
                {article?.category_name}
              </button>

              <h6 className="me-3">{article?.created_at}</h6>
              <h6>作者:{article?.author_name}</h6>
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
                onClick={handleCommentSubmit}
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
