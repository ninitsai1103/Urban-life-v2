import React from 'react'
import styles from "./product-category-card.module.css"

export default function ProductCategoryCard() {
  return (
    <>
      <div className={`card ${styles.card}`}  >
        <div className={`card-img ${styles.cardImg}`}>
          <img
            src="/images/product/list/product.jpg"
            className={`card-img-top ${styles.cardImgTop}`}
          />
        </div>

        <div className={`card-body text-white ${styles.cardBody} text-center`}>
          <h5 className="card-title">資材</h5>
          <p className="card-text">Materials</p>
        </div>
      </div>

      
    </>
  )
}
