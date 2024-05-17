import { React, useState, useEffect } from 'react'

export default function LectureAddModal({ identityId }) {
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

    // 根據 fileNumber 調用相應的狀態更新函數
    switch (fileNumber) {
      case 1:
        setSelectedFile1(file)
        setPreviewURL1(file ? URL.createObjectURL(file) : '')
        break
      case 2:
        setSelectedFile2(file)
        setPreviewURL2(file ? URL.createObjectURL(file) : '')
        break
      case 3:
        setSelectedFile3(file)
        setPreviewURL3(file ? URL.createObjectURL(file) : '')
        break
      case 4:
        setSelectedFile4(file)
        setPreviewURL4(file ? URL.createObjectURL(file) : '')
        break
      default:
        break
    }
  }

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [content, setContent] = useState('')
  const [locationId, setLocationId] = useState('')
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')

  const [showTimeError, setShowTimeError] = useState(false) // 控制錯誤訊息顯示

  // 處理時間輸入變化
  const handleTimeChange = (e, setTimeFunction) => {
    const formattedTime = e.target.value
    setTimeFunction(formattedTime) // 更新時間狀態
  }

  useEffect(() => {
    // 確保 startTime 和 endTime 都已設置才進行時間合法性檢查
    if (startTime && endTime) {
      let isValidTime = true

      if (endTime < startTime) {
        isValidTime = false
        // 清空第二個選擇器的內容
        setEndTime('') // 將對應的時間設為空字串
      }

      // 更新顯示錯誤訊息的狀態
      setShowTimeError(!isValidTime)
    }
  }, [startTime, endTime])

  const [signUpStart, setSignUpStart] = useState('')
  const [signUpEnd, setSignUpEnd] = useState('')
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

  const [lectureDate, setLectureDate] = useState('')
  const [lectureDateError, setLectureDateError] = useState(false)

  const [price, setPrice] = useState('')
  const [amount, setAmount] = useState('')

  const handleNameChange = (e) => {
    setName(e.target.value)
  }

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value)
  }

  const handleContentChange = (e) => {
    setContent(e.target.value)
  }

  const handleLocationIdChange = (e) => {
    const selectedLocationId = e.target.value
    setLocationId(selectedLocationId) // 更新 locationId 狀態
  }

  // 處理上課日期變化
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
      signUpEndDate.setDate(signUpEndDate.getDate() + 1) // 增加兩天
      const signUpEndDateOnly = signUpEndDate.toISOString().slice(0, 10) // 只取日期部分

      // 確保 lectureDate 不早於 signUpEnd + 2 天
      if (lectureDate && lectureDate < signUpEndDateOnly) {
        setLectureDate('')
      }
    }
  }, [signUpEnd, lectureDate])

  const handlePriceChange = (e) => {
    setPrice(e.target.value)
  }

  const handleAmountChange = (e) => {
    setAmount(e.target.value)
  }

  // 新增課程內容與圖片
  const handleAddLectureWithPicture = async () => {
    try {
      // 定義課程相關字段
      const lectureFields = {
        name,
        description,
        content,
        location_id: locationId,
        lecture_date: lectureDate,
        starting_time: startTime,
        ending_time: endTime,
        sign_up_starting: signUpStart,
        sign_up_deadline: signUpEnd,
        price,
        amount,
        teacher_id: identityId,
      }

      // 創建一個新的 FormData 物件
      const formData = new FormData()

      // 加入課程欄位資訊到 FormData
      Object.keys(lectureFields).forEach((key) => {
        formData.append(key, lectureFields[key])
      })

      // 加入圖片檔案到 FormData，檢查每個文件是否已選擇
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

      // 發送請求到後端，處理課程資料和圖片的新增
      const response = await fetch(
        'http://localhost:3005/api/teacher-lecture',
        {
          method: 'POST',
          body: formData,
        }
      )

      if (response.ok) {
        console.log('課程和圖片新增成功')
        window.location.reload() // 重新加載當前頁面或進行其他相關操作
      } else {
        const responseData = await response.json()
        console.log('新增失敗:', responseData)
      }
    } catch (error) {
      console.log('Error handling adding lecture with picture:', error)
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
        <div className="modal-dialog custom-modal-width">
          <div className="modal-content">
            <form>
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  新增課程
                </h1>
                <button
                  type="button"
                  className="btn btn-add-r ms-3"
                  style={{ fontSize: '14px' }}
                  onClick={() => {
                    setName('科技與創新推動都市永續農業')
                    setDescription(
                      '參訪城市都市農業中心，探索都市農業的創新與科技應用，以及推動城市永續農業的發展。學員將了解都市農業科技的最新發展，參與相關示範和實驗，深入了解永續農業的實踐和挑戰。'
                    )
                    setContent(
                      '在參訪城市都市農業中心的課程中，學員將有機會深入探索都市農業的創新和科技應用，以及推動城市永續農業的發展。課程將介紹最新的都市農業科技，如垂直種植、智能溫室、水培技術等，並探討這些技術在提高農業生產效率和環境友好性方面的應用。學員將透過參觀示範區和參與實驗活動，親身體驗這些技術的應用和效果，從而加深對永續農業的理解和認識。同時，課程也將討論都市農業所面臨的挑戰，如土地利用、資源管理等，並探索可行的解決方案，以推動城市永續農業的發展。'
                    )
                    setLocationId('5')
                    setLectureDate('2024-06-20')
                    setStartTime('08:00:00')
                    setEndTime('17:00:00')
                    setSignUpStart('2024-05-25 00:00:00')
                    setSignUpEnd('2024-05-31 00:00:00')
                    setPrice('800')
                    setAmount('20')
                  }}
                >
                  一鍵填入
                </button>
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
                              // name="name"
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
                              className="form-control"
                              // name="name"
                              value={startTime}
                              onChange={(e) =>
                                handleTimeChange(e, setStartTime)
                              }
                            />
                            <input
                              type="time"
                              className="form-control"
                              // name="name"
                              value={endTime}
                              onChange={(e) => handleTimeChange(e, setEndTime)}
                            />
                          </td>
                        </tr>
                        <tr>
                          <th>報名開始時間：</th>
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
                              className="form-control"
                              // name="name"
                              value={signUpStart}
                              onChange={(e) =>
                                handleSignUpDateChange(e, setSignUpStart)
                              }
                              step="600" // 步長設置為 600 秒（10 分鐘）
                            />
                          </td>
                        </tr>
                        <tr>
                          <th>報名截止時間：</th>
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
                              className="form-control"
                              // name="name"
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
                                *不能早於報名結束時間天
                              </div>
                            )}
                            <input
                              type="date"
                              className="form-control"
                              // name="name"
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
                              // name="name"
                              value={price}
                              onChange={handlePriceChange}
                            />
                          </td>
                        </tr>
                        <tr>
                          <th>報名人數：</th>
                          <td>
                            <input
                              type="text"
                              className="form-control"
                              // name="name"
                              value={amount}
                              onChange={handleAmountChange}
                            />
                          </td>
                        </tr>
                        <tr>
                          <th>簡短介紹：</th>
                          <td>
                            <textarea
                              type="text"
                              className="form-control textarea1"
                              // name="name"
                              value={description}
                              onChange={handleDescriptionChange}
                            />
                          </td>
                        </tr>
                        <tr>
                          <th>詳細介紹：</th>
                          <td>
                            <textarea
                              type="text"
                              className="form-control textarea2"
                              // name="name"
                              value={content}
                              onChange={handleContentChange}
                            />
                          </td>
                        </tr>
                        <tr>
                          <th>課程圖片：</th>
                          <td>
                            <div className="d-flex my-3">
                              <div>
                                <div className="fw-bold">*第一張圖為封面圖</div>
                                <input
                                  type="file"
                                  onChange={(e) => handleFileChange(e, 1)}
                                  name="selectedFiles1"
                                />
                                {selectedFile1 && ( // 只有當 selectedFile1 不為 null 時顯示圖片預覽
                                  <>
                                    <div>圖片預覽：</div>
                                    <div className="d-flex justify-content-center">
                                      <img
                                        className="updateImg"
                                        src={previewURL1}
                                        alt=""
                                      />
                                    </div>
                                  </>
                                )}
                              </div>

                              <div>
                                <div className="fw-bold">第二張：</div>
                                <input
                                  type="file"
                                  onChange={(e) => handleFileChange(e, 2)}
                                  name="selectedFiles2"
                                />
                                {selectedFile2 && ( // 只有當 selectedFile2 不為 null 時顯示圖片預覽
                                  <>
                                    <div>圖片預覽：</div>
                                    <div className="d-flex justify-content-center">
                                      <img
                                        className="updateImg"
                                        src={previewURL2}
                                        alt=""
                                      />
                                    </div>
                                  </>
                                )}
                              </div>
                            </div>

                            <div className="d-flex mb-3">
                              <div>
                                <div className="fw-bold">第三張：</div>
                                <input
                                  type="file"
                                  onChange={(e) => handleFileChange(e, 3)}
                                  name="selectedFiles3"
                                />
                                {selectedFile3 && ( // 只有當 selectedFile3 不為 null 時顯示圖片預覽
                                  <>
                                    <div>圖片預覽：</div>
                                    <div className="d-flex justify-content-center">
                                      <img
                                        className="updateImg"
                                        src={previewURL3}
                                        alt=""
                                      />
                                    </div>
                                  </>
                                )}
                              </div>

                              <div>
                                <div className="fw-bold">第四張：</div>
                                <input
                                  type="file"
                                  onChange={(e) => handleFileChange(e, 4)}
                                  name="selectedFiles4"
                                />
                                {selectedFile4 && ( // 只有當 selectedFile4 不為 null 時顯示圖片預覽
                                  <>
                                    <div>圖片預覽：</div>
                                    <div className="d-flex justify-content-center">
                                      <img
                                        className="updateImg"
                                        src={previewURL4}
                                        alt=""
                                      />
                                    </div>
                                  </>
                                )}
                              </div>
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
                  // data-bs-toggle="modal"
                  // data-bs-target="#addModal"
                  // onClick={async () => {
                  //   await handleAdd() // 等待 handleAdd() 完成
                  //   await handleAddPicture() // 等待 handleAddPicture() 完成
                  // }}
                  onClick={() => handleAddLectureWithPicture()}
                >
                  確認新增
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <style jsx>{`
        .custom-modal-width {
          max-width: 700px; /* modal寬度 */
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
            padding: 5px 10px;
            width: 25%;
            vertical-align: middle; /* 讓字垂直置中 */
            text-align: center;
             {
              /* display: flex;
            align-items: center;
            justify-content: center; */
            }
          }

          td {
            border: 1px solid #ccc;
            padding: 5px 10px;
            width: 75%;
             {
              /* display: flex;
            align-items: center;
            justify-content: center; */
            }
          }
          input {
            margin: 3px;
            width: 100%;
          }
          .updateImg {
            height: 120px;
            width: auto;
             {
              /* width: 50%;
            margin-bottom: 10px;
            margin: 5px;
            margin-left: 7px; */
            }
          }
        }
      `}</style>
    </>
  )
}
