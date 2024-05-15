import React, { useState, useContext, createContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import axiosInstance from '@/services/axios-instance'
import { checkAuth} from '@/services/user'

const AuthContext = createContext(null)



// 初始化會員狀態(登出時也要用)
// 只需要必要的資料即可，沒有要多個頁面或元件用的資料不需要加在這裡
// !!注意JWT存取令牌中只有id, username, google_uid, line_uid在登入時可以得到
export const initUserData = {
  id: 0,
  name: '',
  google_uid: '',
  gname: '',
  gemail: '',
}

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isAuth: false,
    userData: initUserData,
  })

  const router = useRouter()


  // 檢查會員認証用
  // 每次重新到網站中，或重新整理，都會執行這個函式，用於向伺服器查詢取回原本登入會員的資料
  const handleCheckAuth = async () => {
    const res = await checkAuth()

    // 伺服器api成功的回應為 { status:'success', data:{ user } }
    if (res.data.status === 'success') {
      // 只需要initUserData的定義屬性值
      const dbUser = res.data.data.user
      const userData = { ...initUserData }

      for (const key in userData) {
        if (Object.hasOwn(dbUser, key)) {
          userData[key] = dbUser[key] || ''
        }
      }
      // 設到全域狀態中
      setAuth({ isAuth: true, userData })
    } else {
      console.warn(res.data)

      // 在這裡實作隱私頁面路由的跳轉
      if (protectedRoutes.includes(router.pathname)) {
        router.push(loginRoute)
      }
    }
  }

  // didMount(初次渲染)後，向伺服器要求檢查會員是否登入中
  useEffect(() => {
    if (router.isReady && !auth.isAuth) {
      handleCheckAuth()
    }
    // 下面加入router.pathname，是為了要在向伺服器檢查後，
    // 如果有比對到是隱私路由，就執行跳轉到登入頁面工作
    // 注意有可能會造成向伺服器要求多次，此為簡單的實作範例
    // eslint-disable-next-line
  }, [router.isReady, router.pathname])

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
