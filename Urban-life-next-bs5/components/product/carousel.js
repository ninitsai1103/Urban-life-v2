import { useState, useEffect, Fragment } from 'react';
import styles from './carousel.module.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import useProducts from '@/hooks/product/useProducts';

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
export default function Carousel({ productId }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null)
  const { products } = useProducts()
  const [img, setImg] = useState([])
  const [cover, setCover] = useState(null)
  useEffect(() => {
    // console.log("products:", products);
    // console.log("pid:", productId);
    if (productId && products.length > 0) {
      const fetchProduct = products.find(item => item.id === parseInt(productId));
      // console.log("fetchProduct:", fetchProduct);
      if (fetchProduct && fetchProduct.cover) {
        setCover(fetchProduct.cover);
      }
      if (fetchProduct && fetchProduct.img) {
        setImg(fetchProduct.img.split(';'));
      }
    }
  }, [productId, products])
  console.log(cover)
  console.log(img);
  // 條件渲染，確保 productId 和 products 都已經準備好
  if (!productId || !products.length) return null;
  const getCover = () => {
    return cover ? `/images/product/product_cover/${cover}` : '';
  }
  const getImg = () => {
    return img ? img.map(imgName => `/images/product/product_img/${imgName}`) : [];
  }
  
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
        loop={true}
      >
         {cover && (
        <SwiperSlide key='cover-0' className='wrap-img'>
          <img src={getCover()} />
        </SwiperSlide>
      )}
      {getImg().map((imageUrl, index) => (
        <SwiperSlide key={`img-${index}`} className='wrap-img'>
          <img src={imageUrl} alt={`Product Image ${index + 1}`}/>
        </SwiperSlide>
      ))}
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
         {cover && (
        <SwiperSlide key='thumb-cover-0' style={{ cursor: 'pointer' }}>
          <img src={getCover()} />
        </SwiperSlide>
      )}
      {getImg().map((imageUrl, index) => (
        <SwiperSlide key={`thumb-detail-${index}`} style={{ cursor: 'pointer' }}>
          <img src={imageUrl} alt={`Product Image ${index + 1}`}/>
        </SwiperSlide>
      ))}
      </Swiper>


    </>
  )
}
