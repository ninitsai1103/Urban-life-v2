import { useState } from 'react'
import styles from './info-pay.module.css'

export default function InfoPayPage() {
  // 切換同訂購人和修正收件人 開始
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [email, setEmail] = useState('')
  const [same, setSame] = useState(false)
  // 切換同訂購人和修正收件人 結束
  return (
    <>
      <h4 className="text-light bg-primary4 p-2 mt-2">訂購人資訊</h4>
      {/* table>tbody>tr>th td */}
      <table>
        <tbody>
          <tr>
            <th className="text-end">姓名：</th>
            <td className={styles.info_pay_td}>蔡妮妮</td>
          </tr>
          <tr>
            <th className="text-end">電話：</th>
            <td className={styles.info_pay_td}>0970888777</td>
          </tr>
          <tr>
            <th className="text-end">地址：</th>
            <td className={styles.info_pay_td}>桃園市中壢區新生路二段421號</td>
          </tr>
          <tr>
            <th className="text-end">電子信箱：</th>
            <td className={styles.info_pay_td}>Ninitsai1103@test.com</td>
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
            checked
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
                name="name"
                id="name"
                placeholder="請輸入收件人姓名"
              />
            </td>
          </tr>
          <tr>
            <th className="text-end">電話：</th>
            <td className={styles.info_pay_td}>
              <input
                className="form-control"
                type="text"
                name="phone"
                id="phone"
                placeholder="請輸入收件人電話"
              />
            </td>
          </tr>
          <tr>
            <th className="text-end">寄送地址：</th>
            <td className={styles.info_pay_td}>
              <input
                className="form-control"
                type="text"
                name="address"
                id="address"
                placeholder="請輸入收件人地址"
              />
            </td>
          </tr>
          <tr>
            <th className="text-end">電子信箱：</th>
            <td className={styles.info_pay_td}>
              <input
                className="form-control"
                type="email"
                name="email"
                id="email"
                placeholder="請輸入收件人電子信箱"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </>
  )
}
