import { useState } from 'react'
import styles from './info-pay.module.css'
import { useMemberInfo } from '@/hooks/use-member-info'

export default function InfoPayPage() {
  const [userInfo, setUserInfo] = useState({
    name: '',
    phone: '',
    address: '',
    email: '',
  })

  const handleFieldChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value })
  }
  //訂購人與收件人radio與input狀態變化
  const [same, setSame] = useState(false)
  //抓取localStorage的會員資訊
  // const memberInfo = JSON.parse(window.localStorage.getItem('member-info'))
  //如果有取得localStorage的會員資訊中的id，就從後端取得會員的名字、電話、地址、電子信箱
  // let url = `http://localhost:3000/api/member/${memberInfo.id}`
  const {member} = useMemberInfo()

  return (
    <>
      <h4 className="text-light bg-primary4 p-2 mt-2">訂購人資訊</h4>
      {/* table>tbody>tr>th td */}
      <table>
        <tbody>
          <tr>
            <th className="text-end">姓名：</th>
            <td className={styles.info_pay_td}>{member?.name}</td>
          </tr>
          <tr>
            <th className="text-end">電話：</th>
            <td className={styles.info_pay_td}>{member?.phone}</td>
          </tr>
          <tr>
            <th className="text-end">地址：</th>
            <td className={styles.info_pay_td}>{member?.address}</td>
          </tr>
          <tr>
            <th className="text-end">電子信箱：</th>
            <td className={styles.info_pay_td}>{member?.email}</td>
          </tr>
        </tbody>
      </table>
      <h4 className="text-light bg-primary4 p-2 mt-2">收件人資訊</h4>
      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          name="exampleRadios"
          id="same"
          value="option1"
          checked={same}
          onChange={() => {
            setSame(true)
            setUserInfo({
              name: member?.name,
              phone: member?.phone,
              address: member?.address,
              email: member?.email,
            })
            }}
        />
        <label className="form-check-label" htmlFor="same">
          同訂購人
        </label>
      </div>
      <div class="form-check">
        <input
          className="form-check-input"
          type="radio"
          name="exampleRadios"
          id="edit"
          value="option2"
          checked={!same}
          onChange={() => setSame(false)}
        />
        <label className="form-check-label" htmlFor="edit">
          修改收件人資料
        </label>
      </div>
      <table>
        <tbody>
          <tr>
            <th className="text-end">姓名：</th>
            <td className={styles.info_pay_td}>
              <input
                className="form-control"
                type="text"
                name="receiverName"
                id="name"
                value={same ? member?.name : ''}
                placeholder="請輸入收件人姓名"
                autoFocus
                disabled={same}
                onChange={handleFieldChange}
                required
              />
            </td>
          </tr>
          <tr>
            <th className="text-end">電話：</th>
            <td className={styles.info_pay_td}>
              <input
                className="form-control"
                type="text"
                name="receiverPhone"
                id="phone"
                value={same ? member?.phone : ''}
                placeholder="請輸入收件人電話"
                disabled={same}
                onChange={handleFieldChange}
                required
              />
            </td>
          </tr>
          <tr>
            <th className="text-end">寄送地址：</th>
            <td className={styles.info_pay_td}>
              <input
                className="form-control"
                type="text"
                name="receiverAddress"
                id="address"
                value={same ? member?.address : ''}
                placeholder="請輸入收件人地址"
                disabled={same}
                onChange={handleFieldChange}
                required
              />
            </td>
          </tr>
          <tr>
            <th className="text-end">電子信箱：</th>
            <td className={styles.info_pay_td}>
              <input
                className="form-control"
                type="email"
                name="receiverEmail"
                id="email"
                value={same ? member?.email : ''}
                placeholder="請輸入收件人電子信箱"
                disabled={same}
                onChange={handleFieldChange}
                required
              />
            </td>
          </tr>
        </tbody>
      </table>
    </>
  )
}
