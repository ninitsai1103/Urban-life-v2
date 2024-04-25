import React from 'react'

export default function LectureAddModal() {
  return (
    <>
        {/* 新增modal */}
      <div
        className="modal fade"
        id="addModal"
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
                              value=""
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
                              value=""
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
                              value=""
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
                              value=""
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
                              value=""
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
                              value=""
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
                              value=""
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
                <button
                    type="submit"
                    className="btn btn-main"
                    data-bs-toggle="modal"
                    data-bs-target="#addModal"
                  >
                    確認新增
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>


      <style jsx>{`
      .modal-table {
          th {
            border: 1px solid #ccc;
            padding: 5px 10px;
            width: 150px;
            {/* display: flex;
            align-items: center;
            justify-content: center; */}
          }

          td {
            border: 1px solid #ccc;
            padding: 5px 10px;
            {/* display: flex;
            align-items: center;
            justify-content: center; */}
          }
          input {
            margin: 3px;
          }
        }
      `}</style>
    </>
  )
}
