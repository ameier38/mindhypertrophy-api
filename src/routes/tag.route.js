import express from 'express'
import { list, getById } from '../controllers/tag.controller'

const router = express.Router()

router.route('/')
    /** GET /api/tags - Get list of tags */
    .get(list)

router.route('/:tagId')
    /** GET /api/tags/[tagId] - Get tag by slug */
    .get(getById)

export default router