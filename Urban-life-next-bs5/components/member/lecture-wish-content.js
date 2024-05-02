import React from 'react'

export default function LectureWishContent({ TeacherWish }) {
  return (
    <>
      {/* 許願池頁面 */}
      <tbody className="text-center align-middle" key={TeacherWish.id}>
        <tr>
          <td>{TeacherWish.date}月</td>
          <td className="wish_content_overflow">{TeacherWish.content}</td>
          <td>${TeacherWish.price}</td>
          <td>{TeacherWish.created_at}</td>
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
                        <tr>
                          <th>建立時間：</th>
                          <td>{TeacherWish.created_at}</td>
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
          }
          td {
            border: 1px solid #ccc;
            padding: 5px 10px;
          }
          input {
            margin: 3px;
          }
        }
      `}</style>
    </>
  )
}
