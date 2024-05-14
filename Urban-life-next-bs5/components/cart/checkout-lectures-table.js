import { useEffect, useState } from 'react'
import { useCheckout } from '@/hooks/use-checkout'
import { FaTrashAlt } from 'react-icons/fa'
import styles from './cart-checkout.module.css'

export default function CheckoutProductsTable() {
  // 使用 useCheckout hook 來獲取購物車項目和相關函數
  //-----加到購物車的商品項目與項目狀態、刪除、增加、減少、總數、總金額
  const {
    items,
    setItems,
    removeItem,
    increaseItem,
    decreaseItem,
  } = useCheckout()

  //全選checkbox初始狀態
  const [checkAll, setCheckAll] = useState(false)

  // 監聽購物車項目變化，以確定是否全選
  useEffect(() => {
    let counter = 0
    // 遍歷購物車項目，計算被選擇的項目數量
    items.map((v) => {
      if (v.checked === true) {
        counter++
      }
    })
    const length = items.length
    // 如果所有項目都被選擇，則將全選狀態設置為 true，否則設置為 false
    if (counter === length) {
      setCheckAll(true)
    } else {
      setCheckAll(false)
    }
  }, [items])

  // 處理單個商品的選擇狀態切換
  const handleToggleChecked = (id) => {
    const nextProductsChecked = items.map((v) => {
      // 如果項目的 id 與傳入的 id 相同，則切換其 checked 狀態，否則保持原樣
      if (v.id === id) {
        return { ...v, checked: !v.checked }
      } else {
        return v
      }
    })
    // 更新購物車項目狀態
    setItems(nextProductsChecked)
  }

  // 全選的核取方塊用的事件處理函式
  const handleToggleCheckedAll = () => {
    // 如果全選按鈕為勾選狀態，則將 state 設為 false，否則設為 true
    // 切換全選按鈕狀態
    setCheckAll(!checkAll)
    // 更新每個商品的選取狀態
    const nextProductsChecked = items.map((v) => {
      return { ...v, checked: !checkAll }
    })
    setItems(nextProductsChecked)
  }
  return (
    <>
      {items.filter((item) => item.pdlt_id === 2).length > 0 && ( // 條件渲染：只有在有商品時渲染出table
        <table className="table">
          <thead>
            <tr>
              <th>
                {/* <input
                  type="checkbox"
                  checked={checkAll}
                  onClick={(e) => {
                    handleToggleCheckedAll(e)
                  }}
                /> */}
              </th>
              <th>課程</th>
              <th className={styles.d_td}>單價</th>
              <th className={styles.d_td}>數量</th>
              <th className="text-center">小計</th>
              <th></th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {items.filter((item) => item.pdlt_id === 2).map((v, i) => {
              //撈出加入購物車的商品陣列物件
              return (
                <tr className="align-middle" key={i}>
                  <td>
                    <input
                      type="checkbox"
                      checked={v.checked}
                      value={v.tr}
                      onChange={() => handleToggleChecked(v.id)}
                    />
                  </td>
                  <td className="w-50">
                    <div className="d-flex align-items-center">
                      <div className={styles.d_img}>
                        <img src={`http://localhost:3005/lecture_img/${v.cover}`} className="img-fluid" />
                      </div>
                      <div className="ps-sm-2">
                        <div className={styles.name}>
                          {v.name} ({v.lecture_date})
                        </div>
                        <div className={styles.d_cell_price}>
                          單價：{v.price}
                        </div>
                        <div className={styles.d_cell_amount}>
                          <button
                            className="btn btn-main-r"
                            onClick={() => {
                              decreaseItem(v.id)
                            }}
                          >
                            -
                          </button>
                          <span> {v.qty} </span>
                          <button
                            className="btn btn-main-r"
                            onClick={() => {
                              increaseItem(v.id)
                            }}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className={styles.d_td}>
                    <div className={styles.d_cell}>NTD {v.price}</div>
                  </td>
                  <td className={styles.d_td}>
                    <button
                      className="btn btn-main-r ts-5"
                      onClick={() => {
                        decreaseItem(v.id)
                      }}
                    >
                      -
                    </button>
                    <span> {v.qty} </span>
                    <button
                      className="btn btn-main-r ts-5"
                      onClick={() => {
                        increaseItem(v.id)
                      }}
                    >
                      +
                    </button>
                  </td>
                  <td className="text-center">NTD {v.price * v.qty}</td>
                  <td className="text-center">
                    <button
                      className="btn btn-delete-r"
                      onClick={() => {
                        removeItem(v.id)
                      }}
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      )}
    </>
  )
}
