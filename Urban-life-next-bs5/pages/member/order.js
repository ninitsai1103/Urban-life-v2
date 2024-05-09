import React, { useEffect, useState } from 'react'
import AsideAccount from '@/components/member/aside-account'
import OrderList from '@/components/member/order-list'
import OrderCard from '@/components/member/order-card'
import Page from '@/components/product/pagination'
export default function OrderMainPage() {
  // order的訂單狀態
  const [orders, setOrders] = useState([])

  // 連線至order_detail
  const getOrderDetail = async () => {
    const url = 'http://localhost:3005/api/order'

    // fetch抓資料
    try {
      const res = await fetch(url)
      const data = await res.json()
      console.log(data);

      const orders = data.data.order
      // console.log(orders)
      // 將相同order_id的東西儲存成一個物件
      // 新增一個key專門儲存product的資料
      const mergedOrders = orders.reduce((acc, order) => {
        const existingOrder = acc.find(
          (item) => item.order_id === order.order_id
        )
        if (existingOrder) {
          // 如果訂單已存在，將新的商品資料合併到 items 陣列中
          existingOrder.items.push({
            id: order.id,
            product_id: order.product_id,
            pdlt_id: order.pdlt_id,
            name: order.name,
            price: order.price,
            cover: order.cover,
            amount: order.amount,
          })
        } else {
          // 如果訂單不存在，新增一個新的訂單物件
          acc.push({
            order_id: order.order_id,
            user_id: order.user_id,
            pay: order.pay,
            // order_code: order.order_code,
            name: order.name,
            phone: order.phone,
            address: order.address,
            email: order.email,
            total: order.total,
            date: order.date,
            coupon_id: order.coupon_id,
            items: [
              {
                id: order.id,
                product_id: order.product_id,
                pdlt_id: order.pdlt_id,
                amount: order.amount,
                name: order.name,
                price: order.price,
                cover: order.cover,
              },
            ],
          })
        }
        return acc
      }, [])

      console.log(mergedOrders)
      setOrders(mergedOrders)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getOrderDetail()
  }, [])

  return (
    <>
      <div className="container">
        <div className="row margin-padding">
          <div className="col-lg-3 col-md-12 aside">
            <AsideAccount />
          </div>
          <div className="col-lg-9 col-md-12 main-content">
            <div
              className="d-flex align-items-center justify-content-between title-margin
            "
            >
              <div className="title">訂單記錄</div>
            </div>
            <div className="content">
              <div className="row">
                {/* 桌面版顯示表格 */}
                <div className="col-lg-12 d-none d-lg-block ">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">訂單ID</th>
                        <th scope="col">訂單日期</th>
                        <th scope="col">金額</th>
                        <th scope="col"></th>
                      </tr>
                    </thead>
                    {orders.map((order) => {
                      return <OrderList order={order} key={order.order_id} />
                    })}
                  </table>
                </div>
                {/* 手機版顯示卡片 */}
                <div className="d-lg-none">
                  <OrderCard />
                  <OrderCard />
                </div>
              </div>
            </div>
            <div>
              <Page />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .margin-padding {
          margin: 20px;
          padding: 33px 0px;
        }
        .main-content {
          padding: 30px 20px;
          background-color: #ffffff;
          border-radius: 8px;
          border: 1px solid #ccc;
        }
        .title-margin {
          margin-bottom: 10px;
        }
        .title {
          padding: 0px 50px;
          font-size: 36px;
          font-weight: bold;
        }
        .content {
          padding: 0px 50px;
        }
        .button {
          display: flex;
          gap: 1rem;
          justify-content: center;
        }
        .card {
          border-radius: 8px;
          padding: 10px;
        }
        @media (max-width: 992px) {
          .aside {
            padding: 0px;
            margin-bottom: 40px;
          }
          .main-content {
            margin: 0px;
          }
        }

        @media (max-width: 768px) {
          table {
            display: none;
          }
          .aside {
            padding: 0px;
            margin-bottom: 40px;
          }
          .title {
            padding: 0;
            font-size: 20px;
          }
          .main-content {
            margin: 0px;
            background: none;
            border: none;
          }
          .content {
            padding: 0px;
          }
        }
      `}</style>
    </>
  )
}
