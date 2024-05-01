import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import Search from '@/components/product/search'
import ProductCard from '@/components/product/product-card'
import Page from '@/components/product/pagination'
import useProducts from '@/hooks/product/useProducts'
import UseSortData from '@/hooks/product/useSortData'
import { MdKeyboardArrowRight } from 'react-icons/md'
import { LuSettings2 } from 'react-icons/lu'
import { RiFilter2Fill } from 'react-icons/ri'
import { CiViewTable } from 'react-icons/ci'
import { RxTable } from 'react-icons/rx'
import { filter } from 'lodash'
// import { totalItems } from '@/hooks/cart-reducer-state'

export default function List() {
  const [list, setList] = useState([])
  const { products } = useProducts()

  //分頁
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  // const totalItems = 450;
  const perpages = 48 //一頁幾筆資料
  //
  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  //分類
  const [selectCategory, setSelectCategory] = useState(null)
  const handleCategory = (category) => {
    setSelectCategory(category)
    setCurrentPage(1) //重新設定為第一頁
  }
  const filterProducts = useMemo(() => {
    return selectCategory
      ? products.filter((product) => product.category === selectCategory)
      : products
  })

  //排序

  const { sortData, handleSortData } = UseSortData(filterProducts)
  const changeSort = (key, order) => {
    handleSortData(key, order);
  }

  //分頁&分類&排序
  useEffect(() => {
    //更新分頁總數
    const newTotalPages = Math.ceil(sortData.length / perpages)
    setTotalPages(newTotalPages)
    //更新列表
    const startIndex = (currentPage - 1) * perpages
    const endIndex = Math.min(startIndex + perpages, sortData.length)
    setList(sortData.slice(startIndex, endIndex))
  }, [currentPage, sortData])

  // Toggle the side navigation
  // useEffect(() => {
  //   // fix next issue
  //   if (typeof window !== 'undefined') {
  //     const sidebarToggle = document.body.querySelector('#sidebarToggle')

  //     if (sidebarToggle) {
  //       // 在localStorage中儲存目前sidebar情況
  //       if (localStorage.getItem('sb|sidebar-toggle') === 'true') {
  //         document.body.classList.toggle('sb-sidenav-toggled')
  //       }

  //       sidebarToggle.addEventListener('click', (event) => {
  //         event.preventDefault()

  //         document.body.classList.toggle('sb-sidenav-toggled')

  //         localStorage.setItem(
  //           'sb|sidebar-toggle',
  //           document.body.classList.contains('sb-sidenav-toggled')
  //         )
  //       })
  //     }
  //   }
  // }, [])

  return (
    <>
      <div className="container mt-5">
        <div className="row d-flex justify-content-center">
          {/* sidenav */}
          <div className="sidenav col-lg-2 d-none d-lg-block d-flex flex-direction-column">
            {/* 分類 */}
            <div className="mb-4">
              <div className="accordion" id="accordionExample">
                <div className="accordion-item header-color">
                  <h2
                    className="accordion-header fs-5 set-padding text-white rounded-top"
                    id="headingOne"
                  >
                    分類
                  </h2>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingOne">
                    <button
                      className="accordion-button collapsed set-padding pri-category-bg"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseOne"
                      aria-expanded="false"
                      aria-controls="collapseOne"
                    >
                      種子
                    </button>
                  </h2>
                  <div
                    id="collapseOne"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingOne"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body set-padding">
                      <ul className="list-unstyled">
                        <li>
                          <Link
                            href=""
                            className="text-decoration-none d-inline-block mb-2 set-fs12 sec-category"
                            onClick={(e) => {
                              e.preventDefault()
                              handleCategory(1)
                            }}
                          >
                            春季種子
                          </Link>
                        </li>
                        <li>
                          <Link
                            href=""
                            className="text-decoration-none d-inline-block mb-2 set-fs12 sec-category"
                            onClick={(e) => {
                              e.preventDefault()
                              handleCategory(2)
                            }}
                          >
                            夏季種子
                          </Link>
                        </li>
                        <li>
                          <Link
                            href=""
                            className="text-decoration-none d-inline-block mb-2 set-fs12 sec-category"
                            onClick={(e) => {
                              e.preventDefault()
                              handleCategory(3)
                            }}
                          >
                            秋季種子
                          </Link>
                        </li>
                        <li className="d-inline-block">
                          <Link
                            href=""
                            className="text-decoration-none d-inline-block set-fs12 sec-category"
                            onClick={(e) => {
                              e.preventDefault()
                              handleCategory(4)
                            }}
                          >
                            冬季種子
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingTwo">
                    <button
                      className="accordion-button collapsed set-padding pri-category-bg"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseTwo"
                      aria-expanded="false"
                      aria-controls="collapseTwo"
                    >
                      種苗
                    </button>
                  </h2>
                  <div
                    id="collapseTwo"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingTwo"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body set-padding">
                      <ul className="list-unstyled">
                        <li>
                          <Link
                            href=""
                            className="text-decoration-none d-inline-block mb-2 set-fs12 sec-category"
                            onClick={(e) => {
                              e.preventDefault()
                              handleCategory(5)
                            }}
                          >
                            春季種苗
                          </Link>
                        </li>
                        <li>
                          <Link
                            href=""
                            className="text-decoration-none d-inline-block mb-2 set-fs12 sec-category"
                            onClick={(e) => {
                              e.preventDefault()
                              handleCategory(6)
                            }}
                          >
                            夏季種苗
                          </Link>
                        </li>
                        <li>
                          <Link
                            href=""
                            className="text-decoration-none d-inline-block mb-2 set-fs12 sec-category"
                            onClick={(e) => {
                              e.preventDefault()
                              handleCategory(7)
                            }}
                          >
                            秋季種苗
                          </Link>
                        </li>
                        <li>
                          <Link
                            href=""
                            className="text-decoration-none d-inline-block set-fs12 sec-category"
                            onClick={(e) => {
                              e.preventDefault()
                              handleCategory(8)
                            }}
                          >
                            冬季種苗
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingThree">
                    <button
                      className="accordion-button collapsed set-padding pri-category-bg"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseThree"
                      aria-expanded="false"
                      aria-controls="collapseThree"
                    >
                      農藥
                    </button>
                  </h2>
                  <div
                    id="collapseThree"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingThree"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body set-padding">
                      <ul className="list-unstyled">
                        <li>
                          {' '}
                          <Link
                            href=""
                            className="text-decoration-none d-inline-block mb-2 set-fs12 sec-category"
                            onClick={(e) => {
                              e.preventDefault()
                              handleCategory(9)
                            }}
                          >
                            殺蟲劑
                          </Link>
                        </li>
                        <li>
                          <Link
                            href=""
                            className="text-decoration-none d-inline-block mb-2 set-fs12 sec-category"
                            onClick={(e) => {
                              e.preventDefault()
                              handleCategory(10)
                            }}
                          >
                            殺真菌劑
                          </Link>
                        </li>
                        <li>
                          <Link
                            href=""
                            className="text-decoration-none d-inline-block mb-2 set-fs12 sec-category"
                            onClick={(e) => {
                              e.preventDefault()
                              handleCategory(11)
                            }}
                          >
                            除草劑
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingFour">
                    <button
                      className="accordion-button collapsed set-padding pri-category-bg"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseFour"
                      aria-expanded="true"
                      aria-controls="collapseFour"
                    >
                      資材
                    </button>
                  </h2>
                  <div
                    id="collapseFour"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingFour"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body set-padding">
                      <ul className="list-unstyled">
                        <li>
                          {' '}
                          <Link
                            href=""
                            className="text-decoration-none d-inline-block mb-2 set-fs12 sec-category"
                            onClick={(e) => {
                              e.preventDefault()
                              handleCategory(12)
                            }}
                          >
                            花盆
                          </Link>
                        </li>
                        <li>
                          {' '}
                          <Link
                            href=""
                            className="text-decoration-none d-inline-block mb-2 set-fs12 sec-category"
                            onClick={(e) => {
                              e.preventDefault()
                              handleCategory(13)
                            }}
                          >
                            工具
                          </Link>
                        </li>
                        <li>
                          <Link
                            href=""
                            className="text-decoration-none d-inline-block mb-2 set-fs12 sec-category"
                            onClick={(e) => {
                              e.preventDefault()
                              handleCategory(14)
                            }}
                          >
                            介質
                          </Link>
                        </li>
                        <li>
                          {' '}
                          <Link
                            href=""
                            className="text-decoration-none d-inline-block set-fs12 sec-category"
                            onClick={(e) => {
                              e.preventDefault()
                              handleCategory(15)
                            }}
                          >
                            其他
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingFive">
                    <button
                      className="accordion-button collapsed set-padding pri-category-bg"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseFive"
                      aria-expanded="true"
                      aria-controls="collapseFive"
                    >
                      肥料
                    </button>
                  </h2>
                  <div
                    id="collapseFive"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingFive"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body set-padding">
                      <ul className="list-unstyled">
                        <li>
                          <Link
                            href=""
                            className="text-decoration-none d-inline-block mb-2 set-fs12 sec-category"
                            onClick={(e) => {
                              e.preventDefault()
                              handleCategory(16)
                            }}
                          >
                            成長期肥料
                          </Link>
                        </li>
                        <li>
                          <Link
                            href=""
                            className="text-decoration-none d-inline-block mb-2 set-fs12 sec-category"
                            onClick={(e) => {
                              e.preventDefault()
                              handleCategory(17)
                            }}
                          >
                            開花期肥料
                          </Link>
                        </li>
                        <li>
                          {' '}
                          <Link
                            href=""
                            className="text-decoration-none d-inline-block mb-2 set-fs12 sec-category"
                            onClick={(e) => {
                              e.preventDefault()
                              handleCategory(18)
                            }}
                          >
                            結果期肥料
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingSix">
                    <button
                      className="accordion-button collapsed set-padding pri-category-bg"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseSix"
                      aria-expanded="true"
                      aria-controls="collapseSix"
                    >
                      書籍
                    </button>
                  </h2>
                  <div
                    id="collapseSix"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingSix"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body set-padding">
                      <ul className="list-unstyled">
                        <li>
                          <Link
                            href=""
                            className="text-decoration-none d-inline-block mb-2 set-fs12 sec-category"
                            onClick={(e) => {
                              e.preventDefault()
                              handleCategory(19)
                            }}
                          >
                            圖鑑
                          </Link>
                        </li>
                        <li>
                          <Link
                            href=""
                            className="text-decoration-none d-inline-block mb-2 set-fs12 sec-category"
                            onClick={(e) => {
                              e.preventDefault()
                              handleCategory(20)
                            }}
                          >
                            指南
                          </Link>
                        </li>
                        <li>
                          <Link
                            href=""
                            className="text-decoration-none d-inline-block mb-2 set-fs12 sec-category"
                            onClick={(e) => {
                              e.preventDefault()
                              handleCategory(21)
                            }}
                          >
                            DIY
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* 篩選 */}
            <div className="">
              <h2 className="fs-6 text-white header-color m-0 p-2 rounded-top">
                <LuSettings2 />
                篩選
              </h2>
              <div className="form-control set-text-color">
                <Link href="" className="text-decoration-none" id="set-text">
                  清除篩選
                </Link>
                <p className="mt-1 mb-0 set-fw700">金額</p>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="exampleRadios"
                    id="exampleRadios1"
                    value="option1"
                  />
                  <label
                    className="form-check-label set-fs12"
                    htmlFor="exampleRadios1"
                  >
                    NTD 150以下
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="exampleRadios"
                    id="exampleRadios2"
                    value="option2"
                  />
                  <label
                    className="form-check-label set-fs12"
                    htmlFor="exampleRadios2"
                  >
                    NTD 151-300
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="exampleRadios"
                    id="exampleRadios3"
                    value="option3"
                  />
                  <label
                    className="form-check-label set-fs12"
                    htmlFor="exampleRadios3"
                  >
                    NTD 301-500
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="exampleRadios"
                    id="exampleRadios4"
                    value="option4"
                  />
                  <label
                    className="form-check-label set-fs12"
                    htmlFor="exampleRadios4"
                  >
                    NTD 501-1000
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="exampleRadios"
                    id="exampleRadios5"
                    value="option5"
                  />
                  <label
                    className="form-check-label set-fs12"
                    htmlFor="exampleRadios5"
                  >
                    NTD 1001以上
                  </label>
                </div>

                <div className="input-group d-flex align-items-center">
                  <div className="d-flex align-items-center">
                    <p className="set-fs12 m-0">NTD</p>
                  </div>
                  <input
                    type="text"
                    className="form-control ms-1 p-1 set-fs12 set-size"
                    placeholder=""
                    aria-label="lowPrice"
                  />
                  <span className="input-group-text px-1 no-border-bg">-</span>
                  <input
                    type="text"
                    className="form-control me-2 p-1 set-fs12 set-size"
                    placeholder=""
                    aria-label="highPrice"
                  />
                  <button
                    className="set-button-style d-flex align-items-center p-1 rounded"
                    type="submit"
                  >
                    <MdKeyboardArrowRight className="text-white" />
                  </button>
                </div>
                <Link
                  href=""
                  className="set-fs12 text-decoration-none set-text-color2"
                >
                  清除輸入金額
                </Link>
                <p className="set-fw700 mt-1 mb-0">商品尺寸</p>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="exampleRadios"
                    id="exampleRadios6"
                    value="option6"
                  />
                  <label
                    className="form-check-label set-fs12"
                    htmlFor="exampleRadios6"
                  >
                    大
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="exampleRadios"
                    id="exampleRadios7"
                    value="option7"
                  />
                  <label
                    className="form-check-label set-fs12"
                    htmlFor="exampleRadios7"
                  >
                    小
                  </label>
                </div>
                <p className="set-fw700 mt-1 mb-0">免運</p>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                  />
                  <label
                    className="form-check-label set-fs12"
                    htmlFor="flexCheckDefault"
                  >
                    一件即達免運
                  </label>
                </div>
                <p className="set-fw700 mt-1 mb-0">24小時快速到貨</p>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                  />
                  <label
                    className="form-check-label set-fs12"
                    htmlFor="flexCheckDefault"
                  >
                    只顯示可快速到貨的商品
                  </label>
                </div>
                <p className="set-fw700 mt-1 mb-0">可寄往</p>
                <div className="dropdown d-flex justify-content-center">
                  <button
                    className="btn dropdown-toggle set-fs12 set-dropdown-size"
                    type="button"
                    id="dropdownMenuButton1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    地點
                  </button>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton1"
                  >
                    <li>
                      <a className="dropdown-item" href="#">
                        本島
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        澎湖縣
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        金門縣
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        連江縣
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          {/* product-list */}
          <div className="product-list col-lg-10">
            <div className="ps-3 mb-3">
              <Search />
              <nav aria-label="breadcrumb">
                <ol class="breadcrumb mt-3">
                  <li class="breadcrumb-item">
                    <Link className="text-decoration-none" href="/">
                      首頁
                    </Link>
                  </li>
                  <li
                    class="breadcrumb-item active"
                    aria-current="page"
                    href="/product/list"
                  >
                    <Link className="text-decoration-none" href="#">
                      商品總覽
                    </Link>
                  </li>
                </ol>
              </nav>
              {/* 搜尋、排序 */}
              <div className="amount&sort d-flex justify-content-between align-items-center">
                <p className="mb-0 text-color2-nohover">
                  共 {products.length} 筆商品
                </p>
                <div className="d-flex align-items-center">
                  <CiViewTable
                    className="d-lg-none"
                    style={{
                      fontSize: '31px',
                      color: '#6B6B6B',
                      strokeWidth: '0.4',
                    }}
                  />
                  <RxTable
                    className="d-none d-lg-none"
                    style={{ fontSize: '27px', color: '#6B6B6B' }}
                  />

                  {/* 手機版篩選 */}
                  <button
                    className="btn px-0 d-lg-none"
                    type="button"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasWithBothOptions"
                    aria-controls="offcanvasWithBothOptions"
                  >
                    <RiFilter2Fill
                      className="d-lg-none mx-2 p-1 circle"
                      style={{ fontSize: '30px' }}
                    />
                  </button>
                  <div
                    className="offcanvas offcanvas-start "
                    data-bs-scroll="true"
                    tabIndex="-1"
                    id="offcanvasWithBothOptions"
                    aria-labelledby="offcanvasWithBothOptionsLabel"
                  >
                    <div className="offcanvas-header">
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="offcanvas"
                        aria-label="Close"
                      ></button>
                    </div>
                    {/* 分類 */}
                    <div className="mb-4">
                      <div className="accordion" id="accordionExample">
                        <div className="accordion-item header-color">
                          <h2
                            className="accordion-header fs-5 set-padding text-white rounded-top"
                            id="headingOne"
                          >
                            分類
                          </h2>
                        </div>
                        <div className="accordion-item">
                          <h2 className="accordion-header" id="headingOne">
                            <button
                              className="accordion-button collapsed set-padding pri-category-bg"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#collapseOne"
                              aria-expanded="false"
                              aria-controls="collapseOne"
                            >
                              種子
                            </button>
                          </h2>
                          <div
                            id="collapseOne"
                            className="accordion-collapse collapse"
                            aria-labelledby="headingOne"
                            data-bs-parent="#accordionExample"
                          >
                            <div className="accordion-body set-padding">
                              <ul className="list-unstyled">
                                <li>
                                  <Link
                                    href=""
                                    className="text-decoration-none d-inline-block mb-2 set-fs12 sec-category"
                                    onClick={(e) => {
                                      e.preventDefault()
                                      handleCategory(1)
                                    }}
                                  >
                                    春季種子
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    href=""
                                    className="text-decoration-none d-inline-block mb-2 set-fs12 sec-category"
                                    onClick={(e) => {
                                      e.preventDefault()
                                      handleCategory(2)
                                    }}
                                  >
                                    夏季種子
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    href=""
                                    className="text-decoration-none d-inline-block mb-2 set-fs12 sec-category"
                                    onClick={(e) => {
                                      e.preventDefault()
                                      handleCategory(3)
                                    }}
                                  >
                                    秋季種子
                                  </Link>
                                </li>
                                <li className=" d-inline-block">
                                  <Link
                                    href=""
                                    className="text-decoration-none d-inline-block set-fs12 sec-category"
                                    onClick={(e) => {
                                      e.preventDefault()
                                      handleCategory(4)
                                    }}
                                  >
                                    冬季種子
                                  </Link>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div className="accordion-item">
                          <h2 className="accordion-header" id="headingTwo">
                            <button
                              className="accordion-button collapsed set-padding pri-category-bg"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#collapseTwo"
                              aria-expanded="false"
                              aria-controls="collapseTwo"
                            >
                              種苗
                            </button>
                          </h2>
                          <div
                            id="collapseTwo"
                            className="accordion-collapse collapse"
                            aria-labelledby="headingTwo"
                            data-bs-parent="#accordionExample"
                          >
                            <div className="accordion-body set-padding">
                              <ul className="list-unstyled">
                                <li>
                                  <Link
                                    href=""
                                    className="text-decoration-none d-inline-block mb-2 set-fs12 sec-category"
                                    onClick={(e) => {
                                      e.preventDefault()
                                      handleCategory(5)
                                    }}
                                  >
                                    春季種苗
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    href=""
                                    className="text-decoration-none d-inline-block mb-2 set-fs12 sec-category"
                                    onClick={(e) => {
                                      e.preventDefault()
                                      handleCategory(6)
                                    }}
                                  >
                                    夏季種苗
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    href=""
                                    className="text-decoration-none d-inline-block mb-2 set-fs12 sec-category"
                                    onClick={(e) => {
                                      e.preventDefault()
                                      handleCategory(7)
                                    }}
                                  >
                                    秋季種苗
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    href=""
                                    className="text-decoration-none d-inline-block set-fs12 sec-category"
                                    onClick={(e) => {
                                      e.preventDefault()
                                      handleCategory(8)
                                    }}
                                  >
                                    冬季種苗
                                  </Link>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div className="accordion-item">
                          <h2 className="accordion-header" id="headingThree">
                            <button
                              className="accordion-button collapsed set-padding pri-category-bg"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#collapseThree"
                              aria-expanded="false"
                              aria-controls="collapseThree"
                            >
                              農藥
                            </button>
                          </h2>
                          <div
                            id="collapseThree"
                            className="accordion-collapse collapse"
                            aria-labelledby="headingThree"
                            data-bs-parent="#accordionExample"
                          >
                            <div className="accordion-body set-padding">
                              <ul className="list-unstyled">
                                <li>
                                  {' '}
                                  <Link
                                    href=""
                                    className="text-decoration-none d-inline-block mb-2 set-fs12 sec-category"
                                    onClick={(e) => {
                                      e.preventDefault()
                                      handleCategory(9)
                                    }}
                                  >
                                    殺蟲劑
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    href=""
                                    className="text-decoration-none d-inline-block mb-2 set-fs12 sec-category"
                                    onClick={(e) => {
                                      e.preventDefault()
                                      handleCategory(10)
                                    }}
                                  >
                                    殺真菌劑
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    href=""
                                    className="text-decoration-none d-inline-block mb-2 set-fs12 sec-category"
                                    onClick={(e) => {
                                      e.preventDefault()
                                      handleCategory(11)
                                    }}
                                  >
                                    除草劑
                                  </Link>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div className="accordion-item">
                          <h2 className="accordion-header" id="headingFour">
                            <button
                              className="accordion-button collapsed set-padding pri-category-bg"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#collapseFour"
                              aria-expanded="true"
                              aria-controls="collapseFour"
                            >
                              資材
                            </button>
                          </h2>
                          <div
                            id="collapseFour"
                            className="accordion-collapse collapse"
                            aria-labelledby="headingFour"
                            data-bs-parent="#accordionExample"
                          >
                            <div className="accordion-body set-padding">
                              <ul className="list-unstyled">
                                <li>
                                  {' '}
                                  <Link
                                    href=""
                                    className="text-decoration-none d-inline-block mb-2 set-fs12 sec-category"
                                    onClick={(e) => {
                                      e.preventDefault()
                                      handleCategory(12)
                                    }}
                                  >
                                    花盆
                                  </Link>
                                </li>
                                <li>
                                  {' '}
                                  <Link
                                    href=""
                                    className="text-decoration-none d-inline-block mb-2 set-fs12 sec-category"
                                    onClick={(e) => {
                                      e.preventDefault()
                                      handleCategory(13)
                                    }}
                                  >
                                    工具
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    href=""
                                    className="text-decoration-none d-inline-block mb-2 set-fs12 sec-category"
                                    onClick={(e) => {
                                      e.preventDefault()
                                      handleCategory(14)
                                    }}
                                  >
                                    介質
                                  </Link>
                                </li>
                                <li>
                                  {' '}
                                  <Link
                                    href=""
                                    className="text-decoration-none d-inline-block set-fs12 sec-category"
                                    onClick={(e) => {
                                      e.preventDefault()
                                      handleCategory(15)
                                    }}
                                  >
                                    其他
                                  </Link>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div className="accordion-item">
                          <h2 className="accordion-header" id="headingFive">
                            <button
                              className="accordion-button collapsed set-padding pri-category-bg"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#collapseFive"
                              aria-expanded="true"
                              aria-controls="collapseFive"
                            >
                              肥料
                            </button>
                          </h2>
                          <div
                            id="collapseFive"
                            className="accordion-collapse collapse"
                            aria-labelledby="headingFive"
                            data-bs-parent="#accordionExample"
                          >
                            <div className="accordion-body set-padding">
                              <ul className="list-unstyled">
                                <li>
                                  <Link
                                    href=""
                                    className="text-decoration-none d-inline-block mb-2 set-fs12 sec-category"
                                    onClick={(e) => {
                                      e.preventDefault()
                                      handleCategory(16)
                                    }}
                                  >
                                    成長期肥料
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    href=""
                                    className="text-decoration-none d-inline-block mb-2 set-fs12 sec-category"
                                    onClick={(e) => {
                                      e.preventDefault()
                                      handleCategory(17)
                                    }}
                                  >
                                    開花期肥料
                                  </Link>
                                </li>
                                <li>
                                  {' '}
                                  <Link
                                    href=""
                                    className="text-decoration-none d-inline-block mb-2 set-fs12 sec-category"
                                    onClick={(e) => {
                                      e.preventDefault()
                                      handleCategory(18)
                                    }}
                                  >
                                    結果期肥料
                                  </Link>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div className="accordion-item">
                          <h2 className="accordion-header" id="headingSix">
                            <button
                              className="accordion-button collapsed set-padding pri-category-bg"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#collapseSix"
                              aria-expanded="true"
                              aria-controls="collapseSix"
                            >
                              書籍
                            </button>
                          </h2>
                          <div
                            id="collapseSix"
                            className="accordion-collapse collapse"
                            aria-labelledby="headingSix"
                            data-bs-parent="#accordionExample"
                          >
                            <div className="accordion-body set-padding">
                              <ul className="list-unstyled">
                                <li>
                                  <Link
                                    href=""
                                    className="text-decoration-none d-inline-block mb-2 set-fs12 sec-category"
                                    onClick={(e) => {
                                      e.preventDefault()
                                      handleCategory(19)
                                    }}
                                  >
                                    圖鑑
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    href=""
                                    className="text-decoration-none d-inline-block mb-2 set-fs12 sec-category"
                                    onClick={(e) => {
                                      e.preventDefault()
                                      handleCategory(20)
                                    }}
                                  >
                                    指南
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    href=""
                                    className="text-decoration-none d-inline-block mb-2 set-fs12 sec-category"
                                    onClick={(e) => {
                                      e.preventDefault()
                                      handleCategory(21)
                                    }}
                                  >
                                    DIY
                                  </Link>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* 篩選 */}
                    <div className="">
                      <h2 className="fs-6 text-white header-color m-0 p-2 rounded-top">
                        <LuSettings2 />
                        篩選
                      </h2>
                      <div className="form-control set-text-color">
                        <Link
                          href=""
                          className="text-decoration-none"
                          id="set-text"
                        >
                          清除篩選
                        </Link>
                        <p className="mt-1 mb-0 set-fw700">金額</p>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="exampleRadios"
                            id="exampleRadios1"
                            value="option1"
                          />
                          <label
                            className="form-check-label set-fs12"
                            htmlFor="exampleRadios1"
                          >
                            NTD 150以下
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="exampleRadios"
                            id="exampleRadios2"
                            value="option2"
                          />
                          <label
                            className="form-check-label set-fs12"
                            htmlFor="exampleRadios2"
                          >
                            NTD 150-300
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="exampleRadios"
                            id="exampleRadios3"
                            value="option3"
                          />
                          <label
                            className="form-check-label set-fs12"
                            htmlFor="exampleRadios3"
                          >
                            NTD 300-500
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="exampleRadios"
                            id="exampleRadios4"
                            value="option4"
                          />
                          <label
                            className="form-check-label set-fs12"
                            htmlFor="exampleRadios4"
                          >
                            NTD 500-1000
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="exampleRadios"
                            id="exampleRadios5"
                            value="option5"
                          />
                          <label
                            className="form-check-label set-fs12"
                            htmlFor="exampleRadios5"
                          >
                            NTD 1000以上
                          </label>
                        </div>

                        <div className="input-group d-flex align-items-center">
                          <div className="d-flex align-items-center">
                            <p className="set-fs12 m-0">NTD</p>
                          </div>
                          <input
                            type="text"
                            className="form-control ms-1 p-1 set-fs12 set-size"
                            placeholder=""
                            aria-label="lowPrice"
                          />
                          <span className="input-group-text px-1 no-border-bg">
                            -
                          </span>
                          <input
                            type="text"
                            className="form-control me-2 p-1 set-fs12 set-size"
                            placeholder=""
                            aria-label="highPrice"
                          />
                          <button
                            className="set-button-style d-flex align-items-center p-1 rounded"
                            type="submit"
                          >
                            <MdKeyboardArrowRight className="text-white" />
                          </button>
                        </div>
                        <Link
                          href=""
                          className="set-fs12 text-decoration-none set-text-color2"
                        >
                          清除輸入金額
                        </Link>
                        <p className="set-fw700 mt-1 mb-0">商品尺寸</p>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="exampleRadios"
                            id="exampleRadios6"
                            value="option6"
                          />
                          <label
                            className="form-check-label set-fs12"
                            htmlFor="exampleRadios6"
                          >
                            大
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="exampleRadios"
                            id="exampleRadios7"
                            value="option7"
                          />
                          <label
                            className="form-check-label set-fs12"
                            htmlFor="exampleRadios7"
                          >
                            小
                          </label>
                        </div>
                        <p className="set-fw700 mt-1 mb-0">免運</p>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id="flexCheckDefault"
                          />
                          <label
                            className="form-check-label set-fs12"
                            htmlFor="flexCheckDefault"
                          >
                            一件即達免運
                          </label>
                        </div>
                        <p className="set-fw700 mt-1 mb-0">24小時快速到貨</p>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id="flexCheckDefault"
                          />
                          <label
                            className="form-check-label set-fs12"
                            htmlFor="flexCheckDefault"
                          >
                            只顯示可快速到貨的商品
                          </label>
                        </div>
                        <p className="set-fw700 mt-1 mb-0">可寄往</p>
                        <div className="dropdown d-flex justify-content-center">
                          <button
                            className="btn dropdown-toggle set-fs12 set-dropdown-size"
                            type="button"
                            id="dropdownMenuButton1"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            地點
                          </button>
                          <ul
                            className="dropdown-menu"
                            aria-labelledby="dropdownMenuButton1"
                          >
                            <li>
                              <a className="dropdown-item" href="#">
                                本島
                              </a>
                            </li>
                            <li>
                              <a className="dropdown-item" href="#">
                                澎湖縣
                              </a>
                            </li>
                            <li>
                              <a className="dropdown-item" href="#">
                                金門縣
                              </a>
                            </li>
                            <li>
                              <a className="dropdown-item" href="#">
                                連江縣
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="dropdown">
                    <button
                      className="btn dropdown-toggle fs-6 sort-btn sort-btn-size me-3 d-flex justify-content-center align-items-center"
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
                        <a
                          className="dropdown-item"
                          href="#"
                          // filterProducts={filterProducts}
                          onClick={(e) => {
                            e.preventDefault()
                            changeSort('price', 'descending')
                          }}
                        >
                          價格由高到低
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item"
                          href="#"
                          onClick={(e) => {
                            e.preventDefault()
                            changeSort('price', 'ascending')
                          }}
                        >
                          價格由低到高
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item"
                          href="#"
                          onClick={(e) => {
                            e.preventDefault()
                            changeSort('star', 'descending')
                          }}
                        >
                          評價由高到低
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item"
                          href="#"
                          onClick={(e) => {
                            e.preventDefault()
                            changeSort('star', 'ascending')
                          }}
                        >
                          評價由低到高
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            {/* 商品欄 */}
            <div div className="container ">
              <div className="row row-cols-2 row-cols-lg-4 g-4">
                {list.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
            {/* 分頁 */}
            <div className="container ">
              <Page
                perpages={perpages}
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
