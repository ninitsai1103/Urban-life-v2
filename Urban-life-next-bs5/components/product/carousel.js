import { useState } from 'react';
// Import Swiper React components
import styles from './carousel.module.css';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'

// import required modules
import { Autoplay, FreeMode, Navigation, Thumbs } from 'swiper/modules'

// 範例出處
// https://swiperjs.com/demos#thumbs-gallery
// https://codesandbox.io/s/k3cyyc
export default function Carousel() {
  const [thumbsSwiper, setThumbsSwiper] = useState(null)

  return (
    <>
      <Swiper
        style={{
          '--swiper-navigation-color': '#fff',
          '--swiper-pagination-color': '#fff', 
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[Autoplay, FreeMode, Navigation, Thumbs]}
        className={styles.mySwiper2}
      >
        <SwiperSlide className='wrap-img'>
          <img src="/images/product/slide/p1.jpg" />
        </SwiperSlide>
        <SwiperSlide className='wrap-img'>
          <img src="/images/product/slide/p2.jpg" />
        </SwiperSlide>
        <SwiperSlide className='wrap-img'>
          <img src="/images/product/slide/p3.jpg" />
        </SwiperSlide>
        <SwiperSlide className='wrap-img'>
          <img src="/images/product/slide/p4.jpg" />
        </SwiperSlide>
        <SwiperSlide className='wrap-img'>
          <img src="/images/product/slide/p5.jpg" />
        </SwiperSlide>
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className={styles.mySwiper}
        
      >
        <SwiperSlide style={{ cursor: 'pointer' }}>
          <img src="/images/product/slide/p1.jpg" />
        </SwiperSlide>
        <SwiperSlide style={{ cursor: 'pointer' }}>
          <img src="/images/product/slide/p2.jpg" />
        </SwiperSlide>
        <SwiperSlide style={{ cursor: 'pointer' }}>
          <img src="/images/product/slide/p3.jpg" />
        </SwiperSlide>
        <SwiperSlide style={{ cursor: 'pointer' }}>
          <img src="/images/product/slide/p4.jpg" />
        </SwiperSlide>
        <SwiperSlide style={{ cursor: 'pointer' }}>
          <img src="/images/product/slide/p5.jpg" />
        </SwiperSlide>
      </Swiper>
    
      
    </>
  )
}
