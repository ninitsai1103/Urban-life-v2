import { useState, useEffect, useContext, createContext } from 'react'

const MemberInfoContext = createContext(null)

export function MemberInfoProvider({ children }) {
  const [member, setMember] = useState(null)

  useEffect(() => {
    const memberInfo = JSON.parse(localStorage.getItem('member-info'))

    if (!memberInfo) {
      // console.error('localStorage 中找不到使用者 ID，請先登入')
      // alert('請先登入')
      // window.location.href = '/member/login'
      return
    }
    const userId = memberInfo.id
    fetch(`http://localhost:3005/api/user/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 'success') {
          setMember(data.user)
        } else {
          console.error('無法取得使用者資料:', data.message)
        }
      })
      .catch((error) => {
        console.error('發生錯誤:', error)
      })
  }, [])

  // return user
  return (
    <MemberInfoContext.Provider
      // 使用value屬性提供資料給提供者階層以下的所有後代元件
      value={{
        member,
      }}
    >
      {children}
    </MemberInfoContext.Provider>
  )
}

// export default useMemberInfo
export const useMemberInfo = () => useContext(MemberInfoContext)
