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
        const productCollection = response.data.data.collections.map(
          (item) => item.product_id  
        )
        console.log(productCollection);
        setCollections(productCollection)
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  },[]);


  useEffect(() => {
    // 从 localStorage 獲取用戶資料
    const memberInfo = JSON.parse(localStorage.getItem('member-info'));
    const userId = memberInfo ? memberInfo.id : null;
    
    // 检查 userId 是否存在
    if (userId) {
      
      api.get(`/add/${userId}`) 
      .then((response) => {
        console.log(response);
        setCollections(response.data); 
      })
      .catch(err => {
        console.error('Error:', err);
      });
    }
  }, []); 
   
  return { collections }
};
