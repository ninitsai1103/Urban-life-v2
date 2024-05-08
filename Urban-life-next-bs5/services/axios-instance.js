import axios from 'axios'// 引入 axios 模組，用於發送 HTTP 請求
import { apiBaseUrl } from '@/configs'// 引入 API 基本 URL 從配置文件中

// 引入 API 基本 URL 從配置文件中
const axiosInstance = axios.create({
  baseURL: apiBaseUrl,// 設置基本 URL
  timeout: 8000,// 設置請求超時時間為 8000 毫秒
  withCredentials: true,// 允許跨域請求携帶認證信息（例如 Cookie）
})

//添加請求攔截器
// axiosInstance.interceptors.request.use(
//   function (config) {
//     const data = localStorage.getItem('member-info')// 從本地存儲中獲取會員信息
//     const token = data ? JSON.parse(data).token : ''// 提取令牌
//     console.log(token)
//     if(token){// 如果存在令牌
//       config.headers.Authorization = `Bearer ${token}`// 在請求標頭中添加 Authorization 標頭，用於携帶令牌
//     }
//     return config// 返回修改後的配置對象
//   },
//   function (error) {
//     return Promise.reject(error)// 如果出現錯誤，則返回一個拒絕的 Promise 對象
//   }
// )

// fetcher for swr
// SWR 的 fetcher 函式
export const fetcher = (url) => axiosInstance.get(url).then((res) => res.data)
// 携帶令牌的 fetcher 函式
export const fetchWithToken = (url, token) => {
  axiosInstance.get(`${url}&${token}`).then((res) => res.data)
}

// 携帶物件參數的 fetcher 函式
export const fetcherWithObject = ({ url, args }) => {
  const extraParams = new URLSearchParams(args)// 創建 URLSearchParams 對象，用於處理參數
  const andSymbol = extraParams.toString() ? '&' : ''// 如果存在參數，則添加 '&'

  const combinedUrl = url + andSymbol + extraParams.toString()// 將 URL 和參數組合起來

  console.log(combinedUrl)

  axiosInstance.get(combinedUrl).then((res) => res.data)// 發送帶有組合後的 URL 的 GET 請求
}

export default axiosInstance// 導出 axios 實例
