// 商品評論按鈕
{!currentProduct[item.name] && (
    <button
      className="btn btn-main"
      onClick={() => {
        handleShowrating(item.name)
      }}
    >
      商品評價
    </button>
  )}
  
// 商品評論頁面
{(currentProduct[item.name] && (
    <div className="rate">
      <div className="rate-star mb-1">
        <div className="body-title">評價</div>
        {Array(5)
          .fill(1)
          .map((v, i) => {
            // 每個按鈕的分數，相當於索引+1
            const score = 1 + i

            return (
              <button
                key={i}
                className={styles['star-btn']}
                onClick={() =>
                  handleProductRatingChange(
                    item.name,
                    score
                  )
                }
                onMouseEnter={() => {
                  handleHoverRatingChange(
                    item.name,
                    score
                  )
                }}
                onMouseLeave={() => {
                  setHoverRating(0)
                }}
              >
                <span
                  className={
                    score <=
                      productRatings[item.name] ||
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
      </div>
      <div>
        {/* <div className="body-title">詳細評價</div> */}
        <input
          className="form-control p-0"
          defaultValue={productComments[item.name]}
          onChange={(e) => {
            handleProductCommentChange(
              item.name,
              e.target.value
            )
          }}
        ></input>
      </div>
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
  ))}