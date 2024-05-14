// 存取`.env`設定檔案使用
import 'dotenv/config.js'
import jwt from 'jsonwebtoken'

// 獲得加密用字串
const accessTokenSecret = process.env.SECRET_KEY

// 中介軟體middleware，用於檢查授權(authenticate)
export default function authenticate(req, res, next) {
  // console.log(0);
  let token = req.get('Authorization')
  // console.log(1);
  if (token && token.indexOf('Bearer ') === 0) {
    // console.log(2);
    token = token.slice(7)

    // 先註解掉，因為blackListedToken access不到
    // blackListedToken 可以放進資料庫
    // if (blackListedToken.includes(token)) {
    //   return res.status(401).json({ status: 'error', message: 'token已經過期' })
    // }
    // console.log(3);
    jwt.verify(token, accessTokenSecret, (err, decoded) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          return res
          .status(401)
          .json({ status: 'error', message: '令牌過期，請重新登入。' })
        } else {
          return res
          .status(401)
          .json({ status: 'error', message: '登入驗證失效，請重新登入。' })
        }

      } else {
        req.decoded = decoded
        req.token = token
        next()
      }
    })
  } else {
    return res
      .status(401)
      .json({ status: 'error', message: '無登入驗證資料，請重新登入。' })
  }
}