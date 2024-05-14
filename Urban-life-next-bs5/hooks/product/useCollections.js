import { useState, useEffect } from 'react'
import api from '@/services/axios-with-token'
import toast, { Toaster } from 'react-hot-toast'

export default function useColloections() {
  const [collections, setCollections] = useState([]) //收藏列表
  useEffect(() => {
    //獲得登入會員的收藏資料
    api
      .get('/collection')
      .then((response) => {
        setCollections(response.data.data.collections)
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  }, [])


  const addCollection = (productId) => {
    return api.get(`/collection/add/${productId}`)
      .then((response) => {
        const updatedData = {
          ...response.data.data,
          valid: Number(response.data.data.valid) // 將布林值轉為數字
        };
        return updatedData; // 返回更新後的數據
      })
      .catch((error) => {
        console.log('Error adding collection:', error);
        if (error.response) {
          if (error.response.status === 409) {
            throw new Error('商品已在收藏中。');
          } else if (error.response.status === 401) {
            throw new Error('尚未登入');
          } else {
            throw new Error('操作失敗，請稍後再試。');
          }
        } else {
          throw error; // 將非 HTTP 響應錯誤重新拋出
        }
      });
  }

  //移除商品收藏
  const removeCollection = (productId) => {
    api
    .get(`/collection/remove/${productId}`)
    .then((response) => {
      // console.log(response)
      // setIsCollected(false);
      // 這邊不用去setcollection
      // setCollections((prev) => prev.filter((item) => item.id !== productId))
    })
  }


    // 新增文章收藏
    const addArticleCollection = (articleId) => {
      api
        .get(`/collection/add/article/${articleId}`)
        .then((response) => {
          console.log(response)
          const updatedArticle = {
            ...response.data.data,
            valid:Number(response.data.data.valid) 
          }
          return updatedArticle
          // 在原有收藏資料的基礎上添加新的文章ID
        })
        .catch((error) => {
          console.log('Error adding article collection:', error)
          if (error.response) {
            if (error.response.status === 409) {
              throw new Error('文章已在收藏中。');
            } else if (error.response.status === 401) {
              throw new Error('尚未登入');
            } else {
              throw new Error('操作失敗，請稍後再試。');
            }
          } else {
            throw error; // 將非 HTTP 響應錯誤重新拋出
          }
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
  

  



