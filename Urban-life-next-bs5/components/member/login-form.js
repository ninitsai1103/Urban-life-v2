import { useState } from 'react'
import Link from 'next/link'
import styles from './member.module.css'

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
        const data = await response.json()// 建立一個包含使用者資訊的物件

        console.log(data);
        const memberInfo = {
          id: data.user.id,
          name: data.user.name,
          // user: data.user,
          identity_id: data.user.identity_id,
          token:data.token
        };
        
        
        // 將 JSON 字串存儲到 localStorage 中
        
        if (response.ok) {
          console.log('登入成功')
          console.log('使用者資訊：', data.user) // 這裡是使用者的所有資訊
          console.log('Token：', data.token) // 這裡是登入後返回的 token
          localStorage.setItem('member-info', JSON.stringify(memberInfo));
          // storage.clear();

          // 登录成功，重定向到用户资料页面或其他页面
          window.location.href = '/member/information'
        } else {
          // 登录失败，显示错误消息
          console.error('Login failed:', data.message)
        }
      } catch (error) {
        console.error('Error logging in:', error)
      }
    }
  }

  return (
    <>
      <div
        className={`box d-flex justify-content-center align-items-center bg-primary4 ${styles.box}`}
      >
        <form onSubmit={handleSubmit}>
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

          <div className="mb-3 d-flex justify-content-center align-items-center">
            <button
              type="submit"
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
                  email: 'bif105@test.com',
                  password: '24823',
                })
                // 清空错误状态
                setErrors({
                  email: '',
                  password: '',
                })
              }}
            >
              一鍵填入
            </button>
          </div>

          <div className="row mt-2 text-center">
            <p className="notice">
              還不是會員？
              <Link className={`${styles['link']}`} href="/member/register">
                立即免費註冊
              </Link>
            </p>
          </div>
        </form>
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
