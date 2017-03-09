import express from 'express'
import range from 'express-range'
import { list, getById } from '../controllers/tag.controller'

const router = express.Router()

router.use(range({accept: 'tags'}))

router.route('/')
    /** GET /api/tags - Get list of tags */
    .get(list)

router.route('/:tagId')
    /** GET /api/tags/[tagId] - Get tag by id */
    .get(getById)

export default router