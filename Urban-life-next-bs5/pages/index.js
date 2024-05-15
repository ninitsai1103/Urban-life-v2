// pages/index.js
// 主頁面
import Link from 'next/link'
import Image from 'next/image'
import PlaceholderText from '@/components/common/placeholder-text'

// CARD
import styles from '@/components/home-page/product-category-card.module.css'
import ProductCard from '@/components/home-page/product-card'
import ProductCategoryCard from '@/components/home-page/product-category-card'
import LectureCard1 from '@/components/home-page/lecture-card1'
import LectureCard2 from '@/components/home-page/lecture-card2'
import TeacherCard from '@/components/home-page/teacher-card'
import TeacherCardInfo from '@/components/lecture/teacher-infocard'

// CALENDER
// import Calendar from '@/components/calandar/calendar'

// REACT ICON
import { IoIosArrowForward } from 'react-icons/io'
import { FaRunning } from 'react-icons/fa'
import { FaUser } from 'react-icons/fa'

// REACT BOOTSTRAP
import Carousel from 'react-bootstrap/Carousel'
import { Container } from 'react-bootstrap'

export default function Home() {
  const handleProductCard1Click = () => {
    window.location.href = `/product/1`
  }

  const handleProductCard2Click = () => {
    window.location.href = `/product/3`
  }

  const handleProductCard3Click = () => {
    window.location.href = `/product/5`
  }

  const handleProductCard4Click = () => {
    window.location.href = `/product/7`
  }

  const handleProductCard5Click = () => {
    window.location.href = `/product/9`
  }

  const handleProductCard6Click = () => {
    window.location.href = `/product/11`
  }

  const handleLectureCard1Click = () => {
    window.location.href = `/lecture/452`
  }

  const handleLectureCard2Click = () => {
    window.location.href = `/lecture/455`
  }

  const handleLectureCard3Click = () => {
    window.location.href = `/lecture/453`
  }

  const handleCategoryClick = () => {
    window.location.href = `/product/list`
  }

  const handleMemberClick = () => {
    window.location.href = `/member/login`
  }

  return (
    <>
      <section className="slider"></section>

      <section className="本月主打">
        <Container>
          <h1 className="text-center">本月主打!</h1>
          <p className="text-center">Special This Month</p>

          <div className="row">
            <div
              className="col product-card g-1 pointer-cursor"
              onClick={handleProductCard1Click}
            >
              <div className="ProductCardContent card">
                <div className="card-img">
                  <img
                    src="/images/product/product_img/Pi2401260932.jpg"
                    className="ProductCardContent-img-top card-img-top"
                  />
                </div>

                <div className="card-body ">
                  <h5 className="card-title fw-bold">初雪</h5>
                  <div className=" text-overflow mb-3">
                    <p className="card-text">
                      獨家！首個早熟品種。在春季和秋季試驗中表現出色。比雪之冠更早熟、更一致、更可靠。中等大小的植株，包裹度平均。適應性廣泛。
                    </p>
                  </div>

                  <h4>$200</h4>
                </div>
              </div>
            </div>
            <div
              className="col product-card g-1 pointer-cursor"
              onClick={handleProductCard2Click}
            >
              <div className="ProductCardContent card">
                <div className="card-img">
                  <img
                    src="/images/product/product_img/Pi2401260933.jpg"
                    className="ProductCardContent-img-top card-img-top"
                  />
                </div>

                <div className="card-body ">
                  <h5 className="card-title fw-bold">雪之冠</h5>
                  <div className=" text-overflow mb-3">
                    <p className="card-text">
                      標準的早熟品種。
                      這個雜交品種表現出不尋常的幼苗活力。無論是在夏季還是秋季收穫，都能獲得優質、中等大小的花頭。對於霜害具有良好的耐受性。AAS獲獎者。注意：在受到肥力或濕潤壓力的情況下，所有花椰菜，尤其是雪之冠，花頭的底部可能呈現淡紫色。
                    </p>
                  </div>

                  <h4>$250</h4>
                </div>
              </div>
            </div>
            <div
              className="col product-card g-1 pointer-cursor"
              onClick={handleProductCard3Click}
            >
              <div className="ProductCardContent card">
                <div className="card-img">
                  <img
                    src="/images/product/product_img/Pi2401260934.jpg"
                    className="ProductCardContent-img-top card-img-top"
                  />
                </div>

                <div className="card-body ">
                  <h5 className="card-title fw-bold">合悅</h5>
                  <div className=" text-overflow mb-3">
                    <p className="card-text">
                      適應性強的中期品種。
                      強壯的大型植株產生大而圓頂的花頭。在秋季試驗中表現特別出色，也適合春季生產。
                    </p>
                  </div>

                  <h4>$200</h4>
                </div>
              </div>
            </div>
            <div
              className="col product-card g-1 pointer-cursor"
              onClick={handleProductCard4Click}
            >
              <div className="ProductCardContent card">
                <div className="card-img">
                  <img
                    src="/images/product/product_img/Pi2401260935.jpg"
                    className="ProductCardContent-img-top card-img-top"
                  />
                </div>

                <div className="card-body ">
                  <h5 className="card-title fw-bold">小柑橘</h5>
                  <div className=" text-overflow mb-3">
                    <p className="card-text">
                      充滿活力的橙色。
                      我們最明亮的橙色花椰菜。強壯的大型植株即使在不太理想的條件下也能產生優秀的作物。在我們的試驗中，是最早成熟的橙色品種。適合夏季和秋季收穫。
                    </p>
                  </div>

                  <h4>$250</h4>
                </div>
              </div>
            </div>
            <div
              className="col product-card g-1 pointer-cursor"
              onClick={handleProductCard5Click}
            >
              <div className="ProductCardContent card">
                <div className="card-img">
                  <img
                    src="/images/product/product_img/Pi2401260936.jpg"
                    className="ProductCardContent-img-top card-img-top"
                  />
                </div>

                <div className="card-body ">
                  <h5 className="card-title fw-bold">紫月</h5>
                  <div className=" text-overflow mb-3">
                    <p className="card-text">
                      新品！極早熟的紫色花椰菜。
                      第一個上市的極早熟紫色花椰菜！非常吸引人的中深色紫色花頭。在溫暖天氣中表現最佳的我們最好的紫色品種，同時也是一個出色的秋季作物。適應性廣泛。
                    </p>
                  </div>

                  <h4>$300</h4>
                </div>
              </div>
            </div>
            <div
              className="col product-card g-1 pointer-cursor"
              onClick={handleProductCard6Click}
            >
              <div className="ProductCardContent card">
                <div className="card-img">
                  <img
                    src="/images/product/product_img/Pi2401260937.jpg"
                    className="ProductCardContent-img-top card-img-top"
                  />
                </div>

                <div className="card-body ">
                  <h5 className="card-title fw-bold">薰衣草</h5>
                  <div className=" text-overflow mb-3">
                    <p className="card-text">
                      圓頂、紫色的花頭。
                      迷人的亮紫色小花使其成為沾醬拼盤的絕佳選擇。秋季的莖部呈美麗的中紫色，春季則較淡。此品種的花頭更亮麗的紫色，頂部稍微更大。最適合秋季種植，但也可以成功地在夏季種植
                    </p>
                  </div>

                  <h4>$300</h4>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
      {/* <section>
        <Container>
          <Calendar />
        </Container>
      </section> */}
      <section className="商品分類">
        <Container>
          <h1 className="text-center">商品分類</h1>
          <p className="text-center">Categories of Product</p>
          <div className="row">
            <div className="col category-card" onClick={handleCategoryClick} style={{cursor: 'pointer'}}>
              <div className={`card ${styles.card}`}
            >
                <div className={`card-img ${styles.cardImg}`}>
                  <img
                    src="/images/home_page/seeds.png"
                    className={`card-img-top ${styles.cardImgTop}`}
                  />
                </div>

                <div
                  className={`card-body text-white ${styles.cardBody} text-center`}
                >
                  <h5 className="card-title">種子</h5>
                  <p className="card-text">seeds</p>
                </div>
              </div>
            </div>
            <div className="col category-card " onClick={handleCategoryClick} style={{cursor: 'pointer'}}>
              <div className={`card d-flex justify-content-center  ${styles.card}`}>
                <div className={`card-img ${styles.cardImg}`}>
                  <img
                    src="/images/home_page/seedings.png"
                    className={`card-img-top ${styles.cardImgTop}`}
                  />
                </div>

                <div
                  className={`card-body text-white ${styles.cardBody} text-center`}
                >
                  <h5 className="card-title">種苗</h5>
                  <p className="card-text">seedings</p>
                </div>
              </div>
            </div>
            <div className="col category-card" onClick={handleCategoryClick} style={{cursor: 'pointer'}}>
              <div className={`card ${styles.card}`}>
                <div className={`card-img ${styles.cardImg}`}>
                  <img
                    src="/images/home_page/agrochemical.png"
                    className={`card-img-top ${styles.cardImgTop}`}
                  />
                </div>

                <div
                  className={`card-body text-white ${styles.cardBody} text-center`}
                >
                  <h5 className="card-title">農藥</h5>
                  <p className="card-text">agrochemical
</p>
                </div>
              </div>
            </div>
            <div className="col category-card" onClick={handleCategoryClick} style={{cursor: 'pointer'}}>
              <div className={`card ${styles.card}`}>
                <div className={`card-img ${styles.cardImg}`}>
                  <img
                    src="/images/home_page/materials.png"
                    className={`card-img-top ${styles.cardImgTop}`}
                  />
                </div>

                <div
                  className={`card-body text-white ${styles.cardBody} text-center`}
                >
                  <h5 className="card-title">資材</h5>
                  <p className="card-text">Materials</p>
                </div>
              </div>
            </div>
            <div className="col category-card" onClick={handleCategoryClick} style={{cursor: 'pointer'}}>
              <div className={`card ${styles.card}`}>
                <div className={`card-img ${styles.cardImg}`}>
                  <img
                    src="/images/home_page/fertilizers.png"
                    className={`card-img-top ${styles.cardImgTop}`}
                  />
                </div>

                <div
                  className={`card-body text-white ${styles.cardBody} text-center`}
                >
                  <h5 className="card-title">肥料</h5>
                  <p className="card-text">fertilizers</p>
                </div>
              </div>
            </div>
            <div className="col category-card" onClick={handleCategoryClick} style={{cursor: 'pointer'}}>
              <div className={`card ${styles.card}`}>
                <div className={`card-img ${styles.cardImg}`}>
                  <img
                    src="/images/home_page/books.png"
                    className={`card-img-top ${styles.cardImgTop}`}
                  />
                </div>

                <div
                  className={`card-body text-white ${styles.cardBody} text-center`}
                >
                  <h5 className="card-title">書籍</h5>
                  <p className="card-text">books</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
      <section className="立即加入會員 好禮享不完！">
        <Container>
          <h1 className="text-center">立即加入會員 好禮享不完！</h1>
          <p className="text-center">Become a member now to get discounts！</p>

          <div className="d-flex justify-content-center mb-3">
            <img
              className="img-fluid"
              src="/images/home_page/member_ship.png"
              alt="Membership offer"
            />
          </div>
          <div className="d-flex justify-content-center">
            <button className="btn btn-detail w-auto d-flex justify-content-center align-items-center gap-2" onClick={handleMemberClick}>
              立即加入 <FaRunning />
            </button>
          </div>
          {/* ann */}
        </Container>
      </section>
      
      <section className="課程">
        <Container>
          <h1 className="text-center">相關課程</h1>
          <p className="text-center">Lecture</p>
          <div className="row mb-4 ">
            <div className="col-12 col-sm-6 pointer-cursor" onClick={handleLectureCard1Click} >
              <div className="card Lectureard1">
                <div className="card-img Lectureard1-img">
                  <img
                    src={`http://localhost:3005/lecture_img/lecture_2.jpg`}
                    className="card-img-top img-fluid Lectureard1-img2"
                    alt="..."
                  />
                </div>
                <div className="card-body">
                  <h5 className="card-title fw-bold">遇見莓好-採摘體驗</h5>
                  <div className="d-flex align-items-center mt-2 mb-2">
                    <FaUser style={{ fontSize: '20px', marginRight: '10px' }} />
                    <h6 className="m-0">張少淳</h6>
                  </div>
                  <div className="card-text-container Lectureard1-text-container">
                    <p className="card-text">
                      課程概述：
                      嚴選苗栗大湖在地小農，提供學員們一個豐富的草莓體驗，從採摘到製作，深入了解草莓的生長過程、品種特性以及製作美味的草莓料理。課程將結合戶外實地採摘活動和室內實踐製作，讓學員們在歡樂的氛圍中學習並感受草莓的魅力。
                      課程內容： 1. 草莓園採摘體驗 -
                      導覽草莓農場，了解草莓的種植過程和環境要
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-6">
              <div className="row gap-3 h-100 d-flex flex-column justify-content-between ">
                <div
                  className="col-12 lecture-card2 pointer-cursor"
                  onClick={handleLectureCard2Click}
                >
                  <div className="card ProductCard2">
                    <div className="row no-gutters h-100">
                      <div className="col-md-4 card-image-container ">
                        <img
                          src={`http://localhost:3005/lecture_img/lecture_17.jpg`}
                          className="card-img ProductCard2Img"
                          alt="..."
                        />
                      </div>
                      <div className="col-md-8">
                        <div className="card-body">
                          <h5 className="card-title fw-bold">
                            大發荔市-採摘體驗
                          </h5>
                          <div className="d-flex align-items-center mt-2 mb-2">
                            <FaUser
                              style={{ fontSize: '20px', marginRight: '10px' }}
                            />
                            <h6 className="m-0">黃湘苗</h6>
                          </div>
                          <div className="card-text-container ProductCard2-text-container">
                            <p className="card-text">
                              荔枝採摘體驗課程
                              歡迎參加我們精心策劃的荔枝採摘體驗課程，這是一個讓您親身感受荔枝甜蜜風味的絕佳機會。我們將帶領您進入蒼翠的果園，讓您親手採摘、品味這個夏日的美味水果。
                              活動亮點： 1. 採摘冒險：
                              在專業果農的帶領下，您將穿越茂密的荔枝樹叢，親身體驗採摘的樂趣，了解不同品種的荔枝樹特點。
                              2. 果園導覽： 我們的專業導遊將帶您
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="col-12 lecture-card2 pointer-cursor"
                  onClick={handleLectureCard3Click}
                >
                  <div className="card ProductCard2">
                    <div className="row no-gutters h-100">
                      <div className="col-md-4 card-image-container ">
                        <img
                          src={`http://localhost:3005/lecture_img/lecture_9.jpg`}
                          className="card-img ProductCard2Img"
                          alt="..."
                        />
                      </div>
                      <div className="col-md-8">
                        <div className="card-body">
                          <h5 className="card-title fw-bold">
                            梅開五福-採摘體驗
                          </h5>
                          <div className="d-flex align-items-center mt-2 mb-2">
                            <FaUser
                              style={{ fontSize: '20px', marginRight: '10px' }}
                            />
                            <h6 className="m-0">黃湘苗</h6>
                          </div>
                          <div className="card-text-container ProductCard2-text-container">
                            <p className="card-text">
                              歡迎參加我們精心策劃的「採梅子體驗課程」，這將是一個充滿樂趣和自然之美的冒險。以下是課程的詳細資訊：
                              1. 歡迎與介紹： -
                              上午9時，歡迎您抵達我們美麗的梅樹園區，我們將提供新鮮的梅子汁和簡介。
                              2. 導覽與梅園探索： - 由專業園丁帶
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-end">
            <a className="btn btn-icon d-flex align-items-center" href="/lecture">
              查看更多
              <IoIosArrowForward className="ms-1" />
            </a>
          </div>
        </Container>
      </section>
      <section className="講師">
        <Container>
          <h1 className="text-center">講師</h1>
          <p className="text-center">Teacher</p>
          <div className="row mb-4 d-flex justify-content-center">
            <div className="col-6 col-sm-3 teacher-card">
              <Link href={`/teacher/2`}>
                <div className="card TeacherCard">
                  <div className="card-top">
                    <img
                      className="card-img TeacherImg"
                      src="/images/teacher/T1706078211.jpg"
                      alt="Card image cap"
                    />
                  </div>

                  <div className="card-body TeacherCard-body">
                    <h5 className="TeacherName">黃湘苗</h5>
                    <p className="teacherinfo">
                      黃湘苗擁有超過25年的農業種植經驗，專精於有機農業和可持續發展。畢業於國際知名的農業科學院，在土壤管理、作物輪作及自然農法方面有深入研究。致力於推廣環保農業，黃教授經常舉辦工作坊，並在多個國際會議上發表論文。
                    </p>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-6 col-sm-3 teacher-card">
              <Link href={`/teacher/3`}>
                <div className="card TeacherCard">
                  <div className="card-top">
                    <img
                      className="card-img TeacherImg"
                      src="/images/teacher/T1706078212.jpg"
                      alt="Card image cap"
                    />
                  </div>

                  <div className="card-body TeacherCard-body">
                    <h5 className="TeacherName">黃甄芸</h5>
                    <p className="teacherinfo">
                      黃甄芸是一位資深園藝學家，專業領域涵蓋果樹栽培和植物病蟲害管理。她在果樹種植方面擁有豐富的實踐經驗，並積極參與國內外園藝研討會。黃女士熱衷於教育工作，致力於將她的知識傳授給新一代的園藝愛好者。
                    </p>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-6 col-sm-3 teacher-card">
              <Link href={`/teacher/4`}>
                <div className="card TeacherCard">
                  <div className="card-top">
                    <img
                      className="card-img TeacherImg"
                      src="/images/teacher/T1706078213.jpg"
                      alt="Card image cap"
                    />
                  </div>

                  <div className="card-body TeacherCard-body">
                    <h5 className="TeacherName">鍾家鋒</h5>
                    <p className="teacherinfo">
                      鍾家鋒是一位在蔬菜栽培領域具有豐富經驗的專家，尤其擅長使用現代溫室技術種植各種蔬菜。他的教學風格實用且互動性強，注重實地操作和技術演示，幫助學生深入理解先進的農業技術。
                    </p>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-6 col-sm-3 teacher-card">
              <Link href={`/teacher/5`}>
                <div className="card TeacherCard">
                  <div className="card-top">
                    <img
                      className="card-img TeacherImg"
                      src="/images/teacher/T1706078214.jpg"
                      alt="Card image cap"
                    />
                  </div>

                  <div className="card-body TeacherCard-body">
                    <h5 className="TeacherName">薛昱靜</h5>
                    <p className="teacherinfo">
                      薛昱靜博士在種子科技和植物育種領域有著豐富的研究經驗。她專注於作物的遺傳改良和品種改進，致力於開發更高產量和環境適應性更強的新品種。薛博士樂於分享她的研究成果，並鼓勵學生參與創新項目。
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          </div>

          <div className="d-flex justify-content-end">
            <a className="btn btn-icon d-flex align-items-center" href="/teacher">
              查看更多
              <IoIosArrowForward className="ms-1" />
            </a>
          </div>
        </Container>
      </section>

      <style jsx>
        {`
          .pointer-cursor {
            cursor: pointer;
          }

           {
            /* TeacherCard的CSS */
          }
          .TeacherCard {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
            flex: 1 0 0;
            border: 1px solid var(--grey-300, #d6d6d6);
            background: #fff;
            border-radius: 8px;
            width: 309px;
            height: 422px;
            min-width: 250px;
            max-width: 309px;
          }

          .TeacherImg {
            border-radius: 8px 8px 0 0;
            height: 247px;
          }

          .TeacherCard-body {
            display: flex;
            padding: 12px 25px 25px;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
            gap: 10px;
            align-self: stretch;
          }

          .TeacherName {
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            align-self: stretch;
            overflow: hidden;
            color: var(--primary-5, #2f4715);

            text-overflow: ellipsis;
            /* ZenKaku-h5 */
            font-family: 'Zen Kaku Gothic New';
            font-size: 20px;
            font-style: normal;
            font-weight: 700;
            line-height: normal;
            margin-bottom: 0px;
          }

          .teacherinfo {
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 4;
            align-self: stretch;
            overflow: hidden;
            color: var(--grey-700, #6b6b6b);
            text-overflow: ellipsis;
            /* ZenKaku-p/medium */
            font-family: 'Zen Kaku Gothic New';
            font-size: 16px;
            font-style: normal;
            font-weight: 700;
            line-height: normal;
            margin-bottom: 0px;
            text-decoration: none;
          }

           {
            /* ProductCard2的CSS */
          }
          .ProductCard2 {
            border-radius: 8px;
          }

          .ProductCard2Img {
            border-radius: 8px 8px 0 0;
          }

          .ProductCard2-text-container {
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 3;
            overflow: hidden;
          }

           {
            /* Lectureard1的CSS */
          }
          .Lectureard1 {
            height: 350px;
            border-radius: 8px;
          }
          .Lectureard1-img {
            height: 50%;
          }
          .Lectureard1-img2 {
            height: 100%;
            object-fit: cover;
            border-radius: 8px 8px 0 0;
          }

          @media (max-width: 1200px) {
            .Lectureard1 {
              height: auto;
            }
            .Lectureard1-img {
              height: auto;
            }
            .Lectureard1-img2 {
              height: auto;
              object-fit: cover;
            }
          }
          .Lectureard1-text-container {
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 3;
            overflow: hidden;
          }

           {
            /* ProductCardContent的CSS */
          }
          .ProductCardContent {
            width: 200px;
            border-radius: 8px;
          }

          .ProductCardContent-img-top {
            border-radius: 7px 7px 0 0;
          }

          .text-overflow {
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 3;
            overflow: hidden;
          }

          section {
            margin-block: 30px;
          }

          .slider {
            margin: 0;
            padding: 0;
          }

          .carousel {
            margin-bottom: 30px;
          }

          .carousel-control-prev,
          .carousel-control-next {
            width: 1000px;
          }

          .product-card,
          .category-card,
          .teacher-card {
            display: flex;
            justify-content: center;
            padding: 0;
            margin: 10px 0;
          }

          @media (max-width: 768px) {
            .carousel-control-prev,
            .carousel-control-next {
              display: none;
            }
          }
        `}
      </style>
    </>
  )
}
