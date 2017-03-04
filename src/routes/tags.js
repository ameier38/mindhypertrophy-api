import express from 'express'
import Tag from '../models/Tag'

const router = express.Router()

const list = (req, res, next) => {
    Tag.list()
        .then(tags => res.json(tags))
        .catch(e => next(e))
}

const getById = (req, res, next) => {
    Tag.getById(req.params.tagId)
        .then(tag => res.json(tag))
        .catch(e => next(e))
}

router.route('/')
    /** GET /api/tags - Get list of tags */
    .get(list)

router.route('/:tagId')
    /** GET /api/tags/[tagId] - Get tag by slug */
    .get(getById)

export default router