import { React, useState } from 'react'

export default function LectureAddModal({
  identityId,
  addLecture,
  addLecturePicture,
  addLectureWithPicture,
}) {
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
  const [lectureDate, setLectureDate] = useState('')
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [signUpStart, setSignUpStart] = useState('')
  const [signUpEnd, setSignUpEnd] = useState('')
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

  const handleLectureDateChange = (e) => {
    setLectureDate(e.target.value)
  }

  const handleStartTimeChange = (e) => {
    setStartTime(e.target.value)
  }

  const handleEndTimeChange = (e) => {
    setEndTime(e.target.value)
  }

  const handleSignUpStartChange = (e) => {
    setSignUpStart(e.target.value)
  }

  const handleSignUpEndChange = (e) => {
    setSignUpEnd(e.target.value)
  }

  const handlePriceChange = (e) => {
    setPrice(e.target.value)
  }

  const handleAmountChange = (e) => {
    setAmount(e.target.value)
  }

  // 新增課程內容
  const handleAdd = async () => {
    try {
      // const now = new Date() // 獲取當前時間
      const addFields = {
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
        // change_time: now,
        teacher_id: identityId,
        // cover:  selectedFile1 ? selectedFile1.name : lecture.cover,
        // lecture_img1:
        //   selectedFile2 ? selectedFile2.name : lecture.lecture_img1,
        // lecture_img2:
        //   selectedFile3 ? selectedFile3.name : lecture.lecture_img2,
        // lecture_img3:
        //   selectedFile4 ? selectedFile4.name : lecture.lecture_img3,
      }

      // 調用 addLecture 函數，傳遞課程新增的欄位物件
      await addLecture(addFields)

      // 可以在這裡添加更新頁面或重新加載數據的邏輯
    } catch (error) {
      console.log('Error adding lecture:', error)
    }
  }

  // 新增課程圖片
  const handleAddPicture = async () => {
    try {
      const addFields = {
        cover: selectedFile1 ? selectedFile1.name : lecture.cover,
        lecture_img1: selectedFile2 ? selectedFile2.name : lecture.lecture_img1,
        lecture_img2: selectedFile3 ? selectedFile3.name : lecture.lecture_img2,
        lecture_img3: selectedFile4 ? selectedFile4.name : lecture.lecture_img3,
      }

      // 調用 addLecturePicture 函數，傳遞課程 ID 和更新的欄位物件
      await addLecturePicture(addFields)

      // 可以在這裡添加更新頁面或重新加載數據的邏輯
    } catch (error) {
      console.log('Error adding lecture picture:', error)
    }
  }

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
      };
  
      // 創建一個新的 FormData 物件
      const formData = new FormData();
  
      // 加入課程欄位資訊到 FormData
      Object.keys(lectureFields).forEach((key) => {
        formData.append(key, lectureFields[key]);
      });
  
      // 加入圖片檔案到 FormData，檢查每個文件是否已選擇
      if (selectedFile1) {
        formData.append('selectedFiles1', selectedFile1);
      }
      if (selectedFile2) {
        formData.append('selectedFiles2', selectedFile2);
      }
      if (selectedFile3) {
        formData.append('selectedFiles3', selectedFile3);
      }
      if (selectedFile4) {
        formData.append('selectedFiles4', selectedFile4);
      }
  
      // 發送請求到後端，處理課程資料和圖片的新增
      const response = await fetch('http://localhost:3005/api/teacher-lecture', {
        method: 'POST',
        body: formData,
      });
  
      if (response.ok) {
        console.log('課程和圖片新增成功');
        window.location.reload(); // 重新加載當前頁面或進行其他相關操作
      } else {
        const responseData = await response.json();
        console.log('新增失敗:', responseData);
      }
    } catch (error) {
      console.log('Error handling adding lecture with picture:', error);
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
                          <th>上課日期：</th>
                          <td>
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
                          <th>上課時間：</th>
                          <td>
                            <input
                              type="time"
                              className="form-control"
                              // name="name"
                              value={startTime}
                              onChange={handleStartTimeChange}
                            />
                            <input
                              type="time"
                              className="form-control"
                              // name="name"
                              value={endTime}
                              onChange={handleEndTimeChange}
                            />
                          </td>
                        </tr>
                        <tr>
                          <th>報名開始時間：</th>
                          <td>
                            <input
                              type="datetime-local"
                              className="form-control"
                              // name="name"
                              value={signUpStart}
                              onChange={handleSignUpStartChange}
                              step="600" // 步長設置為 600 秒（10 分鐘）
                            />
                          </td>
                        </tr>
                        <tr>
                          <th>報名截止時間：</th>
                          <td>
                            <input
                              type="datetime-local"
                              className="form-control"
                              // name="name"
                              value={signUpEnd}
                              onChange={handleSignUpEndChange}
                              step="600" // 步長設置為 600 秒（10 分鐘）
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
                            <input
                              type="text"
                              className="form-control"
                              // name="name"
                              value={description}
                              onChange={handleDescriptionChange}
                            />
                          </td>
                        </tr>
                        <tr>
                          <th>詳細介紹：</th>
                          <td>
                            <input
                              type="text"
                              className="form-control"
                              // name="name"
                              value={content}
                              onChange={handleContentChange}
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
                                onChange={(e) => handleFileChange(e, 1)} name="selectedFiles1"
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
                                onChange={(e) => handleFileChange(e, 2)} name="selectedFiles2"
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
                                onChange={(e) => handleFileChange(e, 3)} name="selectedFiles3"
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
                                name="selectedFiles4"
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
        .form-control {
          appearance: auto;
          width: 100%;
        }
        select {
          width: 80%;
          margin: 3px;
        }

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
            width: 100%;
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
