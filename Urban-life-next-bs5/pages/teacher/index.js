import React from 'react'
import { useState, useEffect, useMemo } from 'react'
import Herosection from '@/components/lecture/herosection'
import { Container } from 'react-bootstrap'
import Search from '@/components/lecture/search'
import Page from '@/components/product/pagination'
import Link from 'next/link'
import TeacherCardInfo from '@/components/lecture/teacher-infocard'
import { UseTeacherInfo } from '@/hooks/use-teacher'

export default function LectureHome() {
  const { teachers } = UseTeacherInfo();

  // 分頁相關狀態
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const perPage = 16; // 每頁顯示的卡片數量
  const [displayedTeachers, setDisplayedTeachers] = useState([]);

  useEffect(() => {
    // 計算總頁數
    const totalPageCount = Math.ceil(teachers.length / perPage);
    setTotalPages(totalPageCount);
  }, [teachers]);

  useEffect(() => {
    // 當頁碼改變時，根據當前頁碼更新顯示的教師卡片
    const startIndex = (currentPage - 1) * perPage;
    const endIndex = startIndex + perPage;
    const currentTeachers = teachers.slice(startIndex, endIndex);
    setDisplayedTeachers(currentTeachers);
  }, [currentPage, teachers]);

  // 頁碼改變時的處理函數
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <section className="slider">
        <Container fluid className="p-0">
          <Herosection />
        </Container>
      </section>
      <div className="container">
        <section className="section1">
          <div className="search">
            <Search />
          </div>
          <div className="cardgrp">
              <TeacherCardInfo  />
          </div>
        </section>
        <div className="container ">
          <Page
            perpages={perPage}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>

      <style jsx>
        {`
          .section1 {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            align-self: stretch;
          }

          .search {
            display: flex;
            padding: 15px 20px !important;
            align-items: flex-start;
            align-self: stretch;
          }

          .cardgrp {
            display: flex;
            width: 1280px;
            padding: 20px 50px;
            justify-content: center;
            align-items: flex-start;
            align-content: flex-start;
            gap: 50px;
            flex-wrap: wrap;
          }
        `}
      </style>
    </>
  )
}
