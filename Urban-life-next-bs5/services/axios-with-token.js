import axios from 'axios';
import { apiBaseUrl } from '@/configs'

// 創建 axios 實例
const api = axios.create({
  baseURL: apiBaseUrl,
});

// 請求攔截器
api.interceptors.request.use((config) => {
  // 從 localStorage 獲取 member_info.token
  const member_info = JSON.parse(localStorage.getItem('member-info'));
  if (member_info && member_info.token) {
    config.headers.Authorization = `Bearer ${member_info.token}`;
  }
  return config;
}, (error) => {
  // 請求錯誤處理
  return Promise.reject(error);
});

export default api;
