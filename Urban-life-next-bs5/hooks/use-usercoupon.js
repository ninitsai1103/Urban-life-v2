import { createContext, useState, useContext } from 'react'
import { useMemberInfo } from '@/hooks/use-member-info'

const UserCouponContext = createContext(null)

export function UserCouponProvider({ children }) {
  // 利用use-member-info的hooks抓取localStorage的會員資訊

  // user_coupons資料的狀態，加進去需要用到
  const [userCoupons, setUserCoupons] = useState([])
  // 從user_coupon抓資料近來
  const getCoupons = async () => {
    // 後端網址

    // fetch抓資料
    try {
      const url = `http://localhost:3005/api/user_coupon`
      const res = await fetch(url)
      const data = await res.json()
      // 所有此user擁有的coupon
      const userCoupon = data.data.user_coupon

      // 成功獲取資料就把資料設定到coupons狀態裡面
      if (Array.isArray(userCoupon)) {
        setUserCoupons(userCoupon)
      } else {
        alert('伺服器回傳資料類型錯誤，無法設定到狀態中')
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <UserCouponContext.Provider
      // 使用value屬性提供資料給提供者階層以下的所有後代元件
      value={{
        userCoupons,
        setUserCoupons,
        getCoupons,
      }}
    >
      {children}
    </UserCouponContext.Provider>
  )
}

export const useUserCoupon = () => useContext(UserCouponContext)
