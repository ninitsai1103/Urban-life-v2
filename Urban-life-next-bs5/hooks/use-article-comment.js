import { useState, useEffect } from 'react'

const useArticlesComment = (articleId) => {
  const [articleComments, setArticleComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticleComments = async () => {
      if (articleId) {  // 确保 articleId 存在
        setIsLoading(true);
        setError(null);
        try {
          const url = `http://localhost:3005/api/article-comment/${articleId}`;
          const response = await fetch(url);
          const data = await response.json();
          if (response.ok) {
            const comments = data.data.comments;
            if (Array.isArray(comments)) {
              setArticleComments(comments);
            } else {
              throw new Error('Data is not an array');
            }
          } else {
            throw new Error(data.message || 'Failed to fetch');
          }
        } catch (e) {
          setError(e.message);
          console.error('Failed to fetch comments:', e);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchArticleComments();
  }, [articleId]);  // 添加 articleId 到依赖数组中

  return { articleComments, isLoading, error };
}

export default useArticlesComment;
