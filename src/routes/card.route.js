import express from 'express'
import { list, getBySlug } from '../controllers/card.controller'

const router = express.Router()

router.route('/')
    /** GET /api/cards - Get list of cards */
    .get(list)

router.route('/:slug')
    /** GET /api/cards/[slug] - Get card by slug */
    .get(getBySlug)

export default router