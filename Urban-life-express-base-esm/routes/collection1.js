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
router.get('/', async (req, res) => {
  // res.send(`獲取特定id使用者 ${req.params.id}`)
  // const user_id = req.params.id
  const user_id = req.query.user_id

  const sqlUserCollection = `SELECT 
  collection.id,
  collection.user_id,
  collection.product_id,
  product_lecture.name AS product_name,
  product_lecture.price AS product_price,
  product_lecture.description AS product_description,
  product_lecture.cover AS product_image,
  collection.pdltat_id,
  collection.article_id,
  user_teacher.name AS article_author ,
  article.title AS article_title,
  article.content AS article_content,
  article.img AS article_image,
  article.created_at AS article_date,
  collection.valid
FROM 
  collection 
LEFT JOIN 
  product_lecture ON collection.product_id = product_lecture.id
LEFT JOIN 
  article ON collection.article_id = article.id
LEFT JOIN 
  user_teacher ON article.user_id = user_teacher.id 
WHERE 
  collection.user_id = ?;
`
  try {
    const [collects] = await db.query(sqlUserCollection, [user_id])

    // 標準回傳JSON
    res.status(200).json({
      status: 'success',
      collects,
    })
  } catch (error) {
    console.log(error)
  }
})

export default router
