import { useState } from 'react'
import styles from './member.module.css'
import Link from 'next/link'
export default function RegisterForm() {
  const [user, setUser] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  })
  // 錯誤訊息狀態
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  })
  // 顯示密碼的核取方塊用
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  // 多欄位共用事件函式
  const handleFieldChange = (e) => {
    console.log(e.target.name, e.target.value, e.target.type)

    setUser({ ...user, [e.target.name]: e.target.value })
  }
  const handleSubmit = async (e) => {
    // 阻擋表單預設送出行為
    e.preventDefault()

    // 表單檢查
    // 建立一個新的錯誤物件
    const newErrors = {
      email: '',
      password: '',
      confirmPassword: '',
      RegisterError: '',
    }

    // 信號值，代表是否有錯誤
    let hasErrors = false

    if (!user.email) {
      newErrors.email = '帳號為必填'
      hasErrors = true
    }

    if (user.password !== user.confirmPassword) {
      newErrors.password = '密碼與確認密碼需要一致'
      newErrors.confirmPassword = '密碼與確認密碼需要一致'
      hasErrors = true
    }

    if (!user.password) {
      newErrors.password = '密碼為必填'
      hasErrors = true
    }

    if (!user.confirmPassword) {
      newErrors.confirmPassword = '確認密碼為必填'
      hasErrors = true
    }

    // 呈現錯誤訊息
    setErrors(newErrors)

    // 有錯誤，不送到伺服器，跳出submit函式
    if (hasErrors) {
      return
    }
    // 表單檢查 --- END

    // 最後檢查完全沒問題才送到伺服器(ajax/fetch)
    if (!hasErrors) {
      try {
        const response = await fetch('http://localhost:3005/api/user/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user),
        })
        const data = await response.json() // 建立一個包含使用者資訊的物件

        // console.log(data);
        const memberInfo = {
          id: data.user.id,
          identity_id: data.user.identity_id,
          token: data.token,
        }
        // 將 JSON 字串存儲到 localStorage 中
        // 表單驗證通過後跳轉到目標連結
        window.location.href = '/member/information'
        if (response.ok) {
          console.log('註冊成功')
          localStorage.setItem('member-info', JSON.stringify(memberInfo))
          // 登录成功，重定向到用户资料页面或其他页面
          window.location.href = '/member/information'
        } else {
          // 登录失败，显示错误消息
          console.error('Login failed:', data.message)
          setErrors({ ...errors, RegisterError: 'email已存在' })
        }
      } catch (error) {
        setErrors({ ...errors, RegisterError: 'email已存在' })
      }
    }
  }
  return (
    <>
      <div
        className={`box d-flex justify-content-center align-items-center bg-primary4 ${styles.box}`}
      >
        <form className="form" onSubmit={handleSubmit}>
          <div className="text-center mb-3" style={{ fontSize: '24px' }}>
            會員註冊
          </div>
          <div className="row mb-2">
            <div className="col-sm-12">
              <input
                type="email"
                className="form-control w-100"
                placeholder="電子信箱"
                name="email"
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
                name="password"
                onChange={handleFieldChange}
              />
              <span className="error my-1 text-start">{errors.password}</span>
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-sm-12">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                className="form-control w-100"
                value={user.confirmPassword}
                placeholder="確認密碼"
                onChange={handleFieldChange}
              />
              <span className="error my-1 text-start">{errors.password}</span>
              <span className="error my-1 text-start">
                {errors.RegisterError}
              </span>
            </div>
          </div>

          <div className="mb-3 d-flex justify-content-center align-items-center">
            <button
              href="/member/information"
              type="submit"
              className="btn btn-add-r"
              style={{ fontSize: '20px' }}
            >
              註冊
            </button>
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
        }
      `}</style>
    </>
  )
}
