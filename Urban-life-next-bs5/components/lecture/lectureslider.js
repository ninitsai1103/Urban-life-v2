import { useState } from 'react'
import styles from './lectureslider.module.css'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'
import { Autoplay, FreeMode, Navigation, Thumbs } from 'swiper/modules'

export default function Lectureslider() {
  const [thumbsSwiper, setThumbsSwiper] = useState(null)

  return (
    <>
      <Swiper
        style={{
          '--swiper-navigation-color': '#fff',
          '--swiper-pagination-color': '#fff',
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[Autoplay, FreeMode, Navigation, Thumbs]}
        className={styles.lectureSliderBig}
      >
        <SwiperSlide className="wrap-img">
          <img src="/images/lecture/lecture_1.jpg" />
        </SwiperSlide>
        <SwiperSlide className="wrap-img">
          <img src="/images/lecture/lecture_2.jpg" />
        </SwiperSlide>
        <SwiperSlide className="wrap-img">
          <img src="/images/lecture/lecture_3.jpg" />
        </SwiperSlide>
        <SwiperSlide className="wrap-img">
          <img src="/images/lecture/lecture_4.jpg" />
        </SwiperSlide>
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className={styles.lectureSlider}
      >
        <SwiperSlide style={{ cursor: 'pointer' }}>
          <img src="/images/lecture/lecture_1.jpg" />
        </SwiperSlide>
        <SwiperSlide style={{ cursor: 'pointer' }}>
          <img src="/images/lecture/lecture_2.jpg" />
        </SwiperSlide>
        <SwiperSlide style={{ cursor: 'pointer' }}>
          <img src="/images/lecture/lecture_3.jpg" />
        </SwiperSlide>
        <SwiperSlide style={{ cursor: 'pointer' }}>
          <img src="/images/lecture/lecture_4.jpg" />
        </SwiperSlide>
      </Swiper>
    </>
  )
}
