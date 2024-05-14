import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import MessageCard from '@/components/lecture/message-card'
import TeacherAllInfo from '@/components/lecture/teacherallInfo'
import TeacherLectureCard from '@/components/lecture/teacherlecture'
import ArticleCard from '@/components/lecture/article-card'
import useColloections from '@/hooks/product/useCollections'
import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'
import { UseTeacherInfo } from '@/hooks/use-teacher'
import { UseLecture } from '@/hooks/use-lecture'

export default function LectureDetail() {
  const { teachers } = UseTeacherInfo()
  const { lectures } = UseLecture()

  const router = useRouter()
  const { tid } = router.query
  const [teacher, setTeacher] = useState(null)
  const [teacherLectures, setTeacherLectures] = useState([])

  //根據tid動態路由找老師
  useEffect(() => {
    if (tid && teachers.length > 0) {
      const fetchTeacher = teachers.find(
        (item) => item.id === parseInt(tid, 10)
      )
      setTeacher(fetchTeacher)
    }
  }, [teachers, tid])

  // 根據tid找到相應的課程
  useEffect(() => {
    if (tid && lectures.length > 0) {
      const fetchLectures = lectures
        .filter((lecture) => lecture.teacher_id === parseInt(tid, 10))
        .sort((a, b) => new Date(a.lecture_date) - new Date(b.lecture_date)) // 根據 lecture_date 進行排序
      setTeacherLectures(fetchLectures)
    }
  }, [lectures, tid])

  return (
    <>
      <div className="container">
        <section className="section1">
          {teacher && <TeacherAllInfo teacher={teacher} />}
        </section>
        <section className="section2">
          <div className="lecturelist">
            <p className="sectiontitle">開授的課程</p>
            <div className="list">
                <div className="list">
                  <TeacherLectureCard lectures={teacherLectures} />
                </div>
            </div>
          </div>
          <div className="articlelist">
            <p className="sectiontitle">發布的文章</p>
            <div className="list">
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
          <div className="form">
            <textarea
              name=""
              id=""
              className=""
              cols="150"
              rows="10"
              maxlength="5000"
              placeholder="留個言吧~"
            ></textarea>
            <button className="btn btn-add">送出</button>
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

          .sub {
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

          .comment {
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
