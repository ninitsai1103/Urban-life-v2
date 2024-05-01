import React from 'react'

export default function LectureContentTbody({ lecture }) {
  return (
    <>
      <tbody className="text-center align-middle" key={lecture.id}>
        <tr>
          <td scope="row" className="setup-max-width">
            {lecture.name}
          </td>
          <td>{lecture.lecture_date}</td>
          <td className="nodisplay_992px">
            <div className="setup-max-width-time text-center">
              {lecture.sign_up_deadline}
            </div>
          </td>
          <td>{lecture.amount}</td>
          <td>{lecture.price}</td>
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
                          <td>2025-12-04 00:00:00</td>
                        </tr>
                        <tr>
                          <th>報名截止時間：</th>
                          <td>2025-12-04 00:00:00</td>
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
                          <td>
                            <img
                              src={`/images/lecture/lecture_img/${lecture.cover}`}
                            ></img>
                            <img
                              src={`/images/lecture/lecture_img/${lecture.lecture_img1}`}
                            ></img>
                            <img
                              src={`/images/lecture/lecture_img/${lecture.lecture_img2}`}
                            ></img>
                            <img
                              src={`/images/lecture/lecture_img/${lecture.lecture_img3}`}
                            ></img>
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
                              value="2025-12-04 00:00:00"
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
                              value="2025-12-04 00:00:00"
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
        .setup-max-width {
          max-width: 100px;
          white-space: nowrap; /* 防止文字換行 */
          overflow: hidden; /* 隱藏超出範圍的文字 */
          text-overflow: ellipsis; /* 顯示省略號 */
        }
        .setup-max-width-time {
          margin: auto;
          max-width: 100px;
          white-space: nowrap; /* 防止文字換行 */
          overflow: hidden; /* 隱藏超出範圍的文字 */
          text-overflow: ellipsis; /* 顯示省略號 */
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
          img {
            width: 90%;
            margin-bottom: 10px;
            margin-left: 15px;
          }
        }

        @media (max-width: 992px) {
          .nodisplay_992px {
            display: none;
          }
        }
      `}</style>
    </>
  )
}
