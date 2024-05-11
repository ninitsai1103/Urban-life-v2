import {useState, useEffect} from 'react'

export default function useCommment() {
    const [comments, setComments] = useState([]);
    useEffect(()=> {
        const fetchComment = async () => {
            try {
                const url = `http://localhost:3005/api/product_lecture_comment`
                const res = await fetch(url);
                const data = await res.json();
                console.log(data);
                if(comments){
                    const res_comments = data.data.comments
                        setComments(res_comments)
                }else{
                    console.log('回傳資料失敗');
                }
            }catch(err) {
                console.log(err);
            }
        }
        fetchComment();
    },[])
  return {comments}
}
