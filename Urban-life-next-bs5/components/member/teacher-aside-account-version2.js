import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from './member.module.css'
import { MdOutlineAddAPhoto } from 'react-icons/md'
import { PiFilesThin } from 'react-icons/pi'
import { BiIdCard } from 'react-icons/bi'
import { MdFavoriteBorder } from 'react-icons/md'
import { GoBook } from 'react-icons/go'
import { IoIosLogOut } from 'react-icons/io'
import { useRouter } from 'next/router'
import Head from 'next/head'

export default function TeacherAsideAccount() {
  const router = useRouter()

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value
    // 根據選項值進行頁面跳轉
    if (selectedValue === '1') {
      router.push('/member/...') // 個人資料頁面路徑
    } else if (selectedValue === '2') {
      router.push('/member/...') // 收藏頁面路徑
    } else if (selectedValue === '3') {
      router.push('/member/article-management') // 文章管理頁面路徑
    } else if (selectedValue === '4') {
      router.push('/member/lecture-management') // 課程管理頁面路徑
    }
  }

  // 獲取當前頁面路徑
  const currentPath = router.pathname

  return (
    <>
      <Head>
        <link rel="preload" href="../components/member/member.module.css" as="style" />
      </Head>

      <aside className={` ${styles['aside']} `}>
        <div className={` ${styles['account']} `}>
          <div
            className={`d-flex flex-column align-items-center ${styles['user ']} `}
          >
            <div
              className={` d-flex justify-content-center position-relative `}
            >
              <div className={` ${styles['avatar']} `}>
                <Image
                  src={
                    'https://i.pinimg.com/564x/ea/43/c5/ea43c53109a0c0c2a045e85f39d062cb.jpg'
                  }
                  alt=""
                  width={80}
                  height={80}
                  style={{ borderRadius: '100px' }}
                />
                <div
                  className={` ${styles['icon-box']} position-absolute d-flex justify-content-center`}
                >
                  <MdOutlineAddAPhoto style={{ color: 'white' }} />
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-center">
              <div className={` ${styles['name']} text-center`}>jenny</div>
            </div>
            <div className="d-flex justify-content-center pb-4 pt-1">
              <button className={` ${styles['user-identify']} `}>
                <div className={` ${styles['member']} text-center w-100`}>
                  講師
                </div>
              </button>
            </div>
          </div>

          {/* 手機板下拉式選單 */}

          <select
            className="form-select phone-select d-lg-none "
            aria-label="Default select example"
            value={
              // 網址待修
              currentPath === '/member/index'
                ? '1'
                : // 網址待修
                currentPath === '/favorites'
                ? '2'
                : currentPath === '/member/article-management'
                ? '3'
                : currentPath === '/member/lecture-management'
                ? '4'
                : ''
            }
            onChange={handleSelectChange}
          >
            <option value="1">個人資料</option>
            <option value="2">我的收藏</option>
            <option value="3">文章管理</option>
            <option value="4">課程管理</option>
          </select>

          <ul
            className={`list-unstyled d-none d-lg-block ${styles['window_menu']} `}
          >
            {/* 網址待修 */}
            <li>
              <a
                className={
                  currentPath === '/member/index' ? `${styles['active']}` : ''
                }
                href="/member/..."
              >
                <BiIdCard /> 個人資料
              </a>
            </li>
            {/* 網址待修 */}
            <li>
              <a
                className={
                  currentPath === '/favorites' ? `${styles['active']}` : ''
                }
                href="/member/..."
              >
                <MdFavoriteBorder /> 我的收藏
              </a>
            </li>
            <li>
              <a
                className={
                  currentPath === '/member/article-management'
                    ? `${styles['active']}`
                    : ''
                }
                href="/member/article-management"
              >
                <PiFilesThin /> 文章管理
              </a>
            </li>
            <li>
              <a
                className={
                  currentPath === '/member/lecture-management'
                    ? `${styles['active']}`
                    : ''
                }
                href="/member/lecture-management"
              >
                <GoBook /> 課程管理
              </a>
            </li>
          </ul>
          <ul className={`list-unstyled ${styles['signOut']} `}>
            <li>
              <a
                className={`d-block py-2 px-2 text-decoration-none d-flex align-items-center  ${styles['signOut_text']} `}
                style={{ color: '#849474' }}
                href=""
              >
                登出
                <IoIosLogOut />
              </a>
            </li>
          </ul>
        </div>
      </aside>
    </>
  )
}
