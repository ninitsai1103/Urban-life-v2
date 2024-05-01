// pages/index.js
// 主頁面
import Link from 'next/link'
import Image from 'next/image'
import PlaceholderText from '@/components/common/placeholder-text'

// CARD
import ProductCard from '@/components/home-page/product-card'
import ProductCategoryCard from '@/components/home-page/product-category-card'
import LectureCard1 from '@/components/home-page/lecture-card1'
import LectureCard2 from '@/components/home-page/lecture-card2'
import TeacherCard from '@/components/home-page/teacher-card'

// CALENDER
import Calendar from '@/components/calender/calender'

// REACT ICON
import { IoIosArrowForward } from 'react-icons/io'
import { FaRunning } from 'react-icons/fa'

// REACT BOOTSTRAP
import Carousel from 'react-bootstrap/Carousel'
import { Container } from 'react-bootstrap'

export default function Home() {
  return (
    <>
      <section className="slider">
        <Container fluid className="p-0">
          <Carousel interval={2000}>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="/images/test/slider1.jpg"
                alt="First slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="/images/test/slider2.jpg"
                alt="Second slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="/images/test/slider3.jpg"
                alt="Third slide"
              />
            </Carousel.Item>
          </Carousel>
        </Container>
      </section>
      <section className="本月主打">
        <Container>
          <h1 className="text-center">本月主打!</h1>
          <p className="text-center">Special This Month</p>

          <div className="row">
            <div className="col product-card g-1">
              <ProductCard />
            </div>
            <div className="col product-card g-1">
              <ProductCard />
            </div>
            <div className="col product-card g-1">
              <ProductCard />
            </div>
            <div className="col product-card g-1">
              <ProductCard />
            </div>
            <div className="col product-card g-1">
              <ProductCard />
            </div>
            <div className="col product-card g-1">
              <ProductCard />
            </div>
          </div>
        </Container>
      </section>
      <section>
        <Container>
          <Calendar />
        </Container>
      </section>
      <section className="商品分類">
        <Container>
          <h1 className="text-center">商品分類</h1>
          <p className="text-center">Categories of Product</p>
          <div className="row">
            <div className="col category-card ">
              <ProductCategoryCard />
            </div>
            <div className="col category-card ">
              <ProductCategoryCard />
            </div>
            <div className="col category-card ">
              <ProductCategoryCard />
            </div>
            <div className="col category-card ">
              <ProductCategoryCard />
            </div>
            <div className="col category-card ">
              <ProductCategoryCard />
            </div>
            <div className="col category-card ">
              <ProductCategoryCard />
            </div>
          </div>
        </Container>
      </section>
      <section className="立即加入會員 好禮享不完！">
        <Container>
          <h1 className="text-center">立即加入會員 好禮享不完！</h1>
          <p className="text-center">Become a member now to get discounts！</p>

          <div className="d-flex justify-content-center mb-3">
            <img className="img-fluid" src="/images/test/slider1.jpg" />
          </div>
          <div className="d-flex justify-content-center">
            <button className="btn btn-detail w-50 d-flex justify-content-center align-items-center gap-2">
              立即加入 <FaRunning />
            </button>
          </div>
        </Container>
      </section>
      <section className="課程">
        <Container>
          <h1 className="text-center">相關課程</h1>
          <p className="text-center">Lecture</p>
          <div className="row mb-4 ">
            <div className="col-12 col-sm-6">
              <LectureCard1 />
            </div>
            <div className="col-12 col-sm-6">
              <div className="row gap-3 h-100 d-flex flex-column justify-content-between ">
                <div className="col-12 lecture-card2">
                  <LectureCard2 />
                </div>
                <div className="col-12 lecture-card2">
                  <LectureCard2 />
                </div>
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-end">
            <button className="btn btn-icon d-flex align-items-center">
              查看更多
              <IoIosArrowForward className="ms-1" />
            </button>
          </div>
        </Container>
      </section>
      <section className="講師">
        <Container>
          <h1 className="text-center">講師</h1>
          <p className="text-center">Teacher</p>
          <div className="row mb-4 d-flex justify-content-center">
            <div className="col-6 col-sm-3 teacher-card">
              <TeacherCard />
            </div>
            <div className="col-6 col-sm-3 teacher-card">
              <TeacherCard />
            </div>
            <div className="col-6 col-sm-3 teacher-card">
              <TeacherCard />
            </div>
            <div className="col-6 col-sm-3 teacher-card">
              <TeacherCard />
            </div>
          </div>

          <div className="d-flex justify-content-end">
            <button className="btn btn-icon d-flex align-items-center">
              查看更多
              <IoIosArrowForward className="ms-1" />
            </button>
          </div>
        </Container>
      </section>

      <style jsx>
        {`
          section {
            margin-block: 30px;
          }

          .slider {
            margin-top: 0px;
          }
          .slide {
            width: 100% !important;
          }
          .product-card {
            display: flex;
            justify-content: center;
            padding: 0;
            margin: 10px 0;
          }

          .category-card {
            display: flex;
            justify-content: center;
            padding: 0;
            margin: 10px 0;
          }
          .teacher-card {
            display: flex;
            justify-content: center;
            padding: 0;
            margin: 10px 0;
          }
        `}
      </style>
    </>
  )
}
