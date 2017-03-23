import express from 'express'
import expressJwt from 'express-jwt'
import range from 'express-range'
import { 
    listArticles, getArticle, getArticleBySlug, 
    createArticle, updateArticle, deleteArticle
} from '../controllers/article.controller'

const router = express.Router()

router.use(range({accept: 'articles'}))

router.route('/')
    /** GET /api/articles - Get list of articles */
    .get(listArticles)
    /** POST /api/articles - Create a article */
    .post(expressJwt({secret: process.env.APP_SECRET}), createArticle)

router.route('/slug/:slug')
    /** GET /api/articles/slug/[slug] - Get article by slug */
    .get(getArticleBySlug)

router.route('/:articleId')
    /** GET /api/articles/[articleId] - Get article by id */
    .get(getArticle)
    /** PUT /api/articles/[articleId] - Update a article */
    .put(expressJwt({secret: process.env.APP_SECRET}), updateArticle)
    /** DELETE /api/articles/[articleId] - Delete a article */
    .delete(expressJwt({secret: process.env.APP_SECRET}), deleteArticle)

export default router