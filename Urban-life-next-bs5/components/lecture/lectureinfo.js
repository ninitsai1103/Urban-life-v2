import { useState, useEffect, useCallback } from 'react';
import styles from './lectureinfo.module.css';
import { TbStarFilled } from 'react-icons/tb';
import { BsCart3 } from 'react-icons/bs';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import useColloections from '@/hooks/product/useCollections';
import { useCheckout } from '@/hooks/use-checkout';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';

export default function LectureInfo({ lecture, collections = [] }) {
  const [isCollected, setIsCollected] = useState(false);
  const [isPastDeadline, setIsPastDeadline] = useState(false);
  const { addCollection, removeCollection } = useColloections();
  const { addItem } = useCheckout();
  const MySwal = withReactContent(Swal);

  useEffect(() => {
    // 檢查當前講座是否在收藏列表中
    const collected = collections.some(
      (item) => item.product_id === lecture.id && item.valid === 1
    );
    setIsCollected(collected);

    // 檢查是否已經超過報名截止日期
    const currentDateTime = new Date();
    const deadlineDateTime = new Date(lecture.sign_up_deadline);
    setIsPastDeadline(currentDateTime > deadlineDateTime);
  }, [collections, lecture.id, lecture.sign_up_deadline]);

  const notifySA = useCallback((title, text, icon) => {
    MySwal.fire({
      title,
      text,
      icon,
    });
  }, [MySwal]);

  const toggleCollection = useCallback(() => {
    setIsCollected((prev) => !prev);
    if (lecture && lecture.id) {
      if (isCollected) {
        removeCollection(lecture.id);
        notifySA('取消收藏', `${lecture.name}已成功取消收藏!`, 'error');
      } else {
        addCollection(lecture.id);
        notifySA('成功收藏', `${lecture.name}已成功加入您的收藏!`, 'success');
      }
    } else {
      console.error('Lecture is undefined or has no id property');
    }
  }, [isCollected, lecture, addCollection, removeCollection, notifySA]);

  const handleAddToCart = useCallback(() => {
    if (isPastDeadline) {
      MySwal.fire({
        title: '無法報名',
        text: `${lecture.name}已過報名日期`,
        icon: 'error',
      });
    } else if (lecture) {
      addItem(lecture);
      MySwal.fire({
        title: '成功加入',
        text: `${lecture.name}已成功加入購物車!`,
        icon: 'success',
      });
    }
  }, [isPastDeadline, lecture, addItem, MySwal]);

    //兆妮修正
    const [canCollect, setCanCollect] = useState(false)
    const [canBuy, setCanBuy] = useState(false)

    useEffect(() => {
      const memberInfo = JSON.parse(localStorage.getItem('member-info'))
      if (memberInfo !== null && memberInfo !== undefined) {
        setCanCollect(true)
      } else {
        setCanCollect(false)
      }
    })

    useEffect(() => {
      const memberInfo = JSON.parse(localStorage.getItem('member-info'))
      if (memberInfo !== null && memberInfo !== undefined) {
        setCanBuy(true)
      } else {
        setCanBuy(false)
      }
    })
  
    const handleReminder = () => {
      notifySA('尚未登入', '幫您轉跳登入頁面，登入後才能使用收藏功能喔！', 'error');
      setTimeout(() => {
          window.location.href = '/member/login';
      }, 3000); // 等待3秒（3000毫秒）
  }

  const youCantBuy = () => {
    notifySA('尚未登入', '幫您轉跳登入頁面，登入後才能購買喔！', 'error');
    setTimeout(() => {
        window.location.href = '/member/login';
    }, 3000); // 等待3秒（3000毫秒）
}

console.log(`${lecture.total_bought}`);
    
    //兆妮修正完畢
  return (
    <div className={styles.infocard}>
      <div className={styles.lecturename}>{lecture.name}</div>
      <div className={styles.infotext}>
        {lecture.description}
        <div className={`${styles.infotext} pt-4`}>※請詳閱下方購課須知</div>
      </div>
      <div className={styles.infogroup}>
        <div className={styles.info1}>
          <div className={styles.infotext}>NT： {lecture.price}</div>
          <div>
            <div className={styles.infotext}>
              已體驗人數：{lecture.amount} 人
            </div>
          </div>
          <div className="flex gap-2.5">
            <div className={styles.infotext}>
              評價 : {lecture.star} <TbStarFilled style={{ color: '#F6A404', fontSize: '20px' }} />
            </div>
          </div>
          <div className={styles.infotext}>開課人數上限：{lecture.amount} 人</div>
        </div>
        <div className={styles.info2}>
          <div className={styles.infotext}>開始報名：{lecture.sign_up_starting.split(' ')[0]}</div>
          <div className={styles.infotext}>報名截止：{lecture.sign_up_deadline.split(' ')[0]}</div>
          <div className={styles.infotext}>上課日期：{lecture.lecture_date.split(' ')[0]}</div>
          <div className={styles.infotext}>上課時間：{lecture.starting_time.split('.')[0]}</div>
        </div>
      </div>
      <div className="input-group mb-2 w-75">
        <div className={styles.infotext}>已報名人數：{lecture.total_bought} 人</div>
      </div>
      <div>
        <div className={styles.btnarea}>
          {canBuy ? (
            <button className="btn btn-add " onClick={handleAddToCart}>
              <BsCart3 className="me-2" style={{ fontSize: '20px' }} />
              {isPastDeadline ? '已過報名日期' : '加入購物車'}
            </button>
          ) : (
            <button className="btn btn-add " onClick={youCantBuy}>
              <BsCart3 className="me-2" style={{ fontSize: '20px' }} />
              {isPastDeadline ? '已過報名日期' : '加入購物車'}
            </button>
          )}
          {canCollect ? (
          <button className="btn btn-add " onClick={toggleCollection}>
            {isCollected ? (
              <FaHeart style={{ fontSize: '23px', cursor: 'pointer', color: '#ff4136' }} />
            ) : (
              <FaRegHeart style={{ fontSize: '23px', cursor: 'pointer', color: '#ff4136' }} />
            )}
            加入收藏
          </button>
          ):(
            <button className='btn btn-add ' onClick={handleReminder}>
              <FaRegHeart style={{ fontSize: '23px', cursor: 'pointer', color: '#ff4136' }} /> 加入收藏
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
