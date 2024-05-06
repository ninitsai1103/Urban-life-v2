import { React, useState, useEffect } from 'react'

export default function LectureContentTbody({ lecture }) {
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

  // const [imageLoaded, setImageLoaded] = useState({
  //   lecture_img1: false,
  //   lecture_img2: false,
  //   lecture_img3: false
  // });

  // useEffect(() => {
  //   const imagesToLoad = [
  //     lecture.lecture_img1,
  //     lecture.lecture_img2,
  //     lecture.lecture_img3
  //   ];

  //   const loadImage = (imageSrc) => {
  //     const image = new Image();
  //     image.onload = () => {
  //       setImageLoaded((prev) => ({ ...prev, [imageSrc]: true }));
  //     };
  //     image.src = `/images/lecture/lecture_img/${imageSrc}`;
  //   };

  //   imagesToLoad.forEach((img) => {
  //     loadImage(img);
  //   });
  // }, [lecture]);

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
              // data-bs-target="#detailModal-${lecture.id}"
              data-bs-target={`#detailModal-${lecture.id}`}
            >
              檢視
            </button>
          </td>
        </tr>
      </tbody>

      {/* 檢視modal */}
      <div
        className="modal fade"
        // id="detailModal-${lecture.id}"
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
                            <img
                              className="displayOriginImg"
                              src={`/images/lecture/lecture_img/${lecture.cover}`}
                            ></img>
                            <img
                              className="displayOriginImg"
                              src={`/images/lecture/lecture_img/${lecture.lecture_img1}`}
                            ></img>
                            <img
                              className="displayOriginImg"
                              src={`/images/lecture/lecture_img/${lecture.lecture_img2}`}
                            ></img>
                            <img
                              className="displayOriginImg"
                              src={`/images/lecture/lecture_img/${lecture.lecture_img3}`}
                            ></img>
                            {/* {imageLoaded.lecture_img1 && (
                              <img
                                className="displayOriginImg"
                                src={`/images/lecture/lecture_img/${lecture.lecture_img1}`}
                              ></img>
                            )}
                            {imageLoaded.lecture_img2 && (
                              <img
                                className="displayOriginImg"
                                src={`/images/lecture/lecture_img/${lecture.lecture_img2}`}
                              ></img>
                            )}
                            {imageLoaded.lecture_img3 && (
                              <img
                                className="displayOriginImg"
                                src={`/images/lecture/lecture_img/${lecture.lecture_img3}`}
                              ></img>
                            )} */}
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
                    type="button"
                    // type="submit"
                    className="btn btn-main"
                    data-bs-dismiss="modal"
                    // data-bs-toggle="modal"
                    aria-label="Close"
                    // data-bs-target={`#updateModal-${lecture.id}`}
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
            width: 30%;
          }

          td {
            border: 1px solid #ccc;
            padding: 5px 10px;
            width: 70%;
          }
          input {
            margin: 3px;
            width: 80%;
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
