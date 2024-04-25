import React from 'react'
import Link from 'next/link'
import styles from './member.module.css'
export default function LoginForm() {
  return (
    <>
      <div className={`box d-flex justify-content-center align-items-center bg-primary4 ${styles.box} `} >
        <form className="">
          <div className="text-center mb-2" style={{ fontSize: '24px' }}>
            會員登入
          </div>
          <div className="row mb-2">
            <div className="col-sm-12">
              <input
                type="email"
                className="form-control w-100 "
                placeholder="電子信箱"
              />
            </div>
            <div className="error my-1 text-start">
              請輸入有效的電子郵件地址。
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-sm-12">
              <input
                type="password"
                className="form-control w-100  invalid"
                placeholder="密碼"
              />
            </div>
            <div className="error my-1 text-start">請輸入密碼。</div>
          </div>

          <div className="mb-3 d-flex justify-content-center align-items-center">
            <button
              type="submit"
              className="btn btn-add-r"
              style={{ fontSize: '20px' }}
            >
              登入
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
        }
      `}</style>
    </>
  )
}
