import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

import styles from './star.module.css'

function ProductRating({
  itemId,
  itemName,
  rating,
  comment,
  onRatingChange,
  onCommentChange,
}) {
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  return (
    <>
      <Button className="btn btn-main border-0" onClick={handleShow}>
        商品評價
      </Button>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{itemName} 評價</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="modal-body">
            <div className="rate-star">
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
                      onClick={() => onRatingChange(itemName, score)}
                      onMouseEnter={() => {
                        setHoverRating(score)
                      }}
                      onMouseLeave={() => {
                        setHoverRating(0)
                      }}
                    >
                      <span
                        className={
                          score <= rating || score <= hoverRating
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
              <div className="body-title">詳細評價</div>
              <textarea
                className="form-control"
                rows="4"
                value={comment}
                onChange={(e) => onCommentChange(itemName, e.target.value)}
              ></textarea>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="text-center">
          <Button className="btn btn-main border-0" onClick={handleSubmit}>
            送出評價
          </Button>
        </Modal.Footer>
      </Modal>
      <style jsx>{`
        input {
          z-index: 5;
        }
      `}</style>
    </>
  )
}

export default ProductRating
