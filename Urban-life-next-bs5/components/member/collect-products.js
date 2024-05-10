import React from 'react';
import { RxCross2 } from 'react-icons/rx';
import Image from 'next/image';

export default function CollectProducts({ collect }) {
    // 移除
    const handleDelete = async () => {
      try {
        console.log(collect.id);
        const response = await fetch(`http://localhost:3005/api/collection1/${collect.id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        const data = await response.json()
        alert("刪除成功")
        window.location.reload();
      } catch (error) {
        console.error('移除失敗:', error)
      }
    }
  return (
    <>
      <table className="table ">
        <tbody className="table-group-divider border-top-0">
          <tr className="align-middle">
            <td className='delete-btn'>
              <RxCross2  onClick={handleDelete} />
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
                <div className="text-size product-name">{collect.product_name}</div>
              </div>
            </td>
            <td className="price-container">NTD {collect.product_price}</td>
            <td className="align-middle">
              <div className="d-flex align-items-center">
                <button className="btn btn-main me-2" onClick={() => {}}>
                  加入購物車
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
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
          {/* overflow: hidden; */}
        }

        .price-container {
          width: 100px; /* 固定價格欄位的寬度 */
        }
        .delete-btn{
          cursor:pointer;
        }
        @media (max-width: 768px) {
          .product-name{
            display: none
          }
        }
      `}</style>
    </>
  );
}
