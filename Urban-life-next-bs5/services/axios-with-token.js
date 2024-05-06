import axios from 'axios';
import { apiBaseUrl } from '@/configs'

// 創建 axios 實例
const api = axios.create({
  baseURL: apiBaseUrl,
});

// 請求攔截器
api.interceptors.request.use((config) => {
  // 從 localStorage 獲取 token
  const token = localStorage.getItem('member-info.token');
  if (token) {
    // 如果 token 存在，則在請求頭部加入 Authorization
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  // 請求錯誤處理
  return Promise.reject(error);
});

export default api;
