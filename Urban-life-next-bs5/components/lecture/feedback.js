import React from 'react'
import { TbStarFilled, TbStar } from 'react-icons/tb'
import Link from 'next/link'

export default function Feedback() {
    return (
      <>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className=" bg py-4 px-2 py-lg-2 px-lg-4 fw-400 border-rd">
                <div className="d-flex justify-content-between align-items-center">
                  <p className="mt-3">共 5 則評論</p>
                  <div className="dropdown">
                    <button
                      className="btn dropdown-toggle fs-6 sort-btn d-flex justify-content-center align-items-center btn-color sort-btn-size"
                      type="button"
                      id="dropdownMenuButton1"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      排序
                    </button>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton1"
                    >
                      <li>
                        <a className="dropdown-item" href="#">
                          評價由新到舊
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          評價由舊到新
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          評價由高到低
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          評價由低到高
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <hr />
                <div>
                  <div className="d-flex justify-content-start align-items-center mb-3">
                    <img
                      className="rounded-circle set-size2 me-3"
                      src="https://images.pexels.com/photos/2023384/pexels-photo-2023384.jpeg"
                    />
                    <p className="me-5 mb-0">yd***</p>
                    <p className="mb-0 grey">3天前</p>
                  </div>
                  <div className="star d-flex align-items-center mb-1">
                    <p className="me-2 mb-0">評價</p>
                    <TbStarFilled
                      className="padding"
                      style={{ color: '#F6A404', fontSize: '20px' }}
                    />
                    <p className="ms-1 mb-0 fs-15 ">5</p>
                  </div>
                  <p>體驗課程讓我大開眼界，實踐學習和樂趣兼具，滿足了我的好奇心，讓我更有信心挑戰新事物。</p>
                </div>
                <hr />
                <div>
                  <div className="d-flex justify-content-start align-items-center mb-3">
                    <img
                      className="rounded-circle set-size2 me-3"
                      src="https://images.pexels.com/photos/57416/cat-sweet-kitty-animals-57416.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    />
                    <p className="me-5 mb-0">rr***</p>
                    <p className="mb-0 grey">5天前</p>
                  </div>
                  <div className="star d-flex align-items-center mb-1">
                    <p className="me-2 mb-0">評價</p>
                    <TbStarFilled
                      className="padding"
                      style={{ color: '#F6A404', fontSize: '20px' }}
                    />
                    <p className="ms-1 mb-0 fs-15 ">5</p>
                  </div>
                  <p>體驗課程真是一場心靈的冒險，讓我發現了新的興趣，擴展了自己的視野，感受到了學習的無限可能性。</p>
                </div>
                <hr />
                <Link className="text-decoration-none grey-hover" href="">
                  查看更多評價
                </Link>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }