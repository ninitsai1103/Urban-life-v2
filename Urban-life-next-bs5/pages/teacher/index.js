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
  const { teachers } = UseTeacherInfo()
  const [renderTeachers, setRenderTeachers] = useState([])

  // 搜尋
  const handleSearch = (keyword) => {
    const filteredTeachers = teachers.filter((teacher) =>
        teacher.name.toLowerCase().includes(keyword.toLowerCase()) ||
        teacher.email.toLowerCase().includes(keyword.toLowerCase()) ||
        teacher.phone.toLowerCase().includes(keyword.toLowerCase()) ||
        teacher.intro.toLowerCase().includes(keyword.toLowerCase())
    )

    setRenderTeachers(filteredTeachers) // 直接設置 renderTeachers 的狀態
  }

  // 分頁相關狀態
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const perPage = 16 //一頁幾筆資料
  const [displayedTeachers, setDisplayedTeachers] = useState([])

  //sync
  useEffect(() => {
    if (teachers.length) setRenderTeachers(teachers)
  }, [teachers])

  useEffect(() => {
    // 計算總頁數
    const totalPageCount = Math.ceil(teachers.length / perPage)
    setTotalPages(totalPageCount)
  }, [teachers])

  const sortedTeachers = [...teachers].sort((a, b) => a.id - b.id)

  useEffect(() => {
    // 當頁碼改變時，根據當前頁碼更新顯示的教師卡片
    const startIndex = (currentPage - 1) * perPage
    const endIndex = startIndex + perPage
    const currentTeachers = renderTeachers.slice(startIndex, endIndex)
    setDisplayedTeachers(currentTeachers)
  }, [currentPage, renderTeachers])

  // 頁碼改變時的處理函數
  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

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
            <Search handleSearch={handleSearch} />
          </div>
          <div className="cardgrp">
            <TeacherCardInfo teachers={displayedTeachers} />
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
            padding: 15px 20px;
            align-items: flex-start;
            align-self: stretch;
          }

          .cardgrp {
            display: flex;
            justify-content: center;
            align-items: flex-start;
            align-content: flex-start;
            gap: 20px;
            flex-wrap: wrap;
          }
        `}
      </style>
    </>
  )
}
