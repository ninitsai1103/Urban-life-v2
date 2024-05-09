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
        console.log(response.data.data.collections);
       
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
        console.log(response)
        setCollections((prev) => [...prev, productId])
      })
      .catch((error) => {
        console.log('Error adding collection:', error)
      })
  }

  //移除商品收藏
  const removeCollection = (productId) => {
    api.get(`/collection/remove/${productId}`).then((response) => {
      console.log(response)
      setCollections((prev) => prev.filter((item) => item.id !== productId))
    })
  }

  return { collections, addCollection, removeCollection }
}
