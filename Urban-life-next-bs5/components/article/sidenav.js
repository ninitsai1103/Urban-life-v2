import React from 'react';

function Sidebar() {
  return (
    <div className="sidenav">
      <div className="list-group">
        <button type="button" className="list-group-item list-group-item-action active" aria-current="true">
          文章分類
        </button>
        <button type="button" className="list-group-item list-group-item-action active">
          課程分享
        </button>
        <button type="button" className="list-group-item list-group-item-action">
          植栽照顧
        </button>
        {/* Add more buttons as needed */}
      </div>
    </div>
  );
}

export default Sidebar;
