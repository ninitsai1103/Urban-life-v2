import { useState, useEffect } from 'react';

const useTeacherLectures = () => {
  const [lectures, setLectures] = useState([]);


  useEffect(() => {
    const fetchLectures = async () => {
        try {
            const url = `http://localhost:3005/api/teacher-lecture`
            const res = await fetch(url);
            const data = await res.json();
            console.log(data);
            const lectures = data.data.lectures
            if (Array.isArray(lectures)) {
                setLectures(lectures)
            } else {
              console.log('伺服器回傳資料類型錯誤，無法設定到狀態中');
            }
          } catch (e) {
            console.log(e);
          }
    };

    fetchLectures();
  }, []);

  return { lectures }; 
};

export default useTeacherLectures;
