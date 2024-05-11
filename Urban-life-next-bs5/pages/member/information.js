import { useEffect, useState } from 'react'
import AsideAccount from '@/components/member/aside-account'
import ZipCode from '@/components/member/zip-code'
import { useMemberInfo } from '@/hooks/use-member-info'

export default function Information() {
  // hooks
  const { member } = useMemberInfo()
  // 用物件狀態對應整個表單欄位
  const [user, setUser] = useState({
    name: '',
    phone: '',
    birthday: '',
    gender: '',
    address: '',
    password: "",
    newPassword: "",
    confirmPassword: "",
  })
  // 錯誤訊息狀態
  const [errors, setErrors] = useState(null)


  // 多欄位共用事件處理函式
  const handleFieldChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  //表單送出(更新)
  const handleSubmit = async (e) => {
    e.preventDefault()
  
    // 檢查密碼相關欄位是否有值，並且只有在使用者填寫了密碼時才檢查密碼相符性
    let hasErrors = false
    if (user.password && (!user.newPassword || !user.confirmPassword)) {
      setErrors('新密碼和確認密碼為必填')
      hasErrors = true
    } else if (user.newPassword !== user.confirmPassword) {
      setErrors('新密碼和確認密碼不匹配')
      hasErrors = true
    }
  
    if (!hasErrors) {
      try {
        // 建立新的使用者物件，僅包含有值的屬性
        const updatedUser = {}
        Object.keys(user).forEach((key) => {
          if (user[key] !== '') {
            updatedUser[key] = user[key]
          }
        })
  
        // 檢查是否有要更新的資料
        if (Object.keys(updatedUser).length === 0) {
          setErrors('沒有要更新的資料')
          return
        }
  
        const memberInfo = JSON.parse(localStorage.getItem('member-info'))
        const userId = memberInfo.id
        if (!memberInfo) {
          console.error('Error: Member info not found in localStorage')
          return
        }
  
        // 更新使用者資訊
        const response = await fetch(`http://localhost:3005/api/user/${userId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedUser),
        })
  
        const data = await response.json()
  
        if (response.ok) {
          console.log('更新成功')
          console.log('使用者資訊：', data.user)
          alert('更新成功')
          window.location.reload()
        } else {
          console.error('更新失敗:', data.message)
        }
      } catch (error) {
        console.error('更新失敗:', error)
      }
    }
  }
  

  return (
    <>
      <div className="container">
        <div className="row margin-padding">
          <div className="col-lg-3 col-md-12 aside">
            <AsideAccount />
          </div>
          <div className="col-lg-9 col-md-12 main-content">
            <div
              className="d-flex align-items-center justify-content-between title-margin
            "
            >
              <div className="title">個人資料</div>
            </div>
            <div className="form">
              <form onSubmit={handleSubmit}>
                <div className="mb-3 section-font text-primary2">帳戶資訊</div>
                <div className="mb-3">
                  <label
                    htmlFor="exampleInputName"
                    className="form-label fonts"
                  >
                    姓名 *
                  </label>
                  <input
                    type="name"
                    className="form-control"
                    id="exampleInputName"
                    name="name"
                    value={user.name}
                    onChange={handleFieldChange}
                    readOnly={!!member?.name}
                    placeholder={member?.name ? member?.name : '姓名'}
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="exampleInputEmail"
                    className="form-label fonts"
                  >
                    電子信箱
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputEmail"
                    readOnly={true}
                    placeholder={member?.email}
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="exampleInputPhone"
                    className="form-label fonts"
                  >
                    手機號碼 *
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="phone"
                    id="exampleInputPhone"
                    pattern="09\d{8}"
                    title="例如：0911222333" // 提供格式提示
                    placeholder={member?.phone ? member.phone : '09'}
                    value={user.phone}
                    readOnly={!!member?.phone}
                    onChange={handleFieldChange}
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="exampleInputDate"
                    className="form-label fonts"
                  >
                    生日 *
                  </label>
                  <div className="input-group position-relative d-inline-flex align-items-center">
                    <input
                      type="date"
                      className="form-control"
                      name="birthday"
                      id="exampleInputDate"
                      value={member?.birthday}
                      readOnly={!!member?.birthday}
                      onChange={handleFieldChange}
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label
                    htmlFor="exampleInputAddress"
                    className="form-label fonts"
                  >
                    地址 *
                  </label>
                  {member?.address ? (
                    <input
                      type="address"
                      className="form-control"
                      id="exampleInputAddress"
                      placeholder={member?.address}
                      readOnly={true}
                    />
                  ) : (
                    <ZipCode
                      onAddressChange={(fullAddress) =>
                        setUser({ ...user, address: fullAddress })
                      }
                    />
                  )}
                </div>
                {/* <div className="text-center pt-3 mb-3">
                  <button type="submit" className="btn btn-add">
                    確認修改
                  </button>
                </div> */}
              {/* </form> */}
              <div className="mb-3 section-font text-primary2 ">密碼變更</div>
              <div className="mb-3">
                <label
                  htmlFor="exampleInputPassword1"
                  className="form-label fonts"
                >
                  原密碼
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="請輸入原密碼"
                  name="password"
                  value={user.password}
                  onChange={handleFieldChange}
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="exampleInputPassword2"
                  className="form-label fonts"
                >
                  新密碼
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword2"
                  placeholder="請輸入新密碼"
                  name="newPassword"
                  value={user.newPassword}
                  onChange={handleFieldChange}
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="exampleInputPassword3"
                  className="form-label fonts"
                >
                  重新輸入新密碼
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword3"
                  placeholder="請輸入新密碼"
                  name="confirmPassword"
                  value={user.confirmPassword}
                  onChange={handleFieldChange}
                />
              </div>
              <div className="text-center pt-3 mb-3">
                <button type="submit" className="btn btn-add">
                  確認修改
                </button>
              </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .margin-padding {
          margin: 20px;
          padding: 33px 0px;
        }

        .main-content {
          padding: 30px 20px;
          background-color: #ffffff;
          border-radius: 8px;
          border: 1px solid #ccc;
        }
        .title-margin {
          margin-bottom: 25px;
        }
        .title {
          padding: 0px 50px;
          font-size: 36px;
          font-weight: bold;
        }
        .form {
          padding: 0px 50px;
        }
        .section-font {
          font-size: 20px;
        }
        .fonts {
          font-size: 12px;
        }
        @media (max-width: 992px) {
          .aside {
            padding: 0px;
            margin-bottom: 40px;
          }
          .main-content {
            margin: 0px;
          }
        }

        @media (max-width: 768px) {
          .title-margin {
            margin-bottom: 0px;
          }
          .title {
            display: none;
          }
          .main-content {
            background: none;
            border: none;
          }
          .form {
            padding: 0px;
          }
          .section-font {
            color: #000;
            font-weight: bold;
          }
        }
      `}</style>
    </>
  )
}
