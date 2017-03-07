import Card from '../models/card.model'
import Tag from '../models/tag.model'
import { testCard } from '../seed_data'

const debug = require('debug')('api:controllers:card.controller')

export const list = (req, res, next) => {
    debug("list called")
    Card.list()
        .then(cards => res.json(cards))
        .catch(e => next(e))
}

export const getBySlug = (req, res, next) => {
    debug("getBySlug called")
    Card.getBySlug(req.params.slug)
        .then(card => res.json(card))
        .catch(e => next(e))
}

export const seedCard = () => {
    Card.list().then(cards => {
        if (cards.length === 0) {
            Tag.findOne().exec()
                .then(tag => {
                    if (tag) {
                        debug("seeding card")
                        Card.create({
                            ...testCard,
                            tags: [tag._id]    
                        })
                    }
                    else {
                        debug("no tag found")
                    }
                })
        }
    })
}