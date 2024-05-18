import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Myeditor from '@/components/article/Myeditor'
import useArticles from '@/hooks/use-articles'
import { useMemberInfo } from '@/hooks/use-member-info'
import { useRouter } from 'next/router'

export default function Edit() {
  const router = useRouter()
  const { aid } = router.query // 從 URL 獲取文章ID
  const { articles } = useArticles()
  const [previewURL, setPreviewURL] = useState(null)

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [selectedFile, setSelectedFile] = useState(null)

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

  // const [article, setArticle] = useState(null) // 文章状态
  const [editorLoaded, setEditorLoaded] = useState(false)
  const [article, setArticle] = useState({
    title: '',
    content: '',
    categoryId: '',
  })
  const [errors, setErrors] = useState({
    title: '',
    content: '',
    categoryId: '',
  })

  useEffect(() => {
    if (aid && articles.length > 0) {
      const fetchArticle = articles.find(
        (item) => item.id === parseInt(aid, 10)
      )

      // setArticle(fetchArticle) // 設置當前文章
    }
    const current_article = articles.find((item) => aid == item.id)
    if (current_article) {
      console.log('st', current_article)
      setArticle(current_article)
      setTitle(current_article.title)
      setContent(current_article.content)
      setCategoryId(current_article.category_id)
    }
    setEditorLoaded(true)
  }, [aid, articles])

  useEffect(() => {
    console.log('Updated article:', article)
    setPreviewURL(`http://localhost:3005/images/article/${article.img}`)
  }, [article])

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setArticle({ ...article, [name]: value })
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
  const handleFileChange = (event) => {
    const file = event.target.files[0]
    setSelectedFile(file)
    setPreviewURL(URL.createObjectURL(file))
    handleFileUpload(file)
  }
  function updateImageSrc(htmlContent) {
    // 使用正則表達式匹配img標籤並更新src屬性
    return htmlContent.replace(
      /(<img\s+[^>]*src=")(\/[^"]*)(")/g,
      '$1http://localhost:3005$2$3'
    )
  }
  const handleContentChange = (input_content) => {
    console.log("handleContentChange's", article)
    console.log(input_content)
    input_content = updateImageSrc(input_content)
    setContent(input_content)
    // setArticle({ ...article, content: content })
  }

  const validateForm = () => {
    console.log(article)
    const newErrors = {}
    if (!article.title) newErrors.title = '標題不能為空'
    if (!article.category_id) newErrors.categoryId = '請選擇一個分類'
    if (!article.content) newErrors.content = '內容不能為空'
    console.log('error', newErrors)
    console.log(article)
    return newErrors
  }

  const testEdit = () => {
    const formErrors = validateForm()
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors)
      return
    }
    console.log('eeee')
    // 沒有錯誤，繼續提交
    fetch(`http://localhost:3005/api/articleEdit/${aid}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...article,
        userId: userId,
        content: content,
        title: title,
        categoryId: categoryId,
      }), // 假設的用戶 ID
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('成功:', data)
        router.push(`/article/${aid}`)

      })
      .catch((error) => {
        console.error('錯誤:', error)
      })
  }

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="container-fluid bg-color g-3 mt-5 my-2">
            <Link href="/add-article" className="text-decoration-none">
              文章分享
            </Link>
            <Link href="/add-article" className="text-decoration-none">
              /編輯文章
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
                  value={title}
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
                value={categoryId}
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
              <div
                style={{
                  height: 'auto',
                  maxHeight: '500px',
                  overflowY: 'auto',
                }}
              >
                {/* Myeditor需要吃到html */}
                <Myeditor
                  name="content"
                  onChange={handleContentChange}
                  editorLoaded={editorLoaded}
                  value={content}
                />
                {errors.content && (
                  <div className="error">{errors.content}</div>
                )}
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-center my-3 col-sm-12">
            <button className="btn btn-detail me-3">取消</button>
            <button className="btn btn-main" onClick={testEdit}>
              確認編輯
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
