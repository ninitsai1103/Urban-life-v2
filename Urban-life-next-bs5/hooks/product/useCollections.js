import { useState, useEffect } from 'react'
import api from '@/services/axios-with-token'

export default function useColloections() {
  //收藏
  const [collections, setCollections] = useState([])

  useEffect(() => {
    //獲得登入會員的收藏資料
    api
      .get('/collection')
      .then((response) => {
        // console.log(response.data.data.collections);
        const article_ids = response.data.data.collections
          .map((v) => v.article_id)
          .filter((v) => v)

        // setCollections(response.data.data.collections)
        setCollections(article_ids)
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  }, [])

  //新增商品收藏
  const addCollection = (productId) => {
    api
      .get(`/collection/add/${productId}`)
      .then((response) => {
        console.log(response)
        setCollections((prev) => [...prev, Number(productId)])
      })
      .catch((error) => {
        console.log('Error adding collection:', error)
      })
  }

  //移除商品收藏
  const removeCollection = (productId) => {
    api.get(`/collection/remove/${productId}`).then((response) => {
      console.log(response)
      setCollections((prev) => prev.filter((id) => id !== Number(productId)))
    })
  }

  // 新增文章收藏
  const addArticleCollection = (articleId) => {
    api
      .get(`/collection/add/article/${articleId}`)
      .then((response) => {
        console.log(response)
        // 在原有收藏資料的基礎上添加新的文章ID
        setCollections((prev) => [...prev, Number(articleId)])
      })
      .catch((error) => {
        console.log('Error adding article collection:', error)
      })
  }

  // 取消文章收藏
  const removeArticleCollection = (articleId) => {
    api.get(`/collection/remove/article/${articleId}`).then((response) => {
      console.log(response)
      // 從收藏資料中移除特定文章ID
      setCollections((prev) => prev.filter((id) => id !== Number(articleId)))
    })
  }

  return {
    collections,
    addCollection,
    removeCollection,
    addArticleCollection,
    removeArticleCollection,
  }
}
