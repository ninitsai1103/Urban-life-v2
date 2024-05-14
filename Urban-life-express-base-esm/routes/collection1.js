import express from 'express'
const router = express.Router()

import db from '#configs/mysql.js'

router.get('/', async (req, res) => {
  // res.send(`獲取特定id使用者 ${req.params.id}`)
  // const user_id = req.params.id
  const user_id = req.query.user_id

  const sqlUserCollection = `
SELECT 
  collection.id,
  collection.user_id,
  collection.product_id,
  product_lecture.name AS product_name,
  product_lecture.price AS product_price,
  product_lecture.description AS product_description,
  product_lecture.cover AS product_image,
  collection.pdltat_id,
  collection.article_id,
  user_teacher.name AS article_author,
  article.title AS article_title,
  article.content AS article_content,
  article.img AS article_image,
  article.created_at AS article_date,
  collection.valid,
  (
    SELECT COUNT(*)
    FROM collection AS c
    WHERE c.article_id = article.id
  ) AS article_collects,
  (
    SELECT COUNT(*)
    FROM article_comment AS ac
    WHERE ac.article_id = article.id AND ac.valid = 1
  ) AS article_comments
FROM 
  collection 
LEFT JOIN 
  product_lecture ON collection.product_id = product_lecture.id
LEFT JOIN 
  article ON collection.article_id = article.id
LEFT JOIN 
  user_teacher ON article.user_id = user_teacher.id 
WHERE 
  collection.valid = 1 AND collection.user_id = ?;
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
router.delete('/:id', async (req, res) => {
  try {
    const collectionID = req.params.id
    // const collectionID = req.body.id

    let deleteUserCollect = `UPDATE collection
    SET valid = 0
    WHERE id = ? ;`
    await db.query(deleteUserCollect, [collectionID])
    return res.json({
      status: 'success',
      data: {
        message: '使用者的collection被刪除成功',
      },
    })
  } catch (error) {
    return res.json({
      status: 'error',
      data: {
        error: error,
      },
    })
  }
})

export default router
