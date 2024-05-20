import { useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'
import { Autoplay, FreeMode, Navigation, Thumbs } from 'swiper/modules'

export default function Herosection() {
  const [thumbsSwiper, setThumbsSwiper] = useState(null)

  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 751)
    }

    // Initial check
    handleResize()

    // Event listener
    window.addEventListener('resize', handleResize)

    // Cleanup listener on component unmount
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <>
     {isMobile ? (
      // 在移动端渲染静态内容
      <div className="heroMContainer">
        <img className="centeredImageM" src="/images/heroes/heroM.jpg" />
        <span className="slideTextM">
                走，
                <br />
                往自然出發
              </span>
      </div>
    ) : (
        <Swiper
          style={{
            '--swiper-navigation-color': '#fff',
            '--swiper-pagination-color': '#fff',
            width: '100%',
            height: '90vh',
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          spaceBetween={10}
          navigation={false}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[Autoplay, FreeMode, Navigation, Thumbs]}
          className="lectureSliderBig"
          loop={true}
        >
          <SwiperSlide style={{ cursor: 'pointer' }}>
            <div className="slideContent">
              <img className="centeredImage1" src="/images/heroes/hero1.jpg" />
              <span className="slideText1">
                和我們一起
                <br />
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;與自然來場浪漫約會吧
              </span>
            </div>
          </SwiperSlide>
          <SwiperSlide style={{ cursor: 'pointer' }}>
            <div className="slideContent">
              <img className="centeredImage2" src="/images/heroes/hero2.png" />
              <span className="slideText2">
                人與自然
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;與親子
              </span>
            </div>
          </SwiperSlide>
          <SwiperSlide style={{ cursor: 'pointer' }}>
            <div className="slideContent">
              <img className="centeredImage3" src="/images/heroes/hero3.webp" />
              <span className="slideText3">親手收穫的喜悅</span>
            </div>
          </SwiperSlide>
          <SwiperSlide style={{ cursor: 'pointer' }}>
            <div className="slideContent">
              <img className="centeredImage4" src="/images/heroes/hero4.webp" />
              <span className="slideText4">
                嚴選優質農場
                <br />
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;享受當季的新鮮
              </span>
            </div>
          </SwiperSlide>
        </Swiper>
    )}

      <style jsx>
        {`
        
          .heroMContainer {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 421px;
        }

          .slideContent {
            position: relative;
          }

          .slideText1 {
            position: absolute;
            top: 250px;
            left: 200px;
            color: #fbfbfb;
            font-family: 'Zen Kaku Gothic New';
            font-size: 48px;
            font-style: normal;
            font-weight: 700;
            line-height: normal;
            padding: 5px 10px;
            border-radius: 5px;
            z-index: 1;
          }

          .slideText2 {
            position: absolute;
            top: 60px;
            right: 400px;
            color: #fbfbfb;
            font-family: 'Zen Kaku Gothic New';
            font-size: 48px;
            font-style: normal;
            font-weight: 700;
            line-height: normal;
            padding: 5px 10px;
            border-radius: 5px;
            z-index: 1;
          }

          .slideText3 {
            position: absolute;
            top: 50px;
            right: 520px;
            font-family: 'Zen Kaku Gothic New';
            font-size: 48px;
            font-style: normal;
            font-weight: 700;
            line-height: normal;
            padding: 5px 10px;
            border-radius: 5px;
            z-index: 1;
          }

          .slideText4 {
            position: absolute;
            top: 260px;
            right: 350px;
            font-family: 'Zen Kaku Gothic New';
            font-size: 48px;
            font-style: normal;
            font-weight: 700;
            line-height: normal;
            padding: 5px 10px;
            border-radius: 5px;
            z-index: 1;
          }

          .heroMContainer {
            position: relative; /* 使用相對定位 */
            display: inline-block; /* 讓容器根據內容大小調整寬度 */
          }

          .slideTextM {
            position: absolute;
            left: 33px;
            bottom: 30px;
            font-family: 'Zen Kaku Gothic New';
            font-size: 20px;
            font-style: normal;
            font-weight: 700;
            line-height: normal;
            padding: 5px 10px;
            border-radius: 5px;
            z-index: 1;
          }

          .centeredImage1 {
            max-width: 100%;
            max-height: 100%;
            width: auto;
            height: auto;
            position: relative;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -10%);
          }

          .centeredImage2 {
            max-width: 100%;
            max-height: 100%;
            width: auto;
            height: auto;
            position: relative;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -10%);
          }

          .centeredImage3 {
            max-width: 100%;
            max-height: 100%;
            position: relative;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -5%);
          }

          .centeredImage4 {
            max-width: 100%;
            max-height: 100%;
            position: relative;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -4%);
          }
        `}
      </style>
    </>
  )
}
