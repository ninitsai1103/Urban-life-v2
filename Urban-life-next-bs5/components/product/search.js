import{useState} from 'react'
import { CiSearch } from 'react-icons/ci'

export default function Search({filteredProducts, setList, setInputText}) {
  // const [inputText, setInputText] = useState("");
  //  const search = (text) => {
  //   const lowercasedText = text.toLowerCase(); //將搜索字詞都換成小寫 
  //   const searchData = filteredProducts.filter(product => 
  //     (product.name || "").toLowerCase().includes(lowercasedText)
  //   )
  //   console.log(searchData);
  //   setList(searchData);
  // }

  // const saveSerchText = (value) => {
  //   const searchText = value
  //   return searchText;
  // }


  return (
    <>
      <div className="search col-12 col-lg-5 ">
        <div className="input-group ">
          <input
            type="text"
            className="form-control"
            aria-label="Text input with button"
            // value={inputText} //綁定狀態到value
            onChange={e=>{
              setInputText(e.target.value) //直接更新父組件的狀態
             
            }}
          />
          <button className="btn p-1 " type="button" >
            <CiSearch style={{fontSize:'30px'}}
          //   onClick={e=>{
          //  setInputText(saveSerchText())
          //   }} 

            />
          </button>
          <br />
        </div>
      </div>
      <style jsx>
        {`
          .search-btn-size {
            width: 28px;
            height: 28px;
          }
        `}
      </style>
    </>
  )
}
