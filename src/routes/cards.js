import express from 'express'
import Card from '../models/Card'

const router = express.Router()

const list = (req, res, next) => {
    console.log("cards.list called")
    Card.list()
        .then(cards => res.json(cards))
        .catch(e => next(e))
}

const getBySlug = (req, res, next) => {
    console.log("cards.getBySlug called")
    Card.getBySlug(req.params.slug)
        .then(card => res.json(card))
        .catch(e => next(e))
}

router.route('/')
    /** GET /api/cards - Get list of cards */
    .get(list)

router.route('/:slug')
    /** GET /api/cards/[slug] - Get card by slug */
    .get(getBySlug)

export default router