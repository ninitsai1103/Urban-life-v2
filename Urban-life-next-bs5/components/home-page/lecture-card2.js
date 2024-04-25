import React from 'react'
import { FaUser } from 'react-icons/fa'

export default function LectureCard2() {
  return (
    <>
      <div className="card">
        <div className="row no-gutters h-100">
          <div className="col-md-4 card-image-container ">
            <img
              src="/images/lecture/lecture_1.jpg"
              className="card-img"
              alt="..."
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title fw-bold">遇見莓好-採摘體驗</h5>
              <div className="d-flex align-items-center mt-2 mb-2">
                <FaUser style={{ fontSize: '20px', marginRight: '10px' }} />
                <h6 className="m-0">Michael</h6>
              </div>
              <div className="card-text-container">
                <p className="card-text">
                  歡迎參加我們精心策劃的「採梅子體驗課程」，這將是一個充滿樂趣和自然之美的冒險。以下是課程的詳細資訊：
                  1. 歡迎與介紹：
                  上午9時，歡迎您抵達我們美麗的梅樹園區，我們將提供新鮮的梅子汁和簡介。
                  2. 導覽與梅園探索： -
                  由專業園丁帶領的導覽，深入梅樹園，了解梅子的生長過程、不同品種的特點，以及梅子的栽培技術。
                  3. 親身採摘體驗： - 與園丁一同體驗梅子的採摘樂
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .card {
          border-radius: 8px;
        }

        img {
          border-radius: 8px 8px 0 0;
        }

        .card-text-container {
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
          overflow: hidden;
        }
      `}</style>
    </>
  )
}
