export default function MyFooter() {
  return (
    <>
      <div className="footer">
        <div className="container">
          <div className="row">
            <div className="col-sm-3  footer-left logo">
              <img className="img-fluid" src="/images/logo/logo.png" alt="" />
            </div>
            <div className="col-sm-9  footer-right">
              <div className="row">
                <div className="col-2 blank-col"></div>
                <div className="col-lg-2 col-md-3 col-5 ">
                  <ul>
                    <li className="mb-1">
                      <span className="fw-bold">關於我們</span>
                    </li>
                    <li>關於城市生機</li>
                    <li>加入城市生機</li>
                    <li className="mb-1">成為講師</li>
                  </ul>
                </div>
                <div className="col-lg-2 col-md-3 col-5">
                  <ul>
                    <li className="mb-1">
                      <span className="fw-bold">條款及政策</span>
                    </li>
                    <li>使用條款</li>
                    <li>服務條款</li>
                    <li className="mb-1">隱私權政策</li>
                  </ul>
                </div>
                <div className="col-lg-2 col-md-3 col-5">
                  <ul>
                    <li className="mb-1">
                      <span className="fw-bold">買家指南</span>
                    </li>
                    <li>問與答</li>
                    <li>購物須知</li>
                    <li className="mb-1">退換貨政策</li>
                  </ul>
                </div>
                <div className="col-lg-2 col-md-3 col-5">
                  <ul>
                    <li className="mb-1">
                      <span className="fw-bold">聯絡我們</span>
                    </li>
                    <li>顧客服務</li>
                    <li className="mb-1">商務合作</li>
                  </ul>
                </div>
                <div className="col-lg-2 col-md-3 col-5">
                  <ul>
                    <li className="mb-1">
                      <span className="fw-bold">社群平台</span>
                    </li>
                    <li>Facebook</li>
                    <li>Instagram</li>
                    <li className="mb-1">Line官方帳號</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .footer {
          background: #445c2d;
          padding-top: 50px;
          padding-bottom: 80px;
        }
        .footer-left {
          margin-left: 30px;
        }
        .logo {
          width: 176px;
          height: 50px;
        }

        .footer-right ul {
          list-style: none;
          display: flex;
          flex-direction: column;

          li {
            display: inline;
            color: white;
            max-width: 110px;
            padding: 5px;
            font-weight: 100;
            a {
              text-decoration: none;
            }
          }
        }

        li:hover {
          color: #f3b454;
          border-bottom: 1px solid #f3b454;
          transition: 0.2s;
        }

        @media (max-width: 1200px) {
          .blank-col {
            display: none;
          }

          .footer-left {
            margin-left: 65px;
            margin-bottom: 30px;
          }

          .footer-right {
            .row {
              display: flex;
              justify-content: space-between;
              margin-left: 40px;
              margin-right: 45px;
            }
          }
        }
      `}</style>
    </>
  )
}
