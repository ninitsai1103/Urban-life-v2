import React, { useState } from 'react'

export default function Safeinfo() {
  const [activeIndex, setActiveIndex] = useState('課程特殊提醒')

  const safeInfoClick = (index) => {
    setActiveIndex(index)
  }

  return (
    <>
      <div className="">
        <div className="">
          <div className="safeinfo">
            <ul className="nav nav-underline ul-margin">
              <li
                className={`nav-item col ${
                  activeIndex === '課程特殊提醒' ? 'active' : ''
                }`}
              >
                <button
                  className="nav-link"
                  onClick={() => safeInfoClick('課程特殊提醒')}
                >
                  課程特殊提醒
                </button>
              </li>
              <li
                className={`nav-item col ${
                  activeIndex === '安全守則' ? 'active' : ''
                }`}
              >
                <button
                  className="nav-link"
                  onClick={() => safeInfoClick('安全守則')}
                >
                  安全守則
                </button>
              </li>
            </ul>

            <div className="mb-3">
              {activeIndex === '課程特殊提醒' ? (
                <div className="">
                  ☆本課程需滿 20
                  人以上方可成行。(將於出發日前二天給予行前說明資料)
                  <br />
                  ☆如有身體不適請自備個人隨身藥品：如暈車藥、感冒藥、防蚊蟲液...等。
                  <br />
                  ☆請勿攜帶寵物及危險物品參與課程，感謝您的配合。
                  <br />
                  ☆請於規定時間內準時集合，行程中如學員因個人因素私自脫隊或集合不到，本公司不予退費。
                  <br />
                  ☆以上行程載明之車行時間僅供參考，因路況或假日遊客眾多行程順序將視情況前後更動。
                  <br />
                  ☆線上預約並非保證訂位成功，仍需以客服人員回覆確認為準。
                  <br />
                  ☆若遇天候不佳或不可抗拒之因素，本公司保有取消或變更行程的權利。
                  <br />
                  ☆旅客同意，本商品經訂購付款後，如要取消或延期所衍生之費用需學員自行負責。
                  <br />
                  ☆報名確認：本訂單經客服人員確認回覆後始可生效，除七日內需作保證訂位之規定外，並視同雙方同意簽署國內旅遊定型化契約書，敬請學員先行詳閱該契約書內容。
                </div>
              ) : (
                <div className="">
                  為了您在本次旅遊途中本身的安全，我們特別請您遵守下列事項，這是我們應盡告知的責任，也是保障您的權益。
                  <br />
                  (1).講師將於團體集合地接待學員，辦理劃位手續及相關事宜說明。(澎金馬離島，因不派隨團講師，相關參團說明將於抵達目的地後由當地導遊為您服務)。
                  <br />
                  (2).行程正確飯店、火車（飛機）班次，均以客服人員回覆為主，不便之處，敬請見諒。
                  <br />
                  (3).行程費用不包含講師及司機費用。
                  <br />
                  (4).旺季期間交通資源有限(飛機、遊覽車、船資)，以當天旅遊行程進行順利為原則，將會做行程前後調整，不便之處，敬請見諒。(但行程內容均會走完)
                  <br />
                  (5).團體活動，請務必準時集合，當日遲到或不到視同放棄，並且無法退款。
                  <br />
                  (6).您的安全是最重要的，請隨時注意自身的安全。如有身體不適或其他症狀，請立刻通知服務人員。
                  <br />
                  (7).請勿攜帶寵物同行，以維護公共衛生、預防傳染病發生。(車輛、飯店、餐廳均會拒絕寵物進入，導盲犬除外)
                  <br />
                  (8).請攜帶：換洗衣物、遮陽傘帽、禦寒外套(預防車上冷氣太冷、山區氣溫較低)、相機、電池、充電器、個人醫藥(暈車船藥、感冒藥)等。並建議穿著輕裝便鞋，方便旅遊活動進行。
                  <br />
                  (9).外出旅遊請隨時補充水分。
                  <br />
                  (10)連續假期旅遊人數眾多，旅途中難免有服務不週之處，例如用餐時補菜速度一定比不上夾菜速度，如果飯店上菜太慢，您可直接向講師(導遊)反映，千萬不要生氣而影響旅遊興致。其他像是飯店分配鑰匙、入園購票、換搭其他交通工具時經常會有等待時間，也請事先諒解！
                  <br />
                  (11)旅行社人員及講師(導遊)無法提供內服藥物給各位旅客服用，請自行備足暈車藥與個人藥品！
                  <br />
                  (12)如有發放票劵，請一一檢查各種票劵（如火車票、門票等）是否齊全，若有不齊請通知講師。
                  <br />
                  (13)夜間或自由活動時間，如需自行活動，請告知講師(導遊)及團友，並應特別注意安全。
                  <br />
                  (14)行走陡峭之路請謹慎小心。
                  <br />
                  (15)切記在公共場合財不露白，購物時也勿當眾取出整疊鈔票。
                  <br />
                  (16)遵守講師(導遊)所宣布的觀光區、餐廳、飯店、遊樂設施等各種場所的注意事項。
                  <br />
                  (17)團體需一起活動，途中若要離隊需徵得講師(導遊)同意以免發生意外。
                  <br />
                  (18)為了您與其他旅客的健康，由於遊覽車上屬密閉式空間，如身體不適請自行斟酌戴上口罩。
                  <br />
                  (19)為了更安心舒適的旅程，提醒您於每次遊覽車發車前繫妥安全帶，如有需要協助的地方也請告知隨車服務人員，謝謝！
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .safeinfo {
          padding: 0px 20px;
          background-color: #ffffff;
          border-radius: 8px;
          border: 1px solid #ccc;
        }

        .ul-margin {
          margin-top: 10px;
          margin-bottom: 20px;
        }

        .nav-item {
          text-align: center;
        }
        .nav-link {
          width: 100%;
          color: var(--primary-5, #2f4715);

          /* ZenKaku-h3 */
          font-family: 'Zen Kaku Gothic New';
          font-size: 36px;
          font-style: normal;
          font-weight: 700;
          line-height: normal;
        }
        .nav-item button:hover {
          color: #bd9250;
        }
        .nav-item.active .nav-link {
          color: #bd9250 !important;
          border-bottom-color: #bd9250 !important;
        }

        .lecture_body_window {
          height: 100vh;
        }

        @media (max-width: 768px) {
          .teacher-text-title {
            display: none;
          }
          .teacher-lecture {
            padding: 0px;
            background-color: #ebe3db;
            border: none;
          }
          .add-lecture-btn {
            margin-left: auto;
            margin-right: 0px;
          }
        }
      `}</style>
    </>
  )
}
