import React from 'react'
import styles from './member.module.css'

export default function RegisterForm() {
  return (
    <>
        <div className={`box d-flex justify-content-center align-items-center bg-primary4 ${styles.box}`}>
          <form className='form'>
          <div className="text-center mb-3" style={{ fontSize: '24px' }}>
          會員註冊
          </div>
            <div className="row mb-3">
            <div className="col-sm-12">
              <input
                type="email"
                className="form-control w-100 "
                placeholder="電子信箱"
              />
            </div>
            {/* <div className="error my-1 text-start">
              請輸入有效的電子郵件地址。
            </div> */}
          </div>
          <div className="row mb-3">
            <div className="col-sm-12">
              <input
                type="password"
                className="form-control w-100  invalid"
                placeholder="密碼"
              />
            </div>
            {/* <div className="error my-1 text-start">請輸入密碼。</div> */}
          </div>
          <div className="row mb-2">
            <div className="col-sm-12">
              <input
                type="password"
                className="form-control w-100  invalid"
                placeholder="再輸入一次密碼"
              />
            </div>
            {/* <div className="error my-1 text-start">請輸入密碼。</div> */}
          </div>
            <div className="error my-1 text-start" >
              帳號已存在
            </div>
            <div className="mb-3 d-flex justify-content-center align-items-center">
            <a
            href='/member/information'
              type="submit"
              className="btn btn-add-r"
              style={{ fontSize: '20px' }}
            >
              註冊
            </a>
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
