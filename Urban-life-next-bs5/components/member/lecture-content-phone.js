import { React, useState } from 'react'

export default function LectureContentPhone({ lecture }) {
  // 處理時間字符串，僅顯示到秒
  function formatTime(timeString) {
    // 切割字符串，只保留時分秒部分
    const timeWithoutMilliseconds = timeString.split('.')[0]
    return timeWithoutMilliseconds
  }

  // 代表選中的檔案(null代表沒選中檔案，或取消檔案選擇)
  const [selectedFile1, setSelectedFile1] = useState(null)
  const [selectedFile2, setSelectedFile2] = useState(null)
  const [selectedFile3, setSelectedFile3] = useState(null)
  const [selectedFile4, setSelectedFile4] = useState(null)
  // 預覽圖片的網址(呼叫URL.createObjectURL得到的網址)
  const [previewURL1, setPreviewURL1] = useState('')
  const [previewURL2, setPreviewURL2] = useState('')
  const [previewURL3, setPreviewURL3] = useState('')
  const [previewURL4, setPreviewURL4] = useState('')

  // 定義一個通用的處理文件變化的函數
  const handleFileChange = (e, fileNumber) => {
    const file = e.target.files[0]
    const setSelectedFile = `setSelectedFile${fileNumber}`
    const setPreviewURL = `setPreviewURL${fileNumber}`

    if (file) {
      // 設定到狀態中
      eval(`${setSelectedFile}(file)`) // 設置選中的文件狀態
      // 產生預覽網址
      eval(`${setPreviewURL}(URL.createObjectURL(file))`) // 設置預覽URL
    } else {
      eval(`${setSelectedFile}(null)`) // 清空選中的文件狀態
      eval(`${setPreviewURL}('')`) // 清空預覽URL
    }
  }

  return (
    <>
      <div className="lecture_phone_card p-3 ">
        <table className="w-100">
          <tbody className="w-100" key={lecture.id}>
            <tr>
              <th>課程名稱：</th>
              <td>{lecture.name}</td>
            </tr>
            <tr>
              <th>上課日期：</th>
              <td>{lecture.lecture_date}</td>
            </tr>
            <tr>
              <th>報名截止時間：</th>
              <td>{lecture.sign_up_deadline}</td>
            </tr>
            <tr>
              <th>上課人數：</th>
              <td>{lecture.amount}</td>
            </tr>
            <tr>
              <th>價錢：</th>
              <td>${lecture.price}</td>
            </tr>
          </tbody>
        </table>
        <div className="phone-lecture-detail w-100 d-flex">
          <button
            className="btn btn-detail"
            data-bs-toggle="modal"
            data-bs-target={`#detailPhoneModal-${lecture.id}`}
            // data-bs-target="#${lecture.id}detailPhoneModal"
            // onClick={() => handleViewDetails(lecture)}
          >
            檢視
          </button>
        </div>
      </div>

      {/* 檢視modal */}
      <div
        className="modal fade"
        id={`detailPhoneModal-${lecture.id}`}
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" key={lecture.id}>
          <div className="modal-content">
            <form>
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  {lecture.name}
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
                          <td>{lecture.name}</td>
                        </tr>
                        <tr>
                          <th>上課日期：</th>
                          <td>{lecture.lecture_date}</td>
                        </tr>
                        <tr>
                          <th>上課時間：</th>
                          <td>
                            {formatTime(lecture.starting_time)}~
                            {formatTime(lecture.ending_time)}
                          </td>
                        </tr>
                        <tr>
                          <th>報名開始時間：</th>
                          <td>{lecture.sign_up_starting}</td>
                        </tr>
                        <tr>
                          <th>報名截止時間：</th>
                          <td>{lecture.sign_up_deadline}</td>
                        </tr>
                        <tr>
                          <th>價格：</th>
                          <td>${lecture.price}</td>
                        </tr>
                        <tr>
                          <th>可報名人數：</th>
                          <td>{lecture.amount}</td>
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
                            <img className="displayOriginImg"
                              src={`/images/lecture/lecture_img/${lecture.cover}`}
                            ></img>
                            <img className="displayOriginImg"
                              src={`/images/lecture/lecture_img/${lecture.lecture_img1}`}
                            ></img>
                            <img className="displayOriginImg"
                              src={`/images/lecture/lecture_img/${lecture.lecture_img2}`}
                            ></img>
                            <img className="displayOriginImg"
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
                    data-bs-target={`#deletePhoneModal-${lecture.id}`}
                  >
                    下架課程
                  </button>
                  <button
                    type="button"
                    className="btn btn-main"
                    data-bs-toggle="modal"
                    data-bs-target={`#updatePhoneModal-${lecture.id}`}
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
        id={`updatePhoneModal-${lecture.id}`}
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <form>
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  {lecture.name}
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
                              value={`${lecture.name}`}
                            />
                          </td>
                        </tr>
                        <tr>
                          <th>上課日期：</th>
                          <td>
                            <input
                              type="text"
                              className="form-control"
                              name="name"
                              value={`${lecture.lecture_date}`}
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
                              value={`${lecture.starting_time}`}
                            />
                            <input
                              type="text"
                              className="form-control"
                              name="name"
                              value={`${lecture.ending_time}`}
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
                              value={`${lecture.sign_up_starting}`}
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
                              value={`${lecture.sign_up_deadline}`}
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
                              value={`${lecture.price}`}
                            />
                          </td>
                        </tr>
                        <tr>
                          <th>可報名人數：</th>
                          <td>
                            <input
                              type="text"
                              className="form-control"
                              name="name"
                              value={`${lecture.amount}`}
                            />
                          </td>
                        </tr>
                        <tr>
                          <th>課程圖片：</th>
                          <td>
                            <div>*第一章圖為封面圖</div>
                            <img
                              className="originImg"
                              src={`/images/lecture/lecture_img/${lecture.cover}`}
                            ></img>
                            <div>
                              <input
                                type="file"
                                onChange={(e) => handleFileChange(e, 1)}
                              />
                              {selectedFile1 && ( // 只有當 selectedFile1 不為 null 時顯示圖片預覽
                                <>
                                  <div>替換圖片預覽：</div>
                                  <img
                                    className="updateImg"
                                    src={previewURL1}
                                    alt=""
                                  />
                                </>
                              )}
                            </div>

                            <img
                              className="originImg mt-4"
                              src={`/images/lecture/lecture_img/${lecture.lecture_img1}`}
                            ></img>
                            <div>
                              <input
                                type="file"
                                onChange={(e) => handleFileChange(e, 2)}
                              />
                              {selectedFile2 && ( // 只有當 selectedFile2 不為 null 時顯示圖片預覽
                                <>
                                  <div>替換圖片預覽：</div>
                                  <img
                                    className="updateImg"
                                    src={previewURL2}
                                    alt=""
                                  />
                                </>
                              )}
                            </div>

                            <img
                              className="originImg mt-4"
                              src={`/images/lecture/lecture_img/${lecture.lecture_img2}`}
                            ></img>
                            <div>
                              <input
                                type="file"
                                onChange={(e) => handleFileChange(e, 3)}
                              />
                              {selectedFile3 && ( // 只有當 selectedFile3 不為 null 時顯示圖片預覽
                                <>
                                  <div>替換圖片預覽：</div>
                                  <img
                                    className="updateImg"
                                    src={previewURL3}
                                    alt=""
                                  />
                                </>
                              )}
                            </div>

                            <img
                              className="originImg mt-4"
                              src={`/images/lecture/lecture_img/${lecture.lecture_img3}`}
                            ></img>
                            <input
                              type="file"
                              onChange={(e) => handleFileChange(e, 4)}
                            />
                            {selectedFile4 && ( // 只有當 selectedFile4 不為 null 時顯示圖片預覽
                              <>
                                <div>替換圖片預覽：</div>
                                <img
                                  className="updateImg"
                                  src={previewURL4}
                                  alt=""
                                />
                              </>
                            )}
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
                    data-bs-target={`#deletePhoneModal-${lecture.id}`}
                  >
                    下架課程
                  </button>
                  <button
                    type="button"
                    // type="submit"
                    className="btn btn-main"
                    data-bs-dismiss="modal"
                    // data-bs-toggle="modal"
                    aria-label="Close"
                    // data-bs-target={`#updatePhoneModal-${lecture.id}`}
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
        id={`deletePhoneModal-${lecture.id}`}
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                刪除「{lecture.name}」課程
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">確認刪除「{lecture.name}」?</div>
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
        .lecture_phone_card {
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
            width: 40%;
          }

          td {
            border: 1px solid #ccc;
            padding: 5px 10px;
            width: 60%;
          }
          input {
            margin: 3px;
            width: 80%;
          }
          .displayOriginImg{
            width: 40%;
            margin-bottom: 10px;
            margin: 5px;
            margin-left: 7px;
          }
          .originImg {
            width: 80%;
            margin-bottom: 10px;
            margin: 5px;
            margin-left: 7px;
          }
          .updateImg {
            width: 50%;
            margin-bottom: 10px;
            margin: 5px;
            margin-left: 7px;
          }
        }
      `}</style>
    </>
  )
}
