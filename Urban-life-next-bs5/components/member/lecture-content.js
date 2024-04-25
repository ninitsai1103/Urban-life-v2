import React from 'react'

export default function LectureContent() {
  return (
    <>
      {/* 我的課程排序 */}
      <div className="dropdown">
        <button
          className="btn dropdown-toggle fs-6 d-flex justify-content-center align-items-center"
          type="button"
          id="lectureDropdown1"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          排序
        </button>
        <ul className="dropdown-menu" aria-labelledby="lectureDropdown1">
          <li>
            <a className="dropdown-item" href="#">
              上課時間由新到舊
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#">
              上課時間由舊到新
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#">
              更新時間由新到舊
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#">
              更新時間由舊到新
            </a>
          </li>
        </ul>
      </div>

      {/* 我的課程頁面 */}
      <div className="lecture_window_table">
        <table className="table">
          <thead className="text-center">
            <tr>
              <th scope="col">課程名稱</th>
              <th scope="col">上課時間</th>
              <th scope="col" className="nodisplay_768px">
                報名時間
              </th>
              <th scope="col">上課人數</th>
              <th scope="col">價錢</th>
              <th></th>
            </tr>
          </thead>
          <tbody className="text-center align-middle">
            <tr>
              <td scope="row">上課好有趣</td>
              <td>2023-12-04</td>
              <td className="nodisplay_768px">
                <div>2023-12-04</div>
                <div>~</div>
                <div>2023-12-04</div>
              </td>
              <td>20</td>
              <td>$888</td>
              <td>
                <button
                  className="btn btn-detail"
                  data-bs-toggle="modal"
                  data-bs-target="#detailModal"
                >
                  檢視
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* 手機板課程頁面 */}
      <div className="lecture_body_phone d-none">
        <div className="lecture_phone_card p-3 ">
          <table className="w-100">
            <tbody className="w-100">
              <tr>
                <th>課程名稱：</th>
                <td>大吉大利-採摘體驗</td>
              </tr>
              <tr>
                <th>上課時間：</th>
                <td>2025-12-04</td>
              </tr>
              <tr>
                <th>報名截止時間：</th>
                <td>2025-12-04</td>
              </tr>
              <tr>
                <th>上課人數：</th>
                <td>20</td>
              </tr>
              <tr>
                <th>價錢：</th>
                <td>$800</td>
              </tr>
            </tbody>
          </table>
          <div className="phone-lecture-detail w-100 d-flex">
            <button
              className="btn btn-detail"
              data-bs-toggle="modal"
              data-bs-target="#detailModal"
            >
              檢視
            </button>
          </div>
        </div>
      </div>

      {/* 檢視modal */}
      <div
        className="modal fade"
        id="detailModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <form>
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  這裡是課程名稱
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-12">
                    <table className="table modal-table">
                      <tbody>
                        <tr>
                          <th>課程名稱：</th>
                          <td>大吉大利-採摘體驗</td>
                        </tr>
                        <tr>
                          <th>上課時間：</th>
                          <td>2025-12-04</td>
                        </tr>
                        <tr>
                          <th>報名開始時間：</th>
                          <td>2025-12-04</td>
                        </tr>
                        <tr>
                          <th>報名截止時間：</th>
                          <td>2025-12-04</td>
                        </tr>
                        <tr>
                          <th>價格：</th>
                          <td>1000</td>
                        </tr>
                        <tr>
                          <th>報名人數：</th>
                          <td>20</td>
                        </tr>
                        <tr>
                          <th>已報名人數：</th>
                          <td>15</td>
                        </tr>
                        <tr>
                          <th>已報名學員：</th>
                          <td>
                            許栩栩、許栩栩、許栩栩、許栩栩、許栩栩、許栩栩、許栩栩、許栩栩、許栩栩、許栩栩、許栩栩、許栩栩、
                          </td>
                        </tr>
                        <tr>
                          <th>課程圖片：</th>
                          <td>圖片一、圖片二、圖片三、圖片四</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="modal-footer d-flex justify-content-between">
                <button
                  type="button"
                  className="btn btn-detail"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  取消
                </button>
                <div>
                  <button
                    type="button"
                    className="btn btn-delete mx-1"
                    data-bs-toggle="modal"
                    data-bs-dismiss="modal"
                    data-bs-target="#deleteModal"
                  >
                    下架課程
                  </button>
                  <button
                    type="button"
                    className="btn btn-main"
                    data-bs-toggle="modal"
                    data-bs-target="#updateModal"
                  >
                    修改
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* 修改modal */}
      <div
        className="modal fade"
        id="updateModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <form>
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  這裡是課程名稱
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-12">
                    <table className="table modal-table">
                      <tbody>
                        <tr>
                          <th>課程名稱：</th>
                          <td>
                            <input
                              type="text"
                              className="form-control"
                              name="name"
                              value="大吉大利-採摘體驗"
                            />
                          </td>
                        </tr>
                        <tr>
                          <th>上課時間：</th>
                          <td>
                            <input
                              type="text"
                              className="form-control"
                              name="name"
                              value="2025-12-04"
                            />
                          </td>
                        </tr>
                        <tr>
                          <th>報名開始時間：</th>
                          <td>
                            <input
                              type="text"
                              className="form-control"
                              name="name"
                              value="2025-12-04"
                            />
                          </td>
                        </tr>
                        <tr>
                          <th>報名截止時間：</th>
                          <td>
                            <input
                              type="text"
                              className="form-control"
                              name="name"
                              value="2025-12-04"
                            />
                          </td>
                        </tr>
                        <tr>
                          <th>價格：</th>
                          <td>
                            <input
                              type="text"
                              className="form-control"
                              name="name"
                              value="1000"
                            />
                          </td>
                        </tr>
                        <tr>
                          <th>報名人數：</th>
                          <td>
                            <input
                              type="text"
                              className="form-control"
                              name="name"
                              value="20"
                            />
                          </td>
                        </tr>
                        <tr>
                          <th>課程圖片：</th>
                          <td>
                            <input
                              type="text"
                              className="form-control"
                              name="name"
                              value="圖片一、圖片二、圖片三、圖片四"
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="modal-footer d-flex justify-content-between">
                <button
                  type="button"
                  className="btn btn-detail"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  取消
                </button>
                <div>
                  <button
                    type="button"
                    className="btn btn-delete mx-1"
                    data-bs-toggle="modal"
                    data-bs-dismiss="modal"
                    data-bs-target="#deleteModal"
                  >
                    下架課程
                  </button>
                  <button
                    type="submit"
                    className="btn btn-main"
                    data-bs-toggle="modal"
                    data-bs-target="#updateModal"
                  >
                    確認修改
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* 刪除modal */}
      <div
        className="modal fade"
        id="deleteModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                刪除課程
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">確認刪除?</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-main"
                data-bs-dismiss="modal"
              >
                取消
              </button>
              <a type="button" href="" className="btn btn-delete" role="button">
                確認
              </a>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .dropdown {
          margin-bottom: 20px;
          button {
            margin-left: auto;
            background-color: #ffffff;
            padding: 5px 50px;
          }
        }
        .lecture_phone_card {
          background-color: #ffffff;
          border-radius: 8px;
          border: 1px solid #ccc;
          table{
            th, td {
            width: 50%;
            padding: 10px;
          }
          }
        }
        .phone-lecture-detail {
          padding: 10px;
          button {
            margin-left: auto;
          }
        }

        .modal-table {
          th {
            border: 1px solid #ccc;
            padding: 5px 10px;
            width: 150px;
             {
              /* display: flex;
            align-items: center;
            justify-content: center; */
            }
          }

          td {
            border: 1px solid #ccc;
            padding: 5px 10px;
             {
              /* display: flex;
            align-items: center;
            justify-content: center; */
            }
          }
          input {
            margin: 3px;
          }
        }

        @media (max-width: 768px) {
          .dropdown {
            button {
              border: 1px solid #ccc;
              padding: 5px 0px;
              width: 50%;
            }
          }
          .nodisplay_768px {
            display: none;
          }
          .lecture_window_table {
            display: none;
          }
          .lecture_body_phone {
            display: block !important;
          }
        }
        @media (max-width: 576px) {
          .lecture_window_table table {
            th {
              font-size: 10px;
            }
            td {
              font-size: 10px;
            }
            button {
              font-size: 10px;
            }
          }
        }
      `}</style>
    </>
  )
}
