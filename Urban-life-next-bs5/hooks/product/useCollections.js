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


  //新增商品收藏
  const addCollection = (productId) => {
    api
      .get(`/collection/add/${productId}`)
      .then((response) => {
        // console.log(response.data)
        const updatedData = {
          ...response.data.data,
          valid: Number(response.data.data.valid) // 將布林值轉為數字
      };
      
       
      })
      .catch((error) => {
        // alert('請登入會員再進行收藏功能')
        if (error.response && error.response.status === 409) {
          console.log('商品已在收藏中。')
        } else {
          console.log('操作失敗，請稍後再試。')
        }
        console.log('Error adding collection:', error)
      })
      // console.log(collections);
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



  return { collections, addCollection, removeCollection}
}


