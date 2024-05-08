import React from 'react'
import { useState, useEffect, useMemo } from 'react'
import Herosection from '@/components/lecture/herosection'
import { Container } from 'react-bootstrap'
import Search from '@/components/lecture/search'
import TeachersCard from '@/components/lecture/teacherscard'
import Page from '@/components/product/pagination'

export default function LectureHome() {

  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const perpages = 12

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
            <Search />
          </div>
          <div className="cardgrp">
            <TeachersCard />
            <TeachersCard />
            <TeachersCard />
            <TeachersCard />
            <TeachersCard />
            <TeachersCard />
            <TeachersCard />
            <TeachersCard />
            <TeachersCard />
            <TeachersCard />
            <TeachersCard />
            <TeachersCard />
            <TeachersCard />
            <TeachersCard />
            <TeachersCard />
            <TeachersCard />
          </div>
        </section>
        <div className="container ">
          <Page
            perpages={perpages}
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