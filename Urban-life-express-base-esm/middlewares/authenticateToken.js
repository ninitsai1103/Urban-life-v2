import jwt from 'jsonwebtoken';
import 'dotenv/config.js'
// import redisClient from '../redisClient.js'
// 定義身份驗證中間件函式 authenticateToken
const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];// 從請求頭中獲取授權標頭
  const token = authHeader?.split(' ')[1];// 從授權標頭中獲取令牌
  // console.log(token)
  if (!token) {// 如果沒有令牌
    return res.json({
      status: 'error',
      message: '授權失敗，沒有存取令牌',// 返回錯誤消息給用戶
    })
  }
  try {
    const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);// 驗證令牌的有效性並解碼其中的用戶信息
    // console.log(user.id)
    // 附加到 req 上讓後續路由可以使用
    req.user = user;// 將解碼後的用戶信息附加到請求對象上，以便後續的路由處理程序可以使用
    next();// 呼叫下一個中間件或路由處理程序
  } catch (error) {// 如果解碼或驗證令牌時出現錯誤
    if (error instanceof jwt.TokenExpiredError) {// 如果令牌已過期
      return res.status(401).send({ error: 'Token expired, please log in again.' });// 返回未授權狀態碼和錯誤消息給用戶
    } else {// 如果令牌無效
      return res.status(403).send({ error: 'Invalid token.' });// 返回禁止狀態碼和錯誤消息給用戶
    }
  }
}

export default authenticateToken// 導出身份驗證中間件函式