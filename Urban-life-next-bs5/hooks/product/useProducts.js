import { useState, useEffect } from 'react';


const useProducts = () => {
  const [products, setProducts] = useState([]);


  useEffect(() => {
    const fetchProducts = async () => {
        try {
            const url = `http://localhost:3005/api/products`
            const res = await fetch(url);
            const data = await res.json();
           
            if (Array.isArray(products)) {
              const res_products = data.data.products.map(product => ({
                ...product,
                hrs_express:Boolean(product.hrs_express),
                location_id:Boolean(product.location_id)
              }))
              setProducts(res_products)
              console.log(res_products);
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
