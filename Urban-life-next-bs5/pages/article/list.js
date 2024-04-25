// import { useEffect } from 'react'

// export default function List() {
//   // Toggle the side navigation
//   useEffect(() => {
//     // fix next issue
//     if (typeof window !== 'undefined') {
//       const sidebarToggle = document.body.querySelector('#sidebarToggle')

//       if (sidebarToggle) {
//         // 在localStorage中儲存目前sidebar情況
//         if (localStorage.getItem('sb|sidebar-toggle') === 'true') {
//           document.body.classList.toggle('sb-sidenav-toggled')
//         }

//         sidebarToggle.addEventListener('click', (event) => {
//           event.preventDefault()

//           document.body.classList.toggle('sb-sidenav-toggled')

//           localStorage.setItem(
//             'sb|sidebar-toggle',
//             document.body.classList.contains('sb-sidenav-toggled')
//           )
//         })
//       }
//     }
//   }, [])

//   return (
//     <>
//       <div className="row mt-2 mb-3">
//         <h5 className="card-text d-flex justify-content-between align-items-center">
//           <span className="ps-3">Nike Air Force 1 (91)</span>
//           <div className="d-flex p-2 justify-content-end align-items-center">
//             <div className="toolbar">
//               <button className="btn" id="sidebarToggle">
//                 隱藏篩選條件 <i className="bi bi-toggles"></i>
//               </button>
//             </div>
//             <div className="dropdown">
//               <button
//                 className="btn dropdown-toggle"
//                 type="button"
//                 data-bs-toggle="dropdown"
//                 aria-expanded="false"
//               >
//                 排序依據
//               </button>
//               <ul className="dropdown-menu">
//                 <li>
//                   <a className="dropdown-item" href="#">
//                     最新
//                   </a>
//                 </li>
//                 <li>
//                   <a className="dropdown-item" href="#">
//                     價格：由高至低
//                   </a>
//                 </li>
//                 <li>
//                   <a className="dropdown-item" href="#">
//                     價格：由低至高
//                   </a>
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </h5>
//       </div>
//       <div className="row">
//         <div className="col-sm-12">
//           <div className="d-flex" id="wrapper">
//             <div className="bg-white me-3" id="sidebar-wrapper">
//               <div className="scroll">
//                 <div className="cats">
//                   <div>
//                     <button type="button" className="btn">
//                       運動生活
//                     </button>
//                   </div>
//                   <div>
//                     <button type="button" className="btn">
//                       當季新品
//                     </button>
//                   </div>
//                   <div>
//                     <button type="button" className="btn">
//                       促銷
//                     </button>
//                   </div>
//                 </div>

//                 <div
//                   className="accordion accordion-flush"
//                   id="accordionFlushExample"
//                 >
//                   <div className="accordion-item">
//                     <h2 className="accordion-header">
//                       <button
//                         className="accordion-button collapsed"
//                         type="button"
//                         data-bs-toggle="collapse"
//                         aria-expanded="false"
//                         data-bs-target="#panelsStayOpen-collapseOne"
//                         aria-controls="panelsStayOpen-collapseOne"
//                       >
//                         性別
//                       </button>
//                     </h2>
//                     <div
//                       id="panelsStayOpen-collapseOne"
//                       className="accordion-collapse collapse"
//                     >
//                       <div className="accordion-body px-1">
//                         <div className="form-check">
//                           <input
//                             className="form-check-input"
//                             type="checkbox"
//                             value=""
//                             id="flexCheckDefault"
//                           />
//                           <label
//                             className="form-check-label"
//                             htmlFor="flexCheckDefault"
//                           >
//                             男性
//                           </label>
//                         </div>
//                         <div className="form-check">
//                           <input
//                             className="form-check-input"
//                             type="checkbox"
//                             value=""
//                             id="flexCheckChecked"
//                           />
//                           <label
//                             className="form-check-label"
//                             htmlFor="flexCheckChecked"
//                           >
//                             女性
//                           </label>
//                         </div>
//                         <div className="form-check">
//                           <input
//                             className="form-check-input"
//                             type="checkbox"
//                             value=""
//                             id="flexCheckChecked"
//                           />
//                           <label
//                             className="form-check-label"
//                             htmlFor="flexCheckChecked"
//                           >
//                             中性
//                           </label>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="accordion-item">
//                     <h2 className="accordion-header">
//                       <button
//                         className="accordion-button collapsed"
//                         type="button"
//                         data-bs-toggle="collapse"
//                         data-bs-target="#panelsStayOpen-collapseTwo"
//                         aria-expanded="false"
//                         aria-controls="panelsStayOpen-collapseTwo"
//                       >
//                         顏色
//                       </button>
//                     </h2>
//                     <div
//                       id="panelsStayOpen-collapseTwo"
//                       className="accordion-collapse collapse"
//                     >
//                       <div className="accordion-body px-1">
//                         <div className="d-flex flex-row justify-content-around mb-2">
//                           <div className="p-2">
//                             <div className="d-flex flex-column">
//                               <div>
//                                 <button
//                                   type="button"
//                                   className="btn btn-primary btn-circle"
//                                 ></button>
//                               </div>
//                               <div className="color-f">紫色</div>
//                             </div>
//                           </div>
//                           <div className="p-2">
//                             <div className="d-flex flex-column">
//                               <div>
//                                 <button
//                                   type="button"
//                                   className="btn btn-primary btn-circle"
//                                 ></button>
//                               </div>
//                               <div className="color-f">紫色</div>
//                             </div>
//                           </div>
//                           <div className="p-2">
//                             <div className="d-flex flex-column">
//                               <div>
//                                 <button
//                                   type="button"
//                                   className="btn btn-primary btn-circle"
//                                 ></button>
//                               </div>
//                               <div className="color-f">紫色</div>
//                             </div>
//                           </div>
//                         </div>
//                         <div className="d-flex flex-row justify-content-around mb-2">
//                           <div className="p-2">
//                             <div className="d-flex flex-column">
//                               <div>
//                                 <button
//                                   type="button"
//                                   className="btn btn-primary btn-circle"
//                                 ></button>
//                               </div>
//                               <div className="color-f">紫色</div>
//                             </div>
//                           </div>
//                           <div className="p-2">
//                             <div className="d-flex flex-column">
//                               <div>
//                                 <button
//                                   type="button"
//                                   className="btn btn-primary btn-circle"
//                                 ></button>
//                               </div>
//                               <div className="color-f">紫色</div>
//                             </div>
//                           </div>
//                           <div className="p-2">
//                             <div className="d-flex flex-column">
//                               <div>
//                                 <button
//                                   type="button"
//                                   className="btn btn-primary btn-circle"
//                                 ></button>
//                               </div>
//                               <div className="color-f">紫色</div>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="accordion-item">
//                     <h2 className="accordion-header">
//                       <button
//                         className="accordion-button collapsed"
//                         type="button"
//                         data-bs-toggle="collapse"
//                         data-bs-target="#panelsStayOpen-collapseThree"
//                         aria-expanded="false"
//                         aria-controls="panelsStayOpen-collapseThree"
//                       >
//                         價格範圍
//                       </button>
//                     </h2>
//                     <div
//                       id="panelsStayOpen-collapseThree"
//                       className="accordion-collapse collapse"
//                     >
//                       <div className="accordion-body px-1">
//                         <div className="form-check">
//                           <input
//                             className="form-check-input"
//                             type="checkbox"
//                             value=""
//                             id="flexCheckDefault"
//                           />
//                           <label
//                             className="form-check-label"
//                             htmlFor="flexCheckDefault"
//                           >
//                             $1,500以下
//                           </label>
//                         </div>
//                         <div className="form-check">
//                           <input
//                             className="form-check-input"
//                             type="checkbox"
//                             value=""
//                             id="flexCheckChecked"
//                           />
//                           <label
//                             className="form-check-label"
//                             htmlFor="flexCheckChecked"
//                           >
//                             $1,500 - $3,000
//                           </label>
//                         </div>
//                         <div className="form-check">
//                           <input
//                             className="form-check-input"
//                             type="checkbox"
//                             value=""
//                             id="flexCheckChecked"
//                           />
//                           <label
//                             className="form-check-label"
//                             htmlFor="flexCheckChecked"
//                           >
//                             $3,001 - $5,999
//                           </label>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div id="page-content-wrapper">
//               <div className="container-fluid">
//                 <div className="row row-cols-1 row-cols-md-3 g-4">
//                   <div className="col">
//                     <div className="card w-350 no-border f-16">
//                       <img
//                         src="/images/product/list/p1-thumb.webp"
//                         className="card-img-top"
//                         alt="..."
//                       />
//                       <div className="card-body no-space-x">
//                         <p className="card-text note-text">新品上市</p>
//                         <p className="card-text">Nike Air Force 1 Shadow</p>
//                         <p className="card-text type-text">女鞋</p>
//                         <p className="card-text type-text mb-2">3 種顏色</p>
//                         <span className="h-currency bold h-now">$1,990</span>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="col">
//                     <div className="card w-350 no-border f-16">
//                       <img
//                         src="/images/product/list/p1-thumb.webp"
//                         className="card-img-top"
//                         alt="..."
//                       />
//                       <div className="card-body no-space-x">
//                         <p className="card-text note-text">新品上市</p>
//                         <p className="card-text">Nike Air Force 1 Shadow</p>
//                         <p className="card-text type-text">女鞋</p>
//                         <p className="card-text type-text mb-2">3 種顏色</p>
//                         <span className="h-currency bold h-now">$1,990</span>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="col">
//                     <div className="card w-350 no-border f-16">
//                       <img
//                         src="/images/product/list/p1-thumb.webp"
//                         className="card-img-top"
//                         alt="..."
//                       />
//                       <div className="card-body no-space-x">
//                         <p className="card-text note-text">新品上市</p>
//                         <p className="card-text">Nike Air Force 1 Shadow</p>
//                         <p className="card-text type-text">女鞋</p>
//                         <p className="card-text type-text mb-2">3 種顏色</p>
//                         <span className="h-currency bold h-now">$1,990</span>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="col">
//                     <div className="card w-350 no-border f-16">
//                       <img
//                         src="/images/product/list/p1-thumb.webp"
//                         className="card-img-top"
//                         alt="..."
//                       />
//                       <div className="card-body no-space-x">
//                         <p className="card-text note-text">新品上市</p>
//                         <p className="card-text">Nike Air Force 1 Shadow</p>
//                         <p className="card-text type-text">女鞋</p>
//                         <p className="card-text type-text mb-2">3 種顏色</p>
//                         <span className="h-currency bold h-now">$1,990</span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   )
// }

import React from 'react'
import Page from '@/components/product/pagination'
import Search from '@/components/product/search'
import ArticleCard from '@/components/article/articlecard'
import { FaFilter } from 'react-icons/fa'

export default function List() {
  return (
    <>
      <div className="container bg-color g-3 mt-5 my-2">
        <div className="row d-flex">
          {/*   類別按鈕列表  */}
          <div className="col-2 d-none d-lg-block d-md-none">
            <div className="sidenav ">
              <div className="list-group">
                <button
                  type="button"
                  className="list-group-item list-group-item-action active"
                  aria-current="true"
                >
                  文章分類
                </button>
                <button
                  type="button"
                  className="list-group-item list-group-item-action active"
                >
                  課程分享
                </button>
                <button
                  type="button"
                  className="list-group-item list-group-item-action"
                >
                  植栽照顧
                </button>
                <button
                  type="button"
                  className="list-group-item list-group-item-action"
                >
                  植物分享
                </button>
                <button
                  type="button"
                  className="list-group-item list-group-item-action"
                >
                  資材
                </button>
                <button
                  type="button"
                  className="list-group-item list-group-item-action"
                >
                  肥料
                </button>
                <button
                  type="button"
                  className="list-group-item list-group-item-action"
                >
                  書籍
                </button>
              </div>
            </div>
          </div>
          {/* 搜尋與文章列表  */}

          <div className="col col-lg-10  col-sm-12">
            <div className="product-list">
              <div className="search mx-2">
                <Search />
              </div>

              <div className="breadcrumb-amount-arrange-bar mx-2">
                <div className="">
                  <div className="d-flex justify-content-between my-3">
                    <div className="breadcrumb-amount-bar mt-3">
                      <h6>文章列表/課程分享</h6>
                      <h6>共 5 篇文章</h6>
                    </div>
                    <div className="d-flex ">
                      <button
                        className="btn btn-main mx-3 rounded-circle d-lg-none d-md-block"
                        style={{ width: '40px', height: '40px' }}
                      >
                        <FaFilter />
                      </button>

                      <div className="arrange-select ">
                        <select
                          className="form-select"
                          aria-label="Default select example"
                        >
                          <option selected="">排序依據</option>
                          <option value={1}>最多瀏覽</option>
                          <option value={1}>最多收藏</option>
                          <option value={2}>最多留言</option>
                          <option value={3}>最新文章</option>
                          <option value={3}>最舊文章</option>

                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 文章卡片 */}
              <ArticleCard />
              <ArticleCard />
              <ArticleCard />
              <ArticleCard />

              {/* 分頁 */}
              <Page />
            </div>
          </div>
        </div>
        {/* Bootstrap JavaScript Libraries */}
      </div>
    </>
  )
}

;<style jsx>{`
  .container {
    width: 1440px;
    padding: 10px;
  }
  body {
    background-color: #ebe3db;
  }

  .gray-500 {
    background-color: #a9a6a6;
  }

  .active {
    background-color: #849474;
  }

  .w-305 {
    width: 305px;
  }
  p {
    font-size: 12px;
    font-weight: 500;
    color: #a9a6a6;
  }
  .card-text {
    font-size: 10px;
    font-weight: 300;
    color: #6b6b6b;
  }
  .text-overflow {
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  h6 {
    font-size: 16px;
  }
  .grey-300 {
    color: #6b6b6b;
  }
  .card {
    width: 250px;
    height: 340px;
  }
  .card-body {
    background-color: #ffffff;
    border-radius: 0 0 10px 10px;
  }
  .card-end {
  }

  /* 428px 以下開始為 手機(直) 最小尺寸 */
  @media (max-width: 430px) {
    .d-custom-none {
      display: none !important;
    }
  }
`}</style>
