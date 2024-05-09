import express from 'express'
const router = express.Router()

import db from '#configs/mysql.js'

// router.get('/', async (req, res) =>{
//     // res.send("獲取所有收藏");
//     try {
//     const [collects] = await db.execute('SELECT * FROM `collection`')
//     res.status(200).json({
//       status: 'success',
//       collects: collects || [], // 如果 users 不存在，设置为空数组
//     })
//   } catch (err) {
//     console.error(err)
//     res.status(500).json({ status: 'error', message: 'Internal server error' })
//   }
// })
router.get('/:id', async (req, res) => {
  // res.send(`獲取特定id使用者 ${req.params.id}`)
  const user_id = req.params.id
  // const user_id = req.query.user_id
  // const sqlUserCollection = 'SELECT * FROM `collection` WHERE `user_id` = ?'

  const sqlUserCollection = `
  SELECT *
  FROM collection 
  LEFT JOIN product_lecture ON collection.product_id = product_lecture.id
  LEFT JOIN article ON collection.article_id = article.article_id
  WHERE user_id = ?`
  try {
    const [rows, fields] = await db.query(sqlUserCollection, [user_id])

    // 標準回傳JSON
    return res.json({
      status: 'success',
      data: {
        user_collection: rows,
      },
    })
  } catch (error) {
    console.log(error)
  }
})

export default router
