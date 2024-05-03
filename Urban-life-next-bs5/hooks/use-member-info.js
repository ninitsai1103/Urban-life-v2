import { useState, useEffect } from 'react';

function useMemberInfo() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const memberInfo = JSON.parse(localStorage.getItem('member-info'))
    const userId = memberInfo.id;
    if (!userId) {
      console.error('localStorage 中找不到使用者 ID');
      return;
    }

    fetch(`http://localhost:3005/api/user/${userId}`)
      .then(response => response.json())
      .then(data => {
        if (data.status === 'success') {
          setUser(data.user);
        } else {
          console.error('無法取得使用者資料:', data.message);
        }
      })
      .catch(error => {
        console.error('發生錯誤:', error);
      });
  }, []);

  return user;
}

export default useMemberInfo;
