import express from 'express'

import db from '#configs/mysql.js'
const router = express.Router()

router.post('/', async function (req, res) {
  try {
    console.log(req.body) // Log the request body to see what data is coming in.
    const { title, content, categoryId, userId } = req.body // Destructure the needed fields from the request body.

    // Assuming the validity of the article is set as true by default.
    let insertArticleSql = `INSERT INTO article (title, content, category_id, user_id, valid) VALUES (?, ?, ?, ?, 1)`

    // Array of values to be used in the SQL query.
    const values = [title, content, categoryId, userId]

    // Executing the query
    const [rows, fields] = await db.query(insertArticleSql, values)

    return res.json({
      status: 'success',
      message: 'Article inserted successfully',
      data: { articleId: rows.insertId }, // Assuming 'rows.insertId' holds the ID of the newly inserted article.
    })
  } catch (error) {
    console.error('Error inserting article:', error)
    return res.json({
      status: 'error',
      message: 'Failed to insert article',
      data: { error: error.message },
    })
  }
})

export default router
