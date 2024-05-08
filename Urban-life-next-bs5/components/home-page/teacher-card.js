import React from 'react'

export default function TeacherCard() {
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
          <h5 className=" fw-bold">黃湘苗</h5>
          <p className="p-0">
            黃湘苗擁有超過25年的農業種植經驗，專精於有機農業和可持續發展。畢業於國際知名的農業科學院，在土壤管理、作物輪作及自然農法方面有深入研究。致力於推廣環保農業，黃教授經常舉辦工作坊，並在多個國際會議上發表論文。
          </p>
        </div>
      </div>

      <style jsx>{`
        .card {
          
          border-radius: 8px;
        }
        
        img {
          border-radius: 8px 8px 0 0;
        }
      `}</style>
    </>
  )
}
