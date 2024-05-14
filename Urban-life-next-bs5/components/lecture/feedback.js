import { useState, useEffect, Fragment } from 'react'
import { TbStarFilled } from 'react-icons/tb'
import Link from 'next/link'
import toast, { Toaster } from 'react-hot-toast'

export default function Feedback({ comments = [] }) {
  const [visibleComments, setVisibleComments] = useState(2)
  const [showAll, setShowAll] = useState(false)
  const [sortedComments, setSortedComments] = useState([])
  const [sortOption, setSortOption] = useState('newest')

  useEffect(() => {
    sortComments(sortOption)
  }, [comments, sortOption])

  const sortComments = (option) => {
    let sorted = [...comments]
    if (option === 'newest') {
      sorted.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    } else if (option === 'oldest') {
      sorted.sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
    } else if (option === 'highest') {
      sorted.sort((a, b) => b.star - a.star)
    } else if (option === 'lowest') {
      sorted.sort((a, b) => a.star - b.star)
    }
    setSortedComments(sorted)
  }

  const moreComment = () => {
    if (showAll) {
      setVisibleComments(2)
      setShowAll(false)
    } else {
      setVisibleComments(sortedComments.length)
      setShowAll(true)
    }
  }

  return (
    <>
      <div className="container">
        <div className="row">
          {sortedComments && sortedComments.length > 0 ? (
            <div className="col-12">
              <div className=" bg py-4 px-2 py-lg-2 px-lg-4 fw-400 border-rd">
                <div className="d-flex justify-content-between align-items-center">
                  <p className="mt-3">共 {sortedComments.length} 則評論</p>
                  <div className="dropdown">
                    <button
                      className="btn dropdown-toggle fs-6 sort-btn d-flex justify-content-center align-items-center btn-color sort-btn-size"
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
                        <a
                          className="dropdown-item"
                          href="#"
                          onClick={() => setSortOption('newest')}
                        >
                          評價由新到舊
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item"
                          href="#"
                          onClick={() => setSortOption('oldest')}
                        >
                          評價由舊到新
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item"
                          href="#"
                          onClick={() => setSortOption('highest')}
                        >
                          評價由高到低
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item"
                          href="#"
                          onClick={() => setSortOption('lowest')}
                        >
                          評價由低到高
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                {sortedComments.slice(0, visibleComments).map((item) => (
                  <Fragment key={item.id}>
                    <hr />
                    <div>
                      <div className="d-flex justify-content-start align-items-center mb-3">
                        <img
                          className="rounded-circle set-size2 me-3"
                          src={`http://localhost:3005/avatar/${item.img}`}
                        />
                        <p className="me-5 mb-0">{item.email}</p>
                        <p className="mb-0 grey">{item.date}</p>
                      </div>
                      <div className="star d-flex align-items-center mb-1">
                        <p className="me-2 mb-0">評價</p>
                        <TbStarFilled
                          className="padding"
                          style={{ color: '#F6A404', fontSize: '20px' }}
                        />
                        <p className="ms-1 mb-0 fs-15">{item.star}</p>
                      </div>
                      <p>{item.comment}</p>
                    </div>
                  </Fragment>
                ))}
                <hr />
                {sortedComments.length > 2 && (
                  <Link
                    className="text-decoration-none grey-hover"
                    href="#"
                    onClick={(e) => {
                      e.preventDefault()
                      moreComment()
                    }}
                  >
                    {showAll ? '收起更多評論' : '查看更多評論'}
                  </Link>
                )}
              </div>
            </div>
          ) : (
            <div className="col-12 mb-5">
              <div className="bg py-4 px-2 py-lg-2 px-lg-4 fw-400 border-rd">
                <hr />
                本課程尚未有學員評論
                <hr />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
