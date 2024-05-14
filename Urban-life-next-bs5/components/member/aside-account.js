import { useState, useEffect } from 'react'
import Image from 'next/image'
import { MdOutlineAddAPhoto } from 'react-icons/md'
import { BiFile } from 'react-icons/bi'
import { BiIdCard } from 'react-icons/bi'
import { MdFavoriteBorder } from 'react-icons/md'
import { RiCoupon2Line } from 'react-icons/ri'
import { IoIosLogOut } from 'react-icons/io'
import { useMemberInfo } from '@/hooks/use-member-info'
import { useRouter } from 'next/router'
export default function AsideAccount() {
  const router = useRouter()

  // hooks
  const { member } = useMemberInfo()

  // 上傳大頭照
  const [selectedFile, setSelectedFile] = useState('')
  // 處理圖標點擊事件
  const handleIconClick = () => {
    // 觸發文件選擇器點擊
    document.getElementById('fileInput').click()
  }
  // 處理文件選擇器更改事件
  const handleFileChange = async (event) => {
    const file = event.target.files[0]
    setSelectedFile(file) // 更新所選文件
    const formData = new FormData()
    formData.append('avatar', file)

    //抓到userId
    const memberInfo = JSON.parse(localStorage.getItem('member-info'))
    const userId = memberInfo.id

    formData.append('userId', userId)
    try {
      const response = await fetch('http://localhost:3005/api/upload', {
        method: 'POST',
        body: formData,
      })
      // 上传成功后提示上传成功
      alert('檔案上傳成功')
      window.location.reload()
    } catch (error) {
      console.error('上傳錯誤：', error)
      alert(error.message)
    }
  }
  // 登出
  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:3005/api/user/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${member?.token}`, // 替換為有效的 JWT
        },
      })
      const data = await response.json()
      console.log(data)
      localStorage.removeItem('member-info')
      window.location.href = '/'
    } catch (error) {
      console.error('登出失敗:', error)
    }
  }

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value
    // 根據選項值進行頁面跳轉
    if (selectedValue === '1') {
      router.push('/member/information') // 個人資料頁面路徑
    } else if (selectedValue === '2') {
      router.push('/member/order') // 訂單記錄路徑
    } else if (selectedValue === '3') {
      router.push('/member/coupon') // 我的優惠券路徑
    } else if (selectedValue === '4') {
      router.push('/member/collect') // 我的收藏頁面路徑
    }
  }

  // 獲取當前頁面路徑
  const currentPath = router.pathname

  return (
    <>
      <div className="text-center aside_title d-none">會員專區</div>
      <aside>
        <div className="account">
          <div className="user d-flex flex-column align-items-center">
            <div className="d-flex justify-content-center position-relative">
              <div className="avatar">
                {member?.img ? (
                  <Image
                    src={`http://localhost:3005/avatar/${member?.img}`}
                    alt=""
                    width={80}
                    height={80}
                    style={{ borderRadius: '100px' }}
                    priority
                  />
                ) : (
                  <Image
                    src={`${member?.photo_url}`}
                    alt=""
                    width={80}
                    height={80}
                    style={{ borderRadius: '100px' }}
                    priority
                  />
                )}

                <div className="icon-box position-absolute d-flex justify-content-center">
                  {/* 點擊圖標後觸發 handleIconClick 事件 */}
                  <MdOutlineAddAPhoto
                    style={{ color: 'white', cursor: 'pointer' }}
                    onClick={handleIconClick}
                  />
                  {/* 隱藏的文件選擇器 */}
                  <input
                    id="fileInput"
                    type="file"
                    name="avatar"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                  />
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-center">
              <div className="name text-center">
                {member?.name ? member?.name : '姓名'}
              </div>
            </div>
            <div className="d-flex justify-content-center">
              <button className="user-identify">
                <div className="text-center member w-100">會員</div>
              </button>
            </div>
          </div>

          {/* 手機板下拉式選單 */}

          <select
            className="form-select phone-select d-lg-none "
            aria-label="Default select example"
            value={
              currentPath === '/member/information'
                ? '1'
                : currentPath === '/member/order'
                ? '2'
                : currentPath === '/member/coupon'
                ? '3'
                : currentPath === '/member/collect'
                ? '4'
                : ''
            }
            onChange={handleSelectChange}
          >
            <option value="1">個人資料</option>
            <option value="2">訂單記錄</option>
            <option value="3">我的優惠券</option>
            <option value="4">我的收藏</option>
          </select>

          <ul className="list-unstyled window_menu d-none d-lg-block">
            <li>
              <a
                className={
                  currentPath === '/member/information' ? 'active' : ''
                }
                href="/member/information"
              >
                <BiIdCard /> 個人資料
              </a>
            </li>

            <li>
              <a
                className={currentPath === '/member/order' ? 'active' : ''}
                href="/member/order"
              >
                <BiFile /> 訂單記錄
              </a>
            </li>
            <li>
              <a
                className={currentPath === '/member/coupon' ? 'active' : ''}
                href="/member/coupon"
              >
                <RiCoupon2Line /> 我的優惠券
              </a>
            </li>
            <li>
              <a
                className={currentPath === '/member/collect' ? 'active' : ''}
                href="/member/collect"
              >
                <MdFavoriteBorder /> 我的收藏
              </a>
            </li>
          </ul>
          <ul className="list-unstyled signOut">
            <li>
              <a
                className="d-block py-2 px-2 text-decoration-none d-flex align-items-center signOut_text"
                style={{ color: '#849474' }}
                onClick={handleLogout}
              >
                登出
                <IoIosLogOut />
              </a>
            </li>
          </ul>
        </div>
      </aside>

      <style jsx>{`
        .aside_title {
          margin: 0px 0px 20px 0px;
          font-size: 48px;
          font-weight: bold;
           {
            /* color: #2F4715; */
          }
        }
        aside {
          width: 100%;
          background: #ffffff;
          border: 1px solid #ccc;
          border-radius: 8px;
        }
        .account {
          padding: 40px 21px;
          gap: 38px;
        }
        .user {
          gap: 6px;
          margin-bottom: 38px;
        }

        .avatar {
          width: 80px;
          height: 80px;
          border-radius: 100px;
        }
        .icon-box {
          width: 30px;
          height: 30px;
          padding: 7px;
          background-color: #445c2d;
          border: 1.5px solid #fff;
          border-radius: 100px;
          cursor: pointer;
          top: 52px;
          left: 50px;
        }
        .icon-box svg {
          width: 100%;
          height: 100%;
        }

        .name {
          height: 32px;
          font-size: 20px;
          font-weight: 600;
        }
        .user-identify {
          width: 60px;
          height: 30px;
          border: 1px solid #445c2d;
          border-radius: 100px;
          cursor: default;
        }
        .member {
          color: #445c2d;
        }
        .window_menu a,
        .window_menu a:visited {
          color: #6c7275;
          display: block;
          padding: 10px 15px;
          text-decoration: none;
        }
        .window_menu a:hover,
        .window_menu a.active {
          color: #bd9250;
          border-bottom: 1px solid #bd9250;
        }

        .signOut {
          margin-top: 140px;
        }
        a:hover {
          cursor: pointer;
        }
        @media (max-width: 992px) {
          .aside_title {
            display: block !important;
          }
          .phone-select {
            display: block;
          }
          .window_menu {
            display: none;
          }
          .signOut {
            margin-top: 10px;
            padding: 0px;
          }

          .signOut_text {
            padding: 0px;
          }
        }
      `}</style>
    </>
  )
}
