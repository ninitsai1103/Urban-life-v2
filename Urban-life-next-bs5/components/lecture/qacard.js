import * as React from 'react'
import Link from 'next/link'

export default function QAList() {
  return (
    <>
      <div className="qacard">
        <div className="accordion">
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingOne">
              <button
                className="accordion-button collapsed set-padding pri-category-bg"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
                aria-expanded="false"
                aria-controls="collapseOne"
              >
                問題一 #1
              </button>
            </h2>
            <div
              id="collapseOne"
              className="accordion-collapse collapse"
              aria-labelledby="headingOne"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body set-padding">
                <ul className="list-unstyled">
                  <li>
                    Q：採果課程的水果太好吃了一年只有一次，其他時間吃不到怎麼辦??
                    <br />
                    A：您可以考慮在其他時間尋找類似的水果，或者保存部分水果以便在一年中的其他時間享用。此外，您還可以尋找其他季節性水果或嘗試不同的食譜，以豐富您的飲食選擇。
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingTwo">
              <button
                className="accordion-button collapsed set-padding pri-category-bg"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseTwo"
                aria-expanded="false"
                aria-controls="collapseTwo"
              >
                問題二 #2
              </button>
            </h2>
            <div
              id="collapseTwo"
              className="accordion-collapse collapse"
              aria-labelledby="headingTwo"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body set-padding">
                <ul className="list-unstyled">
                  <li>
                    Q：採果課程的水果太好吃了一年只有一次，其他時間吃不到怎麼辦??
                    <br />
                    A：您可以考慮在其他時間尋找類似的水果，或者保存部分水果以便在一年中的其他時間享用。此外，您還可以尋找其他季節性水果或嘗試不同的食譜，以豐富您的飲食選擇。
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingThree">
              <button
                className="accordion-button collapsed set-padding pri-category-bg"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseThree"
                aria-expanded="false"
                aria-controls="collapseThree"
              >
                問題三 #3
              </button>
            </h2>
            <div
              id="collapseThree"
              className="accordion-collapse collapse"
              aria-labelledby="headingThree"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body set-padding">
                <ul className="list-unstyled">
                  <li>
                    Q：採果課程的水果太好吃了一年只有一次，其他時間吃不到怎麼辦??
                    <br />
                    A：您可以考慮在其他時間尋找類似的水果，或者保存部分水果以便在一年中的其他時間享用。此外，您還可以尋找其他季節性水果或嘗試不同的食譜，以豐富您的飲食選擇。
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .qacard {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          border-radius: 8px;
          background: #fff;
          width:100%;
        }

        .accordion{
          width: 100%;
          padding: 10px
        }

        @media (max-width: 768px) {
          .teacher-text-title {
            display: none;
          }
          .teacher-lecture {
            padding: 0px;
            background-color: #ebe3db;
            border: none;
          }
          .add-lecture-btn {
            margin-left: auto;
            margin-right: 0px;
          }
        }
      `}</style>
    </>
  )
}
