import React from 'react'
import LectureMyCard from '@/components/lecture/card'
import Lectureslider from '@/components/lecture/lectureslider'
import LectureInfo from '@/components/lecture/lectureinfo'
import Feedback from '@/components/lecture/feedback'
import MessageCard from '@/components/lecture/message-card'
import Lecturedetail from '@/components/lecture/lecturedetail'
import Safeinfo from '@/components/lecture/safeinfo'
import TeacherAllInfo from '@/components/lecture/teacherallInfo'
import TeacherLectureCard from '@/components/lecture/teacherlecture'
import ArticleCard from '@/components/lecture/article-card'

export default function LectureDetail() {
    return (
        <>
            <div className="container">
                <section className="section1">
                    <TeacherAllInfo />
                </section>
                <section className="section2">
                    <div className="lecturelist">
                        <p className="sub">開授課程</p>
                        <div className='list'>
                            <TeacherLectureCard />
                            <TeacherLectureCard />
                            <TeacherLectureCard />
                            <TeacherLectureCard />
                        </div>
                    </div>
                    <div className="articlelist">
                        <p className="sub">發布文章</p>
                        <div className='list'>
                            <ArticleCard />
                            <ArticleCard />
                            <ArticleCard />
                        </div>
                    </div>
                </section>
                <section className="section3">
                    <h1 className="sectiontitle">在這裡和老師互動</h1>
                    <div className="comment">
                        <MessageCard />
                        <MessageCard />
                        <MessageCard />
                    </div>
                    <div className='form'>
                        <textarea name="" id="" className="" cols="150" rows="10" maxlength="5000" placeholder="留個言吧~"></textarea>
                        <button className='btn btn-add'>送出</button>
                    </div>
                </section>
            </div>

            <style jsx>
                {`
          .section1 {
            display: flex;
            width: 1320px;
            padding: 50px 20px;
            align-items: flex-start;
          }

          .section2 {
            display: flex;
            width: 1320px;
            padding: 50px 20px;
            justify-content: space-between;
            align-items: flex-start;
            align-content: flex-start;
            row-gap: 100px;
            flex: 1 0 0;
            flex-wrap: wrap;
          }

          .section3 {
            display: flex;
            width: 1320px;
            padding: 50px 20px;
            flex-direction: column;
            align-items: center;
            gap: 50px;
          }

          .lecturelist {
            display: flex;
            width: 580px;
            flex-direction: column;
            align-items: flex-start;
            gap: 20px;
            flex-shrink: 0;
          }

          .articlelist {
            display: flex;
            width: 631px;
            flex-direction: column;
            align-items: flex-start;
            gap: 20px;
            flex-shrink: 0;
          }

          .sub{
            color: #000;
            font-family: Roboto;
            font-size: 20px;
            font-style: normal;
            font-weight: 700;
            line-height: normal;
          }

          .list {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 40px;
          }

          .comment{
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            gap: 50px;
            align-self: stretch;
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

          .form {
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            gap: 20px;
            flex: 1 0 0;
            align-self: stretch;
          }
        `}
            </style>
        </>
    )
}
