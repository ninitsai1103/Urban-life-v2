import React from 'react'
import Link from 'next/link'

export default function Add() {
  return (
    <>
      <div className="container">
        <div className="row">
          {/* breadcrumb */}
          <div className="container bg-color g-3 mt-5 my-2">
            <Link href="/add-article" className="text-decoration-none">
              新增文章
            </Link>
            <Link href="/add-article" className="text-decoration-none">
              /新增文章
            </Link>
          </div>
          {/* article-add-content */}
          <div className="">
            <div className="add-title my-3 ">
              <p className="col-md-6 d-inline">標題</p>
              <div class="col-md-6">
                <input
                  type="text"
                  className="form-control"
                  placeholder="請輸入標題"
                />
              </div>
            </div>

            <div className="add-category my-3">
              <p>分類</p>
              <select name="" id="" className="form-select">
                <option value="">官方發布</option>
                <option value="">課程體驗</option>
                <option value="">環境與植物</option>
                <option value="">植栽知識</option>
                <option value="">生活應用分享</option>
                <option value="">其他</option>

              </select>
            </div>

            <div className="add-content my-3">
              <p> 上傳相片</p>
              <input type="file" className="form-control" />
              <p className="mt-3">內容</p>
              <textarea
                name=""
                id=""
                cols="30"
                rows="10"
                className="form-control"
              ></textarea>
            </div>
          </div>
          <div className="d-flex justify-content-center my-3">
           <button className="btn btn-detail me-3">取消</button>

           <button className='btn btn-main'>
            確認新增
          </button>
          </div>
          
        </div>
      </div>
    </>
  )
}
