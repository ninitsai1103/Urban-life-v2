import { useState, useEffect } from 'react';

const useTeacherArticles = () => {
  const [articles, setArticles] = useState([]);
  const [totalArticles, setTotalArticles] = useState(0);  // 新增狀態來存放總文章數量


  useEffect(() => {
    const fetchArticles = async () => {
        try {
            const url = `http://localhost:3005/api/teacher-article`
            const res = await fetch(url);
            const data = await res.json();
            console.log(data);

            const articles = data.data.articles
            const total = data.data.total;  // 從 API 回傳的數據中提取總文章數量

            if (Array.isArray(articles)) {
              setArticles(articles)
              setTotalArticles(total);  // 設定總文章數量狀態
            } else {
              console.log('伺服器回傳資料類型錯誤，無法設定到狀態中');
            }
          } catch (e) {
            console.log(e);
          }
    };

    fetchArticles();
  }, []);

  return { articles, totalArticles }; // 返回文章列表和總文章數量
};

export default useTeacherArticles;
