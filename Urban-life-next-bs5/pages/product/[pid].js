import { useEffect, useState } from 'react'
import Carousel from '@/components/product/carousel'
import Link from 'next/link'
import toast, { Toaster } from 'react-hot-toast'
import { useRouter } from 'next/router'
import { TbStarFilled, TbStar } from 'react-icons/tb'
import { AiOutlineShopping } from 'react-icons/ai'
import { BsCart3 } from 'react-icons/bs'
import { GoHeart, GoHeartFill } from 'react-icons/go'
import { MdArrowBackIosNew } from 'react-icons/md'
import useProducts from '@/hooks/product/useProducts'
import useColloections from '@/hooks/product/useCollections'
import { useCheckout } from '@/hooks/use-checkout'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export default function Detail() {
  const { products } = useProducts()
  const { collections, addCollection, removeCollection } = useColloections()

  // use to get product id by url
  const router = useRouter()
  const { pid } = router.query

  const [product, setProduct] = useState(null)
  const [isCollected, setIsCollected] = useState([]) //商品是否有被收藏

  //加入購物車
  const { addItem } = useCheckout()
  const MySwal = withReactContent(Swal)

  useEffect(() => {
    //根據pid動態路由對應商品資料
    if (pid && products.length > 0) {
      const fetchProduct = products.find(
        (item) => item.id === parseInt(pid, 10)
      )
      setProduct(fetchProduct)
    }
  }, [products])

  // init IsCollected by collection -> valid
  useEffect(() => {
    // 檢查當前商品是否在收藏列表中
    setIsCollected(
      collections.find((item) => item.product_id == pid && item.valid == 1)
    )
  }, [collections])

  //切換商品的收藏狀態
  const toggleCollection = () => {
    setIsCollected(!isCollected)
    const message = isCollected ? '商品已取消收藏!' : '商品已加入收藏!'
    toast.success(message, {})
  }

  // useEffect(()=>{
  //   console.log(isCollected);
  // }, [isCollected])

  const notifySA = (product) => {
    MySwal.fire({
      title: '成功加入',
      text: product.name + '已成功加入購物車!',
      icon: 'success',
    })
  }

  // //將商品資料傳入localstorage
  // const productLS = () => {
  //   localStorage.setItem('prouduct',)
  // }

  return (
    <>
      <div className="container ">
        <div className="row mt-5 mx-2">
          <div className="col-12">
            <Link className="text-decoration-none fs-5" href="">
              <MdArrowBackIosNew
                className="me-1 mb-1"
                style={{ fontSize: '18px' }}
              />
              返回上一頁
            </Link>
          </div>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mt-3">
              <li className="breadcrumb-item">
                <Link className="text-decoration-none" href="/product/list">
                  商品總覽
                </Link>
              </li>
              <li className="breadcrumb-item " aria-current="page">
                <Link className="text-decoration-none" href="">
                  商品主分類
                </Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                商品次分類
              </li>
            </ol>
          </nav>

          <div className=" col col-lg-7 mb-3 mb-lg-0" style={{ top: '2rem' }}>
            <Carousel productId={pid} />
          </div>

          <div className="col col-lg-5 set-font set-div-height d-flex flex-column justify-content-between">
            <h4 className="mb-3 fs-4">
              {product &&
                (pid > 440 && pid < 451
                  ? product.name
                  : `${product.name}(${product.size})`)}
            </h4>
            <p className="product-desc set-height">
              {product && product.description}
            </p>
            <p className="mb-2 pb-2 set-border">
              ※請詳閱下方照料方式說明及購買須知
            </p>
            <div className="price d-flex align-items-center mt-1 mb-3 fs-18 fw-700">
              <p className="card-text mb-0 me-3 text-color2-nohover ">
                NTD {product && product.price}
              </p>
              <p className="card-text text-delete set-text-color3">
                NTD {product && product.price + 200}
              </p>
            </div>
            <div className="star d-flex align-items-center mb-4">
              <p className="me-2 mb-0">評價</p>
              <TbStarFilled
                className=""
                style={{ color: '#F6A404', fontSize: '20px' }}
              />
              <p className="ms-1 mb-0 fs-17 padding">
                {product && product.star}
              </p>
            </div>
            {/* <div className="input-group mb-4 w-50">
              <button className="btn  btn-bg" type="button" id="button-minus"
              onClick={reduceAmount}>
                -
              </button>
              <input
                type="text"
                className="form-control text-center"
                value={amount}
                id="number-input"
              />
              <button
                className="btn d-flex justify-content-center btn-bg"
                type="button"
                id="button-plus"
                onClick={addAmount}
              >
                +
              </button>
            </div> */}
            <div>
              <Link
                className="btn btn-main btn-hover w-100 mb-3"
                href="/cart"
                onClick={() => {
                  addItem(product)
                }}
              >
                <AiOutlineShopping
                  className="me-1 mb-1"
                  style={{ fontSize: '21px' }}
                />
                立即購買
              </Link>
              <div className="d-flex justify-content-between">
                <Toaster position="top-center" reverseOrder={false} />
                <button
                  className="btn btn-add btn-hover2 "
                  onClick={() => {
                    // 呈現訊息
                    notifySA(product)
                    // notify(v.name)

                    // 加入購物車狀態
                    addItem(product)
                  }}
                >
                  <BsCart3 className="me-1 mb-1" style={{ fontSize: '17px' }} />
                  加入購物車
                </button>

                {isCollected ? (
                  <button
                    className="btn btn-add btn-hover2"
                    onClick={(e) => {
                      e.preventDefault()
                      toggleCollection()
                      removeCollection(pid)
                    }}
                  >
                    <GoHeartFill
                      className="me-1 mb-1"
                      style={{ fontSize: '19px', color: '#ff4136' }}
                    />
                    取消收藏
                  </button>
                ) : (
                  <button
                    className="btn btn-add btn-hover2"
                    onClick={(e) => {
                      e.preventDefault()
                      toggleCollection()
                      addCollection(pid)
                    }}
                  >
                    <GoHeart
                      className="me-1 mb-1"
                      style={{ fontSize: '19px' }}
                    />
                    加入收藏
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-5 mx-2">
          <div className="col-12 mb-5">
            <h4 className="text-center mb-5">商品介紹</h4>
            <div className="d-flex flex-column flex-lg-row justify-content-center align-items-center bg py-4 p-lg-5 fw-400 border-rd">
              <div className="size col-lg-5 text-center mx-auto m mb-3 mb-lg-0">
                <img
                  className=""
                  src="https://images.pexels.com/photos/4207783/pexels-photo-4207783.jpeg?auto=compress&cs=tinysrgb&w=640&h=960&dpr=1"
                />
              </div>
              <p className="text-start mb-0 my-lg-5 font-weight-light col-lg-7 set-width">
                {product && product.content}
              </p>
            </div>
          </div>

          <div className="col-12 mb-5">
            <h4 className="text-center mb-5">購買須知</h4>
            <div className="d-flex justify-content-center align-items-center bg-opacity py-4 p-lg-5 fw-400 border-rd">
              <div className="text-start mb-0 font-weight-light col-lg-7 set-width2">
                1.植栽受環境、季節因素影響導致每顆型態會有所不同,但我們皆會確保健康才出貨。
                <br />
                2.活體植栽在運送過程中仍可能有少許葉損與土撒,我們會盡力妥善包裝減少損害。
                <br />
                3.為維持品質植栽恕無提供超商取件服務配送方式一律選擇「貨運配送」。
                <br />
                4.植栽下單後3-5天工作日會出貨,寄出後2日內請務必有人收貨，若投遞不成或較遲開箱而導致植栽損壞恕不負責煩請配合留意。
                <br />
                <p className="mt-3">
                  以上說明還請您詳細參閱，如可接受再進行下單,感謝您的包容,讓我們一起快樂種植吧!
                </p>
              </div>
            </div>
          </div>

          <div className="col-12 mb-5">
            <h4 className="text-center mb-5">買家評價</h4>
            <div className=" bg py-4 px-2 py-lg-2 px-lg-4 fw-400 border-rd">
              <div className="d-flex justify-content-between align-items-center">
                <p className="mt-3">共 5 則評論</p>
                <div className="dropdown">
                  <button
                    className="btn dropdown-toggle fs-6 sort-btn d-flex justify-content-center align-items-center btn-color sort-btn-size2"
                    type="button"
                    id="dropdownMenuButton1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    排序
                  </button>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton1"
                  >
                    <li>
                      <a className="dropdown-item" href="#">
                        評價由新到舊
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        評價由舊到新
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        評價由高到低
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        評價由低到高
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <hr />
              <div>
                <div className="d-flex justify-content-start align-items-center mb-3">
                  <img
                    className="rounded-circle set-size2 me-3"
                    src="https://images.pexels.com/photos/2023384/pexels-photo-2023384.jpeg"
                  />
                  <p className="me-5 mb-0">yd***</p>
                  <p className="mb-0 grey">3天前</p>
                </div>
                <div className="star d-flex align-items-center mb-1">
                  <p className="me-2 mb-0">評價</p>
                  <TbStarFilled
                    className="padding"
                    style={{ color: '#F6A404', fontSize: '20px' }}
                  />
                  <p className="ms-1 mb-0 fs-15 ">4.7</p>
                </div>
                <p>非常喜歡，品質很好~</p>
              </div>
              <hr />
              <div>
                <div className="d-flex justify-content-start align-items-center mb-3">
                  <img
                    className="rounded-circle set-size2 me-3"
                    src="https://images.pexels.com/photos/57416/cat-sweet-kitty-animals-57416.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  />
                  <p className="me-5 mb-0">rr***</p>
                  <p className="mb-0 grey">5天前</p>
                </div>
                <div className="star d-flex align-items-center mb-1">
                  <p className="me-2 mb-0">評價</p>
                  <TbStarFilled
                    className="padding"
                    style={{ color: '#F6A404', fontSize: '20px' }}
                  />
                  <p className="ms-1 mb-0 fs-15 ">4.5</p>
                </div>
                <p>推薦用心的賣家</p>
              </div>
              <hr />
              <Link className="text-decoration-none grey-hover" href="">
                查看更多評價
              </Link>
            </div>
          </div>
          <div className="col-12 mb-5  position-relative px-0">
            <h4 className="text-center mb-5">推薦商品</h4>
            <div id="carouselExampleControls" className="carousel slide">
              <div className="carousel-inner">
                <div className="carousel-item active">
                  {/* <ProductCard product={product}/> */}
                </div>
                <div className="carousel-item">
                  {/* <ProductCard product={product} /> */}
                </div>
                {/* <!-- Additional carousel items -->  */}
              </div>
              <button
                className="carousel-control-prev d-none d-lg-block"
                type="button"
                data-bs-target="#carouselExampleControls"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next d-none d-lg-block"
                type="button"
                data-bs-target="#carouselExampleControls"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
