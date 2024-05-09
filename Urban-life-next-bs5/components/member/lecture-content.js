import { React, useState, useEffect } from 'react'

export default function LectureContentTbody({
  lecture,
  identityId,
  deleteLecture,
  updateLecture,
}) {
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
    const file = e.target.files[0] // 從事件中獲取上傳的文件
    const setSelectedFile = `setSelectedFile${fileNumber}`
    const setPreviewURL = `setPreviewURL${fileNumber}`

    if (file) {
      // 如果有文件被選擇
      switch (fileNumber) {
        case 1:
          // 將第一個文件設置為選擇的文件
          setSelectedFile1(file)
          // 生成第一個文件的預覽 URL
          setPreviewURL1(URL.createObjectURL(file))
          break
        case 2:
          setSelectedFile2(file)
          setPreviewURL2(URL.createObjectURL(file))
          break
        case 3:
          setSelectedFile3(file)
          setPreviewURL3(URL.createObjectURL(file))
          break
        case 4:
          setSelectedFile4(file)
          setPreviewURL4(URL.createObjectURL(file))
          break
        default:
          break
      }
    } else {
      // 如果沒有文件被選擇，則清空相應的文件和預覽 URL
      switch (fileNumber) {
        case 1:
          setSelectedFile1(null)
          setPreviewURL1('')
          break
        case 2:
          setSelectedFile2(null)
          setPreviewURL2('')
          break
        case 3:
          setSelectedFile3(null)
          setPreviewURL3('')
          break
        case 4:
          setSelectedFile4(null)
          setPreviewURL4('')
          break
        default:
          break
      }
    }
  }

  // 從資料庫取時間資料時轉換時間格式
  // 定義時間格式化函數
  function formatTimeForInput(timeString) {
    // 假設timeString格式為"HH:mm:ss.SSSSSS"
    const parts = timeString.split(':')
    const hhmm = `${parts[0]}:${parts[1]}` // 只保留HH:mm部分
    return hhmm
  }
  // 狀態管理
  const [startingTime, setStartingTime] = useState(
    formatTimeForInput(lecture.starting_time)
  )
  const [endingTime, setEndingTime] = useState(
    formatTimeForInput(lecture.ending_time)
  )

  // 處理時間輸入變化
  const handleTimeChange = (e, setTimeFunction) => {
    const formattedTime = e.target.value
    setTimeFunction(formattedTime)

    // 確保第二個時間選擇器的值不早於第一個時間選擇器
    if (setTimeFunction === setEndingTime) {
      // 如果當前設置的是第二個時間選擇器
      if (formattedTime < startingTime) {
        // 如果第二個時間選擇器的值早於第一個時間選擇器，則將第二個時間選擇器設置為與第一個相同
        setTimeFunction(startingTime)
      }
    } else if (setTimeFunction === setStartingTime) {
      // 如果當前設置的是第一個時間選擇器
      if (formattedTime > endingTime) {
        // 如果第一個時間選擇器的值晚於第二個時間選擇器，則將第二個時間選擇器設置為與第一個相同
        setEndingTime(formattedTime)
      }
    }
  }

  // 定義選擇的日期狀態變數，初始值為 lecture_date 或空字串
  const [selectedDate, setSelectedDate] = useState(
    lecture && lecture.lecture_date ? lecture.lecture_date : ''
  )
  // 定義選擇的報名開始日期時間狀態變數，初始值為 sign_up_starting 或空字串
  const [selectedStartingDateTime, setSelectedStartingDateTime] = useState(
    lecture && lecture.sign_up_starting ? lecture.sign_up_starting : ''
  )
  // 定義選擇的報名截止日期時間狀態變數，初始值為 sign_up_deadline 或空字串
  const [selectedEndingDateTime, setSelectedEndingDateTime] = useState(
    lecture && lecture.sign_up_deadline ? lecture.sign_up_deadline : ''
  )

  // 處理日期或日期時間變化的函數
  const handleDateChange = (e) => {
    const formattedDate = e.target.value
    setSelectedDate(formattedDate)
  }

  const handleStartingDateTimeChange = (e) => {
    const formattedDateTime = e.target.value
    setSelectedStartingDateTime(formattedDateTime)
  }
  const handleEndingDateTimeChange = (e) => {
    const formattedDateTime = e.target.value
    setSelectedEndingDateTime(formattedDateTime)
  }

  // 狀態變量
  const [name, setName] = useState(lecture.name) // 初始值設定為 lecture 的名稱
  const handleNameChange = (e) => {
    setName(e.target.value)
  }
  const [locationId, setLocationId] = useState(lecture.location_id)
  const handleLocationIdChange = (e) => {
    const selectedLocationId = e.target.value
    setLocationId(selectedLocationId) // 更新 locationId 狀態
  }
  const [price, setPrice] = useState(lecture.price) // 初始值設定為 lecture 的名稱
  const handlePriceChange = (e) => {
    setPrice(e.target.value)
  }
  const [amount, setAmount] = useState(lecture.amount) // 初始值設定為 lecture 的名稱
  const handleAmountChange = (e) => {
    setAmount(e.target.value)
  }
  const [description, setDescription] = useState(lecture.description) // 初始值設定為 lecture 的名稱
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value)
  }
  const [content, setContent] = useState(lecture.content) // 初始值設定為 lecture 的名稱
  const handleContentChange = (e) => {
    setContent(e.target.value)
  }

  // 刪除課程
  const handleDelete = async (id) => {
    try {
      // 在這裡調用 deleteLecture 函數並傳遞
      await deleteLecture(id)

      // 可以在這裡添加更新頁面或重新加載數據的邏輯
    } catch (error) {
      console.error('Error deleting lecture:', error)
    }
  }

  // 更新課程內容
  const handleUpdate = async () => {
    try {
      // const now = new Date() // 獲取當前時間
      // const formattedNow = now.toISOString().slice(0, 19).replace('T', ' ') // 格式化當前時間為 'yyyy-mm-dd hh:mm:ss'
      // // 檢查結束時間是否早於開始時間
      // if (endingTime < startingTime) {
      //   // 若結束時間早於開始時間，顯示提醒並返回
      //   alert('結束時間不能早於開始時間')
      //   return;
      // }
      const updatedFields = {
        name,
        description,
        content,
        location_id: locationId,
        lecture_date: selectedDate,
        starting_time: startingTime,
        ending_time: endingTime,
        sign_up_starting: selectedStartingDateTime,
        sign_up_deadline: selectedEndingDateTime,
        price,
        amount,
        // change_time: now,
        // cover: selectedFile1 ? selectedFile1.name : lecture.cover,
        // lecture_img1: selectedFile2 ? selectedFile2.name : lecture.lecture_img1,
        // lecture_img2: selectedFile3 ? selectedFile3.name : lecture.lecture_img2,
        // lecture_img3: selectedFile4 ? selectedFile4.name : lecture.lecture_img3,
      }

      // 調用 updateLecture 函數，傳遞課程 ID 和更新的欄位物件
      await updateLecture(lecture.id, updatedFields)

      // 可以在這裡添加更新頁面或重新加載數據的邏輯
    } catch (error) {
      console.log('Error updating lecture:', error)
    }
  }

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
              data-bs-target={`#detailModal-${lecture.id}`}
            >
              檢視
            </button>
          </td>
        </tr>
      </tbody>

      {/* 檢視modal */}
      <div
        className="modal fade modal_width"
        id={`detailModal-${lecture.id}`}
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
                          <td>{lecture.name}</td>
                        </tr>
                        <tr>
                          <th>課程地點：</th>
                          <td>{lecture.location_name}</td>
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
                          <th>簡短介紹：</th>
                          <td>{lecture.description}</td>
                        </tr>
                        <tr>
                          <th>詳細介紹：</th>
                          <td>{lecture.content}</td>
                        </tr>
                        <tr>
                          <th>課程圖片：</th>
                          <td>
                            <img
                              className="displayOriginImg" src={`http://localhost:3005/lecture_img/${lecture.cover}`}
                            ></img>
                            <img
                              className="displayOriginImg"
                              src={`http://localhost:3005/lecture_img/${lecture.lecture_img1}`}
                            ></img>
                            <img
                              className="displayOriginImg"
                              src={`http://localhost:3005/lecture_img/${lecture.lecture_img2}`}
                            ></img>
                            <img
                              className="displayOriginImg"
                              src={`http://localhost:3005/lecture_img/${lecture.lecture_img3}`}
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
                    data-bs-target={`#deleteModal-${lecture.id}`}
                  >
                    下架課程
                  </button>
                  <button
                    type="button"
                    className="btn btn-main"
                    data-bs-toggle="modal"
                    data-bs-target={`#updateModal-${lecture.id}`}
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
        id={`updateModal-${lecture.id}`}
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
                              value={name}
                              onChange={handleNameChange}
                            />
                          </td>
                        </tr>
                        <tr>
                          <th>上課地點：</th>
                          <td>
                            <select
                              className="form-control"
                              // name="name"
                              value={locationId}
                              onChange={handleLocationIdChange}
                            >
                              <option value="">請選擇上課地點</option>
                              <option value="1">臺北市</option>
                              <option value="2">新北市</option>
                              <option value="3">基隆市</option>
                              <option value="4">桃園市</option>
                              <option value="5">新竹縣</option>
                              <option value="6">苗里縣</option>
                              <option value="7">臺中市</option>
                              <option value="8">彰化縣</option>
                              <option value="9">南投縣</option>
                              <option value="10">雲林縣</option>
                              <option value="11">嘉義縣</option>
                              <option value="12">臺南市</option>
                              <option value="13">高雄市</option>
                              <option value="14">屏東縣</option>
                              <option value="15">臺東縣</option>
                              <option value="16">花蓮縣</option>
                              <option value="17">宜蘭縣</option>
                              <option value="18">澎湖縣</option>
                              <option value="19">金門縣</option>
                              <option value="20">連江縣</option>
                            </select>
                          </td>
                        </tr>
                        <tr>
                          <th>上課日期：</th>
                          <td>
                            <input
                              type="date"
                              id="start"
                              className="trip-start form-control"
                              value={selectedDate}
                              onChange={handleDateChange}
                            />
                          </td>
                        </tr>
                        <tr>
                          <th>上課時間：</th>
                          <td>
                            <input
                              type="time"
                              id="appt"
                              className="appt form-control"
                              value={startingTime}
                              onChange={(e) =>
                                handleTimeChange(e, setStartingTime)
                              }
                            />
                            <input
                              type="time"
                              id="appt"
                              className="appt form-control"
                              value={endingTime}
                              onChange={(e) =>
                                handleTimeChange(e, setEndingTime)
                              }
                            />
                          </td>
                        </tr>
                        <tr>
                          <th>報名開始時間：</th>
                          <td>
                            <input
                              type="datetime-local"
                              id="meeting-time"
                              className="form-control"
                              value={selectedStartingDateTime}
                              onChange={handleStartingDateTimeChange}
                            />
                          </td>
                        </tr>
                        <tr>
                          <th>報名截止時間：</th>
                          <td>
                            <input
                              type="datetime-local"
                              id="meeting-time"
                              className="form-control"
                              value={selectedEndingDateTime}
                              onChange={handleEndingDateTimeChange}
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
                              value={price}
                              onChange={handlePriceChange}
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
                              value={amount}
                              onChange={handleAmountChange}
                            />
                          </td>
                        </tr>
                        <tr>
                          <th>簡短介紹：</th>
                          <td>
                            <textarea
                              // type="text"
                              className="form-control"
                              name="name"
                              value={description}
                              onChange={handleDescriptionChange}
                            />
                          </td>
                        </tr>
                        <tr>
                          <th>詳細介紹：</th>
                          <td>
                            <textarea
                              // type="text"
                              className="form-control"
                              name="name"
                              value={content}
                              onChange={handleContentChange}
                            />
                          </td>
                        </tr>
                        <tr>
                          <th>課程圖片：</th>
                          <td>
                            <div>*第一章圖為封面圖</div>
                            <img
                              className="originImg"
                              src={`http://localhost:3005/lecture_img/${lecture.cover}`}
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
                              src={`http://localhost:3005/lecture_img/${lecture.lecture_img1}`}
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
                              src={`http://localhost:3005/lecture_img/${lecture.lecture_img2}`}
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
                              src={`http://localhost:3005/lecture_img/${lecture.lecture_img3}`}
                            ></img>
                            <div>
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
                <div>
                  <button
                    type="button"
                    className="btn btn-delete mx-1"
                    data-bs-toggle="modal"
                    data-bs-dismiss="modal"
                    data-bs-target={`#deleteModal-${lecture.id}`}
                  >
                    下架課程
                  </button>
                  <button
                    type="submit"
                    // type="submit"
                    className="btn btn-main"
                    data-bs-dismiss="modal"
                    // data-bs-toggle="modal"
                    aria-label="Close"
                    // data-bs-target={`#updateModal-${lecture.id}`}
                    onClick={() => handleUpdate(lecture.id)}
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
        id={`deleteModal-${lecture.id}`}
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
              <a
                type="button"
                href=""
                className="btn btn-delete"
                role="button"
                onClick={() => handleDelete(lecture.id)}
              >
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

        .form-control {
          appearance: auto;
          width: 100%;
        }
        select {
          width: 80%;
          margin: 3px;
        }
        textarea{
          height: 100px;
        }

        .modal-table {
          th {
            border: 1px solid #ccc;
            padding: 5px 10px;
            width: 30%;
          }

          td {
            border: 1px solid #ccc;
            padding: 5px 10px;
            width: 70%;
          }
          input {
            margin: 3px;
            width: 100%;
          }
          .displayOriginImg {
            width: 45%;
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

        @media (max-width: 992px) {
          .nodisplay_992px {
            display: none;
          }
        }
      `}</style>
    </>
  )
}
