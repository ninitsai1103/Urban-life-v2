import React from 'react'

export default function LectureWishContentPhone({ TeacherWish, deleteWish }) {
  const handleDelete = async (id) => {
    try {
      // 在這裡調用 deleteWish 函數並傳遞
      await deleteWish(id)

      // 可以在這裡添加更新頁面或重新加載數據的邏輯
    } catch (error) {
      console.error('Error deleting wish:', error)
    }
  }
  return (
    <>
      {/* 手機板 */}
      <div className="lectureWish_phone_card p-3" key={TeacherWish.id}>
        <table className="w-100">
          <tbody className="w-100">
            <tr>
              <th>期望上課時間：</th>
              <td>{TeacherWish.date}月</td>
            </tr>
            <tr className="w-100">
              <th className="w-50">課程內容：</th>
              <td className="w-50 wish_phone_content_overflow">
                {TeacherWish.content}
              </td>
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
        <div className="phone-lectureWish-detail w-100 d-flex">
          <button
            className="btn btn-detail"
            data-bs-toggle="modal"
            data-bs-target={`#wishPhoneDetailModal-${TeacherWish.id}`}
          >
            檢視
          </button>
        </div>
      </div>

      {/* 檢視modal */}
      <div
        className="modal fade"
        id={`wishPhoneDetailModal-${TeacherWish.id}`}
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
                  data-bs-target={`#wishPhoneDeleteModal-${TeacherWish.id}`}
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
        id={`wishPhoneDeleteModal-${TeacherWish.id}`}
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
              <a type="button" href="" className="btn btn-delete" role="button" onClick={() => handleDelete(TeacherWish.id)}>
                確認
              </a>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .lectureWish_phone_card {
          background-color: #ffffff;
          border-radius: 8px;
          border: 1px solid #ccc;
          margin-bottom: 20px;
          table {
            th,
            td {
              width: 50%;
              padding: 10px;
            }
          }
        }
        .wish_phone_content_overflow {
          width: 100% !important;
          height: 30px;
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
          }

          td {
            border: 1px solid #ccc;
            padding: 5px 10px;
          }
        }
      `}</style>
    </>
  )
}
