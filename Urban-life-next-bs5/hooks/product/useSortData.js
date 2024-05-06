import {useState, useMemo} from 'react'

export default function UseSortData(products, initSortConfig = { key: '', order: '' }) {
    const [sortConfig, setSortConfig] = useState( initSortConfig)

    const sortData = useMemo(() => {

     let sortItems = [...products];
      if(sortConfig.key && sortItems.length > 0){
        sortItems.sort((a, b) => {
          if(a[sortConfig.key] < b[sortConfig.key]){ //先比較要排序的屬性(price或star)
            return sortConfig.order ==='ascending' ? -1 : 1 //再根據設定的排序方向決定返回的值(-1為升序，1為降序)
          }
          if(a[sortConfig.key] > b[sortConfig.key]){ 
            return sortConfig.order === 'ascending' ? 1 : -1
          }
          return 0 //順序不變
        })
      }else{
        return products; 
      }
      console.log(sortItems);
      return sortItems
    },[products, sortConfig])
    const handleSortData = (key, order) => {
      console.log(key,order);
      setSortConfig({key, order});
      
    }
   
  return ({ sortData, handleSortData})
}
