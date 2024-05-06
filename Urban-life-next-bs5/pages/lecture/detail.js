import React from 'react'
import LectureMyCard from '@/components/lecture/card'
import Lectureslider from '@/components/lecture/lectureslider'
import LectureInfo from '@/components/lecture/lectureinfo'
import Feedback from '@/components/lecture/feedback'
import Link from 'next/link'
import Lecturedetail from '@/components/lecture/lecturedetail'
import Safeinfo from '@/components/lecture/safeinfo'

export default function LectureDetail() {
  return (
    <>
      <div className="container">
        <section className="section1">
          <div className="search">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb mt-3">
                <li className="breadcrumb-item">
                  <Link className="text-decoration-none" href="/">
                    首頁
                  </Link>
                </li>
                <li className="breadcrumb-item " aria-current="page">
                  <Link className="text-decoration-none" href="/lecture">
                    課程主頁
                  </Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  課程細節
                </li>
              </ol>
            </nav>
          </div>
          <div className="lectureinfo">
            <div className="slider">
              <Lectureslider />
            </div>
            <div className="detail">
              <LectureInfo />
            </div>
          </div>
        </section>
        <section className="section2">
          <h1 className="sectiontitle">集合地點</h1>
        </section>
        <section className="section3">
          <h1 className="sectiontitle">一日課程內容</h1>
          <div className="">
            <Lecturedetail />
          </div>
        </section>
        <section className="section4">
          <h1 className="sectiontitle">課程特殊提醒&安全守則</h1>
          <Safeinfo />
        </section>
        <section className="section5">
          <h1 className="sectiontitle">學員評價</h1>
          <Feedback />
        </section>
        <section className="section6">
          <h1 className="sectiontitle">探索其他課程</h1>
          <div className="cardgrp">
            <LectureMyCard />
            <LectureMyCard />
            <LectureMyCard />
            <LectureMyCard />
          </div>
        </section>
      </div>

      <style jsx>
        {`
          .section1 {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            align-self: stretch;
          }

          .section2 {
            display: flex;
            flex-direction: column;
            gap: 30px;
            justify-content: center;
            align-self: stretch;
            margin-top: 80px;
          }

          .section3 {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 30px;
            align-self: stretch;
            margin-top: 80px;
          }

          .section4 {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 30px;
            align-self: stretch;
            margin-top: 80px;
          }

          .section5 {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 30px;
            flex: 1 0 0;
            align-self: stretch;
            margin-top: 80px;
          }

          .section6 {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 30px;
            align-self: stretch;
            margin-top: 80px;
            margin-bottom: 50px;
          }

          .search {
            display: flex;
            padding: 15px 12px 10px 12px !important;
            align-items: flex-start;
            align-self: stretch;
          }

          .breadcrumb-item{
            color: var(--grey-700, #6B6B6B);
            font-family: "Zen Kaku Gothic New";
            font-size: 20px;
            font-style: normal;
            font-weight: 700;
            line-height: normal;
          }

          .lectureinfo {
            display: flex;
            align-items: flex-start;
            align-content: flex-start;
            gap: 20px;
            align-self: stretch;
            flex-wrap: wrap;
          }

          .slider{
            width: 752px;
          }

          .sectiontitle {
            text-align: center;
            color: var(--primary-5, #2f4715);

            /* ZenKaku-h3 */
            font-family: 'Zen Kaku Gothic New';
            font-size: 36px;
            font-style: normal;
            font-weight: 700;
            line-height: normal;
            margin-bottom: 0px;
          }

          .cardgrp {
            display: flex;
            align-items: flex-start;
            align-content: flex-start;
            gap: 10px;
            align-self: stretch;
            flex-wrap: wrap;
            padding-top: 5px;
          }
        `}
      </style>
    </>
  )
}
