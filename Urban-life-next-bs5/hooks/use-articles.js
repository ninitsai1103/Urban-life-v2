import { useState, useEffect } from 'react';

const useArticles = () => {
  const [articles, setArticles] = useState([]);


  useEffect(() => {
    const fetchArticles = async () => {
        try {
            const url = `http://localhost:3005/api/article`
            //將api網址改成自己後端ROUTE檔名
            const res = await fetch(url);
            const data = await res.json();
            console.log(data);
            const articles = data.data.articles
            if (Array.isArray(articles)) {
              setArticles(articles)
            } else {
              console.log('伺服器回傳資料類型錯誤，無法設定到狀態中');
            }
          } catch (e) {
            console.log(e);
          }
    };

    fetchArticles();
  }, []);

  return { articles };
};

export default useArticles;
