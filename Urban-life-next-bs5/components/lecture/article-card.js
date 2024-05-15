import { useState, useEffect } from 'react'
import styles from './article-card.module.css'
import { FaRegHeart } from 'react-icons/fa'
import Link from 'next/link'

export default function ArticleCard({ articlesList }) {
  return (
    <>
      {articlesList && articlesList.length > 0 ? (
        articlesList.map((article) => (
          <div key={article.id} className={styles.card}>
            <div className="flex">
              <img
                loading="lazy"
                src={`http://localhost:3005/images/article/${article.img}`}
                alt={article.title}
                className={styles.img}
              />
            </div>
            <div className={styles.cardBody}>
              <div className={styles.cardBodyName}>
                <div className={styles.articleText}>{article.created_at}</div>
                <button className="btn btn-like">
                  <FaRegHeart />
                </button>
              </div>
              <div className={styles.cardBodyArea}>
                <div className={styles.articleName}>
                  {article.title}
                </div>
              </div>
              <div className={styles.cardBodyPrice}>
                <div></div>
                <Link href={`/article/${article.id}`}>
                  <button className="btn btn-main" >開始閱讀</button>
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
