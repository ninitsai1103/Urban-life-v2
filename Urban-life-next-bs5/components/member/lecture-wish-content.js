import React from 'react'

export default function LectureWishContent() {
  return (
    <>
      {/* 許願池排序 */}
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

      {/* 許願池頁面 */}
      <div className="lecture_wish_window_table">
        <table className="table">
          <thead className="text-center">
            <tr>
              <th scope="col">期望課程名稱：</th>
              <th scope="col">期望上課時間：</th>
              <th scope="col" className="nodisplay_768px">
                課程內容：
              </th>
              <th scope="col">期望價錢：</th>
              <th></th>
            </tr>
          </thead>
          <tbody className="text-center align-middle">
            <tr>
              <td scope="row">想要上課</td>
              <td>2023-12-04</td>
              <td className="nodisplay_768px wish_content_overflow">
                超級多課程內容哈哈哈哈哈哈哈哈哈哈超級多課程內容哈哈哈哈哈哈哈哈哈哈超級多課程內容哈哈哈哈哈哈哈哈哈哈
              </td>
              <td>$888</td>
              <td>
                <button
                  className="btn btn-detail"
                  data-bs-toggle="modal"
                  data-bs-target="#wishDetailModal"
                >
                  檢視
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* 手機板 */}
      <div className="lectureWish_body_phone d-none">
        <div className="lectureWish_phone_card p-3 ">
          <table className="w-100">
            <tbody className="w-100">
              <tr>
                <th>期望課程名稱：</th>
                <td>想要上課</td>
              </tr>
              <tr>
                <th>期望上課時間：</th>
                <td>2025-12-04</td>
              </tr>
              <tr className="w-100">
                <th className="w-50">課程內容：</th>
                <td className="w-50 wish_phone_content_overflow">超級多課程內容哈哈哈哈哈哈哈哈哈哈超級多課程內容哈哈哈哈哈哈哈哈哈哈超級多課程內容哈哈哈哈哈哈哈哈哈哈</td>
              </tr>
              <tr>
                <th>期望價錢：</th>
                <td>$888</td>
              </tr>
            </tbody>
          </table>
          <div className="phone-lectureWish-detail w-100 d-flex">
            <button
              className="btn btn-detail"
              data-bs-toggle="modal"
              data-bs-target="#wishDetailModal"
            >
              檢視
            </button>
          </div>
        </div>
      </div>

      {/* 檢視modal */}
      <div
        className="modal fade"
        id="wishDetailModal"
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
                          <th>期望課程名稱：</th>
                          <td>想要上課</td>
                        </tr>
                        <tr>
                          <th>期望上課時間：</th>
                          <td>2025-12-04</td>
                        </tr>
                        <tr>
                          <th>期望課程內容：</th>
                          <td>
                            超級多課程內容哈哈哈哈哈哈哈哈哈哈超級多課程內容哈哈哈哈哈哈哈哈哈哈超級多課程內容哈哈哈哈哈哈哈哈哈哈
                          </td>
                        </tr>
                        <tr>
                          <th>期望價錢：</th>
                          <td>$888</td>
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
                <button
                  type="button"
                  className="btn btn-delete mx-1"
                  data-bs-toggle="modal"
                  data-bs-dismiss="modal"
                  data-bs-target="#deleteWishModal"
                >
                  刪除清單
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* 刪除modal */}
      <div
        className="modal fade"
        id="deleteWishModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                刪除清單
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

        .nodisplay_768px{
          width: 20%;
        }

        .wish_content_overflow {
          width: 100%;
          height: 60px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .lectureWish_phone_card {
          background-color: #ffffff;
          border-radius: 8px;
          border: 1px solid #ccc;
          table {
            th,
            td {
              width: 50%;
              padding: 10px;
            }
          }
        }
        .wish_phone_content_overflow{
          width: 100% !important;
          height:30px;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
        }


        .phone-lectureWish-detail {
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
            {/* display: flex;
            align-items: center;
            justify-content: center;  */}
          }
          input {
            margin: 3px;
          }
        }

        @media (max-width: 992px) {
          .nodisplay_768px {
            display: none;
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
          .lecture_wish_window_table {
            display: none;
          }
          .lectureWish_body_phone {
            display: block !important;
          }
        }
      `}</style>
    </>
  )
}
