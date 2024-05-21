import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import TeacherAllInfo from '@/components/lecture/teacherallInfo'
import TeacherLectureCard from '@/components/lecture/teacherlecture'
import ArticleCard from '@/components/lecture/article-card'
import { UseTeacherInfo } from '@/hooks/use-teacher'
import { UseLecture } from '@/hooks/use-lecture'
import useTeacherArticles from '@/hooks/use-teacherarticle'
import useColloections from '@/hooks/product/useCollections'
import Link from 'next/link'

export default function LectureDetail() {
  const { teachers } = UseTeacherInfo()
  const { lectures } = UseLecture()
  const { articles } = useTeacherArticles()
  const { collections } = useColloections([])

  const router = useRouter()
  const { tid } = router.query
  const [isCollected, setIsCollected] = useState([])
  const [teacher, setTeacher] = useState(null)
  const [teacherLectures, setTeacherLectures] = useState([])
  const [articlesList, setArticlesList] = useState([])

  // 根據 tid 獲取講師資訊
  useEffect(() => {
    if (tid && teachers.length > 0) {
      const fetchedTeacher = teachers.find(
        (item) => item.id === parseInt(tid, 10)
      )
      setTeacher(fetchedTeacher)
    }
  }, [teachers, tid])

  // 根據 tid 獲取講師的講座
  useEffect(() => {
    if (tid && lectures.length > 0) {
      const fetchedLectures = lectures
        .filter((lecture) => lecture.teacher_id === parseInt(tid, 10))
        .sort((a, b) => new Date(a.lecture_date) - new Date(b.lecture_date)) // 根據 lecture_date 進行排序
      setTeacherLectures(fetchedLectures)
    }
  }, [lectures, tid])
  
  // 根據 tid 獲取講師的文章
  useEffect(() => {
    if (tid && articles.length > 0) {
      const fetchedArticles = articles
      .filter((article) => article.user_id === parseInt(tid, 10))
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      setArticlesList(fetchedArticles)
    }
  }, [articles, tid])
  
  const [activeIndex, setActiveIndex] = useState('開授的課程')
  
  const safeInfoClick = (index) => {
    setActiveIndex(index)
  }
  
  // 檢查當前課程是否在收藏列表中
  useEffect(() => {
    setIsCollected(
      collections.filter(
        (item) =>
          item.product_id == tid && item.valid == 1
      )
    )
  }, [collections])

  return (
    <>
      <div className="container">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb mt-3">
            <li className="breadcrumb-item">
              <Link className="text-decoration-none" href="/">
                首頁
              </Link>
            </li>
            <li className="breadcrumb-item " aria-current="page">
              <Link className="text-decoration-none" href="/teacher">
                講師陣容
              </Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              講師個人頁
            </li>
          </ol>
        </nav>
        <section className="section1">
          {teacher && <TeacherAllInfo teacher={teacher} />}
        </section>
        <section className="section2">
          <div className="alllist">
            <ul className="nav nav-underline ul-margin">
              <li
                className={`nav-item col ${activeIndex === '開授的課程' ? 'active' : ''
                  }`}
              >
                <button
                  className="nav-link"
                  onClick={() => safeInfoClick('開授的課程')}
                >
                  開授的課程
                </button>
              </li>
              <li
                className={`nav-item col ${activeIndex === '發布的文章' ? 'active' : ''
                  }`}
              >
                <button
                  className="nav-link"
                  onClick={() => safeInfoClick('發布的文章')}
                >
                  發布的文章
                </button>
              </li>
            </ul>

            <div className="mb-3">
              {activeIndex === '開授的課程' ? (
                <div className="list">
                  <TeacherLectureCard
                    lectures={teacherLectures}
                    collections={collections}
                  />
                </div>
              ) : (
                <div className="list">
                  <ArticleCard
                    articlesList={articlesList}
                    collections={collections}
                  />
                </div>
              )}
            </div>
          </div>
        </section>
      </div>

      <style jsx>
        {`
          .section1 {
            display: flex;
            width: 1320px;
            padding: 0px 20px 20px;
            align-items: flex-start;
          }

          .section2 {
            display: flex;
            width: 1320px;
            padding: 50px 20px;
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

          .alllist {
            padding: 0px 20px;
            border-radius: 8px;
            border: 1px solid #ccc;
            width: 1320px;
          }

          .ul-margin {
            margin-top: 10px;
            margin-bottom: 20px;
          }

          .nav-item {
            text-align: center;
          }
          .nav-link {
            width: 100%;
            color: var(--primary-5, #2f4715);

            /* ZenKaku-h3 */
            font-family: 'Zen Kaku Gothic New';
            font-size: 36px;
            font-style: normal;
            font-weight: 700;
            line-height: normal;
          }
          .nav-item button:hover {
            color: #bd9250;
          }
          .nav-item.active .nav-link {
            color: #bd9250 !important;
            border-bottom-color: #bd9250 !important;
          }

          .list {
            display: flex;
            flex-direction: row;
            align-items: flex-start;
            gap: 40px;
            flex-wrap: wrap;
            justify-content: space-between;
          }

          .list .card {
            flex: 1;
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

          .breadcrumb{
            display: flex;
            padding: 15px 0px 10px;
            align-items: flex-start;
            align-self: stretch;
            margin: 20px;
          }

          .breadcrumb-item {
            color: var(--grey-700, #6b6b6b);
            font-family: 'Zen Kaku Gothic New';
            font-size: 20px;
            font-style: normal;
            font-weight: 700;
            line-height: normal;
          }

          @media (max-width: 1200px) {
            .section1 {
              display: flex;
              width: 398px;
              padding: 20px 5px;
              align-items: flex-start;
            }
  
            .section2 {
              display: flex;
              width: 398px;
              padding: 0px;
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
  
            .alllist {
              padding: 0px 5px;
              border-radius: 8px;
              border: 1px solid #ccc;
              width: 406px;
            }
  
            .ul-margin {
              margin-top: 10px;
              margin-bottom: 20px;
            }
  
            .nav-item {
              text-align: center;
            }
            .nav-link {
              font-size: 28px;
            }
            .nav-item button:hover {
              color: #bd9250;
            }
            .nav-item.active .nav-link {
              color: #bd9250 !important;
              border-bottom-color: #bd9250 !important;
            }
  
            .list {
              display: flex;
              flex-direction: row;
              align-items: flex-start;
              gap: 40px;
              flex-wrap: wrap;
              justify-content: space-between;
            }
  
            .list .card {
              flex: 1;
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

            .breadcrumb{
              display: flex;
              padding: 15px 0px 10px;
              align-items: flex-start;
              align-self: stretch;
              margin: 10px;
            }
           }
        `}
      </style>
    </>
  )
}
