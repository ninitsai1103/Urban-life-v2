import { React, useState } from 'react'

export default function LectureAddModal() {
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
                            <div>
                              <div>*第一章圖為封面圖</div>
                              <input
                                type="file"
                                onChange={(e) => handleFileChange(e, 1)}
                              />
                              {selectedFile1 && ( // 只有當 selectedFile1 不為 null 時顯示圖片預覽
                                <>
                                  <div>圖片預覽：</div>
                                  <img
                                    className="updateImg mb-4"
                                    src={previewURL1}
                                    alt=""
                                  />
                                </>
                              )}
                            </div>

                            <div>
                              <input
                                type="file"
                                onChange={(e) => handleFileChange(e, 2)}
                              />
                              {selectedFile2 && ( // 只有當 selectedFile2 不為 null 時顯示圖片預覽
                                <>
                                  <div>圖片預覽：</div>
                                  <img
                                    className="updateImg mb-4"
                                    src={previewURL2}
                                    alt=""
                                  />
                                </>
                              )}
                            </div>

                            <div>
                              <input
                                type="file"
                                onChange={(e) => handleFileChange(e, 3)}
                              />
                              {selectedFile3 && ( // 只有當 selectedFile3 不為 null 時顯示圖片預覽
                                <>
                                  <div>圖片預覽：</div>
                                  <img
                                    className="updateImg mb-4"
                                    src={previewURL3}
                                    alt=""
                                  />
                                </>
                              )}
                            </div>

                            <div>
                              <input
                                type="file"
                                onChange={(e) => handleFileChange(e, 4)}
                                multiple
                              />
                              {selectedFile4 && ( // 只有當 selectedFile4 不為 null 時顯示圖片預覽
                                <>
                                  <div>圖片預覽：</div>
                                  <img
                                    className="updateImg"
                                    src={previewURL4}
                                    alt=""
                                  />
                                </>
                              )}
                            </div>
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
            width: 30%;
             {
              /* display: flex;
            align-items: center;
            justify-content: center; */
            }
          }

          td {
            border: 1px solid #ccc;
            padding: 5px 10px;
            width: 70%;
             {
              /* display: flex;
            align-items: center;
            justify-content: center; */
            }
          }
          input {
            margin: 3px;
            width: 80%;
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
