import React from 'react'
import TeacherAsideAccount from '@/components/member/teacher-aside-account'
import { Nav, Tab } from 'react-bootstrap'

export default function LectureManagement() {
  return (
    <>
      <div className="container">
        <div className="row teacher-lecture-management">
          <div className="col-lg-3 col-md-12 teacher-aside">
            <TeacherAsideAccount />
          </div>
          <div className="col-lg-9 col-md-12 teacher-lecture">
            <div className="teacher-text-title">我的課程</div>
            <Tab.Container
              id="tabs-example"
              defaultActiveKey="first"
              className=""
            >
              <div className="row">
                <div className="col">
                  <Nav fill variant="tabs" defaultActiveKey="/home">
                    <Nav.Item>
                      <Nav.Link eventKey="first">我的課程</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="second">課程許願池</Nav.Link>
                    </Nav.Item>
                  </Nav>
                </div>
              </div>
              <Tab.Content>
                <Tab.Pane eventKey="first">

                  
                  <table className="table coures_table">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">First</th>
                        <th scope="col">Last</th>
                        <th scope="col">Handle</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">1</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                      </tr>
                      <tr>
                        <th scope="row">2</th>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                      </tr>
                      <tr>
                        <th scope="row">3</th>
                        <td colspan="2">Larry the Bird</td>
                        <td>@twitter</td>
                      </tr>
                    </tbody>
                  </table>
                  
                </Tab.Pane>
                <Tab.Pane eventKey="second">
                  <p>This is the content of the second tab.</p>
                </Tab.Pane>
              </Tab.Content>
            </Tab.Container>
          </div>
        </div>
      </div>

      <style jsx>{`
        .teacher-lecture-management {
          margin: 20px;
          padding: 33px 0;
        }

        .teacher-lecture {
          padding: 30px 0px;
          background-color: #ffffff;
          border-radius: 8px;
          border: 1px solid #ccc;
        }

        .teacher-text-title {
          padding: 0px 70px;
          font-size: 36px;
          font-weight: bold;
          margin-bottom: 40px;
        }

        .coures_table{
          margin:0px 70px;
          font-size: 10px;
          
        }

        @media (max-width: 992px) {
          .teacher-aside {
            padding: 0px;
            margin-bottom: 40px;
          }
        }
      `}</style>
    </>
  )
}
