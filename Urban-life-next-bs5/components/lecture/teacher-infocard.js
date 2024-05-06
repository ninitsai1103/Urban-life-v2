import React from 'react'

export default function TeacherCardInfo() {
  return (
    <>
      <div className="card">
        <div className="card-top">
          <img
            className="card-img"
            src="/images/teacher/T1706078211.jpg"
            alt="Card image cap"
          />
        </div>

        <div className="card-body">
          <h5 className="name">黃湘苗 講師</h5>
          <p className="teacherinfo">
            黃湘苗擁有超過25年的農業種植經驗，專精於有機農業和可持續發展。畢業於國際知名的農業科學院，在土壤管理、作物輪作及自然農法方面有深入研究。致力於推廣環保農業，黃教授經常舉辦工作坊，並在多個國際會議上發表論文。
          </p>
        </div>
      </div>

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
      `}</style>
    </>
  )
}
