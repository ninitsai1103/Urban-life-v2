import express from 'express'
const router = express.Router()
import multer from 'multer'
// import path from 'path'
// import moment from 'moment'
// import cors from 'cors'
// import { v4 as uuidv4 } from 'uuid'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import db from '#configs/mysql.js'

let blackListedToken = []
dotenv.config()
const secretKey = process.env.SECRET_KEY
const upload = multer()
const __dirname = import.meta.dirname
router.get('/', async (req, res) => {
  // res.send("獲取所有使用者");
  // getUserAll
  try {
    const [users] = await db.execute('SELECT * FROM `user_teacher`')
    res.status(200).json({
      status: 'success',
      users: users || [], // 如果 users 不存在，设置为空数组
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ status: 'error', message: 'Internal server error' })
  }
})

router.get('/status', checkToken, async (req, res) => {
  // res.send("檢查使用者登入登出狀態");
})
router.get('/:id', async (req, res) => {
  // res.send(`獲取特定id使用者 ${req.params.id}`)
  const id = req.params.id
  const sql = 'SELECT * FROM `user_teacher` WHERE `id` = ?'
  let user, error
  db.execute(sql, [id])
    .then(([rows, fields]) => {
      user = rows[0]
      // delete user.password // 移除密碼欄位
      res.status(200).json({ status: 'success', user })
    })
    .catch((err) => {
      console.error(err)
      error = err
      let message = error.message ? error.message : 'User not found'
      res.status(404).json({ status: 'error', message })
    })
})

router.post('', upload.none(), async (req, res) => {
  // res.send('新增一個使用者');
  const { email, password } = req.body
  let user
  const sqlCheckEmail =
    'SELECT COUNT(*) AS count FROM `user_teacher` WHERE `email` = ?'
  const sqlInsertUser =
    'INSERT INTO `user_teacher` (`name`, `email`, `password`, `identity_id`, `img`, `birthday`, `address`, `phone`, `valid`) VALUES (NULL, ?, ?, 3,"default.jpg", NULL , NULL , NULL , 1)'
  try {
    const [rows] = await db.execute(sqlCheckEmail, [email])
    const count = rows[0].count

    if (count > 0) {
      return res
        .status(400)
        .json({ status: 'error', message: 'Email already exists' })
    } else {
      await db.execute(sqlInsertUser, [email, password])
      const [insertedUserRows] = await db.execute(
        'SELECT * FROM `user_teacher` WHERE `email` = ?',
        [email]
      )
      user = insertedUserRows[0]
      // 成功更新使用者資訊
      let token = jwt.sign(
        {
          id: user.id,
          name: user.name,
          identity_id: user.identity_id,
        },
        secretKey,
        { expiresIn: '30d' }
      )

      return res.status(201).json({
        status: 'success',
        message: 'User created successfully',
        user: user, // 返回完整的使用者資訊，包括 ID
        token,
      })
    }
  } catch (err) {
    console.error(err)
    return res
      .status(500)
      .json({ status: 'error', message: 'Internal server error' })
  }
})

router.put('/:id', upload.none(), async (req, res) => {
  const id = req.params.id
  const { name, phone, birthday, address, password, newPassword } = req.body

  try {
    // 如果提供了新密码，则进行密码验证
    if (password) {
      // 檢查原密碼是否正確
      const checkPasswordSql = 'SELECT password FROM user_teacher WHERE id = ?'
      const [passwordRows] = await db.execute(checkPasswordSql, [id])

      // 如果有找到用戶並且密碼不匹配，則返回錯誤
      if (passwordRows.length === 0 || passwordRows[0].password !== password) {
        return res.status(401).json({ status: 'error', message: '密碼錯誤' })
      }
    }

    // 更新用戶資訊
    const updateValues = []
    const sqlParams = []

    if (name) {
      updateValues.push('name = ?')
      sqlParams.push(name)
    }
    if (phone) {
      updateValues.push('phone = ?')
      sqlParams.push(phone)
    }
    if (birthday) {
      updateValues.push('birthday = ?')
      sqlParams.push(birthday)
    }
    if (address) {
      updateValues.push('address = ?')
      sqlParams.push(address)
    }
    if (newPassword) {
      updateValues.push('password = ?')
      sqlParams.push(newPassword)
    }

    // 添加 ID 到 SQL 參數中
    sqlParams.push(id)

    // 構建 SQL 更新語句
    const sqlUpdate = `UPDATE user_teacher SET ${updateValues.join(', ')} WHERE id = ?`

    // 執行更新
    const [result] = await db.execute(sqlUpdate, sqlParams)

    if (result.affectedRows === 0) {
      return res.status(404).json({ status: 'error', message: 'User not found' })
    }
     // 成功更新使用者資訊
     const userInfoSql = 'SELECT * FROM user_teacher WHERE id = ?';
     const [userInfoRows] = await db.execute(userInfoSql, [id]);
     const user = userInfoRows[0];
    
    // 成功更新使用者資訊
    res.status(200).json({
      status: 'success',
      message: '更新成功',
      logout: password ? true : false,
      user
     
    })
  } catch (err) {
    console.error(err)
    const message = err.message || 'Failed to update user information'
    res.status(500).json({ status: 'error', message })
  }
})


router.delete('/:id', (req, res) => {
  res.send(`刪除特定id使用者 ${req.params.id}`)
})
router.post('/login', upload.none(), async (req, res) => {
  //   res.send('使用者登入')
  const { email, password } = req.body
  const sql =
    'SELECT * FROM `user_teacher` WHERE `email` = ? AND `password` = ?'
  try {
    const [rows] = await db.execute(sql, [email, password])
    if (rows.length === 0) {
      return res
        .status(400)
        .json({ status: 'error', message: 'Invalid email or password' })
    }

    const user = rows[0]
    // 在這裡直接查詢該使用者的資料，並將所有資料返回給前端
    const userInfoSql = 'SELECT * FROM `user_teacher` WHERE `email` = ?'
    const [userInfoRows] = await db.execute(userInfoSql, [user.email])
    const userInfo = userInfoRows[0]
    delete userInfo.password // 移除密碼欄位
    let token = jwt.sign(
      {
        id: user.id,
        name: user.name,
        identity_id: user.identity_id,
      },
      secretKey,
      { expiresIn: '30d' }
    )

    return res.status(200).json({
      status: 'success',
      message: 'Login successful',
      user: userInfo,
      token,
    })
  } catch (err) {
    console.error(err)
    return res
      .status(500)
      .json({ status: 'error', message: 'Internal server error' })
  }
})

router.post('/logout', checkToken, (req, res) => {
  // res.send('使用者登出')
  blackListedToken.push(req.token)
  let token = jwt.sign(
    {
      id: undefined,
      name: undefined,
      identity_id: undefined,
    },
    secretKey,
    { expiresIn: '-10s' }
  )
  res.status(200).json({
    status: 'success',
    message: '登出成功',
    token,
  })
})

function checkToken(req, res, next) {
  let token = req.get('Authorization')

  if (token && token.indexOf('Bearer ') === 0) {
    token = token.slice(7)
    if (blackListedToken.includes(token)) {
      return res.status(401).json({ status: 'error', message: 'token已經過期' })
    }
    jwt.verify(token, secretKey, (err, decoded) => {
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
}
export default router
