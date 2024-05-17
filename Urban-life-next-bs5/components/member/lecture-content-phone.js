import { React, useState, useEffect } from 'react'

export default function LectureContentPhone({
  lecture,
  identityId,
  deleteLecture,
}) {
  // 處理content正常顯示換行
  const text2jsx = (text) => {
    return text.split('\n\n').map((v, i) => (
      <div className="article-section" key={i}>
        {v.split('\n').map((v2, i2) => (
          <div className="article-p" key={`${i}-${i2}`}>
            {v2}
          </div>
        ))}
      </div>
    ))
  }

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

  const [showTimeError, setShowTimeError] = useState(false) // 控制錯誤訊息顯示

  // 處理時間輸入變化
  const handleTimeChange = (e, setTimeFunction) => {
    const formattedTime = e.target.value
    setTimeFunction(formattedTime) // 更新時間狀態
  }

  useEffect(() => {
    // 確保 startTime 和 endTime 都已設置才進行時間合法性檢查
    if (startingTime && endingTime) {
      let isValidTime = true

      if (endingTime < startingTime) {
        isValidTime = false
        // 清空第二個選擇器的內容
        setEndingTime('') // 將對應的時間設為空字串
      }

      // 更新顯示錯誤訊息的狀態
      setShowTimeError(!isValidTime)
    }
  }, [startingTime, endingTime])

  // 定義選擇的報名開始日期時間狀態變數，初始值為 sign_up_starting 或空字串
  const [signUpStart, setSignUpStart] = useState(
    lecture && lecture.sign_up_starting ? lecture.sign_up_starting : ''
  )
  // 定義選擇的報名截止日期時間狀態變數，初始值為 sign_up_deadline 或空字串
  const [signUpEnd, setSignUpEnd] = useState(
    lecture && lecture.sign_up_deadline ? lecture.sign_up_deadline : ''
  )

  const [showSignUpStartDateError, setShowSignUpStartDateError] =
    useState(false)
  const [showSignUpEndDateError, setShowSignUpEndDateError] = useState(false)

  // 取得明天的日期和時間，格式為 YYYY-MM-DDTHH:mm （datetime-local 需要此格式）
  const getTomorrowDateTime = () => {
    const today = new Date()
    const tomorrow = new Date(today)

    tomorrow.setDate(tomorrow.getDate() + 1) // 加一天
    tomorrow.setHours(tomorrow.getHours() + 8) // 加8小時

    // 格式化日期和時間
    const formattedTomorrowDateTime = tomorrow.toISOString().slice(0, 16)
    return formattedTomorrowDateTime

    // return tomorrow.toISOString().slice(0, 16) // 格式化日期和時間
  }

  // 處理報名日期輸入變化
  const handleSignUpDateChange = (e, setSignUpDateFunction) => {
    const formattedSignUpDateTime = e.target.value

    // 取得明天日期和時間
    const tomorrowDateTime = getTomorrowDateTime()

    // 確保報名開始時間不早於當前日期和時間
    if (setSignUpDateFunction === setSignUpStart) {
      if (formattedSignUpDateTime < tomorrowDateTime) {
        setSignUpDateFunction('')
        setShowSignUpStartDateError(true)
        return
      }
      setShowSignUpStartDateError(false)
    }

    // 更新報名日期狀態
    setSignUpDateFunction(formattedSignUpDateTime)

    // 確保報名截止時間不早於報名開始時間
    if (setSignUpDateFunction === setSignUpEnd) {
      if (formattedSignUpDateTime < signUpStart) {
        setSignUpDateFunction('')
        setShowSignUpEndDateError(true)
      } else {
        setShowSignUpEndDateError(false)
      }
    }
  }

  // 定義選擇的日期狀態變數，初始值為 lecture_date 或空字串
  const [lectureDate, setLectureDate] = useState(
    lecture && lecture.lecture_date ? lecture.lecture_date : ''
  )
  const [lectureDateError, setLectureDateError] = useState(false)

  // 處理日期或日期時間變化的函數
  const handleLectureDateChange = (e) => {
    const formattedLectureDate = e.target.value

    // 更新 lectureDate 狀態
    setLectureDate(formattedLectureDate)

    // 確認 lectureDate 是否早於 signUpEnd
    if (signUpEnd && formattedLectureDate < signUpEnd) {
      setLectureDateError(true)
    } else {
      setLectureDateError(false)
    }
  }

  useEffect(() => {
    // 提取 signUpEnd 的日期部分並增加兩天
    if (signUpEnd) {
      const signUpEndDate = new Date(signUpEnd)
      signUpEndDate.setDate(signUpEndDate.getDate() + 2) // 增加兩天
      const signUpEndDateOnly = signUpEndDate.toISOString().slice(0, 10) // 只取日期部分

      // 確保 lectureDate 不早於 signUpEnd + 2 天
      if (lectureDate && lectureDate < signUpEndDateOnly) {
        setLectureDate('')
      }
    }
  }, [signUpEnd, lectureDate])

  const handleStartingDateTimeChange = (e) => {
    const formattedDateTime = e.target.value
    setSignUpStart(formattedDateTime)
  }
  const handleEndingDateTimeChange = (e) => {
    const formattedDateTime = e.target.value
    setSignUpEnd(formattedDateTime)
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
  const handleUpdate = async (lectureId) => {
    try {
      // 定義更新課程相關字段
      const updatedFields = {
        name,
        description,
        content,
        location_id: locationId,
        lecture_date: lectureDate,
        starting_time: startingTime,
        ending_time: endingTime,
        sign_up_starting: signUpStart,
        sign_up_deadline: signUpEnd,
        price,
        amount,
      }

      // 創建一個新的 FormData 物件
      const formData = new FormData()
      formData.append('id', lectureId) // 將課程 ID 加入 FormData

      // 加入課程欄位資訊到 FormData
      Object.entries(updatedFields).forEach(([key, value]) => {
        formData.append(key, value)
      })

      // 加入圖片檔案到 FormData，只加入有選擇的新檔案，或者加入原有的檔案名稱
      if (selectedFile1) {
        formData.append('selectedFiles1', selectedFile1)
      }
      if (selectedFile2) {
        formData.append('selectedFiles2', selectedFile2)
      }
      if (selectedFile3) {
        formData.append('selectedFiles3', selectedFile3)
      }
      if (selectedFile4) {
        formData.append('selectedFiles4', selectedFile4)
      }

      // 發送請求到後端，處理課程資料和圖片的更新
      const response = await fetch(
        `http://localhost:3005/api/teacher-lecture`,
        {
          method: 'PUT',
          body: formData,
        }
      )

      if (response.ok) {
        console.log('課程和圖片更新成功')
        window.location.reload() // 重新加載當前頁面或進行其他相關操作
      } else {
        const responseData = await response.json()
        console.error('更新失敗:', responseData)
      }
    } catch (error) {
      console.log('Error updating lecture:', error)
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
                <div className="d-flex align-items-center">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">
                    {lecture.name}
                  </h1>
                  <a
                    className="btn btn-detail ms-3"
                    href={`/lecture/${lecture.id}`}
                  >
                    前往課程頁面
                  </a>
                </div>
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
                          <th>
                            報名
                            <br />
                            開始時間：
                          </th>
                          <td>{lecture.sign_up_starting}</td>
                        </tr>
                        <tr>
                          <th>
                            報名
                            <br />
                            截止時間：
                          </th>
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
                          <td>{lecture.total_bought}</td>
                        </tr>
                        {/* <tr>
                          <th>已報名學員：</th>
                          <td>
                            許栩栩、許栩栩、許栩栩、許栩栩、許栩栩、許栩栩、許栩栩、許栩栩、許栩栩、許栩栩、許栩栩、許栩栩、
                          </td>
                        </tr> */}
                        <tr>
                          <th>簡短介紹：</th>
                          <td>{lecture.description}</td>
                        </tr>
                        <tr>
                          <th>詳細介紹：</th>
                          <td>{text2jsx(lecture.content)}</td>
                        </tr>
                        <tr>
                          <th>課程圖片：</th>
                          <td>
                            <img
                              className="displayOriginImg"
                              src={`http://localhost:3005/lecture_img/${lecture.cover}`}
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
                          <th>上課時間：</th>
                          <td>
                            {showTimeError && ( // 如果 showTimeError 為 true，顯示錯誤訊息
                              <div
                                className="fw-bold"
                                style={{ fontSize: '12px', color: 'red' }}
                              >
                                *結束時間不能早於開始時間
                              </div>
                            )}
                            <input
                              type="time"
                              id="appt"
                              className="form-control"
                              value={startingTime}
                              onChange={(e) =>
                                handleTimeChange(e, setStartingTime)
                              }
                            />
                            <input
                              type="time"
                              id="appt"
                              className="form-control"
                              value={endingTime}
                              onChange={(e) =>
                                handleTimeChange(e, setEndingTime)
                              }
                            />
                          </td>
                        </tr>
                        <tr>
                          <th>
                            報名
                            <br />
                            開始時間：
                          </th>
                          <td>
                            {showSignUpStartDateError && (
                              <div
                                className="fw-bold"
                                style={{ fontSize: '12px', color: 'red' }}
                              >
                                *請至少設定於一日之後
                              </div>
                            )}
                            <input
                              type="datetime-local"
                              id="meeting-time"
                              className="form-control"
                              value={signUpStart}
                              onChange={(e) =>
                                handleSignUpDateChange(e, setSignUpStart)
                              }
                              step="600" // 步長設置為 600 秒（10 分鐘）
                            />
                          </td>
                        </tr>
                        <tr>
                          <th>
                            報名
                            <br />
                            截止時間：
                          </th>
                          <td>
                            {showSignUpEndDateError && (
                              <div
                                className="fw-bold"
                                style={{ fontSize: '12px', color: 'red' }}
                              >
                                *不能早於報名開始時間
                              </div>
                            )}
                            <input
                              type="datetime-local"
                              id="meeting-time"
                              className="form-control"
                              value={signUpEnd}
                              onChange={(e) =>
                                handleSignUpDateChange(e, setSignUpEnd)
                              }
                              step="600" // 步長設置為 600 秒（10 分鐘）
                            />
                          </td>
                        </tr>
                        <tr>
                          <th>上課日期：</th>
                          <td>
                            {lectureDateError && (
                              <div
                                className="fw-bold"
                                style={{ fontSize: '12px', color: 'red' }}
                              >
                                *不能早於報名結束時間
                              </div>
                            )}
                            <input
                              type="date"
                              id="start"
                              className="form-control"
                              value={lectureDate}
                              onChange={handleLectureDateChange}
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
                              className="form-control textarea1"
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
                              className="form-control textarea2"
                              name="name"
                              value={content}
                              onChange={handleContentChange}
                            />
                          </td>
                        </tr>
                        <tr>
                          <th>課程圖片：</th>
                          <td>
                            <div className="fw-bold">*第一張圖為封面圖</div>
                            <img
                              className="originImg"
                              src={`http://localhost:3005/lecture_img/${lecture.cover}`}
                            ></img>
                            <div>
                              <input
                                type="file"
                                onChange={(e) => handleFileChange(e, 1)}
                                name="selectedFiles1"
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

                            <div className="mt-4 fw-bold">第二張：</div>
                            <img
                              className="originImg"
                              src={`http://localhost:3005/lecture_img/${lecture.lecture_img1}`}
                            ></img>
                            <div>
                              <input
                                type="file"
                                onChange={(e) => handleFileChange(e, 2)}
                                name="selectedFiles2"
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

                            <div className="mt-4 fw-bold">第三張：</div>
                            <img
                              className="originImg"
                              src={`http://localhost:3005/lecture_img/${lecture.lecture_img2}`}
                            ></img>
                            <div>
                              <input
                                type="file"
                                onChange={(e) => handleFileChange(e, 3)}
                                name="selectedFiles3"
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

                            <div className="mt-4 fw-bold">第四張：</div>
                            <img
                              className="originImg"
                              src={`http://localhost:3005/lecture_img/${lecture.lecture_img3}`}
                            ></img>
                            <input
                              type="file"
                              onChange={(e) => handleFileChange(e, 4)}
                              name="selectedFiles4"
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
                    type="submit"
                    // type="submit"
                    className="btn btn-main"
                    data-bs-dismiss="modal"
                    // data-bs-toggle="modal"
                    aria-label="Close"
                    // data-bs-target={`#updatePhoneModal-${lecture.id}`}
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

        .form-control {
          appearance: auto;
          width: 100%;
        }
        select {
          width: 80%;
          margin: 3px;
        }
        .textarea1 {
          height: 100px;
        }

        .textarea2 {
          height: 300px;
        }

        .modal-table {
          th {
            border: 1px solid #ccc;
            padding: 5px 2px;
            width: 25%;
            vertical-align: middle; /* 讓字垂直置中 */
            text-align: center;
          }

          td {
            border: 1px solid #ccc;
            padding: 5px 10px;
            width: 75%;
          }
          input {
            margin: 3px;
            width: 100%;
          }
          .displayOriginImg {
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
