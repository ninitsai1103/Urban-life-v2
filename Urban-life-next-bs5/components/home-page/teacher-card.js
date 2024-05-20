import { useState, useEffect } from 'react'
import Link from 'next/link'
import { UseTeacherInfo } from '@/hooks/use-teacher'

export default function TeacherCard({ }) {
  const { teachers } = UseTeacherInfo()

  const limitedTeachers = teachers.slice(5, 9)
  return (
    <>
      {limitedTeachers.map((teachers) => {
        return (
          <div className="col-6 col-sm-3 teacher-card mb-3">
          <Link key={teachers.id} href={`/teacher/${teachers.id}`} style={{ textDecoration: 'none' }}>
            <div className="card" key={teachers.id}>
              <div className="card-top">
                <img
                  className="card-img"
                  src={`/images/teacher/${teachers.img}`}
                  alt="Card image cap"
                />
              </div>
              <div className="card-body">
                <h5 className="name">{teachers.name} 講師</h5>
                <p className="teacherinfo">{teachers.intro}</p>
              </div>
            </div>
          </Link>
          </div>
        )
      })}

      <style jsx>{`
        .card {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          flex: 1 0 0;
          border: 1px solid var(--grey-300, #d6d6d6);
          background: #fff;
          border-radius: 8px;
          width: 309px;
          height: 422px;
          min-width: 210px;
          max-width: 309px;
        }

        img {
          border-radius: 8px 8px 0 0;
          height: 247px;
        }

        .card-body {
          display: flex;
          padding: 12px 25px 25px;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          gap: 10px;
          align-self: stretch;
        }

        .name {
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
          align-self: stretch;
          overflow: hidden;
          color: var(--primary-5, #2f4715);

          text-overflow: ellipsis;
          /* ZenKaku-h5 */
          font-family: 'Zen Kaku Gothic New';
          font-size: 20px;
          font-style: normal;
          font-weight: 700;
          line-height: normal;
          margin-bottom: 0px;
        }

        .teacherinfo {
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 4;
          align-self: stretch;
          overflow: hidden;
          color: var(--grey-700, #6b6b6b);
          text-overflow: ellipsis;
          /* ZenKaku-p/medium */
          font-family: 'Zen Kaku Gothic New';
          font-size: 16px;
          font-style: normal;
          font-weight: 700;
          line-height: normal;
          margin-bottom: 0px;
        }

        @media (max-width: 1200px) {
          .card {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
            border: 1px solid var(--grey-300, #d6d6d6);
            background: #fff;
            border-radius: 8px;
            width: 198px;
            height: 410px;
            min-width: 198px;
        }

        .card-body {
          display: flex;
          padding: 10px 15px 15px;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          gap: 10px;
          align-self: stretch;
        }

        .card-top {
          height: 100%;
        }
      }
      `}</style>
    </>
  )
}

