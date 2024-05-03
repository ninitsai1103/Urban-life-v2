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
          width: '100vw',
          height: '100vh',
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        spaceBetween={10}
        navigation={false}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[Autoplay, FreeMode, Navigation, Thumbs]}
        className={styles.lectureSliderBig}
        loop={true}
      >
        <SwiperSlide style={{ cursor: 'pointer' }}>
          <img className="d-block w-100" src="/images/heroes/hero1.png" />
        </SwiperSlide>
        <SwiperSlide style={{ cursor: 'pointer' }}>
          <img className="d-block w-100" src="/images/heroes/hero2.jpg" />
        </SwiperSlide>
        <SwiperSlide style={{ cursor: 'pointer' }}>
          <img className="d-block w-100" src="/images/heroes/hero3.webp" />
        </SwiperSlide>
        <SwiperSlide style={{ cursor: 'pointer' }}>
          <img className="d-block w-100" src="/images/heroes/hero4.webp" />
        </SwiperSlide>
      </Swiper>

      <style jsx>
        {`
          @media (min-width: 752px) {
            .lectureSliderBig {
              width: 100%;
              height: 100%;
            }
          }
        `}
      </style>
    </>
  )
}
