import React from 'react'
import { useCart } from '@/hooks/use-checkout'
import { RxCross2 } from 'react-icons/rx'
import Image from 'next/image'

export default function CollectLectures() {
  const { items, removeItem, increaseItem, decreaseItem } = useCart()
  return (
    <>
      <table className="table ">
        <tbody className="table-group-divider border-top-0">
          <tr className="align-middle">
            <td>
              <RxCross2 />
            </td>
            <td>
              <div className="d-flex">
                <div className="img me-3">
                  <Image
                    src="/images/product/slide/t1.jpg"
                    width={30}
                    height={30}
                  />
                </div>
                <div className="text-size d-flex align-items-center justify-content-center">課程名稱</div>
                
                {/* <div className="d-flex flex-column justify-content-center">
                  <div className="text-size">課程名稱</div>
                  <div className="">單價：NTD 100</div>
                </div> */}
                
              </div>
            </td>
            <td>NTD 100</td>
            <td>
              <button className="btn btn-main" onClick={() => {}}>
                加入購物車
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <style jsx>{`
        {/* .table-border {
          border-bottom: 1px solid #E8ECEF;
        } */}
        .img {
          width: 80px;
          height: 80px;
        }

        .text-size {
          font-size: 20px;
        }
      `}</style>
    </>
  )
}
