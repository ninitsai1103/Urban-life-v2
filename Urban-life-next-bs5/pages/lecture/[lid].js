import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import LectureMyCard from '@/components/lecture/card'
import Lectureslider from '@/components/lecture/lectureslider'
import LectureInfo from '@/components/lecture/lectureinfo'
import Feedback from '@/components/lecture/feedback'
import Link from 'next/link'
import Lecturedetail from '@/components/lecture/lecturedetail'
import Safeinfo from '@/components/lecture/safeinfo'
import { UseLecture } from '@/hooks/use-lecture'
import { useCheckout } from '@/hooks/use-checkout'
import useColloections from '@/hooks/product/useCollections'
import useCommment from '@/hooks/product/useCommment'
import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'

export default function LectureDetail() {
  const { lectures } = UseLecture()
  const { collections, addCollection, removeCollection } = useColloections()
  const { comments } = useCommment()

  const router = useRouter()
  const { lid } = router.query
  const [lecture, setLecture] = useState(null)
  const [isCollected, setIsCollected] = useState([]) //商品是否有被收藏
  const [comment, setComment] = useState(null)

  // useEffect(() => {
  //   if (lectures) {
  //     const foundLecture = lectures.find((item) => item.id === parseInt(lid))
  //     if (foundLecture) {
  //       setLecture(foundLecture)
  //     }
  //   }
  // }, [lid, lectures])

 //加入購物車
 const { addItem } = useCheckout()
 const MySwal = withReactContent(Swal)

//顯示評論
const [visibleComments, setVisibleComments] = useState(2)
const [showAll, setShowAll] = useState(false)

useEffect(() => {
  //根據lid動態路由對應商品資料
  if (lid && lectures.length > 0) {
    const fetchLecture = lectures.find(
      (item) => item.id === parseInt(lid, 10)
    )
    setLecture(fetchLecture)
  }
}, [lectures, lid])

useEffect(() => {
  // 檢查當前商品是否在收藏列表中
  setIsCollected(
    collections.find((item) => item.product_id == lid && item.valid == 1)
  )
}, [collections])

//切換商品的收藏狀態
const toggleCollection = () => {
  setIsCollected(!isCollected)
  const message = isCollected ? '商品已取消收藏!' : '商品已加入收藏!'
  toast.success(message, {})
}

const notifySA = (lecture) => {
  MySwal.fire({
    title: '成功加入',
    text: lecture.name + '已成功加入購物車!',
    icon: 'success',
  })
}

//根據lid動態路由對應商品評論
useEffect(() => {
  if (lid && comments.length > 0) {
    const fetchComment = comments
      .filter((item) => item.product_lecture_id === parseInt(lid, 10))
      .map((comment) => ({
        ...comment,
        date: commentDate(comment.created_at),
      }))
    setComment(fetchComment)
  }
}, [comments, lid])

 //擷取日期
 const commentDate = (datetime) => {
  const datePart = datetime.split(' ')[0]
  return datePart
}

//查看更多評論
const moreComment = (comment) => {
  if (showAll) {
    setVisibleComments(2)
    setShowAll(false)
  } else {
    setVisibleComments(comment.length)
    setShowAll(true)
  }
}

  //猜你喜歡
  const [randomLectures, setRandomLectures] = useState([]);

  // 生成隨機的講座卡片
  const generateRandomLectures = () => {
    // 將講座數組進行隨機排序
    const shuffledLectures = lectures.sort(() => Math.random() - 0.5);
    // 只取前四個隨機卡片
    const selectedLectures = shuffledLectures.slice(0, 4);
    // 更新狀態以渲染隨機卡片
    setRandomLectures(selectedLectures);
  };

  useEffect(() => {
    if (lectures.length > 0) {
      generateRandomLectures();
    }
  }, [lectures])

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
          <div className="meetingpoint">
            <div className="info">
              <div className="name">
                <div className="subtitle">集合地點</div>
                <div className="subinfo">中壢火車站</div>
              </div>
              <div className="name">
                <div className="subtitle">集合時間</div>
                <div className="subinfo">請至少提前半小時到達集合地點</div>
              </div>
              <div className="name">
                <div className="subtitle">交通資訊</div>
                <div className="subinfo">
                  1. 可以搭乘各級火車至中壢站下車
                  <br />
                  <br />
                  2. 搭乘機場捷運於A22老街溪站下車
                  &nbsp;&nbsp;&nbsp;轉乘市內公車
                  <br />
                  <br />
                  3. 自行開車者可於國道一號中壢交流
                  &nbsp;&nbsp;&nbsp;道下交流道後往市區方向行駛
                </div>
              </div>
              <div className="con">
                ※有任何問題皆可撥打講師或辦公室連絡電話
                <br /> &nbsp;&nbsp;&nbsp;講師：0987-654321
                <br /> &nbsp;&nbsp;&nbsp;辦公室：03-4567890
              </div>
            </div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d17207.0092075364!2d121.21220967794753!3d24.954954783550026!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x34682248fcfa49d7%3A0x57e0b78df52b3c96!2z5Lit5aOi54Gr6LuK56uZ!5e0!3m2!1szh-TW!2stw!4v1714979692462!5m2!1szh-TW!2stw"
              width={640}
              height={555}
              style={{ border: '1px solid black' }}
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
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
          <div style={{ maxWidth: '1296px', overflow: 'hidden' }}>
            <div className="cardgrp">
              {randomLectures.map((lecture) => (
                <LectureMyCard key={lecture.id} lecture={lecture} />
              ))}
            </div>
            {/* 刷新按鈕 */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '30px',
              }}
            >
              <button className='btn btn-add' onClick={generateRandomLectures}>發現有趣課程</button>
            </div>
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

          .breadcrumb-item {
            color: var(--grey-700, #6b6b6b);
            font-family: 'Zen Kaku Gothic New';
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

          .slider {
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
            gap: 10px;
            flex: 1 0 0;
          }

          .meetingpoint {
            display: flex;
            padding: 30px;
            justify-content: center;
            align-items: flex-start;
            gap: 60px;
            align-self: stretch;
            border-radius: 8px;
            background: var(--white, #fbfbfb);
          }

          .info {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 32px;
            max-width: 552px;
          }

          .name {
            display: flex;
            align-items: flex-start;
            gap: 40px;
          }

          .subtitle {
            color: var(--grey-700, #6b6b6b);
            /* ZenKaku-h4 */
            font-family: 'Zen Kaku Gothic New';
            font-size: 24px;
            font-style: normal;
            font-weight: 700;
            line-height: normal;
          }

          .subinfo {
            color: var(--Text-Blue, #3e3e59);
            font-family: 'Zen Kaku Gothic New';
            font-size: 24px;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
            width: 392px;
          }

          .con {
            color: var(--primary-2, #849474);
            /* ZenKaku-h5 */
            font-family: 'Zen Kaku Gothic New';
            font-size: 24px;
            font-style: normal;
            font-weight: 700;
            line-height: normal;
          }
        `}
      </style>
    </>
  )
}
