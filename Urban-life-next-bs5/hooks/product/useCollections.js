import { useState, useEffect } from 'react'
import api from '@/services/axios-with-token';

export default function useColloections() {
  //收藏
  const [collections, setCollections] = useState([])

  useEffect(() => {
    //獲得登入會員的收藏資料
    api
      .get('/collection')
      .then((response) => {
        // const productCollection = response.data.data.collections.map(
        //   (item) => {'product_id': item.product_id, 'valid': item.valid}
        // )
        // console.log(productCollection);
        setCollections(response.data.data.collections)
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  },[]);

  //新增收藏
  const addCollection = (productId) => {
    api.get(`/collection/add/${productId}`)
    .then(response => {
      console.log(response);
      setCollections(prev=>[...prev, productId]);
    })
    .catch(error => {
      console.log('Error adding collection:', error);
    })

  }

//移除收藏
const removeCollection = (productId) => {
  api.get(`/collection/remove/${productId}`)
  .then(response => {
    console.log(response);
    setCollections(prev => prev.filter(item=>item.id !== productId))
  })

}

  return { collections, addCollection, removeCollection }
};
