import { useState, useEffect } from 'react'

export default function InfoPayPage() {
  const [checkedInfo, setCheckedInfo] = useState([])
  useEffect(() => {
    const CheckedInfo = window.localStorage.getItem('Checked-info')
    setCheckedInfo(JSON.parse(CheckedInfo))
  }, [])
  useEffect(() => {
    handleCod(); // 在 checkedInfo 更新時觸發一次 handleCod
  }, [checkedInfo])
  //是否可以cod貨到付款，不行時要顯示警告訊息
  const [cod, setCod] = useState(true)
  const handleCod = () => {
    if(checkedInfo.some((item) => item.pdlt_id === 2)){
      setCod(false)
    }else{
      setCod(true)
    }
  }

  return (
    <>
      <h4 className="text-light bg-primary4 p-2 mt-2">付款方式</h4>
      <div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="pay"
            id="cash"
            value="option1"
            disabled={!cod}
            onChange={handleCod}
          />
          <label className="form-check-label" htmlFor="cash">
            貨到付款
            {cod === false && <div className="text-deleted">注意：課程不可貨到付款</div>}
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="pay"
            id="linepay"
            value="option2"
          />
          <label className="form-check-label" htmlFor="linepay">
            LINE Pay
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="pay"
            id="creditcard"
            value="option3"
          />
          <label className="form-check-label" htmlFor="creditcard">
            信用卡一次付清
          </label>
        </div>
        <div>
          <div>信用卡號：</div>
          <div className="d-flex">
            <div className="me-1">
              <input
                className="form-control"
                id="no1"
                type="text"
                maxLength={4}
                size={6}
                required
              />
            </div>
            <div className="me-1">
              <input
                className="form-control"
                id="no2"
                type="text"
                maxLength={4}
                size={6}
                required
              />
            </div>
            <div className="me-1">
              <input
                className="form-control"
                id="no3"
                type="text"
                maxLength={4}
                size={6}
                required
              />
            </div>
            <div className="me-1">
              <input
                className="form-control"
                id="no3"
                type="text"
                maxLength={4}
                size={6}
                required
              />
            </div>
          </div>
          <div>有效日期：</div>
          <div className="d-flex form-group w-50">
            <select className="form-control">
              <option selected>月份</option>
              <option value="1">01</option>
              <option value="2">02</option>
              <option value="3">03</option>
              <option value="4">04</option>
              <option value="5">05</option>
              <option value="6">06</option>
              <option value="7">07</option>
              <option value="8">08</option>
              <option value="9">09</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
            </select>
            <span className="align-self-center"> / </span>
            <select className="form-control">
              <option selected>年份</option>
              <option value="1">2024</option>
              <option value="2">2025</option>
              <option value="3">2026</option>
              <option value="4">2027</option>
              <option value="5">2028</option>
              <option value="6">2029</option>
              <option value="7">2030</option>
              <option value="8">2031</option>
              <option value="9">2032</option>
              <option value="10">2033</option>
              <option value="11">2034</option>
              <option value="12">2035</option>
            </select>
            <div className="ms-1">
              <input
                type="text"
                placeholder="驗證碼"
                className="form-control"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
