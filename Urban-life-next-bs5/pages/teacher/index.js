import React, { useState, useEffect } from 'react'
import Herosection from '@/components/lecture/herosection'
import { Container } from 'react-bootstrap'
import Search from '@/components/lecture/search'
import Page from '@/components/product/pagination'
import TeacherCardInfo from '@/components/lecture/teacher-infocard'
import { UseTeacherInfo } from '@/hooks/use-teacher'
import Link from 'next/link'

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

    // 設定 renderTeachers 並根據 id 進行排序
    setRenderTeachers(filteredTeachers.sort((a, b) => a.id - b.id))
  }

  // 分頁相關狀態
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const perPage = 16 // 一頁幾筆資料
  const [displayedTeachers, setDisplayedTeachers] = useState([])

  // 同步 teachers 狀態
  useEffect(() => {
    if (teachers.length) {
      // 設定 renderTeachers 並根據 id 進行排序
      setRenderTeachers(teachers.sort((a, b) => a.id - b.id))
    }
  }, [teachers])

  useEffect(() => {
    // 計算總頁數
    const totalPageCount = Math.ceil(renderTeachers.length / perPage)
    setTotalPages(totalPageCount)
  }, [renderTeachers])

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

  const resetSearch = () => {
    // 清空搜索關鍵字
    handleSearch("");
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
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mt-3">
              <li className="breadcrumb-item">
                <Link className="text-decoration-none" href="/">
                  首頁
                </Link>
              </li>
              <li className="breadcrumb-item activt" aria-current="page">
                <Link className="text-decoration-none" href="/teacher" onClick={resetSearch}>
                  <span style={{ color: '#87917d' }}>講師陣容</span>
                </Link>
              </li>
            </ol>
          </nav>
          <div className="search">
            <Search handleSearch={handleSearch} />
          </div><hr />
          <div className="cardgrp">
            <TeacherCardInfo teachers={displayedTeachers} />
          </div>
        </section>
        <div className="container">
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

          .breadcrumb{
            display: flex;
            padding: 15px 12px 10px 12px !important;
            align-items: flex-start;
            align-self: stretch;
            margin: 0px;
          }

          .breadcrumb-item {
            color: var(--grey-700, #6b6b6b);
            font-family: 'Zen Kaku Gothic New';
            font-size: 20px;
            font-style: normal;
            font-weight: 700;
            line-height: normal;
          }

          @media (max-width: 1200px) {
            .cardgrp {
              display: flex;
              gap: 10px;
              flex-wrap: wrap;
            }
          }
        `}
      </style>
    </>
  )
}
