import { useState, useEffect } from 'react'
import useFirebase from '@/hooks/use-firebase'
import { googleLogin, logout, parseJwt, getUserById } from '@/services/user'
import Link from 'next/link'
import styles from './member.module.css'
import toast, { Toaster } from 'react-hot-toast'
import { FcGoogle } from "react-icons/fc";
export default function LoginForm() {
  // 用物件狀態對應整個表單欄位
  const [user, setUser] = useState({
    email: '',
    password: '',
  })
  // 顯示密碼的核取方塊用
  const [showPassword, setShowPassword] = useState(false)
  // 錯誤訊息狀態
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    loginError: '',
  })
  // 多欄位共用事件處理函式
  const handleFieldChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }
  //表單送出
  const handleSubmit = async (e) => {
    e.preventDefault()
    // 整理要送到伺服器的資料
    // 檢查欄位
    // 建立一個新的錯誤物件
    const newErrors = {
      email: '',
      password: '',
      loginError: '',
    }
    // 信號值，代表有出現錯誤，判斷是否要送出表單用
    let hasErrors = false
    // 如果檢查有發生錯誤時
    if (!user.email) {
      newErrors.email = '帳號為必填'
      hasErrors = true
    }

    if (!user.password) {
      newErrors.password = '密碼為必填'
      hasErrors = true
    }

    setErrors(newErrors)

    if (!hasErrors) {
      try {
        const response = await fetch('http://localhost:3005/api/user/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user),
        })
        const data = await response.json() // 建立一個包含使用者資訊的物件

        console.log(data)
        const memberInfo = {
          id: data.user.id,
          name: data.user.name,
          // user: data.user,
          identity_id: data.user.identity_id,
          token: data.token,
        }

        // 將 JSON 字串存儲到 localStorage 中

        if (response.ok) {
          console.log('登入成功')
          console.log('使用者資訊：', data.user) // 這裡是使用者的所有資訊
          console.log('Token：', data.token) // 這裡是登入後返回的 token
          localStorage.setItem('member-info', JSON.stringify(memberInfo))
          // storage.clear();

          // 登录成功，重定向到用户资料页面或其他页面
          toast.success('已成功登入')
          window.location.href = '/'
        } else {
          // 登录失败，显示错误消息

          setErrors({ ...errors, loginError: '信箱或密碼錯誤' })
        }
      } catch (error) {
        // console.error('Error logging in:', error)
        setErrors({ ...errors, loginError: '登入失敗 信箱或密碼錯誤' })
      }
    }
  }
  const {  loginGoogleRedirect, initApp } = useFirebase()

  const initUserData = {
    id: 0,
    name: '',
    google_uid: '',
    email: '',
    identity: 3,
  }

  // 這裡要設定initApp，讓這個頁面能監聽firebase的google登入狀態
  useEffect(() => {
    initApp(callbackGoogleLoginRedirect)
  }, [])

  // 處理google登入後，要向伺服器進行登入動作
  const callbackGoogleLoginRedirect = async (providerData) => {
    console.log(providerData)

    // 向伺服器進行登入動作
    const res = await googleLogin(providerData)

    console.log(res.data)

    if (res.data.status === 'success') {
      // 從JWT存取令牌中解析出會員資料
      const jwtUser = parseJwt(res.data.data.accessToken)

      const res1 = await getUserById(jwtUser.id)

      if (res1.data.status === 'success') {
        const dbUser = res1.data.data.user
        const userData = { ...initUserData }

        for (const key in userData) {
          if (Object.hasOwn(dbUser, key)) {
            userData[key] = dbUser[key] || ''
          }
        }

        const memberInfo = {
          id: res1.data.data.user.id,
          name: res1.data.data.user.name,
          identity_id: res1.data.data.user.identity_id,
        }
        // 將會員資訊存儲在 localStorage 中
        localStorage.setItem('member-info', JSON.stringify(memberInfo))
        toast.success('已成功登入')
        // 重定向到首頁
        window.location.href = '/'
      } else {
        toast.error('登入後無法得到會員資料')
      }
    } else {
      toast.error(`登入失敗`)
    }
}

  return (
    <>
      <div
        className={`box d-flex justify-content-center align-items-center bg-primary4 ${styles.box}`}
      >
      <div>
        
          <div className="text-center mb-2" style={{ fontSize: '24px' }}>
            會員登入
          </div>

          <div className="row mb-2">
            <div className="col-sm-12">
              <input
                type="email"
                className="form-control w-100"
                placeholder="電子信箱"
                name="email"
                value={user.email}
                onChange={handleFieldChange}
              />
              <span className="error my-1 text-start">{errors.email}</span>
            </div>
          </div>

          <div className="row mb-2">
            <div className="col-sm-12">
              <input
                type={showPassword ? 'text' : 'password'}
                className="form-control w-100"
                placeholder="密碼"
                value={user.password}
                name="password"
                onChange={handleFieldChange}
              />
              <span className="error my-1 text-start">{errors.password}</span>
              <span className="error my-1 text-start">{errors.loginError}</span>
            </div>
          </div>

          <div className="row mb-2">
            <div className="col-sm-12">
              <label>
                <input
                  type="checkbox"
                  checked={showPassword}
                  onChange={(e) => setShowPassword(e.target.checked)}
                />
                顯示密碼
              </label>
            </div>
          </div>

          <div className="mb-3 d-flex justify-content-between align-items-center">
            <button
              onClick={handleSubmit}
              className="btn btn-add-r"
              style={{ fontSize: '20px' }}
            >
              登入
            </button>
            <button
              type="button"
              className="btn btn-add-r"
              style={{ fontSize: '20px' }}
              onClick={() => {
                setUser({
                  email: 'nuc710@test.com',
                  password: '63212',
                })
                // 清空错误状态
                setErrors({
                  email: '',
                  password: '',
                  loginError: '',
                })
              }}
            >
              會員
            </button>
            <button
              type="button"
              className="btn btn-add-r"
              style={{ fontSize: '20px' }}
              onClick={() => {
                setUser({
                  email: 'jennie2024@gmail.com',
                  password: '45234',
                })
                // 清空错误状态
                setErrors({
                  email: '',
                  password: '',
                  loginError: '',
                })
              }}
            >
              講師
            </button>
          </div>

          <div className="row mt-2 text-center">
            <p className="notice">
              還不是會員？
              <Link className={`${styles['link']}`} href="/member/register">
                立即免費註冊
              </Link>
            </p>
            <p className="notice">
              <Link
                className={`${styles['link']}`}
                href="/member/forget-password"
              >
                忘記密碼？
              </Link>
            </p>
          </div>
          
          
          <hr/>
          <div className="d-flex justify-content-center mt-3">
            <button
              className="btn btn-icon"
              onClick={() => loginGoogleRedirect()}
            >
              <FcGoogle /> Google登入
            </button>
          </div>
          </div>

        <Toaster />
      </div>

      <style jsx>{`
        .box {
          padding: 80px;
          color: #fbfbfb;
        }
        .notice {
          font-size: 12px;
        }
        .error {
          font-size: 12px;
          color: #f34f4f;
          height: 1.5em;
        }
      `}</style>
    </>
  )
}
