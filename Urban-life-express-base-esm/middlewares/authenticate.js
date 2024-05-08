// 存取`.env`設定檔案使用
import 'dotenv/config.js'
import jwt from 'jsonwebtoken'

// 獲得加密用字串
const accessTokenSecret = process.env.SECRET_KEY

// 中介軟體middleware，用於檢查授權(authenticate)
export default function authenticate(req, res, next) {
  let token = req.get('Authorization')
  console.log("token");
  if (token && token.indexOf('Bearer ') === 0) {
    token = token.slice(7)

    // 先註解掉，因為blackListedToken access不到
    // blackListedToken 可以放進資料庫
    // if (blackListedToken.includes(token)) {
    //   return res.status(401).json({ status: 'error', message: 'token已經過期' })
    // }

    jwt.verify(token, accessTokenSecret, (err, decoded) => {
      if (err) {
        return res
          .status(401)
          .json({ status: 'error', message: '登入驗證失效，請重新登入。' })
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

  // // const token = req.headers['authorization']
  // const token = req.cookies.accessToken
  // // console.log(token)

  // // if no token
  // if (!token) {
  //   return res.json({
  //     status: 'error',
  //     message: '授權失敗，沒有存取令牌',
  //   })
  // }

  // // verify的callback會帶有decoded payload(解密後的有效資料)，就是user的資料
  // jsonwebtoken.verify(token, accessTokenSecret, (err, user) => {
  //   if (err) {
  //     return res.json({
  //       status: 'error',
  //       message: '不合法的存取令牌',
  //     })
  //   }

  //   // 將user資料加到req中
  //   req.user = user
  //   next()
  // })
}
