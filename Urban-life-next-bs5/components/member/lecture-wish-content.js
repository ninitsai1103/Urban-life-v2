import React from 'react'

export default function LectureWishContent({ TeacherWish }) {
  return (
    <>
      {/* 許願池頁面 */}
      <tbody className="text-center align-middle" key={TeacherWish.id}>
        <tr>
          {/* <td scope="row">想要上課</td> */}
          <td>{TeacherWish.date}月</td>
          <td className="wish_content_overflow">{TeacherWish.content}</td>
          <td>${TeacherWish.price}</td>
          {/* <td className="nodisplay_768px">2024-12-04 12:00:00</td> */}
          <td>
            <button
              className="btn btn-detail"
              data-bs-toggle="modal"
              data-bs-target={`#wishDetailModal-${TeacherWish.id}`}
            >
              檢視
            </button>
          </td>
        </tr>
      </tbody>

      {/* 檢視modal */}
      <div
        className="modal fade"
        id={`wishDetailModal-${TeacherWish.id}`}
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <form>
              <div className="modal-header">
                {/* <h1 className="modal-title fs-5" id="exampleModalLabel">
                  這裡是課程名稱
                </h1> */}
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
                        {/* <tr>
                          <th>期望課程名稱：</th>
                          <td>想要上課</td>
                        </tr> */}
                        <tr>
                          <th>期望上課時間：</th>
                          <td>{TeacherWish.date}月</td>
                        </tr>
                        <tr>
                          <th>期望課程內容：</th>
                          <td>{TeacherWish.content}</td>
                        </tr>
                        <tr>
                          <th>期望價錢：</th>
                          <td>${TeacherWish.price}</td>
                        </tr>
                        {/* <tr>
                          <th>建立時間：</th>
                          <td>2024-12-04 12:00:00</td>
                        </tr> */}
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
                  data-bs-target={`#wishDeleteModal-${TeacherWish.id}`}
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
        id={`wishDeleteModal-${TeacherWish.id}`}
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
            <div className="modal-body">確認刪除此筆許願清單?</div>
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
         {
          /* .dropdown {
          margin-bottom: 20px;
          button {
            margin-left: auto;
            background-color: #ffffff;
            padding: 5px 50px;
          }
        } */
        }

         {
          /* .nodisplay_768px {
          width: 20%;
        } */
        }

         {
          /* 原本的樣式 */
        }
         {
          /* .wish_content_overflow {
          width: 100%;
          height: 55px;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
        }  */
        }

        .wish_content_overflow {
          max-width: 30px;
          height: 55px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
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
            justify-content: center;  */
            }
          }
          input {
            margin: 3px;
          }
        }

         {
          /* @media (max-width: 992px) {
          .nodisplay_768px {
            display: none;
          }
        } */
        }

        @media (max-width: 768px) {
           {
            /* .dropdown {
            button {
              border: 1px solid #ccc;
              padding: 5px 0px;
              width: 50%;
            }
          } */
          }
        }
      `}</style>
    </>
  )
}
