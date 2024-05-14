 {/* 商品評價Modal */}
 <div
 className="modal fade"
 id="ProductRate"
 tabIndex={-1}
 aria-labelledby="RateLabel"
 aria-hidden="true"
>
 <div className="modal-dialog modal-lg modal-dialog-centered ">
   <div className="modal-content modal-content-padding">
     <div className="modal-header border-0">
       <div className="header-title">商品名稱-評價</div>
       <button
         type="button"
         className="btn-close"
         data-bs-dismiss="modal"
         aria-label="Close"
       />
     </div>
     <div className="modal-body">
       <div className="rate-star">
         <div className="body-title">評價</div>
         <div className="">
           {/* STAR RATING */}
           {Array(5)
             .fill(1)
             .map((v, i) => {
               // 每個按鈕的分數，相當於索引+1
               const score = i + 1

               return (
                 <button
                   key={i}
                   className={styles['star-btn']}
                   onClick={() => {
                     // 點按後設定分數
                     setProductRating(score)
                   }}
                   onMouseEnter={() => {
                     setHoverRating(score)
                   }}
                   onMouseLeave={() => {
                     setHoverRating(0)
                   }}
                 >
                   <span
                     className={
                       score <= productRating || score <= hoverRating
                         ? styles['on']
                         : styles['off']
                     }
                   >
                     &#9733;
                   </span>
                 </button>
               )
             })}
         </div>
       </div>
       <div>
         <div className="body-title">詳細評價</div>
         <textarea
           className="form-control"
           rows="4"
           value={productComment}
           onChange={handleProductTextAreaChange}
         ></textarea>
       </div>
     </div>
     <div className="modal-footer d-flex justify-content-center border-0">
       <button type="button" className="btn btn-main">
         送出評價
       </button>
     </div>
   </div>
 </div>
</div>
{/* 課程評價Modal */}
<div
 className="modal fade"
 id="LectureRate"
 tabIndex={-1}
 aria-labelledby="RateLabel"
 aria-hidden="true"
>
 <div className="modal-dialog modal-lg modal-dialog-centered ">
   <div className="modal-content modal-content-padding">
     <div className="modal-header border-0">
       <div className="header-title">課程名稱-評價</div>
       <button
         type="button"
         className="btn-close"
         data-bs-dismiss="modal"
         aria-label="Close"
       />
     </div>
     <div className="modal-body">
       <div className="rate-star">
         <div className="body-title">評價</div>
         <div className="">
           {/* STAR RATING */}
           {Array(5)
             .fill(1)
             .map((v, i) => {
               // 每個按鈕的分數，相當於索引+1
               const score = i + 1

               return (
                 <button
                   key={i}
                   className={styles['star-btn']}
                   onClick={() => {
                     // 點按後設定分數
                     setLectureRating(score)
                   }}
                   onMouseEnter={() => {
                     setHoverRating(score)
                   }}
                   onMouseLeave={() => {
                     setHoverRating(0)
                   }}
                 >
                   <span
                     className={
                       score <= lectureRating || score <= hoverRating
                         ? styles['on']
                         : styles['off']
                     }
                   >
                     &#9733;
                   </span>
                 </button>
               )
             })}
         </div>
       </div>
       <div>
         <div className="body-title">詳細評價</div>
         {/* 課程評論的欄位 */}
         <textarea
           className="form-control"
           rows="4"
           value={lectureComment}
           onChange={handleLectureTextAreaChange}
         ></textarea>
       </div>
     </div>
     <div className="modal-footer d-flex justify-content-center border-0">
       <button type="button" className="btn btn-main">
         送出評價
       </button>
     </div>
   </div>
 </div>
</div>