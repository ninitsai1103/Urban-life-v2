import React from 'react'
import products from '@/data/products-lectures-test/products.json'
import { useCheckout } from '@/hooks/use-checkout'
import toast, { Toast, Toaster } from 'react-hot-toast'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export default function ProductList() {
  const { addItem } = useCheckout()

  const MySwal = withReactContent(Swal)

  const notifySA = (productName) => {
    MySwal.fire({
      title: '成功加入',
      text: productName + '已成功加入購物車!',
      icon: 'success',
    })
  }

  // const notify = (productName) =>
  //   toast.success(productName + ' 已成功加入購物車!')

  return (
    <>
      <ul>
        {products.map((v, i) => {
          return (
            <li key={v.id}>
              <div>{v.name}</div>
              <div>{v.price}</div>
              <div>
                <button
                  onClick={() => {
                    // 呈現訊息
                    notifySA(v.name)
                    // notify(v.name)

                    // 加入購物車狀態
                    addItem(v)
                  }}
                >
                  加入購物車
                </button>
              </div>
            </li>
          )
        })}
      </ul>
      {/* 用於土司訊息的元件 */}
      {/* <Toaster /> */}
    </>
  )
}