import express from 'express'
import range from 'express-range'
import expressJwt from 'express-jwt'
import {
    listTags, getTag, createTag, updateTag, deleteTag 
} from '../controllers/tag.controller'

const router = express.Router()

router.use(range({accept: 'tags'}))

router.route('/')
    /** GET /api/tags - Get list of tags */
    .get(listTags)
    /** POST /api/tags - Create a tag */
    .post(expressJwt({secret: process.env.APP_SECRET}), createTag)

router.route('/:tagId')
    /** GET /api/tags/[tagId] - Get tag by id */
    .get(getTag)
    /** PUT /api/tags/[tagId] - Update a tag */
    .put(expressJwt({secret: process.env.APP_SECRET}), updateTag)
    /** DELETE /api/tags/[tagId] - Delete a tag */
    .delete(expressJwt({secret: process.env.APP_SECRET}), deleteTag)


export default router