import { useState, useEffect, useCallback } from 'react'
import styles from './article-card.module.css'
import Link from 'next/link'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import useCollections from '@/hooks/product/useCollections'
import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'

export default function ArticleCard({ articlesList, collections = [] }) {
  const [isCollectedMap, setIsCollectedMap] = useState({})

  useEffect(() => {
    const initialCollectedMap = articlesList.reduce((map, article) => {
      map[article.id] = collections.some(
        (item) => item.article_id === article.id && item.valid === 1
      )
      return map
    }, {})
    setIsCollectedMap(initialCollectedMap)
  }, [articlesList, collections])

  const { addArticleCollection, removeArticleCollection } = useCollections()
  const MySwal = withReactContent(Swal)

  const notifySA = useCallback(
    (title, text, icon) => {
      MySwal.fire({
        title,
        text,
        icon,
      })
    },
    [MySwal]
  )

  const toggleCollection = useCallback(
    async (articleId) => {
      setIsCollectedMap((prevMap) => {
        const newMap = { ...prevMap }
        const newCollected = !newMap[articleId]
        newMap[articleId] = newCollected

        const article = articlesList.find((item) => item.id === articleId)
        if (article) {
          if (newCollected) {
            addArticleCollection(articleId)
            notifySA(
              '成功收藏',
              `${article.title} 已成功加入您的收藏!`,
              'success'
            )
          } else {
            removeArticleCollection(articleId)
            notifySA('取消收藏', `${article.title} 已成功取消收藏!`, 'error')
          }
        }
        return newMap
      })
    },
    [articlesList, addArticleCollection, removeArticleCollection, notifySA]
  )

  return (
    <>
      {articlesList && articlesList.length > 0 ? (
        articlesList.map((article) => (
          <div key={article.id} className={styles.card}>
            <div className="flex">
              <a className={styles.img} href={`/article/${article.id}`}>
                <img
                  loading="lazy"
                  src={`http://localhost:3005/images/article/${article.img}`}
                  alt={article.title}
                  className={styles.img}
                />
              </a>
            </div>
            <div className={styles.cardBody}>
              <div className={styles.cardBodyName}>
                <div className={styles.articleText}>{article.created_at}</div>
                <button
                  className="btn btn-like"
                  onClick={() => toggleCollection(article.id)}
                >
                  {isCollectedMap[article.id] ? (
                    <FaHeart
                      style={{
                        fontSize: '23px',
                        cursor: 'pointer',
                        color: '#ff4136',
                      }}
                    />
                  ) : (
                    <FaRegHeart
                      style={{
                        fontSize: '23px',
                        cursor: 'pointer',
                        color: '#ff4136',
                      }}
                    />
                  )}
                </button>
              </div>
              <div className={styles.cardBodyArea}>
                <div className={styles.articleName}>
                  <a
                    href={`/article/${article.id}`}
                    style={{ textDecoration: 'none' }}
                  >
                    {article.title}
                  </a>
                </div>
              </div>
              <div className={styles.cardBodyPrice}>
                <div></div>
                <Link href={`/article/${article.id}`}>
                  <button className="btn btn-main">開始閱讀</button>
                </Link>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className={styles.articleName}>目前沒有文章</p>
      )}
    </>
  )
}
