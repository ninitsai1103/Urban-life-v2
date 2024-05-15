import React from 'react'
import { RxCross2 } from 'react-icons/rx'
import Link from 'next/link'
import { useCheckout } from '@/hooks/use-checkout'
import Image from 'next/image'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import toast, { Toaster } from 'react-hot-toast'
import Page from '../product/pagination'
export default function CollectProducts({ collect }) {
  //加入購物車
  const { addItem } = useCheckout()

  const MySwal = withReactContent(Swal)

  const notifySA = (productName) => {
    MySwal.fire({
      title: '成功加入',
      text: productName + '已成功加入購物車!',
      icon: 'success',
    })
  }

  // 移除
  const handleDelete = async () => {
    try {
      console.log(collect.id)
      const response = await fetch(
        `http://localhost:3005/api/collection1/${collect.id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      const data = await response.json()
      toast.success('刪除成功')
      window.location.reload()
    } catch (error) {
      console.error('移除失敗:', error)
    }
  }
  return (
    <>
      <table className="table ">
        <tbody className="table-group-divider border-top-0">
          <tr className="align-middle">
            <td className="delete-btn">
              <RxCross2 onClick={handleDelete} />
            </td>
            <td>
              <div className="d-flex align-items-center">
                <div className="img me-3">
                  {collect.pdltat_id === 1 && (
                    <div className="img me-3 ">
                        <Image
                          src={`/images/product/product_cover/${collect.product_image}`}
                          width={30}
                          height={30}
                          property="true"
                          alt=""
                        />
                    </div>
                  )}
                  {collect.pdltat_id === 2 && (
                    <div className="img me-3">
                      <Image
                        src={`http://localhost:3005/lecture_img/${collect.product_image}`}
                        width={30}
                        height={30}
                        property="true"
                        alt=""
                      />
                    </div>
                  )}
                </div>
                <div className="text-size product-name">
                <Link href={`/lecture/${collect.product_id}`}>
                  {collect.product_name}
                  </Link>
                </div>
              </div>
            </td>
            <td className="price-container">NTD {collect.product_price}</td>
            <td className="align-middle detail-btn">
              <div className="d-flex align-items-center ">
              {collect.pdltat_id === 1 && (
                <Link
                  className="btn btn-main me-2 "
                  href={`/product/${collect.product_id}`}
                >
                  查看細節
                </Link>
              )}
              {collect.pdltat_id === 2 && (
                <Link
                  className="btn btn-main me-2 "
                  href={`/article/detail/${collect.product_id}`}
                >
                  查看細節
                </Link>
              )}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <Toaster />
      <style jsx>{`
        .img {
          width: 80px;
          height: 80px;
        }

        .text-size {
          font-size: 20px;
        }

        .product-name {
          width: 150px; /* 固定產品名稱的最大寬度 */
          white-space: nowrap;
        }

        .price-container {
          width: 100px; /* 固定價格欄位的寬度 */
        }
        .delete-btn {
          cursor: pointer;
        }
        @media (max-width: 768px) {
          .product-name {
            overflow: hidden;
            white-space: normal;
          }
          .price-container {
            display: none;
          }
        
          .detail-btn{
            display: none;
          }
        }
      `}</style>
    </>
  )
}
