import React from 'react'
import { useCart } from '@/hooks/use-checkout'
import { FaTrashAlt } from 'react-icons/fa'
import styles from './cart-checkout.module.css'

export default function CheckoutProductsTable() {
  const { items, removeItem, increaseItem, decreaseItem } = useCart()
  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th>
              <input type="checkbox" />
            </th>
            <th>商品</th>
            <th className={styles.d_td}>單價</th>
            <th className={styles.d_td}>數量</th>
            <th className="text-center">小計</th>
            <th></th>
          </tr>
        </thead>
        <tbody className="table-group-divider">
          {items.map((v, i) => (
          <tr className="align-middle">
            <td>
              <input type="checkbox" />
            </td>
            <td className="w-50">
              <div className="d-flex align-items-center">
                <div className={styles.d_img}>
                  <img
                    src="/images/product/slide/t1.jpg"
                    className="img-fluid"
                  />
                </div>
                <div className="ps-sm-2">
                  <div className={styles.name}>{v.name}</div>
                  <div className={styles.d_cell_price}>單價：{v.price}</div>
                  <div className={styles.d_cell_amount}>
                    <button className="btn btn-main-r" onClick={() => {}}>
                      -
                    </button>
                    <span> {v.amount} </span>
                    <button className="btn btn-main-r" onClick={() => {}}>
                      +
                    </button>
                  </div>
                </div>
              </div>
            </td>
            <td className={styles.d_td}>
              <div className={styles.d_cell}>NTD {totalPrice}</div>
            </td>
            <td className={styles.d_td}>
              <button className="btn btn-main-r ts-5" onClick={() => {}}>
                -
              </button>
              <span> {v.price} </span>
              <button className="btn btn-main-r ts-5" onClick={() => {}}>
                +
              </button>
            </td>
            <td className="text-center">NTD {totalPrice}</td>
            <td className="text-center">
              <button className="btn btn-delete-r" onClick={() => {}}>
                <FaTrashAlt />
              </button>
            </td>
          </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}
