import Card from '../models/card.model'
import Tag from '../models/tag.model'
import { testCard } from '../seed_data'

const debug = require('debug')('api:controllers:card.controller')

export const listCards = (req, res, next) => {
    debug("listCards called")
    Card.list()
        .then(cards => {
            res.range({length: cards.length})
            res.json(cards)
        })
        .catch(e => next(e))
}

export const getCard = (req, res, next) => {
    debug('getCard called')
    Card.getById(req.params.cardId)
        .then(card => res.json(card))
        .catch(e => next(e))
}

export const createCard = (req, res, next) => {
    debug('createCard called')
    const { 
        slug, title, summary, imageUrl, 
        createdDate, content, tagNames 
    } = req.body
    const newCard = new Card({
        slug, title, summary, imageUrl, 
        createdDate, content, tagNames 
    })
    newCard.save()
        .then(card => res.json(card))
        .catch(e => next(e))
}

export const updateCard = (req, res, next) => {
    debug('updateCard called')
    const { 
        slug, title, summary, imageUrl, 
        createdDate, content, tagNames 
    } = req.body
    const updatedCard = {
        slug, title, summary, imageUrl, 
        createdDate, content, tagNames 
    }
    Card.update(req.params.cardId, updatedCard)
        .then(card => res.json(card))
        .catch(e => next(e))
}

export const deleteCard = (req, res, next) => {
    debug('deleteCard called')
    Card.delete(req.params.cardId)
        .then(card => res.json(card))
        .catch(e => next(e))
}

export const seedCard = () => {
    Card.list().then(cards => {
        debug(`number of cards: ${cards.length}`)
        if (cards.length === 0) {
            Tag.list()
                .then(tags => {
                    Card.create({
                        ...testCard,
                        tags: [tags[0]._id]    
                    })
                })
        }
    })
}