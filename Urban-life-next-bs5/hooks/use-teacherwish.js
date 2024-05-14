import { useState, useEffect } from 'react';

const useTeacherWish = () => {
  const [TeacherWish, setTeacherWish] = useState([]);


  useEffect(() => {
    const fetchTeacherWish = async () => {
        try {
            const url = `http://localhost:3005/api/teacher-wish`
            const res = await fetch(url);
            const data = await res.json();
            console.log(data);
            const TeacherWish = data.data.TeacherWish
            if (Array.isArray(TeacherWish)) {
                setTeacherWish(TeacherWish)
            } else {
              console.log('伺服器回傳資料類型錯誤，無法設定到狀態中');
            }
          } catch (e) {
            console.log(e);
          }
    };

    fetchTeacherWish();
  }, []);

  return { TeacherWish }; 
};

export default useTeacherWish;
