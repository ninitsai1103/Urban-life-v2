import {useState, useMemo} from 'react'

export default function UseSortData(produccts, sortKey, sortOrder) {
    const [sortConfig, setSortConfig] = useState(produccts, sortKey, sortOrder)

    const sortData = useMemo(() => {
     
      if(sortKey){
        sortItems.sort((a, b) => {
          if(a[sortKey] < b[sortKey]){ //先比較要排序的屬性(price或star)
            return sortOrder ==='ascending' ? -1 : 1 //再根據設定的排序方向決定返回的值(-1為升序，1為降序)
          }
          if(a[sortKey] > b[sortKey]){ 
            return sortOrder === 'ascending' ? 1 : -1
          }
          return 0 //順序不變
        })
      }
      return sortItems
    },[produccts, sortConfig])
    const handleSortData = (sortKey, sortOrder) => {
      setSortConfig({sortKey, sortOrder});
    }

  return ({ sortData, sortConfig, handleSortData})
}
