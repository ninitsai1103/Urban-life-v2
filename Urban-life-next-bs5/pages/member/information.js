import {  useEffect,useState } from 'react'
import AsideAccount from '@/components/member/aside-account'
import TWZipCode from '@/components/tw-zipcode'
import useMembers from '@/hooks/use-member'
import dynamic from 'next/dynamic'
const InputDatePicker = dynamic(
  () => import('@/components/common/input-date-picker'),
  {
    ssr: false,
  }
)

export default function Information() {
  //生日
  const [showDatepicker, setShowDatepicker] = useState(false)
  const [date, setDate] = useState('')
  //地址
 
  //連接資料庫
  const { members} = useMembers()

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
            <div className="form" >
              <form>
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
                    placeholder=  {members.name}
                    value={members.name}
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="exampleInputEmail"
                    className="form-label fonts"
                  >
                    手機號碼 *
                  </label>
                  <input
                    type="phone"
                    className="form-control"
                    id="exampleInputPhone"
                    placeholder="09"
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
                    <InputDatePicker
                      showDatepicker={showDatepicker}
                      setFormat="yyyy-mm-dd"
                      showFormat="yyyy/mm/dd"
                      setDate={setDate}
                      className="form-control w-100 }"
                      style={{
                        borderRadius: 2.8,
                      }}
                      placeholder="出生年月日"
                    />
                    <i
                      className="bi bi-calendar4 position-absolute"
                      role="presentation"
                      style={{ right: 10, cursor: 'pointer', zIndex: 100 }}
                      onClick={() => setShowDatepicker(!showDatepicker)}
                    ></i>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="btn-group">
                    <input
                      type="radio"
                      className="btn-check"
                      name="sex"
                      id="option1"
                      autoComplete="off"
                    />
                    <label
                      className="btn btn-outline-primary"
                      htmlFor="option1"
                    >
                      男
                    </label>
                    <input
                      type="radio"
                      className="btn-check"
                      name="sex"
                      id="option2"
                      autoComplete="off"
                    />
                    <label
                      className="btn btn-outline-primary"
                      htmlFor="option2"
                    >
                      女
                    </label>
                  </div>
                </div>
                <div className="mb-3 row">
                <TWZipCode />
                </div>

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
