import React from 'react'
import LectureMyCard from '@/components/lecture/card'
import LectureMyCardNp from '@/components/lecture/card-np'
import LectureWish from '@/components/lecture/wish'
import TeacherCard from '@/components/lecture/teacher-card'
import TeacherLectureCard from '@/components/lecture/teacherlecture'
import ArticleCard from '@/components/lecture/article-card'
import MessageCard from '@/components/lecture/message-card'
import Lectureslider from '@/components/lecture/lectureslider'
import LectureInfo from '@/components/lecture/lectureinfo'
import Herosection from '@/components/lecture/herosection'
import Feedback from '@/components/lecture/feedback'
import TeacherCardInfo from '@/components/lecture/teacher-infocard'


export default function LectureMain() {
  return (
    <>
      <div className="container pt-3">
        <LectureMyCard />
        <LectureMyCardNp />
        <LectureWish />
        <TeacherCard />
        <TeacherLectureCard />
        <ArticleCard />
        <MessageCard />
        <MessageCard />
        <MessageCard />
        <MessageCard />
        <Lectureslider />
        <LectureInfo />
        <Herosection />
        <Feedback />
        <TeacherCardInfo />
      </div>
    </>
  )
}
