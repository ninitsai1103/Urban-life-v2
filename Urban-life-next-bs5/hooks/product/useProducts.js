import { useState, useEffect } from 'react';

const useProducts = () => {
  const [products, setProducts] = useState([]);


  useEffect(() => {
    const fetchProducts = async () => {
        try {
            const url = `http://localhost:3005/api/products`
            const res = await fetch(url);
            const data = await res.json();
            const products = data.data.products
            if (Array.isArray(products)) {
              setProducts(products)
            } else {
              console.log('伺服器回傳資料類型錯誤，無法設定到狀態中');
            }
          } catch (e) {
            console.log(e);
          }
    };

    fetchProducts();
  }, []);

  return { products };
};

export default useProducts;
