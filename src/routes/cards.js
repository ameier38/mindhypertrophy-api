import express from 'express'
import Card from '../models/Card'

const router = express.Router()

const list = (req, res, next) => {
    Card.list()
        .then(cards => res.json(cards))
        .catch(e => next(e))
}

const getBySlug = (req, res, next) => {
    Card.getBySlug(req.params.slug)
        .then(card => res.json(card))
        .catch(e => next(e))
}

router.route('/cards')
    /** GET /api/cards - Get list of cards */
    .get(list)

router.route('/cards/:slug')
    /** GET /api/cards/[slug] - Get card by slug */
    .get(getBySlug)

export default router