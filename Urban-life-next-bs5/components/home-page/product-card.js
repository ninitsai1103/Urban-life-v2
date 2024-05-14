import React from 'react'

export default function ProductCard() {
  return (
    <>
      <div className="card">
        <div className="card-img">
          <img
            src="/images/product/product_img/Pi2401260932.jpg"
            className="card-img-top"
          />
        </div>

        <div className="card-body ">
          <h5 className="card-title fw-bold">初雪</h5>
          <div className=" text-overflow mb-3">
            <p className="card-text">
              獨家！首個早熟品種。在春季和秋季試驗中表現出色。比雪之冠更早熟、更一致、更可靠。中等大小的植株，包裹度平均。適應性廣泛。
            </p>
          </div>

          <h4>$200</h4>
        </div>
      </div>

      <style jsx>{`
        .card {
          width: 200px;
          border-radius: 8px;
        }
       
        .card-img-top {
          border-radius: 7px 7px 0 0;
        }

        .text-overflow {
          
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
          overflow: hidden;
        }
      `}</style>
    </>
  )
}
