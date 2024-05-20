import { useState, useEffect } from 'react'
// countdown use
import useInterval from '@/hooks/use-interval'

import { requestOtpToken, resetPassword } from '@/services/user'
import toast, { Toaster } from 'react-hot-toast'

export default function ForgetPassword() {
  const [email, setEmail] = useState('')
  const [token, setToken] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [disableBtn, setDisableBtn] = useState(false)

  // 倒數計時 countdown use
  const [count, setCount] = useState(60) // 60s
  const [delay, setDelay] = useState(null) // delay=null可以停止, delay是數字時會開始倒數

  // 倒數計時 countdown use
  useInterval(() => {
    setCount(count - 1)
  }, delay)
  // 倒數計時 countdown use
  useEffect(() => {
    if (count <= 0) {
      setDelay(null)
      setDisableBtn(false)
    }
  }, [count])

  // 處理要求一次性驗証碼用
  const handleRequestOtpToken = async () => {
    if (delay !== null) {
      toast.error('錯誤 - 60s內無法重新獲得驗証碼')
      return
    }

    const res = await requestOtpToken(email)

    // 除錯用
    console.log(res.data)

    if (res.data.status === 'success') {
      toast.success('資訊 - 驗証碼已寄送到電子郵件中')
      setCount(60) // 倒數 60秒
      setDelay(1000) // 每 1000ms = 1s 減1
      setDisableBtn(true)
    } else {
      toast.error(`錯誤 - ${res.data.message}`)
    }
  }

  // 處理重設密碼用
  const handleResetPassword = async () => {
    const res = await resetPassword(email, password, token)
    // 除錯用
    console.log(res.data)

    if (res.data.status === 'success') {
      toast.success('資訊 - 密碼已成功修改')
      window.location.href = '/member'
    } else {
      toast.error(`錯誤 - ${res.data.message}`)
    }
  }
  return (
    <>
      <main className={`form-member w-100 m-auto text-center`}>
        <h2 className="text-center mb-5">重設密碼</h2>
        <p className={`text-center mb-3 `}>
          輸入你的會員電子郵件地址，按下&quot;取得驗証碼&ldquo;按鈕後，我們會將密碼重設指示寄送給你。
        </p>
        <form>
          <div className="row mb-3">
            <div className="col-sm-12">
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`form-control w-100 }  `}
                placeholder="電子郵件地址"
              />
            </div>
            <div className={` my-2 text-start`}>
              請輸入有效的註冊會員電子郵件地址。
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-sm-12">
              <div className="input-group">
                <input
                  type="text"
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  className={`form-control `}
                  placeholder="一次性驗証碼"
                />
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={handleRequestOtpToken}
                  disabled={disableBtn}
                >
                  取得驗證碼
                </button>
              </div>
            </div>
            <div className={`my-2 text-start`}>
            {delay ? count + '秒後可以再次取得驗証碼' : '請輸入驗証碼'}
           </div>
          </div>

          <div className="row mb-3">
            <div className="col-sm-12">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`form-control w-100 `}
                placeholder="密碼"
                minLength={6}
              />
            </div>
            <div className={`my-2 text-start`}>請輸入新密碼</div>
          </div>
          <div className="row mb-3">
            <div className="col-sm-12">
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`form-control w-100 `}
                placeholder="密碼"
                minLength={6}
              />
            </div>
            <div className={` my-2 text-start`}>請輸入確認密碼</div>
          </div>

          <button onClick={handleResetPassword} className="btn btn-add w-100">
            確定
          </button>
        </form>
      </main>

      {/* 土司訊息視窗用 */}
      <Toaster />
    </>
  )
}
