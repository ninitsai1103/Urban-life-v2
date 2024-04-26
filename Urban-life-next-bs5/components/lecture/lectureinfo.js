import * as React from 'react'
import styles from './lectureinfo.module.css'
import { TbStarFilled } from 'react-icons/tb'
import { AiOutlineShopping } from 'react-icons/ai'
import { BsCart3 } from 'react-icons/bs'
import { GoHeart } from 'react-icons/go'

export default function LectureInfo() {
  return (
    <>
      <div className="col col-lg-5 set-font set-div-height d-flex flex-column justify-content-between">
        <h4 className="mb-3 fs-4">生機農法-插秧體驗</h4>
        <p className="product-desc set-height">
          鋤禾日當午，汗滴禾下土，體驗非機械式插秧，以雙手和雙腳深刻體驗土地的活力~!
        </p>
        <p className="mb-2 pb-2 set-border">※請詳閱下方購課須知</p>

        <div className="mt-9 w-full bg-white bg-opacity-0 max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col max-md:gap-0">
            <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
              <div className="flex flex-col grow justify-center px-5 text-2xl font-bold text-neutral-500 max-md:mt-6">
                <div className={styles.infotext}>NT： 888 </div>
                <div className="flex gap-2.5 font-medium">
                            <div className={styles.infotext}><img
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/d3c2f7f38bd5ecac06bed75055428d2f11131e5b875663805124a8c6c6b704c4?"
                                className={styles.icon}
                            /> 體驗人數：1000人</div>
                        </div>
                <div className="flex gap-2.5 whitespace-nowrap">
                <div className={styles.infotext}>
              評價 : 4.8 <TbStarFilled style={{ color: '#F6A404', fontSize: '20px' }} />
            </div>
                </div>
                <div className={styles.infotext}>報名人數：</div>
              </div>
            </div>
            <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
              <div className="flex flex-col grow justify-center px-5 text-2xl font-bold whitespace-nowrap text-neutral-500 max-md:mt-6">
                <div className={styles.infotext}>開課日期</div>
                <div className={styles.infotext}>開始時間</div>
                <div className={styles.infotext}>結束時間</div>
                <div className={styles.infotext}>全日行程</div>
              </div>
            </div>
          </div>
        </div>

        <div className="price d-flex align-items-center mt-1 mb-3 fs-18 fw-700">
          <p className="card-text mb-0 me-3 text-color2-nohover ">NTD 300</p>
          <p className="card-text text-delete set-text-color3">NTD 400</p>
        </div>
        <div className="star d-flex align-items-center mb-4">
          <p className="me-2 mb-0">評價</p>
          <TbStarFilled
            className=""
            style={{ color: '#F6A404', fontSize: '20px' }}
          />
          <p className="ms-1 mb-0 fs-17 padding">4.7</p>
        </div>
        <div className="input-group mb-4 w-50">
          <button className="btn  btn-bg" type="button" id="button-minus">
            -
          </button>
          <input
            type="text"
            className="form-control text-center"
            value="1"
            id="number-input"
          />
          <button
            className="btn d-flex justify-content-center btn-bg"
            type="button"
            id="button-plus"
          >
            +
          </button>
        </div>
        <div>
          <button className="btn btn-main btn-hover w-100 mb-3">
            <AiOutlineShopping
              className="me-1 mb-1"
              style={{ fontSize: '21px' }}
            />
            立即購買
          </button>
          <div className="d-flex justify-content-between">
            <button className="btn btn-add btn-hover2  ">
              <BsCart3 className="me-1 mb-1" style={{ fontSize: '17px' }} />
              加入購物車
            </button>
            <button className="btn btn-add btn-hover2  ">
              <GoHeart className="me-1 mb-1" style={{ fontSize: '19px' }} />
              加入收藏
            </button>
          </div>
        </div>
      </div>
      <div className={styles.infocard}>
        <div className="w-full text-4xl font-bold text-lime-900 max-md:max-w-full">
          生機農法-插秧體驗
        </div>
        <div className="mt-9 w-full text-2xl font-bold text-neutral-500 max-md:max-w-full">
          鋤禾日當午，汗滴禾下土，體驗非機械式插秧，以雙手和雙腳深刻體驗土地的活力~!
          <br /> <br />
          ※請詳閱下方購課須知
        </div>
        <div className="mt-9 w-full bg-white bg-opacity-0 max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col max-md:gap-0">
            <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
              <div className="flex flex-col grow justify-center px-5 text-2xl font-bold text-neutral-500 max-md:mt-6">
                <div>NT： 888 </div>
                <div className="flex gap-2.5 mt-5 whitespace-nowrap">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/e90385dd2fc70f84c9f7ab56c5cd2c2d423ac035fd39799f5abd4053c3af80bd?apiKey=5675ca76094a4dbb93b999b9c5c7677d&"
                    className="shrink-0 my-auto w-6 aspect-[0.83]"
                  />
                  <div>體驗人數</div>
                </div>
                <div className="flex gap-2.5 mt-5 whitespace-nowrap">
                  <div>評價</div>
                  <div className="flex gap-1 pr-9">
                    <div>4.8</div>
                    <TbStarFilled
                      className=""
                      style={{ color: '#F6A404', fontSize: '20px' }}
                    />
                  </div>
                </div>
                <div className="mt-3">報名人數：</div>
              </div>
            </div>
            <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
              <div className="flex flex-col grow justify-center px-5 text-2xl font-bold whitespace-nowrap text-neutral-500 max-md:mt-6">
                <div>開課日期</div>
                <div className="mt-5">開始時間</div>
                <div className="mt-5">結束時間</div>
                <div className="mt-5">全日行程</div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-5 justify-between self-start px-5 mt-9 font-bold whitespace-nowrap text-neutral-500">
          <div className="text-2xl">報名人數</div>
          <div className="flex flex-col justify-center my-auto text-base">
            <div className="flex gap-5 justify-between px-2 py-1 border border-solid bg-zinc-50 border-neutral-400">
              <div>－</div>
              <div className="self-start">1</div>
              <div>+</div>
            </div>
          </div>
        </div>
        <div className="self-start mt-2 text-xl text-neutral-500">
          ※單筆購課最多五人，請注意
        </div>
        <div className="flex gap-3.5 justify-center mt-9 text-xl font-bold text-right text-white whitespace-nowrap max-md:flex-wrap">
          <div className="flex gap-4 justify-center px-6 py-4 bg-orange-400 rounded-[100px] max-md:px-5">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/7db006aa473aeab609f9c8fb83f427c55bebf8315b44d71147902d1a1fbe5e46?apiKey=5675ca76094a4dbb93b999b9c5c7677d&"
              className="shrink-0 my-auto w-6 aspect-[1.2] fill-zinc-50"
            />
            <div>加入購物車</div>
          </div>
          <div className="flex flex-1 gap-4 justify-center px-6 py-4 bg-orange-400 rounded-[100px] max-md:px-5">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/675f36ef5fbdf5592308608dfff72a10041d113b1cee26b467faa6a4e69a4350?apiKey=5675ca76094a4dbb93b999b9c5c7677d&"
              className="shrink-0 my-auto aspect-[1.28] fill-zinc-50 w-[23px]"
            />
            <div>收藏課程</div>
          </div>
        </div>
      </div>
    </>
  )
}
