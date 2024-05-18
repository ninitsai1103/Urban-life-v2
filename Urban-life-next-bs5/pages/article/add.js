import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Myeditor from '@/components/article/Myeditor'
import { useMemberInfo } from '@/hooks/use-member-info'
import { useRouter } from 'next/router'

export default function Add() {
  const router = useRouter()

  // member的hooks
  const { member } = useMemberInfo()

  // 判斷user是誰
  const [userId, setUserId] = useState()
  useEffect(() => {
    const { identity_id, name, id } = JSON.parse(
      localStorage.getItem('member-info')
    )
    setUserId(id)
    console.log(name)
    console.log(identity_id)
    console.log(id)
  }, [])

  const [editorLoaded, setEditorLoaded] = useState(false)
  const [article, setArticle] = useState({
    title: '',
    content: '',
    categoryId: '',
    img: '', // 新增圖片URL字段
  })
  const [errors, setErrors] = useState({
    title: '',
    content: '',
    categoryId: '',
  })

  const [selectedFile, setSelectedFile] = useState(null)
  const [previewURL, setPreviewURL] = useState(null)

  useEffect(() => {
    setEditorLoaded(true)
  }, [])

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setArticle({ ...article, [name]: value })
  }

  function updateImageSrc(htmlContent) {
    // 使用正則表達式匹配img標籤並更新src屬性
    return htmlContent.replace(
      /(<img\s+[^>]*src=")(\/[^"]*)(")/g,
      '$1http://localhost:3005$2$3'
    )
  }

  const handleContentChange = (content) => {
    content = updateImageSrc(content)
    console.log(content)
    setArticle({ ...article, content: content })
  }

  const validateForm = () => {
    const newErrors = {}
    if (!article.title) newErrors.title = '標題不能為空'
    if (!article.categoryId) newErrors.categoryId = '請選擇一個分類'
    if (!article.content) newErrors.content = '內容不能為空'
    return newErrors
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    setSelectedFile(file)
    setPreviewURL(URL.createObjectURL(file))
    handleFileUpload(file)
  }

  const handleFileUpload = (file = null) => {
    if (!file) {
      if (!selectedFile) {
        alert('請選擇一個檔案')
        return
      }
      file = selectedFile
    }
    console.log('upload')

    const formData = new FormData()
    formData.append('articleImage', file)

    fetch('http://localhost:3005/api/upload2', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('成功上傳:', data)
        // 假設data.url是後端返回的圖片URL
        const file_name = data.url.split('/').pop()
        console.log(file_name)
        setArticle({ ...article, img: file_name })
      })
      .catch((error) => {
        console.error('上傳錯誤:', error)
      })
  }

  const testAdd = () => {
    const formErrors = validateForm()
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors)
      return
    }
    console.log(article)
    // const htmlString = article.content
    // article.content = updateImageSrc(htmlString)
    // const match = htmlString.match(/<img src="([^"]+)"/)
    // const firstImgSrc = match ? match[1] : null
    // console.log(firstImgSrc)
    // const url = firstImgSrc ? firstImgSrc.split('/')[3] : ''

    // 沒有錯誤，繼續提交
    fetch('http://localhost:3005/api/articleUpload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...article, userId: userId }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('成功:', data)
        router.push('/article/list')
      })
      .catch((error) => {
        console.error('錯誤:', error)
      })
  }

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="container bg-color g-3 mt-5 my-2">
            <Link href="/add-article" className="text-decoration-none">
              文章分享
            </Link>
            <Link href="/add-article" className="text-decoration-none">
              /新增文章
            </Link>
          </div>
          <div className="">
            <div className="add-title my-3 ">
              <p className="col-md-6 d-inline">標題</p>
              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control"
                  placeholder="請輸入標題"
                  name="title"
                  value={article.title}
                  onChange={handleInputChange}
                />
                {errors.title && <div className="error">{errors.title}</div>}
              </div>
            </div>
            <div className="add-category my-3">
              <p>分類</p>
              <select
                name="categoryId"
                className="form-select"
                value={article.categoryId}
                onChange={handleInputChange}
              >
                <option value="">選擇分類</option>
                <option value="1">官方發布</option>
                <option value="2">課程體驗</option>
                <option value="3">環境與植物</option>
                <option value="4">植栽知識</option>
                <option value="5">生活應用分享</option>
                <option value="6">其他</option>
              </select>
              {errors.categoryId && (
                <div className="error">{errors.categoryId}</div>
              )}
            </div>
            <div className="add-content my-3">
              <p>內容</p>
              <h1>圖片上傳與預覽</h1>
              <input type="file" onChange={handleFileChange} />
              <hr />
              {/* <button onClick={handleFileUpload}>上傳</button> */}
              {selectedFile && (
                <>
                  <h3>檔案資訊</h3>
                  <p>檔名(filename): {selectedFile.name}</p>
                  <p>類型(type): {selectedFile.type}</p>
                  <p>大小(size): {selectedFile.size}</p>
                </>
              )}
              <h2>預覽</h2>
              {/* if has previewURL, render it */}
              {previewURL && <img src={previewURL} alt="" />}

              {/* <img src={previewURL || article.img} alt="" /> */}

              <div
                style={{
                  height: 'auto',
                  maxHeight: '500px',
                  overflowY: 'auto',
                }}
              >
                <Myeditor
                  name="content"
                  onChange={handleContentChange}
                  editorLoaded={editorLoaded}
                  value={article.content}
                />
                {errors.content && (
                  <div className="error">{errors.content}</div>
                )}
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-center my-3">
            <button className="btn btn-detail me-3">取消</button>
            <button className="btn btn-main" onClick={testAdd}>
              確認新增
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
