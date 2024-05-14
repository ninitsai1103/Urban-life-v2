{comments.some(
    (comment) =>
      comment.product_lecture_id === item.product_id
  ) ? (
    comments
      .filter(
        (comment) =>
          comment.product_lecture_id ===
          item.product_id
      )
      .map((comment) => (
        <>
          <div key={comment.id}>
            <div className="rate-star mb-1">
              <div className="body-title">評價</div>
              {Array(5)
                .fill(1)
                .map((v, i) => {
                  // 每個按鈕的分數，相當於索引+1
                  const score = i + 1

                  return (
                    <button
                      key={i}
                      className={styles['star-btn']}
                    >
                      <span
                        className={
                          score <=
                          productRatings[item.name]
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
            <div className="rate-comment">
              <input
                className="form-control p-0"
                disabled
                defaultValue={
                  productComments[item.name]
                }
              ></input>
            </div>
          </div>
        </>
      ))
  ): 


  !currentLecture[item.name] ? (
    <button
      className="btn btn-main"
      type="button"
      onClick={() => {
        handleShowrating(item.name)
      }}
    >
      課程評價
    </button>
  ):(

    <div className="rate-star mb-1">
      <div className="body-title">評價</div>
      {Array(5)
        .fill(1)
        .map((v, i) => {
          // 每個按鈕的分數，相當於索引+1
          const score = i + 1

          return (
            <button
              key={i}
              className={styles['star-btn']}
              onClick={() => handleLectureRatingChange(item.name, score)}
              onMouseEnter={() => {
                handleHoverRatingChange(item.name, score)
              }}
              onMouseLeave={() => {
                setHoverRating(0)
              }}
            >
              <span
                className={
                  score <= lectureRatings[item.name] ||
                  score <= hoverRating[item.name]
                    ? styles['on']
                    : styles['off']
                }
              >
                &#9733;
              </span>
            </button>
          )
        })}
      <div>
        {/* <div className="body-title">詳細評價</div> */}
        <input
          className="form-control p-0"
          value={lectureComments[item.name]}
          onChange={(e) =>
            handleLectureCommentChange(item.name, e.target.value)
          }
        ></input>
        <button
          className="btn btn-main"
          onClick={() =>
            handleSubmit(
              productRatings[item.name],
              productComments[item.name],
              item.id
            )
          }
        >
          送出評論
        </button>
      </div>
    </div>
  )
}
