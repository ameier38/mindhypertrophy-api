import express from 'express'
import expressJwt from 'express-jwt'
import range from 'express-range'
import { 
    listCards, getCard, createCard, updateCard, deleteCard 
} from '../controllers/card.controller'

const router = express.Router()

router.use(range({accept: 'cards'}))

router.route('/')
    /** GET /api/cards - Get list of cards */
    .get(listCards)
    /** POST /api/cards - Create a card */
    .post(expressJwt({secret: process.env.APP_SECRET}), createCard)

router.route('/:cardId')
    /** GET /api/cards/[cardId] - Get card by slug */
    .get(getCard)
    /** PUT /api/cards/[cardId] - Update a card */
    .put(expressJwt({secret: process.env.APP_SECRET}), updateCard)
    /** DELETE /api/cards/[cardId] - Delete a card */
    .delete(expressJwt({secret: process.env.APP_SECRET}), deleteCard)

export default router