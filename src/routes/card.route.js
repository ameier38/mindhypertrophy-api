import express from 'express'
import range from 'express-range'
import { list, getBySlug } from '../controllers/card.controller'

const router = express.Router()

router.use(range({accept: 'cards'}))

router.route('/')
    /** GET /api/cards - Get list of cards */
    .get(list)

router.route('/:slug')
    /** GET /api/cards/[slug] - Get card by slug */
    .get(getBySlug)

export default router