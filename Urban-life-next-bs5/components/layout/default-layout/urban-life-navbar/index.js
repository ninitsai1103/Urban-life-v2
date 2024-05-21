import React, { useState, useEffect } from 'react'
import { TfiMenu } from 'react-icons/tfi'
import { FaUser } from 'react-icons/fa'
import { FaShoppingCart } from 'react-icons/fa'
import { IoIosLogOut } from 'react-icons/io'
import Link from 'next/link'
import { identity } from 'lodash'
import { useCheckout } from '@/hooks/use-checkout'

import useFirebase from '@/hooks/use-firebase'
import { logout } from '@/services/user'
import toast, { Toaster } from 'react-hot-toast'

import { useMemberInfo } from '@/hooks/use-member-info'
export default function MyNavbar() {
  const { totalItems } = useCheckout()
  const [phoneNav, setPhoneNav] = useState(false)

  const handlePhoneNav = () => {
    setPhoneNav(!phoneNav)
  }

  // 判斷現在的user是誰
  const [user, setUser] = useState('登入')

  // 會員網址
  const [memberUrl, setMemberUrl] = useState('')
  // 登出用
  const { logoutFirebase } = useFirebase()
  const { member } = useMemberInfo()

  // 渲染以後才能拿到localStorage
  useEffect(() => {
    // 把localStorage裡的member-info拉出來
    const memberInfo = JSON.parse(localStorage.getItem('member-info'))

    if (memberInfo) {
      // member-info是物件需要解構下
      const { name, identity_id } = memberInfo
      const newUser = name

      switch (identity_id) {
        case 1:
          setUser(newUser)
          setMemberUrl('/official-account')
          break
        case 2:
          setUser(newUser)
          setMemberUrl('/teacherInformation')
          break
        case 3:
          setUser(newUser)
          setMemberUrl('/information')
          break
        case '':
          setMemberUrl('/login')
          break
      }
    }
  }, [user])

  // 登出
  const handleLogout = async () => {
    try {
      logoutFirebase()

      await logout()

      const response = await fetch('http://localhost:3005/api/user/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${member?.token}`, // 替換為有效的 JWT
        },
      })
      await await response.json()
      localStorage.removeItem('member-info')
      localStorage.removeItem('selectedCoupon')
      localStorage.removeItem('warning')
      localStorage.removeItem('items')
      localStorage.removeItem('pricePayable')
      localStorage.removeItem('Checked-info')
      localStorage.removeItem('discount')
      toast.success('已成功登出，將重新導向首頁，請等待3秒')
      setTimeout(() => {
        window.location.href = '/'
      }, 3000)
    } catch (error) {
      toast.error(`登出失敗`)
      console.log(error)
    }
  }

  //要登入才能進入購物車
  const [intoCart, setIntoCart] = useState(false)
  useEffect(() => {
    // 把localStorage裡的member-info拉出來
    const memberInfo = JSON.parse(localStorage.getItem('member-info'))
    if (memberInfo !== null && memberInfo !== undefined) {
      setIntoCart(true)
    } else {
      setIntoCart(false)
    }
  })
  const handleReminder = () => {
    //   alert('請先登入會員')
    //   setTimeout(() => {
    //     window.location.href = '/member/login';
    // }, 3000); // 等待3秒（3000毫秒）
    toast.success('請先登入才能使用購物車喔，為您導向登入畫面。')
    setTimeout(() => {
      window.location.href = '/member/login'
    }, 3000)
  }
  return (
    <>
      <div className="header">
        <div className="container d-flex m-3">
          <div
            className="nav-phone-left "
            onClick={() => {
              handlePhoneNav()
            }}
          >
            <TfiMenu style={{ color: 'white', fontSize: '24px' }} />
          </div>
          <div className="nav-left logo">
            <img className="img-fluid" src="/images/logo/logo.png" alt="" />
          </div>
          <div className="nav-middle ">
            <ul>
              <li>
                <Link href="http://localhost:3000/">首頁</Link>
              </li>
              <li>
                <Link href="http://localhost:3000/product/list">商品總覽</Link>
              </li>
              <li>
                <Link href="http://localhost:3000/lecture">課程</Link>
              </li>
              <li>
                <Link href="http://localhost:3000/article">文章分享</Link>
              </li>
              <li>
                <Link href="http://localhost:3000/teacher">講師陣容</Link>
              </li>
              <li>
                <Link href={`http://localhost:3000/member${memberUrl}`}>
                  會員專區
                </Link>
              </li>
            </ul>
          </div>
          <div className="nav-right">
            <div className="logout">
              {member ? (
                <a
                  className="d-block py-2 px-2 text-decoration-none d-flex align-items-center signOut_text"
                  style={{ color: 'white' }}
                  onClick={handleLogout}
                >
                  登出
                  <IoIosLogOut />
                </a>
              ) : (
                <></>
              )}
            </div>
            <div className="user">
              <p className="mx-2">{user}</p>
              <FaUser style={{ color: 'white', fontSize: '24px' }} />
            </div>
            <div className="cart">
              {intoCart ? (
                <Link href="http://localhost:3000/cart">
                  <FaShoppingCart
                    style={{ color: 'white', fontSize: '24px' }}
                  />
                  <span style={{  fontSize: '14px' }}>{totalItems}</span>
                </Link>
              ) : (
                <>
                  <FaShoppingCart
                    style={{ color: 'white', fontSize: '24px' }}
                    onClick={handleReminder}
                  />
                  
                </>
              )}
            </div>
          </div>
        </div>
        <Toaster />
      </div>
      {!phoneNav ? (
        <></>
      ) : (
        <div className="header-phone-nav">
          <div className="container-fluid header-phone-nav-container">
            <div className="nav-down">
              <a href="http://localhost:3000/">首頁</a>
            </div>
            <div className="nav-down">
              <a
                className="phone-link"
                href="http://localhost:3000/product/list"
              >
                商品總覽
              </a>
            </div>
            <div className="nav-down">
              <a href="http://localhost:3000/lecture">課程</a>
            </div>
            <div className="nav-down">
              <a href="http://localhost:3000/article">文章分享</a>
            </div>
            <div className="nav-down">
              <a href="http://localhost:3000/teacher">講師陣容</a>
            </div>
            <div className="nav-down">
              <a href={`http://localhost:3000/member${memberUrl}`}>會員專區</a>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .header {
          background: #445c2d;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .container {
          justify-content: space-between;
        }

        .nav-phone-left {
          display: none;
        }

        @media (max-width: 1200px) {
          .nav-phone-left {
            display: flex;
            justify-content: center;
            align-items: center;
          }
        }

        .logo {
          width: 176px;
          height: 50px;
        }

        .nav-middle {
          display: flex;
          justify-content: center;
          align-items: center;
          ul {
            list-style: none;

            li {
              display: inline-block;

              margin-inline: 30px;

              a {
                text-decoration: none;
                color: white;
              }
            }
          }
        }

        li:hover {
          color: #f3b454;
          border-bottom: 1px solid #f3b454;
          transition: 0.2s;
        }

        @media (max-width: 1200px) {
          .nav-middle {
            display: none;
          }
          .logout {
            display: none;
          }
        }

        .nav-right {
          display: flex;
          justify-content: center;
          align-items: center;
          .user {
            display: flex;
            justify-content: center;
            align-items: center;
            p {
              margin: 0;
              color: white;
            }
            align-items: center;
            margin-right: 30px;
            i {
              margin-left: 10px;
            }
          }
        }
        @media (max-width: 1200px) {
          .nav-right {
            .user {
              display: none;
            }
          }
        }
        @media (max-width: 1200px) {
          .blank-col {
            display: none;
          }
        }

        .cart {
          color: $white;
          display: inline-block;
          position: relative;
          span {
            background-color: #f3b454;
            border-radius: 20px;
            color: white;
            padding: 1px 3px;
            font-size: 10px;
            position: absolute;
            top: -10px;
            right: -10px;
          }
        }

        @media (max-width: 1200px) {
          .header-phone-nav {
            display: block;
          }
        }
        .header-phone-nav-container {
          padding-inline: 0px;
        }

        .nav-down {
          background: #849474;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 10px;
          border-bottom: 1px solid black;
          p {
            margin: 0px;
          }
        }

        .nav-down a {
          text-decoration: none; /* 去掉裝飾 */
          color: inherit; /* 繼承父元素顏色，確保文本顏色正常 */
          transition: color 0.2s, border-bottom 0.2s; /* 過渡效果 */
        }

        .nav-down a:hover {
          color: #f3b454;
          border-bottom: 1px solid #f3b454;
        }
      `}</style>
    </>
  )
}
