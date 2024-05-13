import express from 'express';
import db from '#configs/mysql.js';

const router = express.Router();

// 修改文章的API
router.put('/:articleId', async function (req, res) {
    const { articleId } = req.params; // 從URL中取得文章ID
    const { title, content, categoryId, img } = req.body; // 從請求體中解構所需字段

    try {
        let editSQL = `UPDATE article SET title = ?, content = ?, category_id = ?, img = ? WHERE id = ?`;

        // 執行SQL查詢，傳遞字段值和文章ID到查詢中
        const [result] = await db.query(editSQL, [title, content, categoryId, img, articleId]);

        if (result.affectedRows === 0) {
            // 如果沒有更新任何行，表示文章ID不存在
            return res.status(404).json({
                status: 'error',
                message: 'Article not found',
            });
        }

        return res.json({
            status: 'success',
            message: 'Article updated successfully',
        });
    } catch (error) {
        console.error('Error updating article:', error);
        return res.status(500).json({
            status: 'error',
            message: 'Failed to update article',
            data: { error: error.message },
        });
    }
});

export default router;
