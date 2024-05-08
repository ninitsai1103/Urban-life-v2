import React from 'react'
import { BiCategory } from 'react-icons/bi'

function Sidebar({ filter, setFilter }) {
  // const [filter, setFilter] = useState('')
  const handleFilter = (event) => {
    console.log(event.target.innerHTML)
    setFilter(event.target.innerHTML)
  }
  return (
    <div className="sidenav ">
      <div className="list-group">
        <div className="list-group-item header-color">
          <h2
            className="list-group-header fs-5 text-white rounded-top"
            aria-current="true"
          >
            <BiCategory />
            文章分類
          </h2>
        </div>

        <div
          type="button"
          className={`list-group-item list-group-item-action ${
            filter == '官方發佈' ? 'active' : ''
          }`}
          onClick={handleFilter}
        >
          官方發佈
        </div>
        <div
          type="button"
          className={`list-group-item list-group-item-action ${
            filter == '課程體驗心得' ? 'active' : ''
          }`}
          onClick={handleFilter}
        >
          課程體驗心得
        </div>
        <div
          type="button"
          className={`list-group-item list-group-item-action ${
            filter == '植栽知識' ? 'active' : ''
          }`}
          onClick={handleFilter}
        >
          植栽知識
        </div>
        <div
          type="button"
          className={`list-group-item list-group-item-action ${
            filter == '生活應用分享' ? 'active' : ''
          }`}
          onClick={handleFilter}
        >
          生活應用分享
        </div>
        <div
          type="button"
          className={`list-group-item list-group-item-action ${
            filter == '環境與植物' ? 'active' : ''
          }`}
          onClick={handleFilter}
        >
          環境與植物
        </div>
        <div
          type="button"
          className={`list-group-item list-group-item-action ${
            filter == '其他' ? 'active' : ''
          }`}
          onClick={handleFilter}
        >
          其他
        </div>
      </div>
    </div>
  )
}

export default Sidebar
