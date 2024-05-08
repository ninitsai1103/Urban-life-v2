import React, { useState, useEffect } from 'react'
import { TfiMenu } from 'react-icons/tfi'
import { FaUser } from 'react-icons/fa'
import { FaShoppingCart } from 'react-icons/fa'
import Link from 'next/link'
import { identity } from 'lodash'
import { useCheckout } from '@/hooks/use-checkout'
export default function MyNavbar() {
  const { totalItems } = useCheckout()
  const [phoneNav, setPhoneNav] = useState(false)

  const handlePhoneNav = () => {
    setPhoneNav(!phoneNav)
  }

  const [user, setUser] = useState('')
  useEffect(() => {
    // 仅在客户端环境中运行
    const memberInfo = JSON.parse(localStorage.getItem('member-info'))
    if (memberInfo) {
      const { identity_id } = memberInfo
      if (identity_id == 2) {
        setUser('/article-management')
      } else {
        setUser('/information')
      }
    }
  }, [])
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
                <Link href="">講師陣容</Link>
              </li>
              <li>
                <Link href={`http://localhost:3000/member${user}`}>
                  會員專區
                </Link>
              </li>
            </ul>
          </div>
          <div className="nav-right">
            <div className="user ">
              <p className="mx-2">小明</p>
              <FaUser style={{ color: 'white', fontSize: '24px' }} />
            </div>
            <div className="cart">
              <Link href="http://localhost:3000/cart">
                <FaShoppingCart style={{ color: 'white', fontSize: '24px' }} />
                <span>{totalItems}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {!phoneNav ? (
        <></>
      ) : (
        <div className="header-phone-nav">
          <div className="container-fluid header-phone-nav-container">
            <div className="nav-down">
              <p>首頁</p>
            </div>
            <div className="nav-down">
              <p>商品總覽</p>
            </div>
            <div className="nav-down">
              <p>課程</p>
            </div>
            <div className="nav-down">
              <p>文章分享</p>
            </div>
            <div className="nav-down">
              <p>講師陣容</p>
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

        .nav-down p:hover {
          color: #f3b454;
          border-bottom: 1px solid #f3b454;
          transition: 0.2s;
        }
      `}</style>
    </>
  )
}
