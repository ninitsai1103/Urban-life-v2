import {useState, useMemo} from 'react'

export default function UseSortDatas(products) {
  const [sortConfig, setSortConfig] = useState({ key: '', order: '' }) //設定初始狀態為沒有設置排序

  const sortDatas = useMemo(() => {

    let sortItems = [...products];
    if(sortConfig.key && sortItems.length > 0){ //有設定排序執行以下
      sortItems.sort((a, b) => {
        if(a[sortConfig.key] < b[sortConfig.key]){ //先比較要排序的屬性(price或star)
          return sortConfig.order ==='ascending' ? -1 : 1 //再根據設定的排序方向決定返回的值(-1為升序，1為降序)
        }
        if(a[sortConfig.key] > b[sortConfig.key]){ 
          return sortConfig.order === 'ascending' ? 1 : -1
        }
        return 0 //順序不變
      })
    }else{  //否則返回原本的products
      return products;  
    }
    return sortItems
  }, [products, sortConfig])

  const handleSortDatas = (key, order) => {
    setSortConfig({key, order});
  }
   
  return ({ sortDatas, handleSortDatas})
}
