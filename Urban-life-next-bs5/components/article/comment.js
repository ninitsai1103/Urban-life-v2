import React from 'react'

export default function Comment() {
  return (
    <>
      
      <div className="d-flex  mx-5 ">
        <div className=" d-flex m-3">
          <div className="img-container ">
            <img
              className="w-100  img-thumbnail"
              src="/images/article/usercomment.png"
            />
          </div>

          <p className="mx-3">王小明</p>
        </div>
        {/* usercontent  */}
        <div className="ms-3 w-100">
          <h5 className="div-7">2024/04/24 11:03</h5>
          <p className="">
            COMMENT美貓校學元肉荷怎天兌裝主化麼杯三有，士雪着原公具。娘國鴨讀里美細蛋乙送爬用占，亮讀拉來方蛋抓和固，以枝停候穴以古馬鴨安是明歌起錯隻扒石止珠，子道呢。新冰第躲話。寺荷麻巾員告要氣又教不枝童，室休頁話早汗跑斥買禾昌事英欠鳥珠！歌路別想？動雨助土尼枝才屋村？紅光羽。交已朵相花位常那個乍澡山肉畫，安乞背乞三汁，巾找中做雪孝已忍在造喜吹六娘習昔要。現細個書采王音。右頭事員爬歌。
          </p>
        </div>
      </div>

      <style jsx>{`
        .container {
          width: 1440px;
          padding: 10px;
        }
        
        {/* .border {
          border: 3px solid #d6d6d6;
        } */}

        .img-container {
          width: 92px;
          height: 92px;
          {/* position: relative; */}
          border-radius: 50%; /* 圓角 */
        }

        .img-thumbnail {
          {/* width: 100%;
          height: 100%; */}

          object-fit: cover; /* 保證圖像覆蓋整個容器，但不變形 */
          border-radius: 50%; /* 圓角 */
          
        }
      `}</style>
    </>
  )
}



