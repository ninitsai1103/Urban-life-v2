import { useState, useEffect } from 'react'

export default function InfoPayPage() {
  const [checkedInfo, setCheckedInfo] = useState([])
  useEffect(() => {
    const CheckedInfo = window.localStorage.getItem('Checked-info')
    setCheckedInfo(JSON.parse(CheckedInfo))
  }, [])
  useEffect(() => {
    handleCod() // 在 checkedInfo 更新時觸發一次 handleCod
  }, [checkedInfo])
  //是否可以cod貨到付款，不行時要顯示警告訊息
  const [cod, setCod] = useState(true)
  const handleCod = () => {
    if (checkedInfo.some((item) => item.pdlt_id === 2)) {
      setCod(false)
    } else {
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
            value="cash"
            disabled={!cod}
            onChange={handleCod}
          />
          <label className="form-check-label" htmlFor="cash">
            貨到付款
          </label>
          {cod === false && (
            <div className="text-deleted">注意：課程不可貨到付款</div>
          )}
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="pay"
            id="linepay"
            value="linepay"
          />
          <label className="form-check-label" htmlFor="linepay">
            LINE Pay
          </label>
        </div>
      </div>
    </>
  )
}
